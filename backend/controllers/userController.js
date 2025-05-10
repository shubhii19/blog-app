import { User } from "../models/userModel.js";

export const register =async (req,res)=>{
 const {role,email,password,name,phone,education} = req.body;
 if(!email || !role || !password ||!name || !phone || !education){
    return res.status(400).json({message:"Please fill required data"})
 }
 const user = await User.findOne({email});
 if(user){
    return res.status(400).json({message:"User already exist with this email."});
 }
 const newUser = new User({email,name,password,phone,education,role});
 await newUser.save();
 if(newUser){
    res.status(201).json({message:"User registered successfully"})
 }
}