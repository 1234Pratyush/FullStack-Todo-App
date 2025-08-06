const express = require("express");
const noteRoute = express.Router();

const {
  createNote,
  deleteNote,
  allNotes,
  updateNote,
} = require("../controllers/noteController");
const isAuthenticated = require("../middlewares/authMiddleware");

noteRoute.post('/create',isAuthenticated,createNote);
noteRoute.delete('/delete/:id',isAuthenticated,deleteNote);
noteRoute.get('/allNotes',isAuthenticated,allNotes);
noteRoute.put('/updateNote/:id',isAuthenticated,updateNote);

module.exports = noteRoute;
