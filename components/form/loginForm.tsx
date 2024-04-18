"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
import Link from "next/link"
import queryString from "query-string"
import axios from "axios"
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";

const FormSchema = z.object({
    email: z.string().min(1, {
        message: "Email obrigatório.",
    }).email({
        message: "Email inválido"
    }),
    password: z.string().min(1,{
        message: "Password obrigatório"
    })
})

const LoginForm = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })

    const onSubmit = async (values: z.infer<typeof FormSchema>)=>{
        const url = queryString.stringifyUrl({
            url: '/api/login',
            query: {
                email: values.email,
                password: values.password
            }
        });

        const login = await axios.get(url);

        console.log(login.request.response);
        
        if(login.data == "Invalid email"){
            form.setError("email", { 
                type: "manual",
                message: "Conta não existe"
            });
            return;
        }else if(login.data == "Invalid password"){
            form.setError("password", { 
                type: "manual",
                message: "Password incorreta"
            });
            return;
        }else if(login.data == "Conta Desativada"){
            form.setError("email", { 
                type: "manual",
                message: "Conta Desativada"
            });
            return;
        }

        form.reset();
        router.push("/licencas");
        const timeout = setTimeout(() => {
            window.location.reload();
        }, 1000);
    } 

    async function HandleReset(values: z.infer<typeof FormSchema>) {

        if(!values.email){
            return;
        }

        const OTP = Math.floor(Math.random() * 900000 + 100000);
        console.log(OTP);

        localStorage.setItem('email', values.email);

        const url = queryString.stringifyUrl({
            url: '/api/recuperarPassword',
            query: {
                email: values.email,
                otp: OTP
            }
        });

        const result = await axios.post(url);

        if(result.status==200){
            const serviceId = 'service_uyzmr3i';
            const templateId = 'template_2alndt9';
            const publicKey = 'Nz39Tq7vLRs-_yt5R';
    
            const templateParams = {
                message: "http://localhost:3000/resetPassword?code="+OTP.toString(),
                to: values.email
            }
            
            emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((response)=>{
                console.log("Email sent successfully! ", response);
                router.push("/confirm");
            })
            .catch((error)=>{ 
                console.error("Error sending email", error);
            });
        }else{
          console.log(result);
        }

    }

    return (
        <div>
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
                    </div>
                    <Button className=" w-full mt-6 " type="submit">Login</Button>
                </form>
                <div className=" mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 ">
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Esqueceste da palavra passe ?
                    <Link 
                    className="text-blue-500 hover:underline"
                    href="#"
                    onClick={()=> HandleReset(form.getValues())}
                    >
                        Recuperar
                    </Link>
                </p>
                <p className="text-center text-sm text-gray-600 mt-2">
                    Se não tiveres conta, porfavor . 
                    <Link className="text-blue-500 hover:underline" href="/register">Registrar</Link>
                </p>
            </Form>
        </div>
    );
}
 
export default LoginForm;