import { PrismaClient } from '@prisma/client'
const { students, mess, feedbacks, admins, vendors } = require('./data.js')
const prisma = new PrismaClient()

const seed = async () => {
    try {
        await prisma.student.deleteMany()
        console.log('Deleted students')

        await prisma.mess.deleteMany()
        console.log('Deleted mess')

        await prisma.feedback.deleteMany()
        console.log('Deleted feedbacks')

        await prisma.admin.deleteMany()
        console.log('Deleted admin')

        await prisma.vendor.deleteMany()
        console.log('Deleted vendor')

        await prisma.student.createMany({
            data: students
        })
        console.log('Added students data')

        await prisma.mess.createMany({
            data: mess
        })
        console.log('Added mess data')

        await prisma.feedback.createMany({
            data: feedbacks
        })
        console.log('Added feedback data')

        await prisma.admin.createMany({
            data: admins
        })
        console.log('Added admin data')

        await prisma.vendor.createMany({
            data: vendors
        })
        console.log('Added vendor data')

    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()