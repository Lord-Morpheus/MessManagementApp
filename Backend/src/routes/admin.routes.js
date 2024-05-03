import { Router } from 'express';
import { Profile, addHostel, addMess, addVendor, deleteStudent, filterStudents, getAllStudents, getFeedbackCountByMess, getFeedbacks, getFormData, getHostel, getMess, getRevenueOfMess, getStudent, getStudentsCountByMess, messAllocation, seedData, seedForms, seedHostel, seedMess, sendNotification, signIn, signUp, studentID, updateStudent } from '../controllers/admin.controller.js';
import { adminAuthMiddleware } from '../middlewares/adminAuth.middleware.js';
import { forgotPassword, resetPassword, sendSignupOTPAdmin } from '../controllers/common.controller.js';
import { exportUser, importUser } from '../controllers/excel.controller.js';
import { filterMiddleware } from '../middlewares/filter.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { getMenuPDF, menuUplaoder } from '../controllers/file.controller.js';

const router = Router();

router.get('/authenticate', adminAuthMiddleware, (req, res) => {
    res.status(200).json({ message: 'Authenticated' });
});
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/students', getAllStudents);
router.get('/get/:id', adminAuthMiddleware, getStudent);
router.get('/filter', adminAuthMiddleware, filterMiddleware, filterStudents)
router.delete('/delete', adminAuthMiddleware, deleteStudent);
router.put('/update', adminAuthMiddleware, updateStudent);
router.post('/reset/password', forgotPassword);
router.put('/reset/password/', resetPassword);
router.post('/send/otp', sendSignupOTPAdmin);
router.get('/export', adminAuthMiddleware, filterMiddleware, exportUser);
router.post('/add/vendor', adminAuthMiddleware, addVendor);
router.post('/add/mess', adminAuthMiddleware, addMess);
router.post('/add/hostel', adminAuthMiddleware, addHostel);
router.get('/hostels', getHostel);
router.post('/import/users', upload.single('excelFile'), importUser)
router.get('/seeddata', seedData);
router.get('/mess', getMess)
router.get('/studentid', studentID);
router.get('/seedforms', seedForms);
router.get('/allocate', adminAuthMiddleware, messAllocation);
router.get('/getform', adminAuthMiddleware, getFormData)
router.post('/upload', upload.single('file'), menuUplaoder);
router.get('/menu', getMenuPDF);
router.get('/getMessStudentCount', getStudentsCountByMess);
router.get('/getRevenue', getRevenueOfMess);
router.get('/feedback', getFeedbacks);
router.get('/getFeedbackCount', getFeedbackCountByMess);
router.post('/notification', adminAuthMiddleware, sendNotification);
router.get('/seedmess', seedMess);
router.get('/seedhostel', seedHostel);
router.get('/profile', adminAuthMiddleware, Profile);

export default router;
