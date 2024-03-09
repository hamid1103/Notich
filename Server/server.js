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
import fs from "fs";
import https from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
const port = process.env.PORT | 3000

let server;
if(process.env.privatekey){
    const privateKey = fs.readFileSync(process.env.privatekey,'utf8')
    const certificate = fs.readFileSync(process.env.certificate, "utf8")
    const chain = fs.readFileSync(process.env.chain, "utf8")
    console.log("got files")
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: chain
    };
    var httpServer = http.createServer(app)
    server = https.createServer(credentials, app)

    httpServer.listen(80, ()=>{
        console.log("HTTP Server running with expressjs... Connecting to DB")
    })
    server.listen(443, ()=>{
        console.log("HTTPS Server running with expressjs... Connecting to DB")
    })

}else {
    server = http.createServer(app)
    server.listen(port, ()=>{
        console.log("HTTP Server running with expressjs... Connecting to DB")
    })
}

runSIO(server)
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