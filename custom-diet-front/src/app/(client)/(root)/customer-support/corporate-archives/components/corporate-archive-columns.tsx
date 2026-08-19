'use client';

import { Company } from '@/types/corporate.type';
import { ColumnDef } from '@tanstack/react-table';
import { getYear } from 'date-fns';

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: ({ row }) => {
      const value: string = row.getValue('no');
      return <span className="block text-center">{value}</span>;
    },
    size: 50
  },
  {
    accessorKey: 'coTpNm',
    header: '기업 유형',
    cell: ({ row }) => {
      const value: string = row.getValue('coTpNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 250
  },
  {
    accessorKey: 'coNm',
    header: '기업명',
    cell: ({ row }) => {
      const value: string = row.getValue('coNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'coRepNm',
    header: '대표자명',
    cell: ({ row }) => {
      const value: string = row.getValue('coRepNm');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'coSzNm',
    header: '기업 규모',
    cell: ({ row }) => {
      const value: string = row.getValue('coSzNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 150
  },
  {
    accessorKey: 'coEstDt',
    header: '설립년도',
    cell: ({ row }) => {
      const value: string = row.getValue('coEstDt');
      return <span className="block text-center">{getYear(value) || ''}</span>;
    },
    size: 100
  }
];
