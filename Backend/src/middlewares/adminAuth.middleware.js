import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const adminAuth = asyncHandler(async (req, res, next) => {
    const secret = req.headers.secret;

    if (secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ message: "Forbidden" });
    }

    next();
});

export const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
    const secret = req.headers.secret;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token || !secret || secret !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ message: "Forbidden" });
    }

    try {
        const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        const userId = payload.id;

        const user = await client.admin.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Admin doesn't exist" });
        }

        req.user = user;
        console.log(req.user);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Forbidden" });
    }
}
);