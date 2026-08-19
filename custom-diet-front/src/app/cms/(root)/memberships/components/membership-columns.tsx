'use client';
import { Membership } from '@/types/membership.type';
import { formatDate } from '@/utils/date.util';
import { ColumnDef } from '@tanstack/react-table';

export const membershipColumns: ColumnDef<Membership>[] = [
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
    accessorKey: 'usrNm',
    header: '회원명',
    size: 400
  },
  {
    accessorKey: 'usrEml',
    header: '이메일'
  },
  {
    accessorKey: 'creDt',
    header: '가입일',
    size: 200,
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{formatDate(value)}</span>;
    }
  },
  {
    accessorKey: 'usrLstLoginDt',
    header: '최근 로그인 일자',
    size: 200,
    cell: ({ row }) => {
      const value: string = row.getValue('usrLstLoginDt');
      return <span className="block text-center">{value}</span>;
    }
  }
];
