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
import { CMS_BUSINESS_SOLUTION_URL } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { BusinessSolution } from '@/types/business-solution.type';
import { SolutionType } from '@/api-client/open.api';

interface CMSBusinessSolutionTableProps {
  columns: ColumnDef<SolutionType>[];
  data: SolutionType[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const BusinessSolutionTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: CMSBusinessSolutionTableProps) => {
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
    () => (loading ? Array(10).fill({}) : data),
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

  const handleRowClick = (row: Row<BusinessSolution>) => {
    router.push(`${CMS_BUSINESS_SOLUTION_URL}/${row.original.id}`);
  };

  return <CMSTable table={table} onRowClick={handleRowClick} />;
};

export default BusinessSolutionTable;
