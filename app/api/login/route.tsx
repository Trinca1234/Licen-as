import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serialize } from "cookie";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const password = searchParams.get("password");

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }

        if (!password) {
            return new NextResponse("Password Missing", { status: 400 });
        }

        const UserEmail = await db.tVendedor.findFirst({
            where: {
                EMail: email
            }
        });

        if(!UserEmail){
            return new NextResponse("Invalid email", { status: 201 });
        }

        const user = await db.tVendedor.findFirst({
            where: {
                EMail: email,
                Senha: password
            }
        });

        if (user) {
            const userData = JSON.stringify({ user: user });
            const userDataCookie = serialize("userData", userData, {
                httpOnly: false,
                maxAge: 60 * 60 * 24,
                path: "/",
                sameSite: "strict", 
                secure: process.env.NODE_ENV === "production",
            });

            const response = new NextResponse(JSON.stringify(user), {
                headers: {
                    "Set-Cookie": userDataCookie,
                },
            });

            return response;
        }else{
            return new NextResponse("Invalid password", { status: 201 });
        }

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}