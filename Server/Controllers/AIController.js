import {SessionList} from "./Sessions.js";

export const generateChat = async (req, res) =>{
    let NoteID = req.params.id
    let {userMSG} = req.body
    let ses = SessionList[NoteID]
    let answer = await ses.Bot.PromptChat(userMSG, NoteID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Content found in key: content
    res.json({sender: ses.Bot.botName, content: answer.content})
}