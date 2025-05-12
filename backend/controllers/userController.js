import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import createTokenAndSaveCookie from "../jwt/authToken.js";


export const register = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "User photo is required." });
  }
  const { photo } = req.files;
  const allowedFormats = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedFormats.includes(photo.mimetype)) {
    return res.status(400).json({
      message: "Invalid photo format. Only jpeg and png are allowed.",
    });
  }

  const { role, email, password, name, phone, education } = req.body;
  if (!email || !role || !password || !name || !phone || !education || !photo) {
    return res.status(400).json({ message: "Please fill required data" });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exist with this email." });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log(cloudinaryResponse.error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    phone,
    education,
    role,
    photo: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });
  await newUser.save();
  if (newUser) {
    const token = await createTokenAndSaveCookie(newUser._id, res);
    // console.log(token)
    res
      .status(201)
      .json({ message: "User registered successfully", newUser, token: token });
  }
};

export const loginController = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Please fill required fields." });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing." });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!user || !isMatch){
      return res.status(400).json({message:"Invalid email or password."})
    }
    if(user.role !==role){
      return res.status(400).json({message:`Given role ${role} not found.`})
    }
    const token = await createTokenAndSaveCookie(user._id,res);
    res.status(200).json({message:"User loggedIn successfully.", user:{
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role
    },token : token})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
