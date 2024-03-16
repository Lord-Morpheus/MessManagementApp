import { Router } from 'express';
import { deleteStudent, filterStudentsBatch, filterStudentsByHostel, filterStudentsByMess, getAllStudents, getStudent, signIn, signUp } from '../controllers/admin.controller.js';
import { adminAuthMiddleware } from '../middlewares/adminAuth.middleware.js';
import { forgotPassword, resetPassword, sendSignupOTP } from '../controllers/common.controller.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/getAll', adminAuthMiddleware, getAllStudents);
router.get('/get/:id', adminAuthMiddleware, getStudent);
router.get('/get', adminAuthMiddleware, filterStudentsBatch)
router.get('/get', adminAuthMiddleware, filterStudentsByHostel)
router.get('/get', adminAuthMiddleware, filterStudentsByMess)
router.delete('/delete/:id', adminAuthMiddleware, deleteStudent);
router.post('/reset/password', forgotPassword);
router.put('/reset/password/', resetPassword);
router.post('/send/otp', sendSignupOTP);

export default router;
