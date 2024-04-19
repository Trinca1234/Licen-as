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
import { PopoverAnchor, PopoverClose } from "@radix-ui/react-popover";
import { useRouter } from "next/navigation";

export const RenovarLicencaModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "renovarLicenca";
    const [detalhes, setDetalhes] = useState<any>(null);
    const [divVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!divVisible);
    };

    const router = useRouter();

    const { onOpen } = useModal();

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

    function getRenewalDate() {
        const today = new Date();
        const expirationDate = detalhes?.data.DataValidade ? new Date(detalhes?.data.DataValidade) : null;
        
        if (expirationDate && expirationDate <= today) {
            const newDate = new Date(today);
            newDate.setFullYear(newDate.getFullYear() + 1);
            return formatDate(newDate);
        } else if (expirationDate && expirationDate > today) {
            const newDate = new Date(expirationDate);
            newDate.setFullYear(newDate.getFullYear() + 1);
            return formatDate(newDate);
        } else {
            return "";
        }
    }
    
    function formatDate(date: Date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
    
    
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent style={{ width: '1050px' }} className=" pt-0">
                <Popover>
                    <Tabs className="w-full" defaultValue="general">
                        <PopoverAnchor>
                            <TabsList className=" bg-white gap-0">
                                <TabsTrigger value="Licença">Licença</TabsTrigger>
                                <TabsTrigger value="Outras">Outras Informações</TabsTrigger>
                            </TabsList>
                        </PopoverAnchor>
                        <TabsContent value="Licença" className="mt-0">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Licença</h3>
                            </div>
                            <div className="grid gap-2 grid-cols-2">
                                <div className="">
                                    <table className="">
                                        <tbody>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Num. Licença :</td>
                                                <td className="py-2">{detalhes?.data.NumSerie}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">NIF:</td>
                                                <td className="py-2">{detalhes?.data.NIF}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Tipo Licença:</td>
                                                <td className="py-2">{detalhes?.data.TipoLicenca}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Versão Licença:</td>
                                                <td className="py-2">{detalhes?.data.Versao}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Revendedor:</td>
                                                <td className="py-2">{detalhes?.data.Revendedor}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Empresa:</td>
                                                <td className="py-2">{detalhes?.data.empresaNome}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="">
                                    <table className=" px-">
                                        <tbody>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Posto :</td>
                                                <td className="py-2">{detalhes?.data.NumPosto}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Config Progama :</td>
                                                <td className="py-2">{detalhes?.data.ConfiguracaoPrograma}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Tipo Programa:</td>
                                                <td className="py-2">{detalhes?.data.TipoPrograma} <span className=" text-white select-none">*******************************</span> </td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Versão Licença:</td>
                                                <td className="py-2">{detalhes?.data.Versao}</td>
                                            </tr>
                                            <tr className=" border-t-2 border-zinc-300 hover:bg-zinc-100">
                                                <td className="py-2 pr-4">Data Validade:</td>
                                                <td className={`${getClassForDate(detalhes?.data.DataValidade)} py-2`}>{detalhes?.data.DataValidade.substring(0, 10)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="grid gap-1 grid-cols-2 mt-4">
                                <div>
                                    <PopoverTrigger asChild>
                                        <Button size="sm" >Renovar</Button>
                                    </PopoverTrigger>
                                </div>
                                <div className="flex justify-end ">
                                    <Download className="cursor-pointer" onClick={onInstalar}/>
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
                    <PopoverContent className="w-96 mt-24" align="center">
                        <div>
                            <div>Confirmação</div>
                            <div>Tem a certeza que quer renovar a licença para {getRenewalDate()}?</div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => onConfirm(detalhes?.data.UniqueID, detalhes?.data.DataValidade)} size="sm">Confirmar</Button>
                            <PopoverClose className="px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90">Cancelar</PopoverClose>
                        </div>
                    </PopoverContent>
                </Popover>
            </DialogContent>
        </Dialog>
    )
}