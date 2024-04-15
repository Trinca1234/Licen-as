import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import emailjs from "@emailjs/browser";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const otp = searchParams.get("otp");

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }

        if (!otp) {
            return new NextResponse("OTP Missing", { status: 400 });
        }

       /*  const user = await db.tVendedor.findFirst({
            where: {
                EMail: email,
            }
        });

        if(!user){
            return new NextResponse("Invalid Credentials", { status: 401 });
        } */

        const recuperar = await db.recuperarPassword.findFirst({
            where:{
                Email: email
            }
        })

        if(recuperar){
            await db.recuperarPassword.update({
                where:{
                    Email: email
                },
                data:{
                    OTP: otp
                }
            })
            return new NextResponse("OTP updated", { status: 200 });
        }

        await db.recuperarPassword.create({
            data:{
                Email: email,
                OTP: otp
            }
        })

        return new NextResponse("OTP created", { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}