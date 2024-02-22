import {ChatOpenAI} from "@langchain/openai";
import 'dotenv/config'
import Sentiment from "sentiment"
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages"

/**
 * Class to initiate an AI instance. There should be one per active session.
 */
export class NotichBot {
    model;
    AISettings;
    _context;
    //Current Chat History
    ChatHistory;
    //Keeps track of wether the AI is in use right now. Allow only one request per instance at a time.
    AIStatus;
    //Current Stream contents put in a string.
    StreamString;

    _botStarted = false;
    /**
     *
     * @param SavedChatHistory found in SavedChat documents
     * @param SavedAISettings found in Note documents
     */
    constructor(SavedChatHistory = chatBotCharacterContexts.Nick.ChatStart, SavedAISettings = {
        temperature: 0.3
    }) {
        //If SavedChatHistory doesn't exist, start with default character Nick.
        this.ChatHistory = SavedChatHistory
        this.AISettings = SavedAISettings
    }

    InitBot = async () =>{
        this._botStarted = true
        this.model = await new ChatOpenAI({
            azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
            azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
            azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
            azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
            temperature: this.AISettings.temperature,
        })
        return true
    }

    RemoveChatEntry(Index){

    }

    /**
     * Saves chat history and settings
     * @constructor
     */
    SaveChatHistory(){

    }

    PromptAdvice(Document){
        //Get Chat history
        // Put in temporary Chat history
        // Get DocumentPart
        // Add prompt: Give some writing advice on this document: " `${Document Part}` "
        // Save stream content to this.StreamString.
        // Send to client for Advice Method
    }

    PromptChat(ChatPrompt){
        //Get prompt
        //Add prompt to Chat History
        //Send Generate Response call
        // Save stream content to this.StreamString.
        //
    }

    PromptWriting(DocumentPart){
        //Get Chat history
        // Put in temporary Chat history
        // Get DocumentPart
        // Add prompt: Finish writing this part of the document: " `${Document Part}` "
        // Return DocumentPart Stream.
    }

    /**
     * Make sure to warn the user that swapping the character will clear the chat history and that the chat history will be unrecoverable.
     * @param botName
     * @constructor
     */
    SwapCharacter(botName){
        //Clear Chat History
        //Select BotCharacter
        //Push Character's ChatStart to ChatHistory
        //Save ChatHistory
    }

}

export const chatBotCharacterContexts = {
    Nick: {
        Language: "eng",
        ChatStart: [
            new SystemMessage("Your name is Nick. You are a helpful male teacher in a private chat. You help the user with writing their document. You give the user short writing tips, and can give links to topics and websites related to the document." +
                " You can also complete the user's written text. Always try to end every response with a masculine emoji unless you are writing content for the document. Your responses are always in english."),
            new AIMessage("Hey there, what are you writing about?")
        ]
    },
    Ravella: {
        Language: "eng",
        ChatStart: [
            new SystemMessage("Your name is Ravella. You are a helpful female teacher in a private chat. You help the user with writing their document. You give the user short writing tips, and can give links to topics and websites related to the document." +
                " You can also complete the user's written text. Always try to end every response with a feminine emoji unless you are writing content for the document. Your responses are always in english."),
            new AIMessage("Hey there, what are you writing about?")
        ]
    },
    Sander: {
        Language: "nl",
        ChatStart: [
            new SystemMessage("Jouw naam is Sander. Je bent een behulpzame leraar in een prive chat. Je helpt de gebruiker met het schrijven van hun document. Je geeft de gebruiker korte schrijftips en kunt links geven naar onderwerpen en websites die met het onderwerp te maken hebben."
            + "Je kunt ook de geschreven tekst van de gebruiker aanvullen. Probeer altijd elk antwoord te beëindigen met een mannelijke emoji, tenzij je inhoud voor het document schrijft. Jouw chatreacties, schrijfcorrecties en schrijfadviezen zijn altijd in het Nederlands."),
            new AIMessage("Hallo! Waar ben je over aan het schrijven?")
        ]
    },
    Nicky: {
        Language: "nl",
        ChatStart: [
            new SystemMessage("Jouw naam is Nicky. Je bent een behulpzame lerares in een prive chat. Je helpt de gebruiker met het schrijven van hun document. Je geeft de gebruiker korte schrijftips en kunt links geven naar onderwerpen en websites die met het onderwerp te maken hebben."
                + "Je kunt ook de geschreven tekst van de gebruiker aanvullen. Probeer altijd elk antwoord te beëindigen met een vrouwelijke emoji, tenzij je inhoud voor het document schrijft. Jouw chatreacties, schrijfcorrecties en schrijfadviezen zijn altijd in het Nederlands."),
            new AIMessage("Hey! Waar ben je over aan het schrijven?")
        ]
    }
}