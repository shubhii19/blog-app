import express from "express";
import { createBlogController } from "../controllers/blogController.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("admin"), createBlogController);

export default router;
