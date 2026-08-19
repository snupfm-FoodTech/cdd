'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-table';
import { MyMaterial } from '@/types/food.type';
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { myFoodsColumns, MyFoodsTableMeta } from './my-foods-columns';

interface MyFoodsTableProps {
  data: MyMaterial[];
  onEdit: (material: MyMaterial) => void;
  onDelete: (material: MyMaterial) => void;
}

const MyFoodsTable = ({ data, onEdit, onDelete }: MyFoodsTableProps) => {
  const table = useReactTable({
    data,
    columns: myFoodsColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: { onEdit, onDelete } satisfies MyFoodsTableMeta
  });

  return (
    <div className="rounded-md border">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-secondary hover:bg-secondary">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={
                    header.column.id === 'actions'
                      ? 'w-[1%] whitespace-nowrap text-center font-semibold text-black'
                      : 'text-center font-semibold text-black'
                  }
                  style={
                    header.column.id === 'actions'
                      ? { width: '1%', whiteSpace: 'nowrap' }
                      : header.column.columnDef.size
                        ? { width: header.column.columnDef.size }
                        : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.column.id === 'actions' ? 'w-[1%] whitespace-nowrap' : undefined
                    }
                    style={
                      cell.column.id === 'actions'
                        ? { width: '1%', whiteSpace: 'nowrap' }
                        : cell.column.columnDef.size
                          ? { width: cell.column.columnDef.size }
                          : undefined
                    }
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={myFoodsColumns.length}
                className="h-24 text-center text-sm text-gray-500"
              >
                등록된 내 식품이 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyFoodsTable;
