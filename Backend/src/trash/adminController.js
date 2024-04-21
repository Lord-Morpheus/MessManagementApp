// export const filterStudentsByHostel = asyncHandler(async (req, res) => {
//     const { hostelId } = req.query.hostel;

//     try {
//         const users = await client.student.findMany({
//             where: {
//                 hostelId: hostelId
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 username: true,
//                 email: true,
//                 hostel: true,
//                 // mess: {
//                 //     select: {
//                 //         id: true,
//                 //         name: true,
//                 //         location: true,
//                 //     }
//                 // }
//             }
//         });

//         return res.status(200).json({ data: users });
//     } catch (err) {
//         return res.status(403).json(err);
//     }
// });

// export const filterStudentsByMess = asyncHandler(async (req, res) => {
//     const { messId } = req.query.mess;

//     try {
//         const users = await client.student.findMany({
//             where: {
//                 messId: messId
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 username: true,
//                 email: true,
//                 hostel: true,
//                 // mess: {
//                 //     select: {
//                 //         id: true,
//                 //         name: true,
//                 //         location: true,
//                 //     }
//                 // }
//             }
//         });

//         return res.status(200).json({ data: users });
//     } catch (err) {
//         return res.status(403).json(err);
//     }
// });

// export const filterStudentsBatch = asyncHandler(async (req, res) => {
//     const { batch } = req.query;

//     try {
//         const users = await client.student.findMany({
//             where: {
//                 username: {
//                     startsWith: batch
//                 }
//             },
//             select: {
//                 id: true,
//                 name: true,
//                 username: true,
//                 email: true,
//                 hostel: true,
//                 // mess: {
//                 //     select: {
//                 //         id: true,
//                 //         name: true,
//                 //         location: true,
//                 //     }
//                 // }
//             }
//         });

//         return res.status(200).json({ data: users });
//     } catch (err) {
//         return res.status(403).json(err);
//     }
// });