import mongoose from "mongoose";

const savedChatSchema = new mongoose.Schema(
    {
        Chat: [[String]],
        Temperature: {
            type: Number,
            default: 0.3
        }
    }, { timestamps: true }
)

const SavedChat = mongoose.model('SavedChat', savedChatSchema)
export default SavedChat;