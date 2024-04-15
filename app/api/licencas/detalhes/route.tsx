import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if(!id){
            return new NextResponse("id Missing", {status: 400});
        }

        const licenca = await db.tChaves.findFirst({
            where: {
                UniqueID: parseInt(id),
                Obsoleto: false,
            }
        });

        const empresa = await db.tEmpresa.findFirst({
            where:{
                NIF: licenca?.NIF,
            }
        });

        const licencaWithEmpresaName = {
            ...licenca,
            empresaNome: empresa?.Nome
        };

        return NextResponse.json(licencaWithEmpresaName);
    } catch (error) {
        console.log("[LICENCAS_DETALHES_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

