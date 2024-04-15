"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useRouter } from "next/navigation";
import qs from "query-string";

const FormSchema = z
.object({
    email: z.string().min(1, {
        message: "Email obrigatório.",
    }).email({
        message: "Email inválido"
    }),
    nome: z.string().min(1,{
        message: "Nome obrigatório"
    }),
    password: z.string().min(1,{
        message: "Password obrigatório"
    }).min(9,{
        message: "Password tem que ser maior q 9 letras"
    }),
    confirmPassword: z.string().min(1, {
        message: "Cofirmação de password obrigatório.",
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords não são iguais"
})

const RegisterForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
        nome: "",
        password: "",
        confirmPassword: "",
      },
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>)=>{
        try{
            const url = qs.stringifyUrl({
                url: '/api/register',
                query: {
                    name: values.nome,
                    email: values.email,
                    password: values.password
                }
            });
    
            await axios.post(url);
    
            form.reset();
            router.refresh();
        }catch(error){
            console.log(error);
        }
    } 

    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="space-y-2">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button className=" w-full mt-6 " type="submit">Registrar</Button>
                </form>
                <div className=" mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 ">
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Se ja tivere conta, porfavor . 
                    <Link className="text-blue-500 hover:underline" href="/login">Login</Link>
                </p>
            </Form>
        </div>
    );
}
 
export default RegisterForm;