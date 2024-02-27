import express from "express";
import {authenticate, noteAuthorize} from "../middlewares/auth.js";
import {generateChat} from "../Controllers/AIController.js";
const aiRouter = express.Router();

aiRouter.post("/:id/chat", authenticate, noteAuthorize, generateChat)
//aiRouter.post("/:id/write", authenticate, noteAuthorize)
//aiRouter.post("/:id/tip", authenticate, noteAuthorize)
aiRouter.options("/:id/chat", (req,res)=>{
    res.header('Allow', 'POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
})

export {aiRouter}