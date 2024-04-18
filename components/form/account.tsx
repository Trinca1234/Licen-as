"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DeleteUserDataCookie, GetCookie } from "@/functions/cookie/route";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import queryString from "query-string";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CookieData {
    EMail: string;
    Nome: string;
}

const FormSchema = z.object({
    currentPassword: z.string().min(1, {
        message: "Password invalida"
    }),
    password: z.string().min(1, {
        message: "Password invalida"
    }),
    passwordConfirmation: z.string().min(1, {
        message: "Password inválido"
    })
}).refine(data => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem",
    path: ["passwordConfirmation"],
});

const Account = () => {
    const [cookie, setCookie] = useState<CookieData | null>(null);
    const router = useRouter();

    useEffect(() => {
        const isLogin = async () => {
            try {
                const fetchedData = await GetCookie();
                if (!fetchedData) return;
                setCookie(fetchedData);
            } catch (error) {
                console.error('Error fetching licença:', error);
            }
        };

        isLogin();
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          currentPassword: "",
          password: "",
          passwordConfirmation: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const url = queryString.stringifyUrl({
            url: '/api/recuperarPassword/changePassword2',
            query: {
                email: cookie?.EMail,
                currentPassword: values.currentPassword,
                newPassword: values.password
            }
        });

        console.log(cookie?.EMail);
        console.log(values.currentPassword);
        console.log(values.password);

        const login = await axios.patch(url);

        console.log(login.request.response);

        form.reset();
        router.push("/");
    };

    return ( 
        <Card className="w-full h-full p-10 border-0">
            <div className="flex items-center space-x-6">
                <Avatar className="h-12 w-12">
                <AvatarImage alt="Avatar"/>
                <AvatarFallback>
                    ;-;
                </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold">{cookie && cookie.Nome}</h1>
                    <p className="text-gray-500 dark:text-gray-400">{cookie && cookie.EMail}</p>
                </div>
            </div>
            <Separator className="my-8" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Mudar Password</h2>
                        <div className="space-y-2"> 
                            <Label htmlFor="current-password">Password</Label>
                            <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl> 
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="space-y-2"> 
                            <Label htmlFor="current-password">Nova Password</Label>
                            <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl> 
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Confirmar Nova Password</Label>
                            <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <Button className="w-full" type="submit">Mudar Password</Button>
                        <div className="mt-6 text-center text-sm">
                            <div 
                            className="underline cursor-pointer" 
                            onClick={() => {
                                DeleteUserDataCookie();
                                window.location.href = '/login';
                            }}
                            >
                                Log out
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </Card>
    );
}
 
export default Account;