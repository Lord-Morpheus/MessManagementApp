import asyncHandler from "../utils/asyncHandler";

export const updateVendor = asyncHandler(async (req, res) => {
    const vendorId = req.params.id;
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
    const vendorId = req.params.id;

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
