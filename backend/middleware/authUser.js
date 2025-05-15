import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// authentication

export const isAuthenticated = async (req,res,next) =>{

    try {
        const token = req.cookies.jwt;
        console.log("middleware token:  "+token);
        if(!token){
            return res.status(401).json({error:"User not authenticated."})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({error:"User not found."})
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error occuring in authentication. "+error)
        return res.status(401).json({error:"User is not authenticated."})
    }
}

// authorization

export const isAdmin = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:`User with given role ${req.user.role} not allowed`});

        }
        next();
    }
}