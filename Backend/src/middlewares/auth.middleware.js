import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token || req.headers.authorization?.split(" ")[0] !== "Bearer") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);
        const userId = payload.id;

        const user = await client.student.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        console.log(req.user);
        next();

    } catch (err) {
        return res.status(403).json(err);
    }
}
);
