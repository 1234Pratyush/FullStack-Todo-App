const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userModel = require('../model/auth');

app.use(express.json());
require('dotenv').config();
app.use(cookieParser());

const authSignup = async(req,res)=>{
    try{
         const {email,name,password} = req.body;
         const user = await userModel.findOne({email})
         if(user){
            res.send("User Already Exist,Please Sign In")
         }
         const hashPassword = await bcrypt.hash(password,10)
         const signup = await userModel.create({
            email,name,password:hashPassword
         })
          res.send("Signup Sucessfull");
    }
    catch(err){
        res.send("ERROR:" + err.message)
    }
}

const authLogin = async(req,res)=>{
    try{
           const {email , password} = req.body
          const user = await userModel.findOne({email})
          if(!user){
            res.send("Invalid Crediantials,Please try again");
          }
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                res.send("Invalid Crediantials ,Please try again")
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.cookie('token',token,{
                httpOnly:true,
            })

            return res.send("Login Successfull");

    }
    catch(err){
        res.send('ERROR:' + err.message);
    }
} 


module.exports={authSignup,authLogin}