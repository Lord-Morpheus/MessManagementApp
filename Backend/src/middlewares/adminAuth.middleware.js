import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || req.headers.authorization?.split(" ")[0] !== "Admin") {
        return res.status(401).json({ message: "Forbidden" });
    }

    try {
        const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        const userId = payload.id;

        const user = await client.admin.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Admin doesn't exist" });
        }

        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Forbidden" });
    }
});