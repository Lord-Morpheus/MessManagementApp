import { Router } from "express";
import { addStudent, deleteStudent, getStudents } from "../controllers/user.controller.js";

const router = Router();

router.post('/addStudent', addStudent)
router.get('/getStudents', getStudents)
router.delete('/deleteStudent/:id', deleteStudent)


export default router;