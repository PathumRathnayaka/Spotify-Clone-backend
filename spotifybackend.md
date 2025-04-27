This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Additional Info

# Directory Structure
```
.gitignore
.repomixignore
LICENSE
package.json
README.md
repomix.config.json
src/controller/admin.controller.js
src/controller/album.controller.js
src/controller/auth.controller.js
src/controller/song.controller.js
src/controller/stat.controller.js
src/controller/user.controller.js
src/index.js
src/index.js~
src/lib/cloudinary.js
src/lib/db.js
src/lib/socket.js
src/middleware/auth.middleware.js
src/models/album.model.js
src/models/message.model.js
src/models/song.model.js
src/models/user.model.js
src/routes/admin.route.js
src/routes/albums.route.js
src/routes/auth.route.js
src/routes/song.route.js
src/routes/stat.route.js
src/routes/user.route.js
src/seeds/albums.js
src/seeds/songs.js
vercel.json
```

# Files

## File: .repomixignore
````
# Add patterns to ignore here, one per line
# Example:
# *.log
# tmp/
````

## File: repomix.config.json
````json
{
  "output": {
    "filePath": "spotifybackend.md",
    "style": "markdown",
    "parsableStyle": false,
    "fileSummary": true,
    "directoryStructure": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "compress": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100
    }
  },
  "include": [],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": []
  },
  "security": {
    "enableSecurityCheck": true
  },
  "tokenCount": {
    "encoding": "o200k_base"
  }
}
````

## File: vercel.json
````json

````

## File: LICENSE
````
MIT License

Copyright (c) 2025 Pathum Rathnayaka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: README.md
````markdown
# 🎵 Spotify Clone

A full-stack Spotify-inspired music streaming web app built using modern technologies like React, TypeScript, Tailwind CSS, and Node.js. It supports features like user authentication, song streaming, and admin management.

