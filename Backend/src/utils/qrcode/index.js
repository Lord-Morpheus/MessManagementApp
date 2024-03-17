import asyncHandler from "../asyncHandler.js";
import { z } from "zod";
import jwt from 'jsonwebtoken';

export const verifyQRCode = asyncHandler(async (req, res) => {
    const { qrCode } = req.body;
    const { success } = z.object({
        qrCode: z.string()
    }).safeParse(req.body);

    const messId = req.user.messId;

    if (!success) {
        return res.status(400).json({ message: "Invalid request" });
    }

    try {
        const payload = jwt.verify(qrCode, process.env.JWT_SECRET);
        const id = payload.id;

        const student = await client.student.findUnique({
            where: {
                id,
                messId
            }
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student verified" });
    } catch (err) {
        return res.status(403).json(err);
    }
});