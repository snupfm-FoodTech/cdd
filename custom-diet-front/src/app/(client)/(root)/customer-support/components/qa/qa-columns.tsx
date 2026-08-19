'use client';

import { QA } from '@/types/qa.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';

export const QAColumns: ColumnDef<QA>[] = [
  {
    accessorKey: 'queTit',
    header: '문의내용',
    cell: ({ row }) => {
      const value: string = row.getValue('queTit');
      return <span className="block text-center">Q. {value}</span>;
    },
    size: 800
  },
  {
    accessorKey: 'creDt',
    header: '등록일자',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{formatDate(value)}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'queSttNm',
    header: '상태',
    cell: ({ row }) => {
      const value: string = row.getValue('queSttNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 300
  }
];
