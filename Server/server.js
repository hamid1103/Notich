import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"

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