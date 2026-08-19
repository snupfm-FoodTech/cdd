import FloatInput from '@/components/float-input';
import { Material } from '@/types/food.type';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface MaterialTableMeta extends TableMeta<Material> {
  update: (rowId: string, columnId: string, value: number) => void;
}

const MIN_RECIPE_WEIGHT = 0.01;

const WeightCell = ({
  getValue,
  column,
  table,
  row
}: CellContext<Material, unknown>) => {
  const initialValue = getValue() as number;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    const validValue = Math.max(MIN_RECIPE_WEIGHT, value);

    (table.options.meta as MaterialTableMeta)?.update(
      row.original.code,
      column.id,
      validValue
    );
  };

  return (
    <FloatInput
      maxLength={4}
      value={value}
      min={MIN_RECIPE_WEIGHT}
      onChange={(value) => setValue(value)}
      className="mx-0 h-7 w-1/2 min-w-20 text-center md:mx-auto md:w-20"
      onBlur={handleBlur}
    />
  );
};

export default WeightCell;
