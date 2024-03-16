import { Router } from "express";
const router = Router();

import userRouter from './routes/user.routes.js';

// routes
router.use('/users', userRouter);

export default router;