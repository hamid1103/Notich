import {NotichBot} from "../AI/OpenAIConnection.js";
import Note from "../Models/Note.js";

/**
 * A session that contains a socket.io room, note data and AI instance
 */
export class Session {
    //SocketIO Room ID. Needs to be the same as Note document object ID.
    RoomID;
    //Document Name
    Name;
    //AI Bot instance;
    Bot;
    //Bot instance created status
    botLoaded;
    //Note Document Data
    DocumentData;

    /**
     *
     * @param NoteID
     * @param createdCallback
     */
    constructor(NoteID, createdCallback) {
        this.RoomID = NoteID
        this.initSession()
    }

    async initSession(){
        let documentNote = await Note.findById(this.RoomID);
        this.Name = documentNote.name;
        this.DocumentData = documentNote.content;

    }

    initBot = async ()=>{
        //Fetch
    }

}

export let SessionList =
    {

    }

export const StartSession = async (req, res)=>{

}

export const CheckForExistingSession = async (req, res) =>{

}

export const CloseSession = async (req, res) =>{

}
export const ConnectToSession = async (req, res) =>{

}