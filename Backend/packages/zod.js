import z from 'zod';

export const registerSchema = z.object({
    name: z.string(),
    username: z.string().length(6),
    email: z.string().email(),
    hostel: z.string(),
    password: z.string().min(6),
    defaultMess: z.string().optional(),
});

export const loginSchema = z.object({
    username: z.string().length(6),
    password: z.string().min(6),
});

export const updateSchema = z.object({
    password: z.string().min(6).optional(),
    defaultMess: z.string().optional(),
});

export const adminSignUpSchema = z.object({
    name: z.string(),
    adminSecret: z.string().min(8),
    username: z.string().length(6),
    email: z.string().email(),
    password: z.string().min(6),
});
