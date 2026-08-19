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
import { CMS_QA_URL } from '@/constants/routes';
import { QA } from '@/types/qa.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface CMSQATableProps {
  columns: ColumnDef<QA>[];
  data: QA[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const QATable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: CMSQATableProps) => {
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
    onRowSelectionChange: () => {},
    onPaginationChange: (newPagination) => onPaginationChange(newPagination),
    manualPagination: true
  });

  const handleRowClick = (row: Row<QA>) => {
    router.push(`${CMS_QA_URL}/${row.original.queId}`);
  };

  return <CMSTable table={table} onRowClick={handleRowClick} />;
};

export default QATable;
