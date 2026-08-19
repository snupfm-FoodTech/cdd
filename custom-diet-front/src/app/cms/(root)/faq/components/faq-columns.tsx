'use client';
import { FAQ } from '@/types/faq.type';
import { ColumnDef } from '@tanstack/react-table';

export const faqColumns: ColumnDef<FAQ>[] = [
  {
    accessorKey: 'no',
    header: () => <span className="w-6 text-center">No</span>,
    cell: ({ row }) => {
      const value: string = row.getValue('no');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'faqQueCtnt',
    header: () => <span className="max-w-[60rem] text-center">자주 묻는 질문</span>,
    cell: ({ row }) => {
      const value: string = row.getValue('faqQueCtnt');
      return <p className="max-w-[60rem] truncate text-left">{value}</p>;
    }
  },
  {
    accessorKey: 'creDt',
    header: () => <span className="w-36 text-center">등록 날짜</span>,
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{value}</span>;
    }
  }
];
