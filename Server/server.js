import * as http from "http";
import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"
import express from 'express';
import {Server} from "socket.io";
import bodyParser from "body-parser";

import apiRouter from "./Routers/api.js";
import {connectDB} from "./db.js";
import {runSIO} from "./Controllers/Workspace.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const server = http.createServer(app)
runSIO(server)

const port = process.env.PORT | 3000

server.listen(port, ()=>{
    console.log("HTTP Server running with expressjs... Connecting to DB")
})

connectDB()

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*let indexpath = path.join(__dirname+'/dist')
app.use(express.static(__dirname+ '/dist'))
let assetsPath = path.join(__dirname, '/dist/assets');
app.use(express.static(assetsPath));*/

app.use('/api', apiRouter)