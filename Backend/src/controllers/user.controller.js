import { loginSchema, registerSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from "zod";
import { generateOTP } from "../utils/email/generateOTP.js";
import sendEmail from "../utils/email/index.js";

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

        return res.status(200).json({ token, message: "User registered successfully" });
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

const generateRecoveryToken = () => {
    const resetToken = crypto.randomUUID();

    const tokenExpiry = new Date();

    return { resetToken, tokenExpiry };
};

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { success } = z.string().email().safeParse(email);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const user = await client.student.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { resetToken, tokenExpiry } = generateRecoveryToken();
        console.log(resetToken, tokenExpiry);

        await client.student.update({
            where: {
                email,
            },
            data: {
                resetToken,
                tokenExpiry,
            },
        });

        console.log(resetToken);

        const passwordResetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset/password/${resetToken}`;

        await sendEmail({
            mail: email,
            text: `Your recovery token is \n\n ${passwordResetURL}`,
        });

        return res.status(200).json({ message: `Recovery email send to ${email}` });
    } catch (err) {
        await client.student.update({
            where: {
                email,
            },
            data: {
                resetToken: null,
                tokenExpiry: null,
            },
        });
        return res.status(403).json(err);
    }
});

export const resetPassword = asyncHandler(async (req, res) => {
    const resetToken = req.params.token;
    const { password } = req.body;
    const { success } = z.object({
        resetToken: z.string().length(36),
        password: z.string().min(6),
    }).safeParse({ ...req.body, resetToken });

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    try {
        const user = await client.student.findUnique({
            where: {
                resetToken,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Password recovery token is invalid" });
        }

        const currentTime = new Date().getTime();
        const tokenExpiry = new Date(user.tokenExpiry).getTime();
        const timeDiff = currentTime - tokenExpiry;

        if (timeDiff > 15 * 60 * 1000) {
            await client.student.update({
                where: {
                    resetToken,
                },
                data: {
                    resetToken: null,
                    tokenExpiry: null,
                },
            });

            return res.status(400).json({ message: "Recovery token expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await client.student.update({
            where: {
                resetToken,
            },
            data: {
                password: hashedPassword,
                resetToken: null,
                tokenExpiry: null,
            },
        });

        const payload = { id: updatedUser.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });

        return res.status(200).json({ token, message: "Password reset successfully" });
    } catch (err) {
        return res.status(403).json(err);
    }
});
