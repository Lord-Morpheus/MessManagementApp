import { PrismaClient } from '@prisma/client';
import sendEmail from '../utils/email/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import { z } from 'zod';
import { generateOTP } from '../utils/email/generateOTP.js';
import jwt from 'jsonwebtoken';
const client = new PrismaClient();

//  Delete OTP
export const deleteOtp = async (email) => {
    const entry = await client.otp.findFirst({
        where: {
            email,
        },
    });

    if (entry) {
        await client.otp.delete({
            where: {
                email,
            },
        });
    }
};

//  Send OTP for signup
export const sendSignupOTP = asyncHandler(async (req, res) => {
    const { email, username } = req.body;
    const { success } = z.string().email().safeParse(email);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    // if (!email.endsWith("iitmandi.ac.in")) {
    //     return res.status(400).json({ message: "Please use institute email ID" });
    // }

    try {
        const user1 = await client.student.findUnique({
            where: {
                email
            },
        });

        const user2 = await client.student.findUnique({
            where: {
                username
            },
        });

        if (user1 || user2) {
            return res.status(404).json({ message: "User already exists" });
        }

        const { OTP, OTP_EXPIRY } = generateOTP();

        await deleteOtp(email);

        await client.otp.create({
            data: {
                email,
                key: OTP,
                expiry: OTP_EXPIRY,
            },
        });

        await sendEmail({
            mail: email,
            subject: '🍽️ Welcome to IIT Mandi Mess Service! Activate Your Account',
            text: `Hi there! Welcome to IIT Mandi Mess Service. We're thrilled to have you join us for delicious meals! To complete your registration and start enjoying our meals, please use the OTP below:
        
        🔒 One-Time Passcode (OTP): ${OTP}
    
        If you have any questions or need assistance, feel free to reach out to our support team.
        
        We can't wait to serve you!
        
        Best regards,
        III Mandi Mess Service Team`
        });

        return res.status(200).json({ username, email, message: `OTP send to email ${email}` });
    } catch (err) {
        await deleteOtp(email);

        return res.status(403).json(err);
    }
});

//  Send OTP for forgot password
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

        const { OTP, OTP_EXPIRY } = generateOTP();

        await deleteOtp(email);

        await client.otp.create({
            data: {
                email,
                key: OTP,
                expiry: OTP_EXPIRY,
            },
        });

        await sendEmail({
            mail: email,
            subject: 'Account Recovery',
            text: `Hi there! You're receiving this email because you requested to recover your account. Please use the OTP below to proceed:
                
                🔒 One-Time Passcode (OTP): ${OTP}
                
                Copy above OTP and paste it into the designated field on our recovery page.
                
                If you have any questions or need assistance, feel free to contact our support team.
                
                Best regards,
                IIT Mandi Mess Sevice Team
        `,
        });

        return res.status(200).json({ message: `Recovery email send to ${email}` });
    } catch (err) {
        await deleteOtp(email);

        return res.status(403).json(err);
    }
});

//  Reset password using OTP
export const resetPassword = asyncHandler(async (req, res) => {
    const { email, OTP, password } = req.body;
    const { success } = z.object({
        email: z.string().email(),
        OTP: z.string().min(8),
        password: z.string().min(6),
    }).safeParse(req.body);

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

        await deleteOtp(email);

        const currentTime = new Date().getTime();
        const otpExpiry = new Date(matched.expiry).getTime();
        const timeDiff = currentTime - otpExpiry;

        if (timeDiff > 15 * 60 * 1000) {
            return res.status(400).json({ message: "OTP expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await client.student.update({
            where: {
                email,
            },
            data: {
                password: hashedPassword,
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
