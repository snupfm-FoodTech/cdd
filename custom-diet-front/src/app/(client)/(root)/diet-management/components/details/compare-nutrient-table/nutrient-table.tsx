import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NutrientCompare } from '@/types/diet.type';
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { cloneDeep } from 'lodash';
import { nutrientColumns } from './nutrient-columns';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import CustomCell from './custom-cell';

interface NutrientTableProps {
  nutrients: NutrientCompare[];
  warningNutrients: NutrientCompare[];
  onChangeNutrientsSummary: (nutrients: NutrientCompare[]) => void;
}

const NutrientTable = ({
  nutrients,
  warningNutrients,
  onChangeNutrientsSummary
}: NutrientTableProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const visibleColumnKeysMobile = ['name', 'totalAmount', 'compareWithUnit'];

  const expandedColumn: ColumnDef<NutrientCompare> = {
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
    size: 20
  };

  const updateNutrient = (rowId: string, columnId: string, value: number) => {
    nutrients = nutrients.map((nutrient) => {
      if (nutrient.code === rowId) {
        return {
          ...nutrient,
          [columnId]: value
        };
      }
      return nutrient;
    });

    onChangeNutrientsSummary(cloneDeep(nutrients));
  };

  const tableColumns = useMemo(() => {
    let baseColumns = nutrientColumns;

    let filteredColumns = baseColumns;

    if (isMobile) {
      filteredColumns = baseColumns.filter(
        (col) =>
          'accessorKey' in col &&
          visibleColumnKeysMobile.includes(col.accessorKey as string)
      );
    }

    if (isMobile) {
      filteredColumns = [...filteredColumns];
    }

    return filteredColumns;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const table = useReactTable({
    data: nutrients,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
    state: {
      expanded
    },
    meta: {
      update: updateNutrient
    }
  });

  const handleClickRow = (rowId: string) => {
    if (!isMobile) return;
    setExpanded((prev) => ({
      //@ts-ignore
      ...prev,
      //@ts-ignore
      [rowId]: !prev[rowId]
    }));
  };

  if (!isMounted) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="col-span-2">
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          영양소정보
        </h3>
        <div className="rounded-md border bg-background">
          <ScrollArea>
            <div className="max-h-80">
              <Table className="bg-white">
                <TableHeader className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="bg-primary/90 hover:bg-primary/90"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            className="hover:none text-center text-xs font-semibold text-white md:text-sm"
                            key={header.id}
                            style={{
                              width:
                                header.getSize() !== 150
                                  ? header.getSize()
                                  : 'auto'
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
                      <Fragment key={`nutrient-table-${row.id}`}>
                        <TableRow onClick={() => handleClickRow(row.id)}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              data-column-id={cell.column.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                        {/* Expanded content (mobile only or always if needed) */}
                        {/* {row.getIsExpanded() && (
                          <TableRow key={`${row.id}-expanded`}>
                            <TableCell colSpan={table.getAllColumns().length}>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">
                                  최종 영양성분
                                </span>
                                <CustomCell
                                  getValue={() =>
                                    //@ts-ignore
                                    row.original.customAmount ?? 0
                                  }
                                  column={{ id: 'customAmount' } as any}
                                  table={table}
                                  row={row}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        )} */}
                      </Fragment>
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
      </div>
      <div className="col-span-1">
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          종합영양평가
        </h3>
        <div className="rounded-md border bg-white p-4">
          {warningNutrients.length > 0 ? (
            <>
              <h3 className="mb-4 text-xl font-bold text-destructive">
                영양기준 부적합
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {warningNutrients.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center justify-center truncate rounded-full bg-destructive px-2 py-1 text-sm text-white"
                  >
                    {item.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-gray-500">
                이(가) 영양 기준에 적합하지 않습니다.
              </div>
            </>
          ) : (
            <h3>모든 영양은 표준을 충족합니다.</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutrientTable;
