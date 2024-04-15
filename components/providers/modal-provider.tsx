"use client";

import { useEffect, useState } from "react";

import { RenovarLicencaModal } from "@/components/models/renovar-licenca-model";

export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }
 
    return(
        <>
            <RenovarLicencaModal/>
        </>
    )
}