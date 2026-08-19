'use client';

import { Knowledge } from '@/types/knowledge.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';
import KnowledgeActionCell from './knowledge-action-cell';

export const knowledgeColumns: ColumnDef<Knowledge>[] = [
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
    accessorKey: 'kwlgFuncTpNm',
    header: '문헌 종류 (기능성)',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgFuncTpNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 130
  },
  {
    accessorKey: 'kwlgDietTpNm',
    header: '문헌 종류 (식이)',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgDietTpNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 120
  },
  {
    accessorKey: 'kwlgTit',
    header: '문헌 제목',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgTit');
      return <span className="block text-center">{value}</span>;
    }
  },

  {
    accessorKey: 'kwlgAut',
    header: '저자',
    cell: ({ row }) => {
      const value: string = row.getValue('kwlgAut');
      return <span className="line-clamp-3 px-2 text-center">{value}</span>;
    },
    size: 200
  },
  {
    accessorKey: 'creDt',
    header: '문헌 등록일',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{formatDate(value)}</span>;
    },
    size: 100
  },
  {
    accessorKey: 'kwlgLinkUrl',
    header: '링크',
    cell: KnowledgeActionCell,
    size: 50
  }
];
