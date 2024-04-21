export const filterStudents = asyncHandler(async (req, res) => {
    const data = req.data;

    return res.status(200).json({ data });
});