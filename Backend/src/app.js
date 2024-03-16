import { Router } from "express";
const router = Router();

import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';

// routes
router.use('/users', userRouter);
router.use('/admin', adminRouter);

export default router;