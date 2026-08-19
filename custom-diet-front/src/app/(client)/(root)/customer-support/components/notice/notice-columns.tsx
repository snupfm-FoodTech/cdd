'use client';

import { Icons } from '@/components/icons';
import { Notice } from '@/types/notice.type';
import { getAttachment } from '@/utils/file.util';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export const noticeColumns: ColumnDef<Notice>[] = [
  {
    accessorKey: 'no',
    header: 'No',
    cell: ({ row }) => {
      const value: string = row.getValue('no');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'ntcTit',
    header: '제목',
    cell: ({ row }) => {
      const value: string = row.getValue('ntcTit');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'creDt',
    header: '등록일',
    cell: ({ row }) => {
      const value: string = row.getValue('creDt');
      return <span className="block text-center">{value}</span>;
    }
  },
  {
    accessorKey: 'ntcAtchUrls',
    header: '링크',
    cell: ({ row }) => {
      const value: string[] = row.getValue('ntcAtchUrls');

      if (Array.isArray(value) && value.length > 0) {
        return (
          <Link
            target="_blank"
            href={getAttachment(value[0])}
            rel="noopener noreferrer"
          >
            <Icons.document strokeWidth={1} className="mx-auto" />
          </Link>
        );
      }

      return <span className="text-muted-foreground"></span>;
    }
  }
];
