import { Router } from "express";
import { createFeedback, getFeedbacks, getUser, loginUser, registerUser, submitForm, updateDefaultMess, updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { forgotPassword, resetPassword, sendSignupOTP } from "../controllers/common.controller.js";
import { seedData } from "../controllers/admin.controller.js";
import { getMenuPDF } from "../controllers/file.controller.js";

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/get', authMiddleware, getUser);
router.put('/update/password', authMiddleware, updatePassword);
router.put('/update/defaultMess', authMiddleware, updateDefaultMess);
router.post('/reset/password', forgotPassword);
router.put('/reset/password/', resetPassword);
router.post('/send/otp', sendSignupOTP);
router.post('/feedback', authMiddleware, createFeedback);
router.get('/feedback', authMiddleware, getFeedbacks);
router.post('/submit', authMiddleware, submitForm);
router.get('/menu', getMenuPDF);
export default router;