![Spotify Clone Screenshot](https://martech.org/wp-content/uploads/2017/09/spotify-logo-1920x1080.jpg)

---

## 🚀 Tech Stack

**Frontend**  
- React 19 + TypeScript  
- Vite  
- Tailwind CSS + Tailwind Plugins  
- Zustand (State Management)  
- Radix UI + Lucide Icons  
- Axios, Socket.io-client  
- Clerk for authentication  

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- Clerk (User auth)  
- Socket.IO  
- Cloudinary (for media upload)

---

## 📦 Clone & Run the Project

### 🔧 Prerequisites

- Node.js and npm installed
- MongoDB set up (local or Atlas)
- [Clerk account](https://clerk.dev/) and keys
- Cloudinary account for media upload

---

### 🖥 Frontend Setup

```bash
git clone https://github.com/YourUsername/Spotify-Clone-frontend.git
cd Spotify-Clone-frontend
npm install
npm run dev
````

## File: src/controller/album.controller.js
````javascript
import { Album } from "../models/album.model.js";

export const getAllAlbums = async(req, res, next) =>{
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error)
    }
}
export const getAlbumById = async(req, res, next) =>{
    try {
        const {albumId} = req.params;
        const album = await Album.findById(albumId).populate("songs");

        if(!album){
            return res.status(404).json({message: "Album not found"});
        }
        res.status(200).json(album);
    } catch (error) {
        next(error)
    }
}
````

## File: src/controller/song.controller.js
````javascript
import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        // -1 = Decending = Newest -> oldest
        // 1 = Ascending = Oldest -> newest
        const songs = await Song.find().sort({ createdAt: -1});
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in get all songs", error);
        next(error);
    }
};
export const getFeaturedSong = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:6},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};

export const getMadeForYouSong = async (req, res, next) =>{
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:4},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};
export const getTrendingSong = async (req, res, next) =>{
    try {
        const songs = await Song.aggregate([
            {
                $sample: {size:4},
            },
            {
                $project: {
                    _id:1,
                    title:1,
                    artist:1,
                    imageUrl:1,
                    audioUrl:1
                }
            }
        ])
        res.json(songs)
    } catch (error) {
        console.log("Error in get Featured songs", error);
        next(error);
    }
};
````

## File: src/controller/stat.controller.js
````javascript
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
    try {
      const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.distinct('artist')
      ]);

      res.status(200).json({
        totalSongs,
        totalAlbums,
        totalUsers,
        totalArtists: uniqueArtists.length,
      })
    } catch (error) {
      next(error)
    }
  }
````

## File: src/index.js~
````
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



dotenv.config();
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT;
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
app.use("/api/status", statusRoutes);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message})
})

app.listen(port, () => {
  console.log("Server is running on port "+port);
  connectDB();
});
````

## File: src/lib/cloudinary.js
````javascript
import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary
````

## File: src/lib/socket.js
````javascript
import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			credentials: true,
		},
	});

	const userSockets = new Map(); // { userId: socketId}
	const userActivities = new Map(); // {userId: activity}

	io.on("connection", (socket) => {
		socket.on("user_connected", (userId) => {
			userSockets.set(userId, socket.id);
			userActivities.set(userId, "Idle");

			// broadcast to all connected sockets that this user just logged in
			io.emit("user_connected", userId);

			socket.emit("users_online", Array.from(userSockets.keys()));

			io.emit("activities", Array.from(userActivities.entries()));
		});

		socket.on("update_activity", ({ userId, activity }) => {
			console.log("activity updated", userId, activity);
			userActivities.set(userId, activity);
			io.emit("activity_updated", { userId, activity });
		});

		socket.on("send_message", async (data) => {
			try {
				const { senderId, receiverId, content } = data;

				const message = await Message.create({
					senderId,
					receiverId,
					content,
				});

				// send to receiver in realtime, if they're online
				const receiverSocketId = userSockets.get(receiverId);
				if (receiverSocketId) {
					io.to(receiverSocketId).emit("receive_message", message);
				}

				socket.emit("message_sent", message);
			} catch (error) {
				console.error("Message error:", error);
				socket.emit("message_error", error.message);
			}
		});

		socket.on("disconnect", () => {
			let disconnectedUserId;
			for (const [userId, socketId] of userSockets.entries()) {
				// find disconnected user
				if (socketId === socket.id) {
					disconnectedUserId = userId;
					userSockets.delete(userId);
					userActivities.delete(userId);
					break;
				}
			}
			if (disconnectedUserId) {
				io.emit("user_disconnected", disconnectedUserId);
			}
		});
	});
};
````

## File: src/models/album.model.js
````javascript
import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        title:{ type: String, required: true },
        artist:{ type: String, required: true},
        imageUrl:{ type: String, required: true},
        releaseYear:{ type: Number, required: true},
        songs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    },{ timeseries: true});

export const Album = mongoose.model("Album",albumSchema);
````

## File: src/routes/stat.route.js
````javascript
import express from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = express.Router();
router.get("/", protectRoute, requireAdmin, getStats);

export default router;
````

## File: .gitignore
````
node_modules/

# Environment variable files
.env
````

## File: src/lib/db.js
````javascript
import mongoose from 'mongoose';

export const connectDB = async () => {
    console.log("Attempting to connect to MongoDB..."); // Debug log
    console.log("MongoDB URL:", process.env.MONGODB_URL);
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to mongodb ${conn.connection.host}`);
    }catch(error){
       console.log("Failed to connect to mongodb",error);
       process.exit(1);
    }
    
  };
````

## File: src/middleware/auth.middleware.js
````javascript
import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) =>{
    if(!req.auth.userId){
        res.status(401).json({ message: "Unauthorized - you must be logged in" });
        return
    }

    next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await  clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;
        if(!isAdmin){
            return res.status(403).json({ message: "Forbidden - you must be an admin" });
            
        }
        next();
    } catch (error) {
        next(error);
    }
}
````

## File: src/models/message.model.js
````javascript
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

export const Message = mongoose.model("Message", messageSchema);
````

## File: src/models/song.model.js
````javascript
import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		audioUrl: {
			type: String,
			required: true,
		},
		duration: {
			type: Number,
			required: true,
		},
		albumId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Album",
			required: false,
		},
	},
	{ timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
````

## File: src/models/user.model.js
````javascript
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image:{
    type: String,
    required: true,
  },
  clerkId:{
    type: String,
    required: true,
    unique: true,
  },
},
{
  timestamps: true,
});

export const User = mongoose.model("User", userSchema);
````

## File: src/routes/albums.route.js
````javascript
import express from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);


export default router;
````

## File: src/routes/song.route.js
````javascript
import express from "express";
import { getAllSongs, getFeaturedSong, getMadeForYouSong, getTrendingSong } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSong);
router.get("/made-for-you", getMadeForYouSong);
router.get("/trending", getTrendingSong);

export default router;
````

