import express from "express";
import {register,login } from "../Controllers/Authorization.js";

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.options("/register", (req, res) => {
    res.header('Allow', 'POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

authRouter.post('/login', login)

authRouter.options("/login", (req, res) => {
    res.header('Allow', 'POST');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export default authRouter