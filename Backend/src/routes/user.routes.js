import { Router } from "express";
import { getUser, loginUser, registerUser, updateDefaultMess, updatePassword } from "../controllers/user.controller.js";

const router = Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/get', getUser);
router.put('/update_password', updatePassword);
router.put('/update_default_mess', updateDefaultMess);

export default router;