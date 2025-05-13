import express from "express"
import { createBlogController } from "../controllers/blogController.js";
const router = express.Router();     

router.post("/create",createBlogController)


export default router;