/**
 * Permanent Photo Storage & Server Sync Utility
 * - Dual-layer browser persistence (localStorage + IndexedDB) for instant feedback
 * - Server synchronization (/api/photos) so EVERY visitor on any phone or computer
 *   sees the exact photos placed inside the boxes permanently.
 */

/**
 * Safely resolves an image path to work across local dev, custom domains,
 * and GitHub Pages subpath deployments (e.g. /<repository-name>/).
 */
export function resolveAssetUrl(url: string): string {
  if (!url) return '';
  if (
    url.startsWith('data:') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Clean the relative path: remove leading slash
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;

  // In the browser, dynamically resolve against the current document URL
  if (typeof window !== 'undefined' && window.location) {
    try {
      const currentUrl = new URL(window.location.href);
      let pathname = currentUrl.pathname;

      // If the pathname ends with a specific file (e.g., index.html), trim to its directory
      if (pathname.includes('.')) {
        pathname = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      } else if (!pathname.endsWith('/')) {
        // If it's a repository subpath without trailing slash (e.g., /my-bakery), add trailing slash
        pathname = pathname + '/';
      }

      const baseUri = `${currentUrl.origin}${pathname}`;
      return new URL(cleanPath, baseUri).href;
    } catch {
      // Fall through to metaEnv
    }
  }

  const metaEnv = (import.meta as unknown as { env?: { BASE_URL?: string } })?.env;
  const base = metaEnv?.BASE_URL || './';
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
}

export function compressImage(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

const DB_NAME = 'lo_banh_mi_photos_db';
const STORE_NAME = 'photos';

let serverPhotosCache: Record<string, string> = {};
let isSyncing = false;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Fetch all permanent website photos.
 * 1. Checks static site-photos.json bundled with the site (works on GitHub Pages & static hosts)
 * 2. Checks dynamic /api/photos endpoint if a backend server is running
 */
export async function fetchServerPhotos(): Promise<Record<string, string>> {
  // 1. Static file check (ensures GitHub Pages / static hosting gets all uploaded photos)
  try {
    const staticUrl = resolveAssetUrl('site-photos.json');
    const resStatic = await fetch(staticUrl);
    if (resStatic.ok) {
      const data = await resStatic.json();
      if (data && typeof data === 'object') {
        const cleaned: Record<string, string> = {};
        for (const [k, v] of Object.entries(data)) {
          if (typeof v === 'string' && !v.includes('banhmimore')) {
            cleaned[k] = v;
          }
        }
        serverPhotosCache = { ...serverPhotosCache, ...cleaned };
        notifyPhotoUpdate();
      }
    }
  } catch {
    // Ignore static file fetch error
  }

  // 2. Dynamic server API check (when running on fullstack Node / Express dev server)
  try {
    const apiUrl = resolveAssetUrl('api/photos');
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        serverPhotosCache = { ...serverPhotosCache, ...data };
        notifyPhotoUpdate();
        return serverPhotosCache;
      }
    }
  } catch {
    // Ignore API endpoint fetch error
  }

  return serverPhotosCache;
}

/**
 * Notify all components that photos have been updated.
 */
function notifyPhotoUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lo_banh_mi_photos_updated', { detail: serverPhotosCache }));
  }
}

/**
 * Save a photo permanently:
 * 1. Locally in localStorage and IndexedDB
 * 2. On the server via /api/photos so everyone visiting the website sees it permanently.
 */
export async function savePermanentPhoto(key: string, dataUrl: string): Promise<void> {
  // 1. Save to local storage
  try {
    localStorage.setItem(key, dataUrl);
  } catch (err) {
    console.warn('localStorage warning:', err);
  }

  // 2. Save to IndexedDB
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(dataUrl, key);
  } catch (err) {
    console.warn('IndexedDB save failed:', err);
  }

  // Update memory cache
  serverPhotosCache[key] = dataUrl;
  notifyPhotoUpdate();

  // 3. Post to backend server (if available)
  try {
    const apiUrl = resolveAssetUrl('api/photos');
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [key]: dataUrl }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.photos) {
        serverPhotosCache = { ...serverPhotosCache, ...json.photos };
        notifyPhotoUpdate();
      }
    }
  } catch (err) {
    console.warn('Failed to sync photo to server API:', err);
  }
}

/**
 * Get permanent photo:
 * Checks memory cache -> localStorage -> IndexedDB -> server.
 */
export async function getPermanentPhoto(key: string): Promise<string | null> {
  // Check memory cache first
  if (serverPhotosCache[key]) {
    return serverPhotosCache[key];
  }

  // Check localStorage
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      if (cached.includes('banhmimore')) {
        localStorage.removeItem(key);
      } else {
        return cached;
      }
    }
  } catch {
    // Ignore
  }

  // Check IndexedDB
  try {
    const db = await openDB();
    const result: string | null = await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
    if (result) {
      if (typeof result === 'string' && result.includes('banhmimore')) {
        // purge old template reference
      } else {
        return result;
      }
    }
  } catch {
    // Ignore
  }

  return null;
}

/**
 * Remove permanent photo
 */
export async function removePermanentPhoto(key: string): Promise<void> {
  delete serverPhotosCache[key];
  notifyPhotoUpdate();

  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore
  }
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {
    // Ignore
  }
}

/**
 * Scan all photos the user has placed inside any box in their browser
 * and sync them all to the backend server so that everyone visiting the site sees them.
 */
export async function syncAllLocalPhotosToServer(): Promise<number> {
  if (typeof window === 'undefined' || isSyncing) return 0;
  isSyncing = true;

  try {
    const localPhotos: Record<string, string> = {};

    // 1. Gather all photos from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('lo_banh_mi_photo_')) {
        const val = localStorage.getItem(key);
        if (val) {
          localPhotos[key] = val;
        }
      }
    }

    // 2. Gather from IndexedDB
    try {
      const db = await openDB();
      const allIdbPhotos: Record<string, string> = await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.openCursor();
        const found: Record<string, string> = {};
        req.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result as IDBCursorWithValue | null;
          if (cursor) {
            found[String(cursor.key)] = cursor.value;
            cursor.continue();
          } else {
            resolve(found);
          }
        };
        req.onerror = () => resolve({});
      });

      for (const [k, v] of Object.entries(allIdbPhotos)) {
        if (!localPhotos[k] && v) {
          localPhotos[k] = v;
        }
      }
    } catch {
      // Ignore IDB scan error
    }

    // If local photos exist, upload them to the server
    const keysCount = Object.keys(localPhotos).length;
    if (keysCount > 0) {
      const apiUrl = resolveAssetUrl('api/photos');
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localPhotos),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.photos) {
          serverPhotosCache = { ...serverPhotosCache, ...json.photos };
          notifyPhotoUpdate();
        }
      }
    }

    // Always fetch latest server photos
    await fetchServerPhotos();
    return keysCount;
  } catch (err) {
    console.error('Error during photo synchronization:', err);
    return 0;
  } finally {
    isSyncing = false;
  }
}

// Auto-initialize synchronization on page load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    syncAllLocalPhotosToServer();
  }, 100);
}
