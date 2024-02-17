import express from "express";
import {DeleteNote, GetNote, GetNotes, NewNote, UpdateNote} from "../Controllers/Notes.js";
import {authenticate} from "../middlewares/auth.js";
const noteRouter = express.Router();

noteRouter.post('/', authenticate, NewNote)
noteRouter.get('/', authenticate, GetNotes)
noteRouter.get('/:id', authenticate, GetNote)
noteRouter.patch('/:id', authenticate, UpdateNote)
noteRouter.delete('/:id', authenticate, DeleteNote)

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