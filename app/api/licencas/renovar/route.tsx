import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const validade = searchParams.get("validade");

        if (!id) {
            return new NextResponse("id Missing", { status: 400 });
        }

        if (!validade) {
            return new NextResponse("id Missing", { status: 400 });
        }

        const currentDate = new Date();
        const validadeDate = new Date(validade);
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        let novaValidade = new Date();

        if (validadeDate < currentDate) {
            novaValidade.setFullYear(currentDate.getFullYear() + 1);
            await db.tChaves.update({
                where: {
                    UniqueID: parseInt(id)
                },
                data: {
                    DataValidade: novaValidade
                }
            });
        } else if (validadeDate < nextMonth) {
            novaValidade.setFullYear(validadeDate.getFullYear() + 1);
            await db.tChaves.update({
                where: {
                    UniqueID: parseInt(id)
                },
                data: {
                    DataValidade: novaValidade
                }
            });
        } else {
            return new NextResponse("Não pode renovar a liceçna", { status: 201 });
        }

        const licenca = await db.tChaves.findFirst({
            where: {
                UniqueID: parseInt(id),
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
        console.log("[LICENCAS_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
