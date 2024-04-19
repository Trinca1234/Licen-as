import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }
        
        const user = await db.tVendedor.findFirst({
            where: {
                EMail: email,
            }
        });

        if(!user){
            return new NextResponse("Account not found", { status: 400 });
        }

        return NextResponse.json(user.Activo);

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 400 });
    }
}
