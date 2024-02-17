import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        content: [String]
    }, { timestamps: true }
)

const Note = mongoose.model('Note', noteSchema)
export default Note;
