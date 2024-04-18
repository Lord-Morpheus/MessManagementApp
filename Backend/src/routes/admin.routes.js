import { Router } from 'express';
import { addHostel, addMess, addVendor, deleteStudent, filterStudents, getAllStudents, getHostel, getMess, getStudent, seedData, signIn, signUp } from '../controllers/admin.controller.js';
import { adminAuthMiddleware } from '../middlewares/adminAuth.middleware.js';
import { forgotPassword, resetPassword, sendSignupOTP } from '../controllers/common.controller.js';
import { exportUser, importUser } from '../controllers/excel.controller.js';
import { filterMiddleware } from '../middlewares/filter.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/students', adminAuthMiddleware, getAllStudents);
router.get('/get/:id', adminAuthMiddleware, getStudent);
router.get('/filter', adminAuthMiddleware, filterMiddleware, filterStudents)
router.delete('/delete/:id', adminAuthMiddleware, deleteStudent);
router.post('/reset/password', forgotPassword);
router.put('/reset/password/', resetPassword);
router.post('/send/otp', sendSignupOTP);
router.get('/export', adminAuthMiddleware, filterMiddleware, exportUser);
router.post('/add/vendor', adminAuthMiddleware, addVendor);
router.post('/add/mess', adminAuthMiddleware, addMess);
router.post('/add/hostel', adminAuthMiddleware, addHostel);
router.get('/hostels', adminAuthMiddleware, getHostel);
router.post('/import/users', upload.single('excelFile'), importUser)
router.post('/seeddata', seedData);
router.get('/mess', getMess)


export default router;
