"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import queryString from "query-string";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
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

interface repo{
  email: string,
  code: string
}
 
export default function PasswordRecoveryForm({email, code}:repo) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    }
  });  

  async function Confirm() {
    try {
      const url = queryString.stringifyUrl({
          url: '/api/recuperarPassword/verificarCodigo',
          query: {
            email: email,
            codigo: code
          }
      });
      
      const result = await axios.get(url);

      console.log(result);

    } catch (error) {
      console.error(error);
      router.push("/login");
    } 
  }

  Confirm();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const url = queryString.stringifyUrl({
          url: '/api/recuperarPassword/changePassword',
          query: {
            email: email,
            password: values.password
          }
      });
      
      const result = await axios.patch(url);
      console.log(result); 

      if(result.status == 200){
        localStorage.removeItem("Confirmed");
        localStorage.removeItem("email");
        router.push("/login");
      }

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-2">
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
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confrimação de Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-6" type="submit">Confirmar</Button>
        </form>
      </Form>
    </div>
  )
}