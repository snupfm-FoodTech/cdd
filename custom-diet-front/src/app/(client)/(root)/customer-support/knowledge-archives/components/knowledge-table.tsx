'use client';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable
} from '@tanstack/react-table';

import CMSTable from '@/components/cms-table';
import { Skeleton } from '@/components/ui/skeleton';
import { Knowledge } from '@/types/knowledge.type';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import KnowledgeLinkIcon from './knowledge-link-icon';
import { formatDate } from '@/utils/date.util';

interface KnowledgeTableProps {
  columns: ColumnDef<Knowledge>[];
  data: Knowledge[];
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  loading: boolean;
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
}

const KnowledgeTable = ({
  columns,
  data,
  total,
  pagination,
  loading,
  onPaginationChange
}: KnowledgeTableProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const visibleColumnKeysMobile = ['no', 'kwlgFuncTpNm'];
  const visibleColumnKeysTablet = ['no', 'kwlgFuncTpNm', 'kwlgDietTpNm'];

  const expandedColumn: ColumnDef<Knowledge> = {
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

  return (
    <CMSTable
      onRowClick={(row) => {
        if (isMobile || isTablet) {
          row.toggleExpanded();
        }
      }}
      table={table}
      renderSubRow={
        isTablet || isMobile
          ? (row) => (
              <div className="flex flex-col gap-3 p-4 text-left text-sm">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">문헌 종류 (식이)</div>
                  <div className="wrap-anywhere">
                    {row.original.kwlgDietTpNm}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">문헌 제목</div>
                  <div className="wrap-anywhere">{row.original.kwlgTit}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">저자</div>
                  <div className="wrap-anywhere">{row.original.kwlgAut}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">문헌 등록일</div>
                  <div className="wrap-anywhere">
                    {formatDate(row.original.creDt)}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">링크</div>
                  <div className="flex items-start">
                    {row.original.kwlgLinkUrl ? (
                      <KnowledgeLinkIcon
                        kwlgId={row.original.kwlgId}
                        kwlgLinkUrl={row.original.kwlgLinkUrl}
                      />
                    ) : (
                      <span className="text-muted-foreground"></span>
                    )}
                  </div>
                </div>
              </div>
            )
          : undefined
      }
    />
  );
};

export default KnowledgeTable;
