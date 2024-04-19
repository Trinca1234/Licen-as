"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import { Building, CircleUser, HomeIcon, Menu, ScrollText, SettingsIcon, Tally3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { GetCookie } from '@/lib/getCookie';

const NavBar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const isLogin = async () => {
            try {
                const fetchedData = await GetCookie();
                console.log(fetchedData);
                if (!fetchedData) return;
                setLogin(true);
    
            } catch (error) {
                console.error('Error fetching licença:', error);
            }
        };
    
        isLogin();
      }, []);

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    };

    return ( 
        <header>
            {login  && (
                <div>
                    <button onClick={toggleLinks} className="w-auto text-left px-4 py-2 bg-gray-200 dark:bg-gray-700 focus:outline-none">
                        {showLinks ? <Tally3 /> : <Menu/>}
                    </button>
                    <div className={`flex-1 grid gap-2.5`}>
                        <Link
                            className={` ${showLinks ? 'pl-6 w-52 pr-2' : 'pl-3 w-0'}group flex h-16 items-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800`}
                            href="/empresas"
                        >
                            <Building className="h-8 w-8" />
                            <span className={`ml-5 text-lg font-medium ${showLinks ? '' : 'hidden'}`}>Empresas</span>
                        </Link>
                        <Link
                            className={` ${showLinks ? 'pl-6 w-52' : 'pl-3 w-0'}group flex h-16 items-center text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800`}
                            href="/licencas"
                        >
                            <ScrollText className="h-8 w-8" />
                            <span className={`ml-5 text-lg font-medium ${showLinks ? '' : 'hidden'}`}>Licenças</span>
                        </Link>
                        
                        
                        {login && (
                            <div className={` ${showLinks ? 'bottom-0 absolute' : 'bottom-0 absolute'}`}>
                            <Link href="/account" className={` ${showLinks ? 'pl-6 w-52' : 'pl-3 w-0'}absolute group flex h-16 items-center text-gray-500 dark:text-gray-400 dark:border-gray-800/40 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-gray-800`}>
                            <CircleUser className="h-8 w-8" />
                            <span className={`ml-5 text-lg font-medium ${showLinks ? '' : 'hidden'}`}>Settings</span>
                            </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default NavBar;