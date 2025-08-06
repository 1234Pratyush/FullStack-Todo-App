const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type :String,
        required:true,
        trim:true,
    },
    
    email : {
        type :String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
    },
    
    password : {
        type :String,
        required:true,
        minlength:6
    },
    
  
    
},{
    timestamps:true
})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel;