import { Material } from '@/types/food.type';
import { ColumnDef } from '@tanstack/react-table';
import ActionCell from './action-cell';
import EyeWeightCell from './eye-weight-celll';
import WeightCell from './weight-cell';

export const MATERIAL_ACCESSOR_KEYS = {
  NAME: 'name',
  RECIPE_WEIGHT: 'recipeWeight',
  EYE_REFERENCE_WEIGHT: 'eyeReferenceWeight',
  ACTION: 'action'
} as const;

export const materialColumns: ColumnDef<Material>[] = [
  {
    accessorKey: 'name',
    header: '식품명',
    cell: ({ row }) => {
      const value: string = row.getValue('name');
      return <span className="block text-left md:text-center">{value}</span>;
    },
    size: 300
  },
  {
    accessorKey: 'recipeWeight',
    header: '재료량 (g)',
    cell: WeightCell,
    size: 200
  },
  {
    accessorKey: 'eyeReferenceWeight',
    header: '눈대중량',
    cell: EyeWeightCell,
    size: 200
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ActionCell,
    size: 100
  }
];
