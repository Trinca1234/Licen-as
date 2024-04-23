"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { GetCookie } from '@/lib/getCookie';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  RefreshCcw,
  SearchIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Empresa {
  NIF: string;
  Pais: string;
  Nome: string;
  CP: string;
  EMail: string;
  Morada1: string;
  Contacto: string;
}
 
const EmpresasTable = () => {
  const [data, setData] = useState<{ Utilizador: string } | null>(null);
  const [empresas, setEmpresas] = useState<Empresa[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('desc');
  const [sortBy, setSortBy] = useState<'NIF' | 'Pais' | ''>('NIF');
  const [itemsPerPage, setItemsPerPage] = useState<number>(9);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetCookie();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchEmpresas = async () => {
      if (!data) return;

      try {
        const url = queryString.stringifyUrl({
          url: '/api/empresas',
          query: {
            id: data.Utilizador,
          },
        });
        const result = await axios.get<Empresa[]>(url);
        setEmpresas(result.data);
      } catch (error) {
        console.error('Error fetching empresa:', error);
      }
    };

    fetchEmpresas();
  }, [data]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleSortByNIF = () => {
    if (sortBy === 'NIF' && sortDirection === 'desc') {
      setSortBy('NIF');
      setSortDirection('asc');
    } else {
      setSortBy('NIF');
      setSortDirection('desc');
    }
  };

  const handleSortByPais = () => {
    if (sortBy === 'Pais' && sortDirection === 'desc') {
      setSortBy('Pais');
      setSortDirection('asc');
    } else {
      setSortBy('Pais');
      setSortDirection('desc');
    }
  };

  const filteredEmpresas = empresas
  ? empresas.filter((empresa) =>
      Object.values(empresa).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  : [];

  let sortedEmpresas = [...(filteredEmpresas || []) as Empresa[]];

  if (sortBy) {
    sortedEmpresas.sort((a, b) => {
      const keyA = a[sortBy];
      const keyB = b[sortBy];
      if (sortDirection === 'asc') {
        return keyA < keyB ? -1 : 1;
      } else {
        return keyA > keyB ? -1 : 1;
      }
    });
  }

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: Empresa[] | null = sortedEmpresas.slice(indexOfFirstItem, indexOfLastItem);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!data) {
        router.push("/login");
      }
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, [data, router]);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center">
        <SearchIcon className="ml-2 absolute h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input 
          className="pl-8 w-full h-9 border border-gray-300 rounded-l focus:outline-none focus:border-primary"
          placeholder="Search..." 
          type="search" 
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByNIF}>
                <div className="flex items-center">
                  NIF{' '}
                  {sortBy === 'NIF' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByPais}>
                <div className="flex items-center">
                  País{' '}
                  {sortBy === 'Pais' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Morada</TableHead>
              <TableHead>Código Postal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems &&
              currentItems.map((empresa: Empresa) => (
                <TableRow key={empresa.NIF}>
                  <TableCell>{empresa.NIF}</TableCell>
                  <TableCell>{empresa.Pais}</TableCell>
                  <TableCell>{empresa.Nome}</TableCell>
                  <TableCell>{empresa.EMail || ""}</TableCell>
                  <TableCell>{empresa.Morada1}</TableCell>
                  <TableCell>{empresa.CP}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredEmpresas?.length || 0)}{' '}
            of {filteredEmpresas?.length}
          </span>
        </div>
        <div className="flex items-center mt-2">
          <span className="mr-2">Registos por página:</span>
          <input
            className="border border-gray-300 rounded focus:outline-none focus:border-primary px-2 py-1"
            type="number"
            min="1"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="rounded-l-full"
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <ChevronsLeftIcon className="h-4 w-4" />
            <span className="sr-only">Go to first page</span>
          </Button>
          <Button
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Go to previous page</span>
          </Button>
          <div className="flex h-10 w-20 items-center justify-center rounded border border-gray-200 dark:border-gray-800">
            {currentPage}
          </div>
          <Button
            size="icon"
            variant="outline"
            disabled={indexOfLastItem >= (empresas?.length || 0)}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Go to next page</span>
          </Button>
          <Button
            className="rounded-r-full"
            size="icon"
            variant="outline"
            disabled={indexOfLastItem >= (empresas?.length || 0)}
            onClick={() =>
              setCurrentPage(Math.ceil((empresas?.length || 0) / itemsPerPage))
            }
          >
            <ChevronsRightIcon className="h-4 w-4" />
            <span className="sr-only">Go to last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmpresasTable;