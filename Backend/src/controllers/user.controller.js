import { loginSchema, registerSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from "zod";
import { generateOTP } from "../utils/email/generateOTP.js";
import sendEmail from "../utils/email/index.js";
import { deleteOtp } from "./common.controller.js";

const client = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
    const { username, name, email, hostel, password, OTP, defaultMess } = req.body;
    const { success } = registerSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const matched = await client.otp.findFirst({
            where: {
                email,
                key: OTP,
            },
        });

        if (!matched) {
            return res.status(404).json({ message: "Invalid OTP" });
        }

        const currentTime = new Date().getTime();
        const otpExpiry = new Date(matched.expiry).getTime();

        await deleteOtp(email);

        if (currentTime - otpExpiry > 15 * 60 * 1000) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const user = await client.student.create({
            data: {
                name,
                username,
                email,
                hostel,
                password: password ? await bcrypt.hash(password, 10) : undefined,
                defaultMess
            },
        });

        const payload = { id: user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({ token, message: "User registered successfully" });
    } catch (err) {
        await deleteOtp(email);

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

        return res.status(200).json({ token, message: "User logged in successfully" });
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
