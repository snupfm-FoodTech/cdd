'use client';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  Row,
  useReactTable
} from '@tanstack/react-table';

import CMSTable from '@/components/cms-table';
import { Skeleton } from '@/components/ui/skeleton';
import { CORPORATE_ARCHIVES_URL } from '@/constants/routes';
import { Company } from '@/types/corporate.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getYear } from 'date-fns';
import { Button } from '@/components/ui/button';

interface CorporateArchiveTableProps {
  columns: ColumnDef<Company>[];
  data: Company[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const CompanyArchiveTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: CorporateArchiveTableProps) => {
  const router = useRouter();

  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const visibleColumnKeysMobile = ['no', 'coTpNm'];
  const visibleColumnKeysTablet = ['no', 'coTpNm', 'coNm'];

  const expandedColumn: ColumnDef<Company> = {
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
    } else if (isTablet) {
      filteredColumns = baseColumns.filter(
        (col) =>
          'accessorKey' in col &&
          visibleColumnKeysTablet.includes(col.accessorKey as string)
      );
    }

    // if mobile and tablet add expanded column
    if (isTablet || isMobile) {
      filteredColumns = [expandedColumn, ...filteredColumns];
    }

    return filteredColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, columns, isMobile, isTablet]);

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
    onPaginationChange: onPaginationChange,
    manualPagination: true
  });

  const handleRowClick = (row: Row<Company>) => {
    router.push(`${CORPORATE_ARCHIVES_URL}/${row.original.coId}`);
  };

  return (
    <CMSTable
      table={table}
      onRowClick={(row) => {
        if (isMobile || isTablet) {
          row.toggleExpanded();
        } else {
          handleRowClick(row);
        }
      }}
      renderSubRow={
        isTablet || isMobile
          ? (row) => (
              <div className="flex flex-col gap-3 p-4 text-left text-sm">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">기업명</div>
                  <div className="wrap-anywhere">{row.original.coNm}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">대표자명</div>
                  <div className="wrap-anywhere">{row.original.coRepNm}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">기업 규모</div>
                  <div className="wrap-anywhere">{row.original.coSzNm}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">설립년도</div>
                  <div className="wrap-anywhere">
                    {getYear(row.original.coEstDt)}
                  </div>
                </div>
                <div className="flex">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => {
                      router.push(
                        `${CORPORATE_ARCHIVES_URL}/${row.original.coId}`
                      );
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

export default CompanyArchiveTable;
