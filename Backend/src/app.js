const express = require('express');
const app = express();
const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');
const noteRoute = require('./routes/noteRoute');
const cors = require('cors');
const cookieParser= require('cookie-parser');

require("dotenv").config();
app.use(express.json());
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(cookieParser());


app.use('/api/users',authRoute);
app.use('/api/todo',noteRoute);


const startServer = async() =>{
    try{
         await connectDB()
         app.listen(process.env.PORT,()=>{
             console.log("Server is running on port", process.env.PORT);
         })
    }
    catch(err){
        console.log("ERROR:" + err.message);
    }
}

startServer();