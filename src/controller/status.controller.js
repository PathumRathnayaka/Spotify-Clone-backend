import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const getStatus = async (req, res, next) => {
    try {
      const [totalSong, totalAlbums, totalUsers, uniqueArtist] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
  
        Song.aggregate([
          {
            $unionwith:{
              coll: "albums",
              pipeline: []
            }
          },
          {
            $group: {
              _id: "$artist",
            }
          },
          {
            $count: "count"
          }
        ])
      ]);
  
      res.status(200).json({
        totalSong,
        totalAlbum,
        totalUser,
        uniqueArtist : uniqueArtist[0]?.count || 0,
      })
    } catch (error) {
      next(error)
    }
  }