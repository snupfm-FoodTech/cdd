import { NutrientCompare, NutrientFormulaCase } from '@/types/diet.type';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import CustomCell from './custom-cell';
import isNil from 'lodash/isNil';
import { formatDecimal } from '@/utils/format.util';

export const nutrientColumns: ColumnDef<NutrientCompare>[] = [
  {
    accessorKey: 'name',
    header: '영양성분',
    cell: ({ row }) => {
      const value: string = row.getValue('name');
      return (
        <span className="block text-center text-xs md:text-sm">{value}</span>
      );
    }
  },
  {
    accessorKey: 'totalAmount',
    header: '총 섭취량',
    cell: ({ row }) => {
      if (!row.original.totalAmount) return null;
      const raw = row.getValue('totalAmount') as number;
      const formatted = formatDecimal(raw, 1);
      const value = `${formatted} ${row.original.unitName}`;

      return (
        <span className="block text-center text-xs md:text-sm">{value}</span>
      );
    }
  },
  {
    accessorKey: 'compareWithUnit',
    header: '영양기준 대비',
    cell: ({ row }) => {
      const compare: number = row.original.compare
        ? parseFloat(formatDecimal(row.original.compare as number))
        : 0;
      const unitName: string = row.original.unitName ?? '';
      const value = compare !== 0 ? `${Math.abs(compare)} ${unitName}` : '';

      if (compare === 0 || !value) return null;

      let colorClass = compare > 0 ? 'text-red-500' : 'text-primary';
      let Icon = compare > 0 ? ChevronUpIcon : ChevronDownIcon;

      if (!isNil(row.original.compare)) {
        if (isNil(row.original.weightTo) && !isNil(row.original.weightFrom)) {
          if (compare > 0) {
            colorClass = 'text-primary';
            Icon = ChevronDownIcon;
          } else return null;
        } else if (
          isNil(row.original.weightFrom) &&
          !isNil(row.original.weightTo)
        ) {
          if (compare > 0) {
            colorClass = 'text-red-500';
            Icon = ChevronUpIcon;
          } else return null;
        }
      }

      return (
        <div className={`flex items-center justify-center ${colorClass}`}>
          <Icon className="mr-0 md:mr-1" />
          <span className="text-xs md:text-sm">{value}</span>
        </div>
      );
    }
  }
  // {
  //   accessorFn: (row) =>
  //     row.compare !== 0
  //       ? `${row.compare ? Math.abs(row.compare) : 0} ${row.unitName}`
  //       : '',
  //   id: 'compareWithUnit2',
  //   header: '영양기준 대비',
  //   cell: ({ row }) => {
  //     const value: string = row.getValue('compareWithUnit2');
  //     const compare: number = row.original.compare || 0;

  //     if (compare === 0 || !value) return null;

  //     let colorClass, Icon;

  //     colorClass = compare > 0 ? 'text-red-500' : 'text-primary';
  //     Icon = compare > 0 ? ChevronUpIcon : ChevronDownIcon;

  //     // Check if weightTo or weightFrom is null
  //     if (!isNil(row.original.compare)) {
  //       // If weightTo is null and weightFrom exists, compare is positive
  //       if (isNil(row.original.weightTo) && !isNil(row.original.weightFrom)) {
  //         if (row.original.compare > 0) {
  //           colorClass = 'text-primary';
  //           Icon = ChevronDownIcon;
  //         } else return null;
  //         // If weightFrom is null and weightTo exists, compare is negative
  //       } else if (
  //         isNil(row.original.weightFrom) &&
  //         !isNil(row.original.weightTo)
  //       ) {
  //         if (row.original.compare > 0) {
  //           colorClass = 'text-red-500';
  //           Icon = ChevronUpIcon;
  //         } else return null;
  //       }
  //     }

  //     return (
  //       <div className={`flex items-center justify-center ${colorClass}`}>
  //         <Icon className="mr-1" />
  //         <span>{value}</span>
  //       </div>
  //     );
  //   }
  // },
  // {
  //   accessorKey: 'customAmount',
  //   header: '최종 영양성분',
  //   cell: CustomCell,
  //   meta: {}
  // }
];
