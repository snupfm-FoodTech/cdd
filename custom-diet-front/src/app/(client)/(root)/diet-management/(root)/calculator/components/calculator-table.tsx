'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/new-york-table';
import { calculatorColumns } from './calculator-columns';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Cell,
  flexRender,
  getCoreRowModel,
  Header,
  Row,
  useReactTable
} from '@tanstack/react-table';
import { ICalculationItem, ReceiptIncludedFlag } from '@/types/calculator.type';
import { useCheckErrorAccessoryName } from '@/hooks/diet.hook';
import { useMediaQuery } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { isUndefined } from 'lodash';

interface ICalculatorTable {
  calculatorTableData: ICalculationItem[];
  setListSelectedRow: (f: any) => void;
  allUpdateChanges: () => void;
}

const CalculatorTable = ({
  setListSelectedRow,
  calculatorTableData,
  allUpdateChanges
}: ICalculatorTable) => {
  const { setIsError } = useCheckErrorAccessoryName();
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateCalculatorItem = (
    rowId: string,
    rowCode: string,
    sequence: number,
    value: number | boolean
  ) => {
    // when checked or unchecked
    if (typeof value === 'boolean') {
      // find list food's materials
      const groupFood = calculatorTableData.filter(
        (item) => item.sequence === sequence
      );

      if (rowCode) {
        groupFood.forEach((item) => {
          item.receiptIncludeFlag = value
            ? ReceiptIncludedFlag.Yes
            : ReceiptIncludedFlag.No;
        });
      } else {
        const childItem = groupFood.find((item) => item.code === rowId);

        if (childItem) {
          childItem.receiptIncludeFlag = value
            ? ReceiptIncludedFlag.Yes
            : ReceiptIncludedFlag.No;

          if (!value) {
            groupFood[0].receiptIncludeFlag = ReceiptIncludedFlag.No;
          } else {
            const numberChildChecked = groupFood.filter(
              (itemChild) =>
                itemChild.receiptIncludeFlag === ReceiptIncludedFlag.Yes
            ).length;
            if (numberChildChecked === groupFood.length - 1) {
              groupFood[0].receiptIncludeFlag = ReceiptIncludedFlag.Yes;
            }
          }
        }
      }
    }

    // when type accessory name
    if (typeof value === 'string') {
      // find item accessory
      const itemAccessory =
        calculatorTableData.find((item) => !item.sequence && !item.typeCode) ||
        calculatorTableData[0];
      itemAccessory.name = value;
      setIsError(false);
    }

    setListSelectedRow(
      calculatorTableData.filter(
        (item) => item.receiptIncludeFlag === ReceiptIncludedFlag.Yes
      )
    );

    allUpdateChanges();
  };

  const table = useReactTable({
    data: calculatorTableData,
    columns: calculatorColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      update: updateCalculatorItem
    }
  });

  const renderContent = () => {
    return (
      <Table>
        <TableHeader className={isMobile ? '' : 'sticky top-0 z-10'}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-secondary hover:bg-secondary"
            >
              {headerGroup.headers.map((header, index) => (
                <TableHead
                  className={cn(
                    'font-semibold text-black',
                    index === 1 ? 'text-left' : 'text-center'
                  )}
                  key={header.id}
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
        <TableBody className="w-full text-center">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} data-column-id={cell.column.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    );
  };

  const renderContentMobileHeaderRow = ({
    column,
    cell,
    header,
    row
  }: {
    column: any;
    cell: Cell<ICalculationItem, unknown>;
    header: Header<ICalculationItem, unknown> | undefined;
    row: Row<ICalculationItem>;
  }) => {
    const isAccessoryRow = !row.original.sequence && !row.original.typeCode;
    const isCheckbox = column === 'customCheckbox' ? true : false;
    const isName = column === 'name';

    if (isCheckbox) return null;
    if (isName && !isAccessoryRow) return null;

    return (
      <span className="w-full font-semibold text-gray-500">
        {header
          ? flexRender(header.column.columnDef.header, header.getContext())
          : cell.column.id}
      </span>
    );
  };

  const renderContentMobileRow = ({
    column,
    cell
  }: {
    column: any;
    cell: Cell<ICalculationItem, unknown>;
  }) => {
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
      <div className="w-full space-y-4 p-2">
        {/* Body */}
        {rows.length > 0 ? (
          rows.map((row) => {
            return (
              <div
                key={row.id}
                className="space-y-2 rounded-md border bg-white p-3 shadow-sm"
              >
                {row.getVisibleCells().map((cell) => {
                  const header = headerGroups[0].headers.find(
                    (h) => h.column.id === cell.column.id
                  );

                  const column = (cell.column.columnDef as any).accessorKey;

                  return (
                    <div
                      key={cell.id}
                      className="flex flex-col items-start gap-2 text-sm"
                      data-column-id={cell.column.id}
                    >
                      {renderContentMobileHeaderRow({
                        column,
                        cell,
                        header,
                        row
                      })}

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
    );
  };

  if (!isMounted) return null;

  if (isMobile) {
    return (
      <ScrollArea className="h-96 rounded-xl border-2">
        {renderContentMobile()}
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-80 rounded-xl border-2">
      {renderContent()}
    </ScrollArea>
  );
};

export default CalculatorTable;
