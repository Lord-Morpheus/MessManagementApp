import { PrismaClient } from '@prisma/client'
import { studentsData } from './data.js'

const prisma = new PrismaClient()

const seed = async () => {
    try {
        // for (const student of studentsData) {
        //     const { name, username, email, password, hostelId, messId } = student
        //     await prisma.student.create({
        //         data: {
        //             name,
        //             username,
        //             email,
        //             password,
        //             hostel: {
        //                 connect: {
        //                     id: hostelId
        //                 }
        //             },
        //             mess: {
        //                 connect: {
        //                     id: messId
        //                 }
        //             }
        //         }
        //     })
        //     console.log(`Student ${name} added`)
        // }

        await prisma.student.createMany({
            data: studentsData
        })

    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()