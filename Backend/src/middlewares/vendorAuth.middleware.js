import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import client from "../../db/index.js";

export const vendorAuthMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token || req.headers.authorization?.split(" ")[0] !== "Vendor") {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const vendorId = payload.id;

        const vendor = await client.vendor.findUnique({
            where: {
                id: vendorId,
            },
        });

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        req.user = user;
        console.log(req.user);
        next();

    } catch (err) {
        return res.status(403).json(err);
    }
});

