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

const allNotes = async(req,res)=>{
    try{
        const userId = req.user._id
          const allNotes = await notesModel.find({user:userId})
          res.status(200).json(allNotes)
    }
    catch(err){
        res.status(500).json({message:"Cannot fetch all notes"+ err.message})
    }
}

const updateNote = async(req,res)=>{
    try{ 
        const userId = req.user._id;
          const data = req.body;
          const noteId = req.params.id;
          
          const noteUpdate = await notesModel.findByIdAndUpdate({userId,noteId},data , {new:true}); 
          res.status(200).json({message:"Note Updated Successfully"});
    }
    catch(err){
        res.status(500).json({message:"Cannot update note" + err.message});
    }
}

const deleteNote = async(req,res)=>{
    try{
         const noteId = req.params.id;
         const noteDelete = await notesModel.findOneAndDelete({_id:noteId,user:req.user._id});
         res.status(200).json({message:"Note deleted successfully"});
    }
    catch(err){
        res.status(500).json({message : "Delete Failed" + err.message});
    }
}

module.exports = { createNote, deleteNote, allNotes, updateNote };

