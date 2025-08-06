const express = require('express');
const authRoute = express.Router();

const {authLogin,authSignup} = require('../controllers/authController'); 

authRoute.post('/signup',authSignup);
authRoute.post('/signin',authLogin);

module.exports = authRoute;