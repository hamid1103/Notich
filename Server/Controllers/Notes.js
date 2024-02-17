import mongoose from "mongoose";
import Note from "../Models/Note.js";
import NoteOwner from "../Models/NoteOwner.js";

export const GetNotes = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let notes = await NoteOwner.find({owner: req.user._id}).populate('Note', 'name')
    res.json(notes)
}

export const GetNote = async (req, res)=>{
    //Check access to note by checking if there is a NoteOwner Document with correct credentials
    let nod = await NoteOwner.findOne({Note: req.params.id, owner: req.user._id})
    if(!nod){
        return res.status(401).json({message:"You do not have access to this note"})
    }
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let note = await Note.findById(req.params.id)
    res.json({note})
}

export const NewNote = async (req, res) => {
    let {name} = req.body
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let newNote = new Note({name: name})
    await newNote.save()

    let newNoteOwner = new NoteOwner({
        owner: req.user._id,
        Note: newNote._id
    })

    await newNoteOwner.save()

    res.json({newNote})
}

export const UpdateNote = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}

export const DeleteNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}
