import { db } from "@/lib/db";

export async function getUserByEmail(email: string) {
    return await db.tVendedor.findFirst({
        where: {
            EMail: email,
        }
    });
}
