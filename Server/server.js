import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"
import express from 'express';

const app = express()
const port = process.env.PORT | 3000

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