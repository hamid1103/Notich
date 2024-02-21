import express from "express";
import {authenticate, noteAuthorize} from "../middlewares/auth.js";
import {GetNote} from "../Controllers/Notes.js";
import {CheckForExistingSession} from "../Controllers/Sessions.js";

const sessionRouter = express.Router();

sessionRouter.get('/:id', authenticate, noteAuthorize, CheckForExistingSession)
sessionRouter.options('/:id', (req, res)=>{
    res.header('Allow', 'GET');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
})
export default sessionRouter