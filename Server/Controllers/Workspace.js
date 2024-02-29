//Server side websocket code.
import {SessionList} from "./Sessions.js";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Note from "../Models/Note.js";

export const runSIO = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })

    io.on("connection", (socket) => {
        let CurRoomID;
        let CurRoom;
        let Selected;
        console.log("Connected")

        //Session Connection Management
        socket.on("JoinRoom", async (RoomID, token) => {
            CurRoomID = RoomID
            CurRoom = SessionList[CurRoomID]
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findById(decodedToken.userId);
            socket.user = user
            socket.join(RoomID)
            let userlist = SessionList[RoomID].Users
            io.to(RoomID).emit("UserJoined", userlist)
        })

        socket.on("Leave", () => {
            console.log(socket.user.username + " left")
            if (CurRoom){
                delete CurRoom.Users[socket.user._id]
            }else {
                console.log("No CurRoom")
            }
            io.to(CurRoomID).emit("UserLeft", socket.user._id)
            socket.leave(CurRoomID)
            CurRoom = null
        })

        socket.on("disconnect", () => {
            if (socket.user) {
                console.log(socket.user.username + " left")
                if (CurRoom){
                    delete CurRoom.Users[socket.user._id]
                }else {
                    console.log("No CurRoom")
                }
                io.to(CurRoomID).emit("UserLeft", socket.user._id)
            } else io.to(CurRoomID).emit("UserLeft", "IDLost")
            socket.leave(CurRoomID)
            CurRoom = null
        })

        //Editor Socket Functions
        socket.on("SelectBlock", (bindex) => {
            Selected = true
            socket.broadcast.emit("DisableBlock", bindex)
        })

        socket.on("CheckSelected", (CBI)=> {
            if (Selected === CBI){
                socket.emit("EnableBlock", CBI)
            } else{
                socket.emit("DisableBlock", CBI)
            }
        })

        socket.on("DeselectBlock", (bindex) => {
            Selected = null
            socket.broadcast.emit("EnableBlock", bindex)
        })

        socket.on("SaveDoc", async (data)=>{
            CurRoom.DocumentData.content = data.blocks
            await Note.findByIdAndUpdate(CurRoomID, { content: data.blocks}).then(()=>{
                //Gen vectors?
                console.log("SAVED ")
                socket.emit("DataSaved")
            })
            await CurRoom.Bot.SaveChatHistory(CurRoomID);
        })

    })
}
