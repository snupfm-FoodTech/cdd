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
import { CLIENT_NOTICE_URL } from '@/constants/routes';
import { Notice } from '@/types/notice.type';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { formatDate } from '@/utils/date.util';
import KnowledgeLinkIcon from '../../knowledge-archives/components/knowledge-link-icon';
import Link from 'next/link';
import { getAttachment } from '@/utils/file.util';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

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
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const visibleColumnKeysMobile = ['no', 'ntcTit'];

  const expandedColumn: ColumnDef<Notice> = {
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

  const handleRowClick = (row: Row<Notice>, event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const cell = target.closest('td');
    if (!cell) return;

    const columnId = cell.dataset.columnId;

    if (columnId === 'ntcAtchUrls') {
      event.stopPropagation();
      return;
    }

    router.push(`${CLIENT_NOTICE_URL}/${row.original.ntcId}`);
  };

  if (!isMounted) return null;

  return (
    <CMSTable
      table={table}
      onRowClick={(row, event) => {
        if (isMobile) {
          row.toggleExpanded();
        } else {
          handleRowClick(row, event);
        }
      }}
      renderSubRow={
        isMobile
          ? (row) => (
              <div className="flex flex-col gap-3 p-4 text-left text-sm">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">등록일</div>
                  <div className="wrap-anywhere">{row.original.creDt}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">링크</div>
                  <div className="flex items-start">
                    {(() => {
                      const value: string[] = row.getValue('ntcAtchUrls');

                      if (Array.isArray(value) && value.length > 0) {
                        return (
                          <Link
                            target="_blank"
                            href={getAttachment(value[0])}
                            rel="noopener noreferrer"
                          >
                            <Icons.document
                              strokeWidth={1}
                              className="mx-auto"
                            />
                          </Link>
                        );
                      }

                      return <span className="text-muted-foreground"></span>;
                    })()}
                  </div>
                </div>
                <div className="flex">
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => {
                      router.push(`${CLIENT_NOTICE_URL}/${row.original.ntcId}`);
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

export default NoticeTable;
