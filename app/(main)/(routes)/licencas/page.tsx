import LicencaTable from "@/components/tables/licencasTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
    try {
        
        const cookieStore = cookies()
        const cookieData = cookieStore.get('userData')
        if(!cookieData){
            return null;
        }else{
            const user = JSON.parse(cookieData?.value).user
            const licencasResponse = await fetch('http://localhost:3000/api/licencas?id=' + user.Revendedor, { method: 'GET', next: { revalidate: 3600 } });
            const licencasData = await licencasResponse.json();
            const repo = {
                licencas: licencasData,
                registos: user.registos
            };
            return repo
        }

    } catch (error) {
        console.log(error);
        return null
    }
};

export default async function Licencas(){

    const repo = await getData();
    if(!repo){
        redirect('/login');
    }else{
        console.log(repo.registos);
    }

    return (
        <div className="w-full h-full">
            <div className="container px-4 grid gap-4 text-center md:gap-8 md:px-6 md:grid-col-1">
                <div className="space-y-2">
                    <h1 className="mt-5 text-3xl font-bold tracking-tighter sm:text-2xl md:text-4xl">Licenças</h1>
                </div>
                <div className="space-y-4 mb-5">
                    <LicencaTable licenca={repo?.licencas} registo={repo?.registos}/>
                </div>
            </div>
        </div>
    )
}