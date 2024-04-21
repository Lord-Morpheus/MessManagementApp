import { Router } from "express";
import { getFeedbacks, getStudents, updateVendor } from "../controllers/vendor.controller.js";
import { vendorAuthMiddleware } from "../middlewares/vendorAuth.middleware.js";
import { verifyQRCode } from "../utils/qrcode/index.js";

const router = Router();

router.get('/get/studets', vendorAuthMiddleware, getStudents);
router.get('/get/feedbacks', vendorAuthMiddleware, getFeedbacks);
router.put('/update', vendorAuthMiddleware, updateVendor);
router.get('/verify', vendorAuthMiddleware, verifyQRCode);

export default router;