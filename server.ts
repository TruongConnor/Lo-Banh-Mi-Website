import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;
  const UPLOAD_DIR = path.join(process.cwd(), "public", "uploaded");
  const PHOTOS_FILE = path.join(process.cwd(), "public", "site-photos.json");

  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  // Allow up to 50mb for high-res photo payloads
  app.use(express.json({ limit: "50mb" }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all permanent website photos
  app.get("/api/photos", (req, res) => {
    try {
      if (fs.existsSync(PHOTOS_FILE)) {
        const content = fs.readFileSync(PHOTOS_FILE, "utf-8");
        return res.json(JSON.parse(content));
      }
    } catch (e) {
      console.error("Error reading site-photos.json:", e);
    }
    res.json({});
  });

  // Save photos uploaded to any box so that everyone on the website sees them
  app.post("/api/photos", (req, res) => {
    try {
      let existing: Record<string, string> = {};
      if (fs.existsSync(PHOTOS_FILE)) {
        try {
          existing = JSON.parse(fs.readFileSync(PHOTOS_FILE, "utf-8"));
        } catch {
          existing = {};
        }
      }

      const updates: Record<string, string> = req.body || {};
      const updatedMap: Record<string, string> = { ...existing };

      for (const [key, value] of Object.entries(updates)) {
        if (!value) continue;
        if (typeof value === "string" && value.startsWith("data:image/")) {
          // Convert base64 data URL to permanent static image file in /public/uploaded
          const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "_");
          const extMatch = value.match(/^data:image\/([a-zA-Z0-9+]+);base64,/);
          const ext = extMatch && extMatch[1] === "png" ? "png" : "jpg";
          const base64Data = value.replace(/^data:image\/[a-zA-Z0-9+]+;base64,/, "");
          const fileName = `${safeKey}.${ext}`;
          const filePath = path.join(UPLOAD_DIR, fileName);
          fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
          // Permanent public URL
          updatedMap[key] = `/uploaded/${fileName}?v=${Date.now()}`;
        } else if (typeof value === "string") {
          updatedMap[key] = value;
        }
      }

      fs.writeFileSync(PHOTOS_FILE, JSON.stringify(updatedMap, null, 2), "utf-8");
      return res.json({ success: true, photos: updatedMap });
    } catch (e) {
      console.error("Error saving permanent photos:", e);
      return res.status(500).json({ error: "Failed to save photos permanently" });
    }
  });

  // Serve uploaded images directly with correct MIME types
  app.use("/uploaded", express.static(UPLOAD_DIR));
  app.use(express.static(path.join(process.cwd(), "public")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
