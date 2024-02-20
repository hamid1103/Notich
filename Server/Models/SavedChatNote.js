import mongoose from "mongoose";

const SavedChatNoteSchema = new mongoose.Schema({
    SavedChat: {type: mongoose.Types.ObjectId, ref:"SavedChat"},
    Note: {type: mongoose.Types.ObjectId, ref:"Note"}
})
const SavedChatNote = mongoose.model("SavedChatNote", SavedChatNoteSchema)
export default SavedChatNote