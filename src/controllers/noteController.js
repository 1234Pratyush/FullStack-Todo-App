const express = require('express');
const app = express();
const notesModel = require('../model/notes');



const createNote = async(req,res)=>{
    try{
           const { title,content} = req.body;
           if(!title || !content){
            return res.status(400).json({message:"All fields required"});
           }

           const note = await notesModel.create({
            title,content,
            user:req.user._id
           });
           res.status(201).json(note);
    }
    catch(err){
        res.send("ERROR:" + err.message);
    }
}

const deleteNote = async(req,res)=>{
    try{
         const noteId = req.params.id;
         const noteDelete = await notesModel.findOneAndDelete({_id:noteId,user:req.user._id});
         res.status(200).json({message:"Note deleted successfully"});
    }
    catch(err){
        res.status(500).json({message : "Delete Failed"});
    }
}

module.exports = {createNote,deleteNote}

