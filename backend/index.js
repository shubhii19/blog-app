import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGOURI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));
// console.log(MONGOURI)

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// DB connection

try {
  mongoose.connect(MONGOURI);
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}
// defining routes
app.use("/api/users", userRoutes);
app.use("/api/blogs",blogRoutes);

// cloudinary Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,    
        api_key: process.env. CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
    });

     


app.listen(PORT, () => {
  console.log(`server is runnning on port ${PORT}`);
});
