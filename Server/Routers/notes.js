import express from "express";
import {DeleteNote, GetNote, GetNotes, NewNote, UpdateNote} from "../Controllers/Notes.js";
const noteRouter = express.Router();

noteRouter.post('/', NewNote)
noteRouter.get('/', GetNotes)
noteRouter.get('/:id', GetNote)
noteRouter.patch('/:id',UpdateNote)
noteRouter.delete('/:id', DeleteNote)

noteRouter.options('/',(req, res)=>{
    res.header('Allow', 'POST, GET');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
})
noteRouter.options('/:id', (req, res)=>{
    res.header('Allow', 'PATCH, DELETE, GET');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, DELETE, GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
})

export default noteRouter