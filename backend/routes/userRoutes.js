import express from "express"
import { loginController, register } from "../controllers/userController.js";
const router = express.Router();     

router.post("/register",register)

router.post('/login',loginController )

export default router;