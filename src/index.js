import { clerkMiddleware } from '@clerk/express'
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statusRoutes from "./routes/stat.route.js"
import { connectDB } from "./lib/db.js";
import path from "path";
import fileUpload from "express-fileupload";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";


dotenv.config();
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);


app.use(cors(
  {
    origin: "http://localhost:3000",
    credentials: true}
));

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
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statusRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message})
})

httpServer.listen(port, () => {
  console.log("Server is running on port "+port);
  connectDB();
});