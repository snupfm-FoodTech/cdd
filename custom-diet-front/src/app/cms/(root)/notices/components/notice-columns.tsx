'use client';
import { Notice } from '@/types/notice.type';
import { ColumnDef } from '@tanstack/react-table';

export const noticeColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: 'no',
    size: 10,
    header: () => {
      return <div className='text-center'> No </div>
    },
    cell: ({ row }) => {
      const value: string = row.getValue('no');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'ntcTit',
    header: () => {
      return <div className='text-center'> 공지내용 </div>
    },
    size: 600
  },
  {
    accessorKey: 'creDt',
    header: () => {
      return <div className='text-center'> 공지일자 </div>
    },
    size: 200,
  }
];
