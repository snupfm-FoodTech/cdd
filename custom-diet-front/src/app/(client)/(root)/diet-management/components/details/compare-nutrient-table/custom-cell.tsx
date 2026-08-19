import FloatInput from '@/components/float-input';
import { NutrientCompare } from '@/types/diet.type';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

interface NutrientTableMeta extends TableMeta<NutrientCompare> {
  update: (rowId: string, columnId: string, value: number) => void;
}

const CustomCell = ({
  getValue,
  column,
  table,
  row
}: CellContext<NutrientCompare, unknown>) => {
  const initialValue = getValue() as number;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    (table.options.meta as NutrientTableMeta)?.update(
      row.original.code,
      column.id,
      value
    );
  };

  return (
    <FloatInput
      maxLength={4}
      value={value}
      onChange={(value) => setValue(value)}
      className="mx-auto h-7 w-20 text-center"
      onBlur={handleBlur}
    />
  );
};

export default CustomCell;
