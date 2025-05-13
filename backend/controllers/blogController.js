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

  const {title,category,about } = req.body;
  try {
    if (
      !title ||
      !category ||
      !about 
    ) {
      return res.status(400).json({ message: "Title, category & about are required." });
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
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);
   
      
      res
        .status(201)
        .json({
          message: "Blog created successfully",
          blog,
        });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error." });
  }
};