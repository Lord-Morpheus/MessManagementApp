import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const deleteAll = async () => {
    await client.otp.deleteMany({});
    await client.student.deleteMany({});
    await client.admin.deleteMany({});
    await client.mess.deleteMany({});
    await client.vendor.deleteMany({});
    console.log('Done')
}

await deleteAll();