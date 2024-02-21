import Note from "../Models/Note.js";
import NoteOwner from "../Models/NoteOwner.js";
import User from "../Models/User.js";

export const GetNotes = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let notes = await NoteOwner.find({owner: req.user._id}).populate('Note', 'name')
    res.json(notes)
}

export const GetNote = async (req, res, next)=>{
    let note = await Note.findById(req.params.id)
    if(!next){
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
        res.json({note})
    }else {
        req.note = note
        next()
    }
}

export const InviteToNote = async (req,res)=>{
    let {UID, email, username} = req.body;
    if(!UID){
        let user = await User.findOne({email,username})
        UID = user._id
    }
    let newNoteOwner = new NoteOwner({
        owner: UID,
        Note: req.params.id
    })
    await newNoteOwner.save()
    res.json({newNoteOwner})
}

export const NewNote = async (req, res) => {
    let {name} = req.body
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    let newNote = new Note({name: name})
    await newNote.save()

    let newNoteOwner = new NoteOwner({
        owner: req.user._id,
        Note: newNote._id
    })

    await newNoteOwner.save()

    res.json({newNote})
}

export const UpdateNote = async (req, res) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}

export const DeleteNote = async (req, res) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
}
