'use client';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  useReactTable
} from '@tanstack/react-table';

import CMSTable from '@/components/cms-table';
import { Skeleton } from '@/components/ui/skeleton';
import { CMS_NOTICES_URL } from '@/constants/routes';
import { Notice } from '@/types/notice.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface NoticeTableProps {
  columns: ColumnDef<Notice>[];
  data: Notice[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const NoticeTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: NoticeTableProps) => {
  const router = useRouter();

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-8" />
          }))
        : columns,
    [loading, columns]
  );

  const tableData = useMemo(
    () =>
      loading
        ? Array(10).fill({})
        : data,
    [loading, data]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    rowCount: total,
    state: {
      pagination
    },
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (newPagination) => onPaginationChange(newPagination),
    manualPagination: true
  });

  const handleRowClick = (row: Row<Notice>) => {
    router.push(`${CMS_NOTICES_URL}/${row.original.ntcId}`);
  };

  return <CMSTable table={table} onRowClick={handleRowClick} />;
};

export default NoticeTable;
