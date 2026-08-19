import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ICalculationItem } from '@/types/calculator.type';
import { ColumnDef, Row } from '@tanstack/react-table';
import CustomCell from './custom-cell';
import CustomCellPrice from './custom-cell-price';
import CustomCellName from './custom-cell-name';

export const calculatorColumns: ColumnDef<ICalculationItem>[] = [
  {
    accessorKey: 'customCheckbox',
    header: '포함',
    cell: CustomCell,
    meta: {}
  },
  {
    accessorKey: 'name',
    header: '식품명',
    cell: CustomCellName
  },
  {
    accessorKey: 'calculationWeight',
    header: '1끼 기준 구매량',
    cell: ({ row }) => {
      const value: string = row.getValue('calculationWeight');
      return <p className="max-w-[60rem]">{value ? value + ' g' : ''}</p>;
    }
  },
  {
    accessorKey: 'price',
    header: '실제 구매가 (kg/원)',
    cell: CustomCellPrice,
    meta: {}
  }
];
