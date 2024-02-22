import {NotichBot} from "../AI/OpenAIConnection.js";
import Note from "../Models/Note.js";
import SavedChatNote from "../Models/SavedChatNote.js";

/**
 * A session that contains a socket.io room, note data and AI instance
 */
export class Session {
    //List of Users allowed in this session.
    Users ={};
    //SocketIO Room ID. Needs to be the same as Note document object ID.
    RoomID;
    //AI Bot instance;
    Bot;
    //Bot instance created status
    botLoaded = false;
    //Note Document Data
    DocumentData;

    async initSession(NoteID){
        this.RoomID = NoteID
        let documentNote = await Note.findById(NoteID);
        this.DocumentData = documentNote;
        let ChatHistoryNote = await SavedChatNote.findOne({
            Note: NoteID
        }).populate('SavedChat')
        if(ChatHistoryNote){
            this.Bot = new NotichBot(ChatHistoryNote.SavedChat.Chat, ChatHistoryNote.SavedChat.temperature);
        }else {
            this.Bot = new NotichBot();
        }
        await this.Bot.InitBot();
        this.botLoaded = this.Bot._botStarted
    }

    AddUser(usr){
        this.Users[usr._id] = {
            username: usr.username,
            role: usr.role,
            email: usr.email
        }
    }

}

export let SessionList =
    {

    }

export const StartSession = async (req)=>{
    SessionList[req.params.id] = new Session()
    await SessionList[req.params.id].initSession(req.params.id)
    SessionList[req.params.id].AddUser(req.user);
    return SessionList[req.params.id]
}

export const ConnectToSession = async (req) =>{
    SessionList[req.params.id].AddUser(req.user);
    return SessionList[req.params.id]
}

export const CheckForExistingSession = async (req, res) =>{
    let session;
    if(SessionList[req.params.id]){
        ConnectToSession(req).then((ses)=>{
            res.json(ses)
        })
    }else {
        StartSession(req).then((ses)=>{
            res.json(ses)
        })
    }
}



export const CloseSession = async (req, res) =>{

}
