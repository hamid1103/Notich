import express from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import noteRouter from "./notes.js";

const apiRouter = express.Router();

apiRouter.use('/user', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/notes', noteRouter)

export default apiRouter