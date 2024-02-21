import * as http from "http";
import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"
import apiRouter from "./Routers/api.js";
import {connectDB} from "./db.js";

import express from 'express';
import {Server} from "socket.io";
import {runSIO} from "./Controllers/Workspace.js";
const app = express()
const server = http.createServer(app)
runSIO(server)

const port = process.env.PORT | 3000

server.listen(port, ()=>{
    console.log("HTTP Server running with expressjs... Connecting to DB")
})

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter)


//Send compiled svelte files
//app.get('/', )


/**
 * Await answer
 * const joke = await model.invoke("Tell me a Javascript joke!")
 *
 *
 *
 *
 * */
