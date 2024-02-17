import express from "express";
import {authenticate} from "../middlewares/auth.js";
import User from "../Models/User.js";

const userRouter = express.Router();

userRouter.get('/', authenticate, (req, res) => {
    return res.json(req.user)
})

userRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({
            message: "No user found with id: " + id
        })
    }

    res.json(user)
})

export default userRouter;