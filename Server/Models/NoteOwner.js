import mongoose from "mongoose";

const NoteOwnerSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref:"User"},
    Note: {type: mongoose.Types.ObjectId, ref:"Note"}
})

const NoteOwner = mongoose.model("NoteOwner", NoteOwnerSchema)
export default NoteOwner