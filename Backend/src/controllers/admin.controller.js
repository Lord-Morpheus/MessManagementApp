import { adminSignUpSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import { z } from "zod";
import jwt from 'jsonwebtoken';
import sendEmail from "../utils/email/index.js";

const client = new PrismaClient()

export const signUp = asyncHandler(async (req, res) => {
    const { name, username, email, password, adminSecret } = req.body;
    const { success } = adminSignUpSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    if (adminSecret !== process.env.ADMIN_SECRET) {
        console.log(adminSecret, process.env.ADMIN_SECRET);
        return res.status(401).json({ message: "Forbidden" });
    }

    try {
        const existingUser = await client.admin.findUnique({
            where: {
                email
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const user = await client.admin.create({
            data: {
                name,
                username,
                email,
                password: password ? await bcrypt.hash(password, 10) : undefined,
                adminSecret: adminSecret ? await bcrypt.hash(adminSecret, 10) : undefined
            },
            select: {
                name: true,
                username: true,
                email: true,
                adminSecret: true
            }
        });

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({ token, message: "Admin registered successfully" });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const signIn = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const { success } = z.object({
        username: z.string().length(6),
        password: z.string().min(6)
    }).safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const user = await client.admin.findUnique({
            where: {
                username
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, process.env.ADMIN_JWT_SECRET, { expiresIn: 3600 });

        return res.status(200).json({ token, message: "Admin logged in successfully" });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const users = await client.student.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     }
                // }
            }
        });

        return res.status(200).json({ data: users });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const getStudent = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await client.student.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     }
                // }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ data: user });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const filterStudentsByHostel = asyncHandler(async (req, res) => {
    const { hostelId } = req.query.hostel;

    try {
        const users = await client.student.findMany({
            where: {
                hostelId: hostelId
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     }
                // }
            }
        });

        return res.status(200).json({ data: users });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const filterStudentsByMess = asyncHandler(async (req, res) => {
    const { messId } = req.query.mess;

    try {
        const users = await client.student.findMany({
            where: {
                messId: messId
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     }
                // }
            }
        });

        return res.status(200).json({ data: users });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const filterStudentsBatch = asyncHandler(async (req, res) => {
    const { batch } = req.query;

    try {
        const users = await client.student.findMany({
            where: {
                username: {
                    startsWith: batch
                }
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     }
                // }
            }
        });

        return res.status(200).json({ data: users });
    } catch (err) {
        return res.status(403).json(err);
    }
});

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

export const resetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { success } = z.email().safeParse(email);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        await sendEmail(email, "Reset Password", "Reset your password here");
        return res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        return res.status(403).json(err);
    }
});