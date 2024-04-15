import EmpresasTable from "@/components/tables/empresasTable";

const Empresas = () => {
    return (
        <div className="w-full py-12">
            <div className="container px-4 grid gap-4 text-center md:gap-8 md:px-6 md:grid-col-1">
                <div className="space-y-2">
                    <h1 className="mt-0 text-3xl font-bold tracking-tighter sm:text-2xl md:text-4xl">Empresas</h1>
                </div>
                <div className="space-y-4">
                    <EmpresasTable/>
                </div>
            </div>
        </div>
    );
};
  
export default Empresas;
