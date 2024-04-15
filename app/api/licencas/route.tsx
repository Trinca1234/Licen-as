import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if(!id){
            return new NextResponse("id Missing", {status: 400});
        }

        const currentDate = new Date(); 
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const pastYear = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDay());

        const licencas = await db.tChaves.findMany({
            where: {
                Revendedor: id,
                Obsoleto: false,
                DataValidade: {
                    gt: pastYear,
                    lt: nextMonth,
                } 
            },
            orderBy: {
                DataValidade: "desc"
            } 
        });
        
        const licencasWithVendedor = await Promise.all(licencas.map(async (licenca) => {
            const vendedor = await db.tVendedor.findFirst({
                where: {
                    Utilizador: licenca.Utilizador
                }
            });
            
            return { ...licenca, vendedorNome: vendedor?.Nome || "" };
        }));
           
        return NextResponse.json(licencasWithVendedor);
    } catch (error) {
        console.log("[LICENCAS_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

