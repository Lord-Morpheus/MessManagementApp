import { adminSignUpSchema } from "../../packages/zod.js";
import asyncHandler from "../utils/asyncHandler.js"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';
import { z } from "zod";
import jwt from 'jsonwebtoken';
import { deleteOtp } from "./common.controller.js";
import { studentsData } from "../../prisma/data.js";

const client = new PrismaClient()

// Admin Signup using OTP and Admin Secret
export const signUp = asyncHandler(async (req, res) => {
    const { name, username, email, password, adminSecret, OTP } = req.body;
    const { success } = adminSignUpSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    if (adminSecret !== process.env.ADMIN_SECRET) {
        console.log(adminSecret, process.env.ADMIN_SECRET);
        return res.status(401).json({ message: "Forbidden" });
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

// Admin Signin
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

// Get all students
export const getAllStudents = asyncHandler(async (req, res, next) => {
    try {
        const users = await client.student.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                hostel: {
                    select: {
                        name: true,
                    }
                },
                mess: {
                    select: {
                        name: true,
                    }
                }
            }
        });

        for (const user of users) {
            user.mess = user.mess.name.toUpperCase();
            user.hostel = user.hostel.name.toUpperCase();
        }

        req.users = users;

        console.log(users);

        next(res.status(200).json({ data: users }));
    } catch (err) {
        return res.status(403).json(err);
    }
});

// Get a student by id
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

// Filter students by various fields
export const filterStudents = asyncHandler(async (req, res) => {
    const data = req.data;

    return res.status(200).json({ data });
}
);

// Delete a student from database
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

// Update a student in database
export const updateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, username, email, hostel, mess } = req.body;

    try {
        const user = await client.student.update({
            where: {
                id
            },
            data: {
                name,
                username,
                email,
                hostel,
                mess
            },
            select: {
                name: true,
                username: true,
                email: true,
                hostel: true,
                mess: true
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }

        return res.status(201).json({ data: user, msg: "User updated successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
});

export const addMess = asyncHandler(async (req, res) => {
    const { mess } = req.body;

    try {
        const messData = await client.mess.create({
            data: {
                name: mess.toLowerCase(),
            },
            select: {
                id: true,
                name: true,
            }
        });

        return res.status(200).json({ data: messData, msg: "Mess added successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
});

export const seedData = asyncHandler(async (req, res) => {
    for (const student of studentsData) {
        const { name, username, email, password, hostelId, messId } = student
        const existingUser = await client.student.findFirst({
            where: {
                username
            }
        });
        if (existingUser) {
            await client.student.delete({
                where: {
                    username
                }
            })
        }
        await client.student.create({
            data: {
                name,
                username,
                email,
                password,
                hostel: {
                    connect: {
                        id: hostelId
                    }
                },
                mess: {
                    connect: {
                        id: messId
                    }
                }
            }
        })
        console.log(`Student ${name} added`)
    }
    return res.status(200).json({ message: "Data seeded successfully" });
});

export const addHostel = asyncHandler(async (req, res) => {
    const { hostel, messId } = req.body;

    try {
        const hostelData = await client.hostel.create({
            data: {
                name: hostel.toLowerCase(),
                Mess: {
                    connect: {
                        id: messId
                    }
                }
            },
            select: {
                id: true,
                name: true,
            }
        });

        return res.status(200).json({ data: hostelData, msg: "Mess added successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
});

export const addVendor = asyncHandler(async (req, res) => {
    const { name, username, email, phone, password } = req.body;

    try {
        const vendor = await client.vendor.create({
            data: {
                name,
                username,
                email,
                phone,
                password: password ? await bcrypt.hash(password, 10) : undefined
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                phone: true,
            }
        });

        return res.status(201).json({ data: vendor, msg: "Vendor added successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
});

export const getFeedbacks = asyncHandler(async (req, res) => {

    try {
        const feedbacks = await client.feedback.findMany({});

        return res.status(200).json({ data: feedbacks });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const messAllocation = asyncHandler(async (req, res) => {
    const { startDate, endDate, ratio } = req.body;

    try {
        const messOptions = await client.mess.findMany({
            where: {},
            select: {
                id: true,
                name: true,
            }
        });

        const messForms = await client.messForm.findMany({
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        const remainingForms = [];

        // Allocated first come first serve basis store not assigned forms
        for (mess in messOptions) {
            const filteredForms = messForms.filter(form => form.messId === mess.id);

            filteredForms.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            });

            const capacity = mess.capacity;

            const fcfsRatio = ratio * capacity;

            for (form in filteredForms) {
                if (fcfsRatio > 0) {
                    const updatedUser = await client.student.update({
                        where: {
                            id: form.studentId
                        },
                        data: {
                            mess: {
                                connect: {
                                    id: mess.id
                                }
                            }
                        },
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            email: true,
                            hostel: true,
                            mess: true
                        }
                    });
                    fcfsRatio--;
                }
            }

            const remainingForm = filteredForms.slice(fcfsRatio);
            remainingForms.push(...remainingForm);
        }

        // Allocated remaining forms to the mess according to proximity

        return res.status(201).json({ data: user, msg: "Mess allocated successfully" })
    }
    catch (err) {
        return res.status(403).json(err);
    }
});

export const getMess = asyncHandler(async (req, res) => {
    const mess = await client.mess.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    console.log(mess);
    return res.status(200).json(mess);
});

export const getHostel = asyncHandler(async (req, res) => {
    const hostels = await client.hostel.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    console.log(hostels);
    return res.status(200).json(hostels);
});
