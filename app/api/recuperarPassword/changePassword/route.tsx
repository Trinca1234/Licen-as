import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const pass = searchParams.get("password");

        if (!email) {
            return new NextResponse("Email Missing", { status: 400 });
        }

        if (!pass) {
            return new NextResponse("Password Missing", { status: 400 });
        }

        const conta = await db.tVendedor.findFirst({
            where:{
                EMail: email
            }
        })

        if(!conta){
            return new NextResponse("Wrong email", { status: 400 })
        }

        const change = await db.tVendedor.update({
            where: {
                ID_Revendedor: {ID: conta.ID, Revendedor: conta.Revendedor}
            },
            data:{
                Senha: pass
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