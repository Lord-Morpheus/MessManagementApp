import { Router } from "express";
import { getUser, loginUser, registerUser, updateDefaultMess, updatePassword } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/get', authMiddleware, getUser);
router.put('/update_password', authMiddleware, updatePassword);
router.put('/update_default_mess', authMiddleware, updateDefaultMess);

export default router;