import { Router } from "express";
import { addStudent } from "../controllers/admin.controller.js";

const router = Router();

router.post('/addStudent', addStudent)


export default router;