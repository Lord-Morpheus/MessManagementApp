// Filter middleware based on various conditions and queries in single function

import asyncHandler from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

export const filterMiddleware = asyncHandler(async (req, res, next) => {

    const { hostel, mess, batch, fromDate, username, toDate } = req.query;

    const where = {};

    if (hostel) {
        where.hostel = hostel;
    }

    if (mess) {
        where.messId = mess;
    }

    if (batch) {
        where.batch = batch;
    }

    if (fromDate && toDate) {
        where.createdAt = {
            gte: new Date(fromDate),
            lt: new Date(toDate),
        };
    }

    if (username) {
        where.username = username;
    }

    try {
        const data = await client.student.findMany({
            where,
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

        req.data = data;

        // console.log(req.data);

        next();

    } catch (err) {
        return res.status(403).json(err);
    }
});
