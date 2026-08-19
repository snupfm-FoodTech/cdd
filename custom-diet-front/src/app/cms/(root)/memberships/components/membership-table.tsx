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
import { CMS_MEMBERSHIPS_URL } from '@/constants/routes';
import { Membership } from '@/types/membership.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface MembershipTableProps {
  columns: ColumnDef<Membership>[];
  data: Membership[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const MembershipTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: MembershipTableProps) => {
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

  const handleRowClick = (row: Row<Membership>) => {
    router.push(`${CMS_MEMBERSHIPS_URL}/${row.original.usrId}`);
  };

  return <CMSTable table={table} onRowClick={handleRowClick} />;
};

export default MembershipTable;
