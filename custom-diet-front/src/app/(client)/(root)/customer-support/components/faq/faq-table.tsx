'use client';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  useReactTable
} from '@tanstack/react-table';

import CMSTable from '@/components/cms-table';
import { Skeleton } from '@/components/ui/skeleton';
import { CLIENT_FAQ_URL } from '@/constants/routes';
import { FAQ } from '@/types/faq.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatDate } from '@/utils/date.util';
import { Button } from '@/components/ui/button';

interface FAQTableProps {
  columns: ColumnDef<FAQ>[];
  data: FAQ[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const FAQTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: FAQTableProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const visibleColumnKeysMobile = ['no', 'faqQueCtnt'];

  const expandedColumn: ColumnDef<FAQ> = {
    id: 'expanded',
    header: '',
    cell: ({ row }) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          row.toggleExpanded();
        }}
        className="flex w-full items-center justify-center"
      >
        {row.getIsExpanded() ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
    ),
    size: 40
  };

  const tableColumns = useMemo(() => {
    const baseColumns = loading
      ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-5" />
        }))
      : columns;

    let filteredColumns = baseColumns;

    if (isMobile) {
      filteredColumns = baseColumns.filter(
        (col) =>
          'accessorKey' in col &&
          visibleColumnKeysMobile.includes(col.accessorKey as string)
      );
    }

    // if mobile and tablet add expanded column
    if (isMobile) {
      filteredColumns = [expandedColumn, ...filteredColumns];
    }

    return filteredColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, columns, isMobile]);

  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : data),
    [loading, data]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    rowCount: total,
    state: {
      expanded,
      pagination
    },
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (newPagination) => onPaginationChange(newPagination),
    manualPagination: true
  });

  const handleRowClick = (row: Row<FAQ>) => {
    router.push(`${CLIENT_FAQ_URL}/${row.original.faqId}`);
  };

  if (!isMounted) return null;

  return (
    <CMSTable
      table={table}
      onRowClick={(row, event) => {
        if (isMobile) {
          row.toggleExpanded();
        } else {
          handleRowClick(row);
        }
      }}
      renderSubRow={
        isMobile
          ? (row) => (
              <div className="flex flex-col gap-3 p-4 text-left text-sm">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">가입일</div>
                  <div className="wrap-anywhere">{row.original.creDt}</div>
                </div>
                <div className="flex">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => {
                      router.push(`${CLIENT_FAQ_URL}/${row.original.faqId}`);
                    }}
                  >
                    자세히 보기
                  </Button>
                </div>
              </div>
            )
          : undefined
      }
    />
  );
};

export default FAQTable;
