import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { connectDB } from "./lib/database.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/messageRoutes.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from 'path';
import fs from 'fs';

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const __dirname = path.resolve();


//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", profileRoutes);
app.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
  // Try a set of likely locations for the built frontend `dist` folder.
  // Prefer candidates that actually contain an `index.html`.
  const candidates = [
    path.resolve(__dirname, 'frontend', 'app', 'dist'),
    path.resolve(__dirname, '..', 'frontend', 'app', 'dist'),
    path.resolve(__dirname, '..', '..', 'frontend', 'app', 'dist'),
    path.resolve(process.cwd(), 'frontend', 'app', 'dist'),
    path.resolve(process.cwd(), 'frontend', 'dist'),
    path.resolve(process.cwd(), 'dist'),
  ];

  const distPath = candidates.find((p) => fs.existsSync(path.join(p, 'index.html')) || fs.existsSync(p));

  if (distPath) {
    console.log('Serving frontend from:', distPath);
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) return res.sendFile(indexFile);
      // Fallback: send any existing file or a small message.
      return res.status(404).send('index.html not found in frontend dist');
    });
  } else {
    console.warn('Frontend `dist` folder not found. Looked in:');
    candidates.forEach((c) => console.warn(' -', c));

    // If the frontend/app folder exists, list its contents to help debugging.
    try {
      const fa = path.resolve(process.cwd(), 'frontend', 'app');
      if (fs.existsSync(fa)) {
        const list = fs.readdirSync(fa);
        console.warn('Contents of `frontend/app` (process.cwd):', fa, list);
      }
    } catch (err) {
      console.warn('Error while listing frontend/app contents:', err && err.message);
    }
  }
}

server.listen(process.env.PORT, () => {
  console.log("Server started at port", process.env.PORT);
  connectDB();
});
