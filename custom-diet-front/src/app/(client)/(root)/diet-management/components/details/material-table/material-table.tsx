import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Material } from '@/types/food.type';
import {
  Cell,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { MATERIAL_ACCESSOR_KEYS, materialColumns } from './material-columns';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface MaterialTableProps {
  materials: Material[];
  onUpdateMaterials: (materials: Material[]) => void;
}

const MaterialTable = ({
  materials,
  onUpdateMaterials: onUpdateMaterials
}: MaterialTableProps) => {
  const isMobile = useIsMobile();

  const updateRow = (rowId: string, columnId: string, value: number) => {
    const newData = materials.map((row) => {
      if (row.code !== rowId) return row;

      if (columnId === MATERIAL_ACCESSOR_KEYS.RECIPE_WEIGHT) {
        const wasteRatio = row.calculationWeight / row.recipeWeight;
        const calculationWeight = value * wasteRatio;

        return {
          ...row,
          calculationWeight,
          recipeWeight: value
        };
      }

      if (columnId === MATERIAL_ACCESSOR_KEYS.EYE_REFERENCE_WEIGHT) {
        if (!row.eyeReferenceWeight) return row;

        const newRecipeWeight = parseFloat(
          (value * row.eyeReferenceWeight).toFixed(2)
        );

        const wasteRatio = row.calculationWeight / row.recipeWeight;
        const newCalculationWeight = parseFloat(
          (newRecipeWeight * wasteRatio).toFixed(2)
        );

        return {
          ...row,
          recipeWeight: newRecipeWeight,
          calculationWeight: newCalculationWeight
        };
      }

      return {
        ...row,
        [columnId]: value
      };
    });

    onUpdateMaterials(newData);
  };

  const renderContentMobileRow = ({
    column,
    cell
  }: {
    column: any;
    cell: Cell<Material, unknown>;
  }) => {
    const isOriginalCode = column === 'originalCode';
    const isName = column === 'name';

    if (isOriginalCode) {
      return (
        <span className={cn('flex w-full font-semibold')}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      );
    }

    if (isName) {
      return (
        <span className={cn('flex w-full')}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      );
    }

    return (
      <span className={cn('flex w-full items-center')}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </span>
    );
  };

  const renderContentMobile = () => {
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;

    return (
      <ScrollArea className="flex max-h-[600px] w-full flex-col pr-2">
        <div className="w-full space-y-4">
          {/* Body */}
          {rows.length > 0 ? (
            rows.map((row) => {
              return (
                <div
                  key={row.id}
                  className="relative space-y-2 rounded-md border bg-white p-3 shadow-sm"
                >
                  {row.getVisibleCells().map((cell) => {
                    const header = headerGroups[0].headers.find(
                      (h) => h.column.id === cell.column.id
                    );

                    const getValue = cell.getValue();
                    const column = (cell.column.columnDef as any).accessorKey;
                    const isNotHeader =
                      column === 'originalCode' || column === 'name';

                    return (
                      <div
                        key={cell.id}
                        className="flex flex-col items-start gap-2 text-sm"
                        data-column-id={cell.column.id}
                      >
                        {/* Label (Header) */}
                        {!isNotHeader && (
                          <span className="w-1/2 font-semibold text-gray-500">
                            {header
                              ? flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              : cell.column.id}
                          </span>
                        )}

                        {/* Cell Value */}

                        {renderContentMobileRow({
                          column,
                          cell
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="py-4 text-center text-sm text-gray-500">
              결과가 없습니다
            </div>
          )}
        </div>
      </ScrollArea>
    );
  };

  const removeRow = (rowId: string) => {
    // Prevent removing the last material
    if (materials.length === 1) return;

    const newData = materials.filter((row) => row.code !== rowId);
    onUpdateMaterials(newData);
  };

  const table = useReactTable({
    data: materials,
    columns: materialColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      update: updateRow,
      remove: removeRow
    }
  });

  if (isMobile) {
    return renderContentMobile();
  }

  return (
    <div className="rounded-md border bg-background">
      <ScrollArea>
        <div className="max-h-80">
          <Table>
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-primary/90 hover:bg-primary/90"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="hover:none text-center font-semibold text-white"
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
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} data-column-id={cell.column.id}>
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
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    결과가 없습니다
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MaterialTable;
