'use client';

import { Knowledge } from '@/types/knowledge.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';

export const knowledgeColumns: ColumnDef<Knowledge>[] = [
  {
    accessorKey: 'kwlgFuncTpNm',
    header: '문헌 종류 (기능성)',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgFuncTpNm');
      return (
        <span className="block text-nowrap text-center text-primary">
          {value}
        </span>
      );
    }
  },
  {
    accessorKey: 'kwlgDietTpNm',
    header: '문헌 종류 (식이)',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgDietTpNm');
      return (
        <span className="block text-nowrap text-center text-primary">
          {value}
        </span>
      );
    }
  },
  {
    accessorKey: 'kwlgTit',
    header: () => <span className='text-center'>문헌 제목</span>,
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgTit');
      return <span className="text-center whitespace-nowrap">{value}</span>;
    },
  },
  {
    accessorKey: 'creDt',
    header: '문헌 등록일',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return (
        <span className="block text-nowrap text-center">
          {formatDate(value)}
        </span>
      );
    },
    size: 200
  }
];
