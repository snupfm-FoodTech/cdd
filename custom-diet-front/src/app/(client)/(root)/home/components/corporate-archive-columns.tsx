'use client';

import { Company } from '@/types/corporate.type';
import { ColumnDef } from '@tanstack/react-table';

export const corporateColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'coTpNm',
    header: '기업 종류',
    cell: ({ row }) => {
      const value: string = row.getValue('coTpNm');
      return (
        <span className="block text-nowrap text-center text-primary">
          {value}
        </span>
      );
    }
  },
  {
    accessorKey: 'coNm',
    header: '기업명',
    cell: ({ row }) => {
      const value: string = row.getValue('coNm');
      return (
        <span className="line-clamp-1 text-center lg:max-w-40 2xl:max-w-60">
          {value}
        </span>
      );
    }
  },
  {
    accessorKey: 'coRepNm',
    header: '대표자명',
    cell: ({ row }) => {
      const value: string = row.getValue('coRepNm');
      return <span className="block text-nowrap text-center">{value}</span>;
    }
  }
];
