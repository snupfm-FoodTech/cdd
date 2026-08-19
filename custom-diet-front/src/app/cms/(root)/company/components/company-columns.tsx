'use client';
import { Company } from '@/types/corporate.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';

export const companyColumns: ColumnDef<Company>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    size: 50
  },
  {
    accessorKey: 'coNm',
    header: '기업명',
    size: 400
  },
  {
    accessorKey: 'coTpNm',
    header: '기업 유형'
  },
  {
    accessorKey: 'coEstDt',
    header: '등록일자',
    size: 200,
    cell: ({ row }) => {
      const value: string = row.getValue('coEstDt');
      return <span className="block text-center">{formatDate(value)}</span>;
    }
  },
  {
    accessorKey: 'coViewQtt',
    header: '조회수',
    size: 200
  }
];
