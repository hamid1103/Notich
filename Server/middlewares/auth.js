import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import NoteOwner from "../Models/NoteOwner.js";

//Check for note authorization. Call AFTER authentication.
const noteAuthorize = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //At this point, req.user should exist
    try {
        //Check access to note by checking if there is a NoteOwner Document with correct credentials
        let nod = await NoteOwner.findOne({Note: req.params.id, owner: req.user._id})
        if (nod) {
            next()
        }
    } catch (error) {
        return res.status(403).json({message: "You do not have access to this note"})
    }
}

const authenticate = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Authentication required'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(`Invalid Token ${token}`)
        res.status(401).json({
            message: 'Invalid token',
            error
        });
    }
};

export {authenticate, noteAuthorize}