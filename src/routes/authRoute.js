const express = require('express');
const authRoute = express.Router();

const {authLogin,authSignup} = require('../controllers/authController'); 

authRoute.post('/signup',authSignup);
authRoute.post('/login',authLogin);

module.exports = authRoute;