const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title : {
        type:String,
        required:true,
    },
    content : {
        type:String,
        required:true,
    },
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,  
    },

},{
    timestamps:true,
})

const notesModel = mongoose.model("Note",noteSchema)
module.exports = notesModel;
