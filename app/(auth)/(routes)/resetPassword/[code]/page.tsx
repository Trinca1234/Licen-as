import React from 'react'
import PasswordRecoveryForm from "@/components/form/resetPasswordForm";
import { cookies } from 'next/headers'
import { error } from 'console';

interface resetPasswordProps{
    params:{
        code: string;
    }
};

async function getData() {
    try {
        
        const cookieStore = cookies()
        const cookieEmail = cookieStore.get('userEmail')
        const email = cookieEmail ? JSON.parse(cookieEmail.value).user : '';

        const repo = {
            email: email,
        };
        
        return repo
    } catch (error) {
        console.log(error);
        const repo = {
            email: "nao funceminou",
        };
        return repo
    }
};

export default async function ResetPasswordPage({
    params
}: resetPasswordProps) {
    const repo = await getData()

    if(!repo.email){
        repo.email = "231"
    }
    const code = params.code
    console.log(code);

    console.log(repo);

  return (
    <div>
        <PasswordRecoveryForm email={repo.email} code={code} />
    </div>
  )
}