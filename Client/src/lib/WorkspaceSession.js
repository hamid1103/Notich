//Client Side Code. Gonna put whatever I can in this seperate class to make sure the svelte File doesn't become unreadable as fuck.
import { io } from "socket.io-client"
import {lurl} from "./url.js";
import {navigate} from "svelte-routing";

export let Socket;
export const CSIO = (sd)=>{
    let socket = io(lurl);
    Socket = socket
    socket.on("connect", ()=>{
        console.log("Socket connected")
    })

    socket.on("UserJoined",(usrList)=>{
        sd.Users = usrList
    })

    socket.on("UserLeft",(usrid)=>{
        delete sd.Users[usrid]
    })

    socket.on("disconnect", ()=>{
        navigate("/app");
        location.reload()
    })

}