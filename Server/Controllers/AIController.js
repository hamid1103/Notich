import {SessionList} from "./Sessions.js";
import 'dotenv/config'
import {response} from "express";
import {ChatOpenAI} from "@langchain/openai";

export const generateChat = async (req, res) =>{
    let NoteID = req.params.id
    let {userMSG} = req.body
    let ses = SessionList[NoteID]
    let answer = await ses.Bot.PromptChat(userMSG, NoteID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Content found in key: content
    res.json({sender: ses.Bot.botName, content: answer.content})
}

export const genIdeas = async (req, res) =>{
    const BreakingNewsResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=nl&apiKey=${process.env.newsKey}&pageSize=13`,
        {
            method: "GET",
            mode: "cors",
            headers: {'Content-Type': 'application/json'},
        })
        .then((response)=>{
            return response.json()
        })

    let model = await new ChatOpenAI({
        azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
        azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
        azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
        azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
        temperature: 0.4,
    })

    let titles = []
    BreakingNewsResponse.articles.forEach((aricle)=>{
        titles.push(aricle.title)
    })
    const answer= await model.invoke(`Give writing ideas based on these news articles: ${titles}`)
    res.status(200).json({
        answer: answer.content,
        articles: BreakingNewsResponse.articles
    })

}
