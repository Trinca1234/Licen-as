"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { GetCookie } from '../../functions/cookie/route';
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
import { useModal } from '@/hooks/use-modal-store';
import { useRouter } from 'next/navigation';

interface Licenca {
  ID: string;
  NIF: string;
  Utilizador: string;
  DataValidade: string;
  UniqueID: string;
  TipoLicenca: string;
  NumPosto: string;
  vendedorNome: string;
}

const LicencaTable = () => {
  const [data, setData] = useState<{ Revendedor: string } | null>(null);
  const [licenca, setLicenca] = useState<Licenca[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('desc');
  const [sortBy, setSortBy] = useState<'NIF' | 'TipoLicenca' | 'ID'| 'DataValidade' | ''>('DataValidade');
  const itemsPerPage: number = 9;

  const router = useRouter();

  const { onOpen } = useModal();

  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

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
    const fetchLicenca = async () => {
      if (!data ) return;
      try {
        const url = queryString.stringifyUrl({
          url: '/api/licencas',
          query: {
            id: data.Revendedor,
          },
        });
        const result = await axios.get<Licenca[]>(url);
        setLicenca(result.data);
      } catch (error) {
        console.error('Error fetching licença:', error);
      }
    };

    fetchLicenca();
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

  const handleSortByID = () => {
    if (sortBy === 'ID' && sortDirection === 'desc') {
      setSortBy('ID');
      setSortDirection('asc');
    } else {
      setSortBy('ID');
      setSortDirection('desc');
    }
  };

  const handleSortByTipoLicenca = () => {
    if (sortBy === 'TipoLicenca' && sortDirection === 'desc') {
      setSortBy('TipoLicenca');
      setSortDirection('asc');
    } else {
      setSortBy('TipoLicenca');
      setSortDirection('desc');
    }
  };

  const handleSortByDataValidade = () => {
    if (sortBy === 'DataValidade' && sortDirection === 'desc') {
      setSortBy('DataValidade');
      setSortDirection('asc');
    } else {
      setSortBy('DataValidade');
      setSortDirection('desc');
    }
  };

  const refreshSearch = async () => {
    try {
      const fetchedData = await GetCookie();
      if (!fetchedData) return;
      
      const url = queryString.stringifyUrl({
        url: '/api/licencas',
        query: {
          id: fetchedData.Revendedor,
        },
      });
      const result = await axios.get<Licenca[]>(url);
      setLicenca(result.data);
    } catch (error) {
      console.error('Error fetching licença:', error);
    }
  };
  

  const filteredLicenca = licenca
  ? licenca.filter((item: Licenca) =>
      Object.values(item).some((value: string | number) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  : [];

  const sortedLicenca = [...filteredLicenca];


  if (sortBy === 'NIF') {
    sortedLicenca.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.NIF.localeCompare(b.NIF);
      } else {
        return b.NIF.localeCompare(a.NIF);
      }
    });
  } else if (sortBy === 'ID') {
    sortedLicenca.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.ID.localeCompare(b.ID);
      } else {
        return b.ID.localeCompare(a.ID);
      }
    });
  } else if (sortBy === 'TipoLicenca') {
    sortedLicenca.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.TipoLicenca.toString().localeCompare(b.TipoLicenca);
      } else {
        return b.TipoLicenca.toString().localeCompare(a.TipoLicenca);
      }
    });
  } else if (sortBy === 'DataValidade') {
    sortedLicenca.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.DataValidade.localeCompare(b.DataValidade);
      } else {
        return b.DataValidade.localeCompare(a.DataValidade);
      }
    });
  }


  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: Licenca[] = sortedLicenca.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!data) {
        router.push("/login");
      }
    }, 5000);
  
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
        <Button 
          onClick={refreshSearch} 
          className="ml-2" 
          size="sm" 
          variant="outline"
        >
          <RefreshCcw/>
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByID}>
              <div className="flex items-center">
                <span>ID</span>
                {sortBy === 'ID' && (
                  <span className="ml-1">
                    {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                  </span>
                )}
              </div>
              </TableHead>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByNIF}>
                <div className="flex items-center">
                  <span>NIF</span>
                  {sortBy === 'NIF' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className=' select-none'>Vendedor</TableHead>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByTipoLicenca}>
                <div className="flex items-center">
                  <span>Tipo Licença</span>
                  {sortBy === 'TipoLicenca' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className='cursor-pointer select-none' onClick={handleSortByDataValidade}>
                <div className="flex items-center">
                    <span>Validade</span>
                  {sortBy === 'DataValidade' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {currentItems.map((licenca: Licenca) => {
            let textColor = '';

            const dataValidade = new Date(licenca.DataValidade);

            if (dataValidade < today) {
              textColor = 'red';
            } else if (dataValidade <= nextMonth) {
              textColor = 'yellow';
            }

            return (
              <TableRow key={licenca.UniqueID}>
                <td className=' h-10 '>{licenca.ID}</td>
                <td>{licenca.NIF}</td>
                <td>{licenca.vendedorNome}</td>
                <td>{licenca.TipoLicenca}</td>
                <td style={{ color: textColor }}>{licenca.DataValidade.substring(0, 10)}</td>
                <td>
                  <button onClick={() => onOpen("renovarLicenca", { id: licenca.UniqueID })} className='border my-1 border-zinc-900 rounded bg-black text-white p-1'>
                    Detalhes
                  </button>
                </td>
              </TableRow>
            );
          })}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">
            {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLicenca.length)}{' '}
            of {filteredLicenca.length}
          </span>
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
            disabled={indexOfLastItem >= filteredLicenca.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
            <span className="sr-only">Go to next page</span>
          </Button>
          <Button
            className="rounded-r-full"
            size="icon"
            variant="outline"
            disabled={indexOfLastItem >= filteredLicenca.length}
            onClick={() =>
              setCurrentPage(Math.ceil(filteredLicenca.length / itemsPerPage))
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

export default LicencaTable;