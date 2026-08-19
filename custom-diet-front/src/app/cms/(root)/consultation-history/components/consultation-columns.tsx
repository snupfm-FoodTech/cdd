'use client';

import { Consultation } from '@/types/consultation.type';
import { ColumnDef } from '@tanstack/react-table';

export const ConsultationColumns: ColumnDef<Consultation>[] = [
  {
    accessorKey: 'id',
    header: 'No',
    cell: ({ row }) => {
      const value: string = row.getValue('id');
      return <span className="block text-center">{value}</span>;
    },
    size: 100
  },
  {
    accessorKey: 'companyName',
    header: '기업명',
    cell: ({ row }) => {
      const value: string = row.getValue('companyName');
      return <span className="block text-center">{value}</span>;
    },
    size: 800
  },
  {
    accessorKey: 'solutionTitle',
    header: '제목',
    cell: ({ row }) => {
      const value: string = row.getValue('solutionTitle');
      return <span className="block text-center">{value}</span>;
    },
    size: 600
  },
  {
    accessorKey: 'senderName',
    header: '신청자명',
    cell: ({ row }) => {
      const value: string = row.getValue('senderName');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'senderPhoneNo',
    header: '휴대폰 번호',
    cell: ({ row }) => {
      const value: string = row.getValue('senderPhoneNo');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'senderEmail',
    header: '이메일',
    cell: ({ row }) => {
      const value: string = row.getValue('senderEmail');
      return <span className="block text-center">{value}</span>;
    },
    size: 400
  },
  {
    accessorKey: 'companyBizNo',
    header: '사업자등록번호',
    cell: ({ row }) => {
      const value: string = row.getValue('companyBizNo');
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
  }
];
