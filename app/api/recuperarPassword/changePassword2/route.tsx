import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const current = searchParams.get("currentPassword");
        const nova = searchParams.get("newPassword");
        const email = searchParams.get("email");

        if (!current) {
            return new NextResponse("Current Password Missing", { status: 400 });
        }

        if (!nova) {
            return new NextResponse("New Password Missing", { status: 400 });
        }

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }

        const conta = await db.tVendedor.findFirst({
            where:{
                EMail: email,
                Senha: current
            }
        })

        if(!conta){
            return new NextResponse("Account Doesnt Exist", { status: 400 })
        }
        
        const change = await db.tVendedor.update({
            where: {
                ID_Revendedor: {ID: conta.ID, Revendedor: conta.Revendedor}
            },
            data:{
                Senha: nova
            }
        });
        

        if(!change){
            return new NextResponse("Invalid Credentials", { status: 401 });
        }

        return new NextResponse("Password changed", { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}