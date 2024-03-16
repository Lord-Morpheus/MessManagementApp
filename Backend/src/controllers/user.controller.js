import { loginSchema, registerSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from "zod";

const client = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
    const signUpData = req.body;
    const { success } = registerSchema.safeParse(signUpData);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const existingUser = await client.student.findUnique({
            where: {
                email: signUpData.email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(signUpData.password, 10);

        const user = await client.student.create({
            data: {
                name: signUpData.name,
                username: signUpData.username,
                email: signUpData.email,
                hostel: signUpData.hostel,
                password: hashedPassword,
                defaultMess: signUpData.defaultMess,
            },
        });

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const loginData = req.body;
    const { success } = loginSchema.safeParse(loginData);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    const { username, password } = loginData;

    try {
        const user = await client.student.findUnique({
            where: {
                username
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({ token });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const getUser = asyncHandler(async (req, res) => {

    const user = await client.student.findUnique({
        where: {
            id: req.user.id,
        },
        select: {
            id: true,
            name: true,
            username: true,
            email: true,
            hostel: true,
            defaultMess: true,
            // mess: {
            //     select: {
            //         id: true,
            //         name: true,
            //         location: true,
            //     },
            // }
        },
    });
    // console.log(user);
    return res.status(200).json(user);
});

export const updatePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;

    const { success } = z.string().min(6).safeParse(password);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const user = await client.student.update({
            where: {
                id: req.user.id,
            },
            data: {
                password: password ? await bcrypt.hash(password, 10) : undefined,
            },
            select: {
                name: true,
                username: true,
                email: true,
                hostel: true,
                defaultMess: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     },
                // }
            },
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const updateDefaultMess = asyncHandler(async (req, res) => {
    const { defaultMess } = req.body;

    const { success } = z.string().optional().safeParse(defaultMess);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const user = await client.student.update({
            where: {
                id: req.user.id,
            },
            data: {
                defaultMess: defaultMess ? defaultMess : undefined,
            },
            select: {
                name: true,
                username: true,
                email: true,
                hostel: true,
                defaultMess: true,
                // mess: {
                //     select: {
                //         id: true,
                //         name: true,
                //         location: true,
                //     },
                // }
            },
        });

        return res.status(200).json(user);
    } catch (err) {
        return res.status(403).json(err);
    }
});
