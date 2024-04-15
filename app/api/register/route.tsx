import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST (req: Request){
try{
    const {searchParams} = new URL(req.url);
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if(!name){
        return new NextResponse("Name Missing", {status: 400});
    }

    if(!email){
        return new NextResponse("Email Missing", {status: 400});
    }

    if(!password){
        return new NextResponse("Password Missing", {status: 400});
    }

    const register = await db.tVendedor.findFirst({
        where: {
            EMail: email
        }
    })

    if(register){
        return new NextResponse("Email alreay in use", {status: 400})
    }

    /* await db.tVendedor.create({
        data: {
            EMail: email,
            Senha: password
        }
    }); */
       
    return NextResponse.json(register);
}catch(error){
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Error", {status: 500});
}
}