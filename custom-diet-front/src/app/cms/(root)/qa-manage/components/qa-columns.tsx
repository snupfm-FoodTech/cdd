'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { QA, QAStatus } from '@/types/qa.type';
import { ColumnDef } from '@tanstack/react-table';

export const QAColumns: ColumnDef<QA>[] = [
  {
    accessorKey: 'queId',
    header: 'No',
    cell: ({ row }) => {
      const value: string = row.getValue('queId');
      return <span className="block text-center">{value}</span>;
    },
    size: 100
  },
  {
    accessorKey: 'queTit',
    header: '문의내용',
    cell: ({ row }) => {
      const value: string = row.getValue('queTit');
      return <span className="block text-center">{value}</span>;
    },
    size: 800
  },
  {
    accessorKey: 'queUsrNm',
    header: '등록자',
    cell: ({ row }) => {
      const value: string = row.getValue('queUsrNm');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'creDt',
    header: '등록일자',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'queSttNm',
    header: '상태',
    cell: ({ row }) => {
      const value: string = row.getValue('queSttNm');
      const status = row.original.queSttCd as QAStatus;

      return (
        <Badge
          className={cn(
            status === QAStatus.OPEN &&
              'bg-orange-500/10 text-orange-500 hover:bg-orange-500/10 hover:text-orange-500',
            status === QAStatus.CLOSED &&
              'bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary'
          )}
        >
          {value}
        </Badge>
      );
    },
    size: 300
  }
];
