'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-table';
import { RecipeSummary } from '@/types/food.type';
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { recipeColumns, RecipeTableMeta } from './recipe-columns';

interface RecipeTableProps {
  data: RecipeSummary[];
  emptyMessage: string;
  onViewDetail: (recipe: RecipeSummary) => void;
  onEdit?: (recipe: RecipeSummary) => void;
  onDelete?: (recipe: RecipeSummary) => void;
}

const RecipeTable = ({
  data,
  emptyMessage,
  onViewDetail,
  onEdit,
  onDelete
}: RecipeTableProps) => {
  const table = useReactTable({
    data,
    columns: recipeColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: { onViewDetail, onEdit, onDelete } satisfies RecipeTableMeta
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
                colSpan={recipeColumns.length}
                className="h-24 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeTable;
