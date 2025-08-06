    const jwt = require('jsonwebtoken');
    const userModel = require('../model/auth')

    const isAuthenticated = async(req,res,next) =>{
        try{
            const token = req.cookies.token;
            if(!token){
                return res.status(401).json({message : "Unauthorized No token provided"})
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await userModel.findById(decoded._id);
            if (!user) {  
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            req.user = user
            next();
        }
        catch(err){
            return res.status(201).json({message:"Unauthorized: Token error"});
        }
    }

    module.exports = isAuthenticated;