## File: src/seeds/albums.js
````javascript
import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "New Rules",
				artist: "Dua Lipa",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Side to Side",
				artist: "Ariana Grande",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Die with a smile",
				artist: "Lady Gaga",
				imageUrl: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Mad Love",
				artist: "Becky G",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Night Changes",
				artist: "One Direction",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Sin Pijama",
				artist: "Becky G",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 28, // 0:28
			},
			{
				title: "See you again",
				artist: "Wiz Khalifa",
				imageUrl: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "7 Rings",
				artist: "Ariana Grande",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "Levitating",
				artist: "Dua Lipa",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 46, // 0:46
			},
			{
				title: "Lovely",
				artist: "billie eilish",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 41, // 0:41
			},
			{
				title: "Mala santa",
				artist: "Becky G",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 27, // 0:27
			},
			{
				title: "Happier Than Ever",
				artist: "billie eilish",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageUrl: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Dollar",
				artist: "Becky G",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 17, // 0:17
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Neon Echoes",
				artist: "Various Artists",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Sunset Frequencies",
				artist: "Various Artists",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Afterglow Reverie",
				artist: "Various Artists",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				title: "Velvet Horizons",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();
````

## File: src/seeds/songs.js
````javascript
import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
		title: "Levitating",
		artist: "Dua Lipa",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		duration: 46, // 0:46
	},
	{
		title: "Lovely",
		artist: "billie eilish",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/2.mp3",
		duration: 41, // 0:41
	},
	{
		title: "Happier Than Ever",
		artist: "billie eilish",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/3.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Night Changes",
		artist: "One Direction",
		imageUrl: "/cover-images/4.jpg",
		audioUrl: "/songs/4.mp3",
		duration: 24, // 0:24
	},
	{
		title: "Side to Side",
		artist: "Ariana Grande",
		imageUrl: "/cover-images/5.jpg",
		audioUrl: "/songs/5.mp3",
		duration: 36, // 0:36
	},
	{
		title: "Mountain High",
		artist: "The Wild Ones",
		imageUrl: "/cover-images/6.jpg",
		audioUrl: "/songs/6.mp3",
		duration: 40, // 0:40
	},
	{
		title: "New Rules",
		artist: "Dua Lipa",
		imageUrl: "/cover-images/7.jpg",
		audioUrl: "/songs/7.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Desert Wind",
		artist: "Sahara Sons",
		imageUrl: "/cover-images/8.jpg",
		audioUrl: "/songs/8.mp3",
		duration: 28, // 0:28
	},
	{
		title: "Sin Pijama",
		artist: "Becky G",
		imageUrl: "/cover-images/9.jpg",
		audioUrl: "/songs/9.mp3",
		duration: 28, // 0:28
	},
	{
		title: "7 Rings",
		artist: "Ariana Grande",
		imageUrl: "/cover-images/10.jpg",
		audioUrl: "/songs/10.mp3",
		duration: 30, // 0:30
	},
	{
		title: "Winter Dreams",
		artist: "Arctic Pulse",
		imageUrl: "/cover-images/11.jpg",
		audioUrl: "/songs/11.mp3",
		duration: 29, // 0:29
	},
	{
		title: "Dollar",
		artist: "Becky G",
		imageUrl: "/cover-images/12.jpg",
		audioUrl: "/songs/12.mp3",
		duration: 17, // 0:17
	},
	{
		title: "Mad Love",
		artist: "Becky G",
		imageUrl: "/cover-images/13.jpg",
		audioUrl: "/songs/13.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Mala santa",
		artist: "Becky G",
		imageUrl: "/cover-images/14.jpg",
		audioUrl: "/songs/14.mp3",
		duration: 27, // 0:27
	},
	{
		title: "Die with a smile",
		artist: "Lady Gaga",
		imageUrl: "/cover-images/15.jpg",
		audioUrl: "/songs/15.mp3",
		duration: 36, // 0:36
	},
	{
		title: "See you again",
		artist: "Wiz Khalifa",
		imageUrl: "/cover-images/16.jpg",
		audioUrl: "/songs/16.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Neon Tokyo",
		artist: "Future Pulse",
		imageUrl: "/cover-images/17.jpg",
		audioUrl: "/songs/17.mp3",
		duration: 39, // 0:39
	},
	{
		title: "Midnight Blues",
		artist: "Jazz Cats",
		imageUrl: "/cover-images/18.jpg",
		audioUrl: "/songs/18.mp3",
		duration: 29, // 0:29
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();
````

## File: package.json
````json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/index.js",
    "seed:songs": "node src/seeds/songs.js",
    "seed:albums": "node src/seeds/albums.js"
  },
  "keywords": [],
  "type": "module",
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@clerk/express": "^1.3.50",
    "cloudinary": "^2.5.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "express-fileupload": "^1.5.1",
    "mongoose": "^8.12.0",
    "node-cron": "^3.0.3",
    "socket.io": "^4.8.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.9"
  }
}
````

