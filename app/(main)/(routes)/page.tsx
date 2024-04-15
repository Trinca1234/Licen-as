import { CalendarCheckIcon, CheckIcon, FileIcon, UserCheckIcon } from "lucide-react";
import Link from "next/link"
import myImage from '@/images/gajo.jpg';
import Image from "next/image";

{/* <Image
  alt="Image"
  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
  height="310"
  src={myImage}
  width="550"
/> */}
const HomePage = () => {
  return (
    <>
      <section className=" py-12 absolute top-0 mt-0">
        <div className="container grid gap-6 px-4 md:px-6">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Renove licenças com facilidade</h1>
            <p className="max-w-[600px] text-gray-500/70 md:text-xl">
              Muita facilidade.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-3">
            <div className="flex flex-col items-center space-y-1 text-center">
              <UserCheckIcon className="w-12 h-12 rounded-full border p-3 text-2xl text-gray-400 border-gray-200 dark:border-gray-800 dark:text-gray-400" />
              <h3 className="font-semibold">Renovação de Licenças</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Renovações muita fixes.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-1 text-center">
              <CalendarCheckIcon className="w-12 h-12 rounded-full border p-3 text-2xl text-gray-400 border-gray-200 dark:border-gray-800 dark:text-gray-400" />
              <h3 className="font-semibold">Alguma coisa</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fazemos coisas.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-1 text-center">
              <FileIcon className="w-12 h-12 rounded-full border p-3 text-2xl text-gray-400 border-gray-200 dark:border-gray-800 dark:text-gray-400" />
              <h3 className="font-semibold">Assistência</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Não sei vai ao chatgpt.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 absolute bottom-0 mb-0">
        <div className="container grid items-center gap-4 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Renovação de Liceças FACEIS</h2>
              <p className="max-w-[600px] items-center text-gray-500/70 md:text-xl lg:text-base xl:text-xl/70 dark:text-gray-400/70">
                Nós fazemos muitas coisas fixes.
              </p>
            </div>
            <Link
              className="inline-flex h-9 items-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage;