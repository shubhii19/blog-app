import express from "express";
import {
  getAdminsController,
  getMyProfileController,
  loginController,
  logoutController,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", loginController);

router.get("/logout", isAuthenticated, logoutController);

router.get("/my-profile", isAuthenticated, getMyProfileController);

router.get("/admins", getAdminsController);

export default router;
