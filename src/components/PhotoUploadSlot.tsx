import React, { useState, useEffect } from 'react';
import {
  getPermanentPhoto,
  fetchServerPhotos,
  resolveAssetUrl,
} from '../utils/photoStorage';
import { PERMANENT_SLOT_PHOTOS } from '../data/permanentPhotos';

interface PhotoUploadSlotProps {
  id: string;
  label: string;
  sublabel?: string;
  aspectRatio?: string;
  className?: string;
  fit?: 'cover' | 'contain';
  objectPosition?: string;
  initialImage?: string;
  compact?: boolean;
}

function getOnlineFallback(id: string): string {
  const lowerId = id.toLowerCase();
  if (lowerId.includes('baguette') || lowerId.includes('bread')) {
    return 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80';
  }
  if (lowerId.includes('croissant')) {
    return 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80';
  }
  if (lowerId.includes('pate') || lowerId.includes('pastry') || lowerId.includes('bao')) {
    return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80';
  }
  if (lowerId.includes('coffee') || lowerId.includes('tea') || lowerId.includes('drink')) {
    return 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80';
  }
  if (lowerId.includes('meat') || lowerId.includes('cha-lua')) {
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80';
  }
  return 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=1000&q=80';
}

function getCategoryFallbackPhoto(id: string, initialImage?: string): string {
  if (PERMANENT_SLOT_PHOTOS[id]) return PERMANENT_SLOT_PHOTOS[id];
  const cleanId = id.replace(/^lo_banh_mi_photo_/, '');
  if (PERMANENT_SLOT_PHOTOS[cleanId]) return PERMANENT_SLOT_PHOTOS[cleanId];
  if (initialImage) return initialImage;
  const lowerId = id.toLowerCase();
  if (lowerId.includes('baguette') || lowerId.includes('pb-') || lowerId.includes('bread')) {
    return '/preview-baguettes.jpg';
  }
  if (lowerId.includes('croissant') || lowerId.includes('cr-')) {
    return '/preview-croissants.jpg';
  }
  if (lowerId.includes('pate-so') || lowerId.includes('pateso') || lowerId.includes('bg-') || lowerId.includes('pastry')) {
    return '/preview-pateso.jpg';
  }
  if (lowerId.includes('coffee') || lowerId.includes('cof-') || lowerId.includes('drk-') || lowerId.includes('tea')) {
    return '/preview-coffee.jpg';
  }
  if (lowerId.includes('meat') || lowerId.includes('cha-lua')) {
    return '/preview-meats.jpg';
  }
  return '/preview-sandwiches.jpg';
}

export const PhotoUploadSlot: React.FC<PhotoUploadSlotProps> = ({
  id,
  label,
  aspectRatio = 'aspect-[16/9]',
  className = '',
  fit = 'cover',
  objectPosition = '',
  initialImage = '',
  compact = false,
}) => {
  const storageKey = `lo_banh_mi_photo_${id}`;
  const defaultPhoto = getCategoryFallbackPhoto(id, initialImage);
  const [currentSrc, setCurrentSrc] = useState<string>(defaultPhoto);

  // Load saved photo if previously saved
  useEffect(() => {
    let isMounted = true;

    async function loadPhoto() {
      // 1. Check local/indexedDB
      const saved = await getPermanentPhoto(storageKey);
      if (isMounted && saved) {
        setCurrentSrc(saved);
        return;
      }

      // 2. Check server / static bundled photos
      try {
        const serverPhotos = await fetchServerPhotos();
        if (isMounted && serverPhotos[storageKey]) {
          setCurrentSrc(serverPhotos[storageKey]);
        }
      } catch {
        // Fallback to defaultPhoto
      }
    }

    loadPhoto();

    return () => {
      isMounted = false;
    };
  }, [storageKey]);

  return (
    <div className={`group relative w-full ${className}`}>
      <div
        className={`relative overflow-hidden ${compact ? 'rounded-xl' : 'rounded-2xl'} border border-[#0b192e]/10 shadow-xs bg-slate-50 w-full max-w-full ${aspectRatio}`}
      >
        <img
          src={resolveAssetUrl(currentSrc)}
          alt={label}
          loading="lazy"
          onError={() => {
            const fallback = getCategoryFallbackPhoto(id);
            if (currentSrc !== fallback) {
              setCurrentSrc(fallback);
            } else {
              const online = getOnlineFallback(id);
              if (currentSrc !== online) {
                setCurrentSrc(online);
              }
            }
          }}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            fit === 'contain' ? 'object-contain p-2' : `object-cover ${objectPosition || 'object-center'}`
          }`}
        />
      </div>
    </div>
  );
};
