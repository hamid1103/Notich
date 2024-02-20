import express from "express";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import noteRouter from "./notes.js";
import sessionRouter from "./session.js";

const apiRouter = express.Router();

apiRouter.use('/user', userRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/notes', noteRouter)

export default apiRouter