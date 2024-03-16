import { Student } from "../models/student.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { PrismaClient } from '@prisma/client'


const addStudent = asyncHandler(async (req, res) => {
    const prisma = new PrismaClient()
    const { hostel, userid, name, batch, email } = req.body;

    const user = await prisma.student.create({
        data: {
            hostel,
            userid,
            name,
            batch,
            email
        }
    })

    return res.status(201).json({ data: user })
})

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await Student.deleteOne({
        _id: id
    })

    return res.status(201).json({ data: user })
})

const getStudents = asyncHandler(async (req, res) => {
    const allStudents = await Student.find({});
    return res.status(200).json({ allStudents })
});

export { addStudent, getStudents, deleteStudent }