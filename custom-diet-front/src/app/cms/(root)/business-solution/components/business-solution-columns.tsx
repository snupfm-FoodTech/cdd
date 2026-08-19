'use client';

import { SolutionType } from '@/api-client/open.api';
import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/date.util';
import TruncateText from '@/components/ui/truncate-text';

export const BusinessSolutionColumns: ColumnDef<SolutionType>[] = [
  {
    accessorKey: 'id',
    header: 'No',
    size: 50
  },
  {
    accessorKey: 'title',
    header: '카테고리 제목',
    size: 400
  },
  {
    accessorKey: 'description',
    header: '카테고리 내용',
    cell: ({ row }) => {
      const value: string = row.getValue('description');
      return (
        <TruncateText className="text-left text-sm" line={1} text={value} />
      );
    }
  },
  {
    accessorKey: 'updatedDate',
    header: '변경일',
    size: 200,
    cell: ({ row }) => {
      const value: string = row.getValue('updatedDate');
      return <span className="block text-center">{formatDate(value)}</span>;
    }
  }
];
