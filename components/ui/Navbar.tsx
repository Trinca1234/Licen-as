"use client"
import { useState } from 'react';
import Link from "next/link";
import { ActivityIcon, Building, HomeIcon, Menu, MessageSquareIcon, ScrollText, SettingsIcon, Tally3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { DeleteUserDataCookie } from '@/functions/cookie/route';

const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return ( 
        <header>
            <button onClick={toggleLinks} className="w-auto text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 focus:outline-none">
                {showLinks ? <Tally3 /> : <Menu/>}
                
            </button>
            <div className={`flex-1 grid gap-2.5 ${showLinks ? 'grid' : 'hidden'}`}>
                <Link
                    className="pl-10 group flex w-52 h-16 items-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800"
                    href="/"
                >
                    <HomeIcon className="h-8 w-8" />
                    <span className="ml-5 text-lg font-medium">Home</span>
                </Link>
                <Link
                    className="pl-10 group flex w-52 h-16 items-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800"
                    href="/empresas"
                >
                    <Building className="h-8 w-8" />
                    <span className="ml-5 text-lg font-medium">Empresas</span>
                </Link>
                <Link
                    className="pl-10 group flex w-52 h-16 items-center text-gray-500 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800"
                    href="/licencas"
                >
                    <ScrollText className="h-8 w-8" />
                    <span className="ml-5 text-lg font-medium">Licenças</span>
                </Link>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="absolute bottom-5 pl-10 group flex w-52 h-16 items-center text-gray-500 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800">
                            <SettingsIcon className="h-8 w-8" />
                            <span className="ml-5 text-lg font-medium">Settings</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-28">
                        <div className="grid gap-4">
                            <div 
                            onClick={() => window.location.href='/login'} 
                            className=' cursor-pointer py-1 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' 
                            >
                                Login
                            </div>
                            <div 
                            onClick={() => window.location.href='/registar'} 
                            className=' cursor-pointer py-1 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' 
                            >
                                Registar
                            </div>
                            <div
                                onClick={() => {
                                    DeleteUserDataCookie();
                                    window.location.href = '/login';
                                }}
                                className='cursor-pointer py-1 bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                            >
                                logout
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}

export default NavBar;