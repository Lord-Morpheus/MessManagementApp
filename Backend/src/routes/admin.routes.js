import { Router } from 'express';
import { deleteStudent } from '../controllers/admin.controller.js';

const router = Router();

router.delete('/delete/:id', deleteStudent);