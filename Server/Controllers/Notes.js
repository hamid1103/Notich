import mongoose from "mongoose";
import Note from "../Models/Note.js";

export const GetNotes = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let notes = await Note.find({}, 'name')
    res.json({notes})
}

export const GetNote = async (req, res)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let note = await Note.findById(req.params.id)
    res.json({note})
}

export const NewNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}

export const UpdateNote = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}

export const DeleteNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}
