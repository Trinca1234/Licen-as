import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if(!id){
            return new NextResponse("id Missing", {status: 400});
        }

        const empresas = await db.tEmpresa.findMany({
            where: {
                Utilizador: id
            }
        });
           
        return NextResponse.json(empresas);
    } catch (error) {
        console.log("[SERVER_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

