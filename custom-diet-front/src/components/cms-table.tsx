import { cn } from '@/lib/utils';
import { flexRender, Row, useReactTable } from '@tanstack/react-table';
import CDPagination from './cd-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/new-york-table';
import { Fragment } from 'react';

interface CMSTableProps<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  onRowClick?: (row: Row<TData>, event: React.MouseEvent) => void;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

const CMSTable = <TData,>({
  table,
  onRowClick,
  renderSubRow
}: CMSTableProps<TData>) => {
  return (
    <>
      <div className="rounded-md border bg-background shadow">
        <Table>
          <TableHeader variant="primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-center"
                      key={header.id}
                      style={{
                        width:
                          header.getSize() !== 150 ? header.getSize() : 'auto'
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-center">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    onClick={(event) => onRowClick?.(row, event)}
                    className={cn(onRowClick ? 'cursor-pointer' : '')}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && renderSubRow && (
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {renderSubRow(row)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {table.getPageCount() > 1 && (
        <CDPagination
          totalPages={table.getPageCount()}
          pageIndex={table.getState().pagination.pageIndex}
          setPageIndex={table.setPageIndex}
          totalPagesToDisplay={10}
        />
      )}
    </>
  );
};

export default CMSTable;
