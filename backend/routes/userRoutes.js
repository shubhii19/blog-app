import express from "express"
import { loginController, logoutController, register } from "../controllers/userController.js";
const router = express.Router();     

router.post("/register",register)

router.post('/login',loginController )

router.get("/logout",logoutController);

export default router;