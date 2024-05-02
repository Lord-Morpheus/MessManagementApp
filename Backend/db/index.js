import { PrismaClient } from "@prisma/client";

if (!global.client) {
    global.client = new PrismaClient();
}
export default global.client;