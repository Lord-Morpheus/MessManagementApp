import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function showTable() {
    // ... you will write your Prisma Client queries here
    const allUsers = await prisma.student.findMany();
    console.log(allUsers);
}

async function insert() {
    // ... you will write your Prisma Client queries here
    const student = await prisma.student.create({
        data: {
            name: 'Alice',
            email: 'example',
            hostel: 'B13',
            mess: 'pine'
        },
    });
    console.log(student);
}

showTable();