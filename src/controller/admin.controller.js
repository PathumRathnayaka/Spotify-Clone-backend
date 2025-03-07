import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const uploadToCloudinary = async (file) =>{
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (error) {
        console.log("Error in uploading file to cloudinary",error)
        throw error;
    }
};

export const createSong = async (req, res, next) =>{
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "No file uploaded"})
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        await song.save();

        if(albumId){
        await Album.findByIdAndUpdate(albumId,{
            $push: {songs: song._id}
        })
        }
        res.status(201).json(song);

    } catch (error) {
        console.log("Error in create song",error)
        res.status(500).json({message: "Internal server error",error})
        next(error)
    }
};