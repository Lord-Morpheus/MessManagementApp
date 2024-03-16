import { Router } from "express";
import { forgotPassword, getUser, loginUser, registerUser, resetPassword, sendSignupOTP, updateDefaultMess, updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/get', authMiddleware, getUser);
router.put('/update/password', authMiddleware, updatePassword);
router.put('/update/defaultMess', authMiddleware, updateDefaultMess);
router.post('/reset/password', forgotPassword);
router.put('/reset/password/', resetPassword);
router.post('/send/otp', sendSignupOTP);

export default router;