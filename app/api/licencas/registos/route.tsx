import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const quant = searchParams.get("registos");
        const revendedor = searchParams.get("revendedor");

        if (!id) {
            return new NextResponse("Id Missing", { status: 400 });
        }
        
        if (!revendedor) {
            return new NextResponse("Revendedor Missing", { status: 400 });
        }

        if (!quant) {
            return new NextResponse("Registos Missing", { status: 400 });
        }

        const conta = await db.tVendedor.findFirst({
            where:{
                ID: parseInt(id),
                Revendedor: revendedor,
            }
        })

        if(!conta){
            return new NextResponse("Account Error", { status: 400 })
        }

        const change = await db.tVendedor.update({
            where: {
                ID_Revendedor: {ID: conta.ID, Revendedor: conta.Revendedor}
            },
            data: {
                registos: quant
            }
        });

        return new NextResponse("Funceminou", { status: 200 });
    } catch (error) {
        console.log("[LICENCAS_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const revendedor = searchParams.get("revendedor");

        if (!id) {
            return new NextResponse("Id Missing", { status: 400 });
        }

        if (!revendedor) {
            return new NextResponse("Revendedor Missing", { status: 400 });
        }

        const conta = await db.tVendedor.findFirst({
            where:{
                ID: parseInt(id),
                Revendedor: revendedor
            }
        })

        
        if(!conta){
            return new NextResponse("Account Error", { status: 400 })
        }

        return NextResponse.json(conta.registos);

    } catch (error) {
        console.log("[LICENCAS_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
