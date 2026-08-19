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
import { USER_QA_URL } from '@/constants/routes';
import { QA } from '@/types/qa.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/date.util';

interface QATableProps {
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
}: QATableProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [isMounted, setIsMounted] = useState(false);

  const visibleColumnKeysMobile = ['queTit'];

  const expandedColumn: ColumnDef<QA> = {
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

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

  const handleRowClick = (row: Row<QA>) => {
    router.push(`${USER_QA_URL}/${row.original.queId}`);
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
                  <div className="font-semibold">등록일자</div>
                  <div className="wrap-anywhere">
                    {formatDate(row.original.creDt)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">상태</div>
                  <div className="wrap-anywhere">{row.original.queSttNm}</div>
                </div>
                <div className="flex">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => {
                      router.push(`${USER_QA_URL}/${row.original.queId}`);
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

export default QATable;
