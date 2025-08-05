const express = require("express");
const noteRoute = express.Router();

const { createNote, deleteNote } = require("../controllers/noteController");
const isAuthenticated = require("../middlewares/authMiddleware");

noteRoute.post('/create',isAuthenticated,createNote);
noteRoute.delete('/delete/:id',isAuthenticated,deleteNote);

module.exports = noteRoute;
