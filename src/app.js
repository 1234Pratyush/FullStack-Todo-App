const express = require('express');
const app = express();
const connectDB = require('./config/database');
const authRoute = require('./routes/authRoute');
const noteRoute = require('./routes/noteRoute');

require("dotenv").config();
app.use(express.json());

app.use('/api/users',authRoute);
app.use('/api/note',noteRoute);


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