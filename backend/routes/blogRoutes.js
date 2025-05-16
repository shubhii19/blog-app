import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getMyBlogsController,
  getSingleBlogController,
  updateBlogControlller,
} from "../controllers/blogController.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("admin"), createBlogController);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAdmin("admin"),
  deleteBlogController
);
router.get("/all-blogs", isAuthenticated, getAllBlogsController);
router.get("/single-blog/:id", isAuthenticated, getSingleBlogController);
router.get("/my-blog", isAuthenticated, isAdmin("admin"), getMyBlogsController);
router.put("/update/:id",isAuthenticated,isAdmin("admin"),updateBlogControlller);


export default router;
