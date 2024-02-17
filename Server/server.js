import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"
import express from 'express';
import apiRouter from "./Routers/api.js";
import {connectDB} from "./db.js";


const app = express()
const port = process.env.PORT | 3000

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter)

app.listen(port, ()=>{
    console.log("Listening on port " + port)
})

const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

/**
 * Await answer
 * const joke = await model.invoke("Tell me a Javascript joke!")
 *
 *
 *
 *
 * */

console.log(process.env.AZURE_OPENAI_API_KEY)