## File: src/controller/auth.controller.js
````javascript
import { User } from "../models/user.model.js";

export const authCallBack = async (req, res, next) => {
    try {
      const {id, firstName, lastName, imageUrl} = req.body;
      console.log("Received Data:", { id, firstName, lastName, imageUrl }); // ✅ Log incoming request
      const user = await User.findOne({clerkId: id});
  
      if(!user){
          await User.create({
              clerkId: id,
              name: `${firstName} ${lastName}`,
              image: imageUrl,
            });
            console.log("✅ New user created:", id);
      }else {
        console.log("⚠️ User already exists:", id);
      }
  
      res.status(200).json({succsess: true});
    } catch (error) {
      console.log("Error in auth callback route",error);
      next(error);
    }
  }
````

## File: src/routes/user.route.js
````javascript
import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router();
router.get("/",protectRoute, getAllUsers);
router.get("/messages/:userId",protectRoute, getMessages);
export default router
````

## File: src/controller/user.controller.js
````javascript
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export const getAllUsers = async(req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}});
        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
	try {
		const myId = req.auth.userId;
		const { userId } = req.params;

		const messages = await Message.find({
			$or: [
				{ senderId: userId, receiverId: myId },
				{ senderId: myId, receiverId: userId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error fetching messages:", error);
		next(error);
	}
};
````

## File: src/routes/admin.route.js
````javascript
import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong, } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute,requireAdmin);
router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);


router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);
export default router;
````

## File: src/controller/admin.controller.js
````javascript
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file) => {
    try {
        if (!file || !file.tempFilePath) {
            throw new Error('Invalid file object');
        }
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
            folder: "spotify-clone"
        });
        return result.secure_url;
    } catch (error) {
        console.error("Error in uploading file to cloudinary:", error);
        throw new Error('Failed to upload file to Cloudinary');
    }
};

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({ message: "Both audio and image files are required" });
        }

        const { title, artist, albumId, duration } = req.body;
        if (!title || !artist || !duration) {
            return res.status(400).json({ message: "Title, artist, and duration are required" });
        }

        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        // Upload files to Cloudinary
        const [audioUrl, imageUrl] = await Promise.all([
            uploadToCloudinary(audioFile),
            uploadToCloudinary(imageFile)
        ]);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration: parseInt(duration),
            albumId: albumId || null
        });

        await song.save();

        if (albumId) {
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            });
        }

        res.status(201).json(song);
    } catch (error) {
        console.error("Error in create song:", error);
        res.status(500).json({ 
            message: "Failed to create song",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const deleteSong = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const song = await Song.findById(id);
        if(!song.albumId){
            await Album.findByIdAndUpdate(song.albumId,{
                $pull: {songs: song._id}
            });
        }

        await Song.findByIdAndDelete(id);
        res.status(200).json({message: "Song deleted successfully"});
    } catch (error) {
        console.log("Error in delete song",error)
        next(error);
    }
};

export const createAlbum = async(req, res, next) =>{
    try {
        const {title, artist, releaseYear} = req.body;
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);
        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
        });

        await album.save();
        res.status(201).json(album);
    } catch (error) {
        console.error("Error in create album:", error);
        res.status(500).json({ 
            message: "Failed to create album",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
export const deleteAlbum = async(req, res, next) =>{
    try {
        const {id} = req.params;
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log("Error in delete album",error)
        next(error);
    }
};
export const checkAdmin = async(req,res,next) =>{
    res.status(200).json({admin : true});
}
````

## File: src/routes/auth.route.js
````javascript
import express from "express";
//import { User } from "../models/user.model";
import { authCallBack } from "../controller/auth.controller.js";

const router = express.Router();
router.post("/callback", authCallBack);

export default router;
````

## File: src/index.js
````javascript
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
import cron from "node-cron";
import fs from "fs";

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

//cron job to delete temporary files
// cron jobs
const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statusRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}


//error handler
app.use((err, req, res, next) => {
  res.status(500).json({message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message})
})

httpServer.listen(port, () => {
  console.log("Server is running on port "+port);
  connectDB();
});
````
