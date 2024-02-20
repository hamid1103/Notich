import mongoose from "mongoose";

const savedChatSchema = new mongoose.Schema(
    {
        Chat: [[String]]
    }, { timestamps: true }
)

const SavedChat = mongoose.model('SavedChat', savedChatSchema)
export default SavedChat;