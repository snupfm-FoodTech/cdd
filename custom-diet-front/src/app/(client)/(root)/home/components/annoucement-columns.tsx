'use client';

import { Notice } from '@/types/notice.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';

export const announcementColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: 'ntcTit',
    header: '제목',
    cell: ({ row }) => {
      const value: string = row.getValue('ntcTit');
      return <span className="line-clamp-1">{value}</span>;
    }
  },
  {
    accessorKey: 'creDt',
    header: '작성일',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{formatDate(value)}</span>;
    },
    size: 200
  }
];
