import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const createTokenAndSaveCookie = async (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
    })
    await User.findByIdAndUpdate(userId,{token});
    return token;
}


export default createTokenAndSaveCookie;