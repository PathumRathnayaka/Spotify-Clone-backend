import { clerkMiddleware } from '@clerk/express'
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statusRoutes from "./routes/status.route.js"
import { connectDB } from "./lib/db.js";


dotenv.config();
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(clerkMiddleware());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, "tmp"),
  createParentPath: true,
  limits: {
    fileSize: 10 * 1024 * 1024 //10mb max file size
  },
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/status", statusRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message})
})

app.listen(port, () => {
  console.log("Server is running on port "+port);
  connectDB();
});