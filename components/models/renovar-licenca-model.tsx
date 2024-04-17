"use client";

import qs from "query-string";
import axios from "axios";
import { Button } from "@/components/ui/button";

import { PopoverTrigger, PopoverContent, Popover} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
}from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
}from "@/components/ui/select"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

export const RenovarLicencaModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "renovarLicenca";
    const [detalhes, setDetalhes] = useState<any>(null);

    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            const fetchLicenca = async () => {
                try {
                    const url = qs.stringifyUrl({
                        url: '/api/licencas/detalhes',
                        query: {
                            id: data.id
                        }
                    });
                    const result = await axios.get(url);
                    return result;
                } catch (error) {
                    console.error(error);
                }
            };

            const getDetalhes = async () => {
                const detalhes = await fetchLicenca();
                setDetalhes(detalhes);
            };

            getDetalhes();
        }
    }, [isOpen, data.id]);

    const handleClose = () =>{
        onClose();
    } 

    async function onConfirm(UniqueId: number, Validade: string) {
        try {
            const url = qs.stringifyUrl({
                url: '/api/licencas/renovar',
                query: {
                    id: UniqueId,
                    validade: Validade
                }
            });
            const result = await axios.patch(url);
            if(result.status == 200){
                setDetalhes(result);
            }
            router.refresh()
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    function getClassForDate(dateString: string | undefined) {
        if (!dateString) {
            return "text-zinc-900";
        }
    
        const today = new Date();
        const expirationDate = new Date(dateString);
    
        if (isNaN(expirationDate.getTime())) {
            return "text-zinc-900";
        }
    
        if (expirationDate < today) {
            return "text-red-500";
        } else if (expirationDate < new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())) {
            return "text-yellow-500";
        } else {
            return "text-zinc-900";
        }
    }

    function onInstalar() {
        console.log("download logic goes here")

        const texts = ["*sharts agressevly ´Excuse me´"]

        const file = new Blob(texts, {type: 'ini'});

        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "Licença-" + Date.now() + ".ini";

        document.body.appendChild(element);
        element.click();
    }
    
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent style={{ width: '1050px' }} className=" pt-0">
                <Tabs className="w-full" defaultValue="general">
                    <TabsList className=" bg-white gap-0">
                        <TabsTrigger value="Licença">Licença</TabsTrigger>
                        <TabsTrigger value="Outras">Outras Informações</TabsTrigger>
                    </TabsList>
                    <TabsContent value="Licença" className="mt-0">
                        <div className="p-4 grid gap-4">
                            <div className="grid gap-2 grid-cols-3">
                                <div>
                                    <div className="grid gap-2 grid-cols-1">
                                        <div>
                                            <label className="font-bold">Num. Licença :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.NumSerie}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="font-bold">NIF :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.NIF}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-2 grid-cols-2 mt-2">
                                        <div>
                                            <label className=" font-bold">Tipo Licença :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.TipoLicenca}
                                            </p>
                                        </div>
                                        <div>
                                            <label className=" font-bold">Versão Licença :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.Versao}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid gap-1 grid-cols-1">
                                        <div>
                                            <label className=" font-bold">Revendedor :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.Revendedor}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-1 grid-cols-2 mt-2">
                                        <div>
                                            <label className=" font-bold">Estabelecimento :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.Estabelecimento}
                                            </p>
                                        </div>
                                        <div>
                                            <label className=" font-bold">Posto :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.NumPosto}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-1 grid-cols-2 mt-2">
                                        <div>
                                            <label className=" font-bold">Tipo Posto :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.ConfiguracaoPrograma}
                                            </p>
                                        </div>
                                        <div>
                                            <label className=" text-white">*</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.TipoPrograma}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.DescricaoPrograma}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.Armazem}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
                                    <div className="grid gap-1 grid-cols-1">
                                        <div>
                                            <label className=" font-bold">Empresa :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.empresaNome}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid gap-1 grid-cols-2 mt-2">
                                        <div>
                                            <label className=" font-bold">Data Criação :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.DataCriacao.substring(0, 10)}
                                            </p>
                                        </div>
                                        <div>
                                            <label className=" font-bold">Data Ativação :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.DataActivacao.substring(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-1 grid-cols-2 mt-2">
                                        <div>
                                            <label className=" font-bold">Data Modificação :</label>
                                            <p className="text-bold pl-3 border border-gray-300 rounded-md p-2">
                                                {detalhes?.data.DataModificacao.substring(0, 10)}
                                            </p>
                                        </div>
                                        <div>
                                            <label className=" font-bold">Data Validade :</label>
                                            <p className={`${getClassForDate(detalhes?.data.DataValidade)} text-bold pl-3 border border-gray-300 rounded-md p-2`}>
                                                {detalhes?.data.DataValidade.substring(0, 10)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button size="sm">Renovar</Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-96">
                                            <div>
                                                <div>Confirmação</div>
                                                <div>Tem acerteza que quer renovar a licença?</div>
                                            </div>
                                            <div>
                                                <div className="flex justify-end gap-2">
                                                    <Button onClick={() => onConfirm(detalhes?.data.UniqueID, detalhes?.data.DataValidade)} size="sm">Confirmar</Button>
                                                    <PopoverClose className=" px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">Cancelar</PopoverClose>
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex justify-end ">
                                    <Download className=" cursor-pointer" onClick={onInstalar}/>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="Outras">
                        <div className="grid gap-1 grid-cols-1">
                            <div>
                                <label htmlFor="name" className=" font-bold">Vendedor :</label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <span className="truncate">{detalhes?.data.Vendedor}</span>
                                        <div className="ml-auto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {detalhes?.data.Vendedor && (
                                        <SelectItem key={detalhes.data.Vendedor} value={detalhes.data.Vendedor}>
                                            {detalhes.data.Vendedor}
                                        </SelectItem>
                                    )}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-1 grid-cols-2">
                            <div>
                                <label className=" font-bold">Pedida por :</label>
                                <Input id="pedido" className="text-zinc-900 text-bold pl-3 border border-zinc-400" />
                            </div>
                            <div>
                                <label className=" font-bold">Ver. GesTOTAL :</label>
                                <Input id="versao" className="text-zinc-900 text-bold pl-3 border border-zinc-400" />
                            </div>
                        </div>
                        <div className="grid gap-1 grid-cols-1">
                            <div>
                                <label className=" font-bold">Observações :</label>
                                <textarea
                                    className="border border-zinc-500 rounded p-2 w-full"
                                    placeholder="Observações"
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="grid gap-1 grid-cols-1">
                            <div>
                                <Button size="sm">Salvar</Button>
                                <Button onClick={onClose} className="ml-4" size="sm">Cancelar</Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}