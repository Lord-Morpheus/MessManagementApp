import { Student } from "../models/student.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

// Admin can't add students, they dont have access to the user password

export const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const user = await client.student.delete({
            where: {
                id
            },
            select: {
                name: true,
                username: true,
                email: true,
                hostel: true,
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(201).json({ data: user, msg: "User deleted successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
})
