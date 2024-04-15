import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import emailjs from "@emailjs/browser";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const otp = searchParams.get("codigo");

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }

        if (!otp) {
            return new NextResponse("OTP Missing", { status: 400 });
        }

        const confirmation = await db.recuperarPassword.findFirst({
            where:{
                Email: email,
                OTP: otp,
            }
        })

        if(!confirmation){
            return new NextResponse("Invalid OTP", { status: 501 });
        }

        return new NextResponse("Valid OTP", { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}