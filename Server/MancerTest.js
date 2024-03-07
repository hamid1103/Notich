import 'dotenv/config'
import { OpenAI } from "@langchain/openai";

new OpenAI({
    configuration: {
        apiKey: process.env.mancerKey,
        defaultHeaders:{
          "X-API-KEY": "mcr-0Rrnz3ahKwl9uC3d5I",
        },
        baseURL: "https://neuro.mancer.tech/oai/v1/chat/completions",
    },
    modelName: "noromaid",
})
let loadString = ""
let stringAnswer = ""

const stream = await model.stream("Write an introduction for a children's book about a group of warriors.")
for await (const chunk of stream) {
    loadString += "-"
    console.log(loadString)
    stringAnswer += chunk.content;
}
//Seems this gets called after the stream. Good
console.log(stringAnswer)