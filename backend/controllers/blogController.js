import mongoose from "mongoose";
import { Blog } from "../models/blogModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createBlogController = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "Blog image is required." });
  }
  const { blogImage } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedFormats.includes(blogImage.mimetype)) {
    return res.status(400).json({
      message: "Invalid photo format. Only jpeg and png are allowed.",
    });
  }

  const { title, category, about } = req.body;
  try {
    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "Title, category & about are required." });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy : req.user._id,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    console.log("yeh rha blog: ",blogData);
    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};

export const deleteBlogController = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully." });
};

export const getAllBlogsController = async (req, res) => {
  const allBlogs = await Blog.find();
  res.status(200).json(allBlogs);
};

export const getSingleBlogController = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid blog id." });
  }
  const blog = await Blog.findById(id);
  if (!blog) {
    return res.status(404).json({ message: "Blog not found." });
  }
  res.status(200).json(blog);
};



export const getMyBlogsController = async (req, res) => {
  try {
    const createdBy = req.user.name;  // ⬅️ assuming req.user.name has the admin's name
    // console.log("Created By Name:", createdBy);

    const myBlogs = await Blog.find({ adminName:createdBy });  // ⬅️ query by name
    // console.log("yeh tumhare user ka blog: ",myBlogs)
    res.status(200).json(myBlogs);
  } catch (error) {
    console.error("Error in getMyBlogsController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const updateBlogControlller = async (req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:"Invalid blog id."});
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
  if(!updatedBlog){
    return res.status(404).json({message:"Blog not found."})
  }
  res.status(404).json(updatedBlog);
}