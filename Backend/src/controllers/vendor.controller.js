import asyncHandler from "../utils/asyncHandler.js";

export const updateVendor = asyncHandler(async (req, res) => {
    const vendorId = req.user.id;
    const data = req.body;

    try {
        const vendor = await client.vendor.update({
            where: {
                id: vendorId
            },
            data: {
                ...data
            }
        });

        return res.status(200).json({ data: vendor });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const getFeedbacks = asyncHandler(async (req, res) => {
    const vendorId = req.user.id;

    try {
        const feedbacks = await client.feedback.findMany({
            where: {
                vendorId
            }
        });

        return res.status(200).json({ data: feedbacks });
    } catch (err) {
        return res.status(403).json(err);
    }
});

export const getStudents = asyncHandler(async (req, res) => {
    const mess = req.user.messId;

    try {
        const students = await client.student.findMany({
            where: {
                messId
            }
        });

        return res.status(200).json({ data: students });
    } catch (err) {
        return res.status(403).json(err);
    }
});
