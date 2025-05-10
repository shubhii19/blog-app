import mongoose, { mongo } from "mongoose";
import validator from "validator"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail, "Enter a valid email"]
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    // photo:{
    //     type:String,
    //     required:true
    // },
    education:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"]
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:4
    },
    createdAt:{
        type:Date,
        default:Date.now()

    }
})

export const User = mongoose.model("User",userSchema)