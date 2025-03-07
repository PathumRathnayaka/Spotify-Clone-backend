import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/use.route.js"
import authRoutes from "./routes/auth.route.js"
import adminRoutes from "./routes/admin.route.js"
import songRoutes from "./routes/song.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statusRoutes from "./routes/status.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json())

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/song", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/status", statusRoutes);

app.listen(port, () => {
  console.log("Server is running on port "+port);
  connectDB();
});