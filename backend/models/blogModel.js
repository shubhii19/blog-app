import mongoose, { mongo } from "mongoose";
const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogImage: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  category: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
    minlength:[200,"Should contain atleat 200 characters!!"]
  },
  adminName:{
    type:String,
 
  },
  adminPhoto:{
    type:String,
   
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
    
  },
});

export const Blog = mongoose.model("Blog", BlogSchema);
