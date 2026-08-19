import FloatInput from '@/components/float-input';
import { Material } from '@/types/food.type';
import { CellContext, TableMeta } from '@tanstack/react-table';
import { Minus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MaterialTableMeta extends TableMeta<Material> {
  update: (rowId: string, columnId: string, value: number) => void;
}

const MIN_EYE_WEIGHT = 0.01;

const EyeWeightCell = ({
  column,
  table,
  row
}: CellContext<Material, unknown>) => {
  const [value, setValue] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    if (!row.original.eyeReferenceWeight) return;
    const eyeReferenceWeight = Math.max(
      parseFloat(
        (row.original.recipeWeight / row.original.eyeReferenceWeight).toFixed(2)
      ),
      MIN_EYE_WEIGHT
    );

    setValue(eyeReferenceWeight);
    previousValueRef.current = eyeReferenceWeight;
  }, [row.original.recipeWeight]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBlur = () => {
    // If the value is the same as the previous value, do nothing
    if (value === previousValueRef.current) return;

    const validValue = Math.max(MIN_EYE_WEIGHT, value);

    (table.options.meta as MaterialTableMeta)?.update(
      row.original.code,
      column.id,
      validValue
    );

    previousValueRef.current = value;
  };

  const handleInputChange = (newWeight: number) => {
    setValue(newWeight);
  };

  return row.original.eyeReferenceWeight ? (
    <div className="flex items-center justify-start gap-2 md:justify-center">
      <FloatInput
        maxLength={2}
        value={value}
        min={MIN_EYE_WEIGHT}
        onChange={handleInputChange}
        className="h-7 w-1/2 min-w-20 text-center md:w-20"
        onBlur={handleBlur}
      />
      <div className="w-fit text-left text-xs text-muted-foreground md:w-10 md:text-sm">
        {row.original.eyeReferenceName}
      </div>
    </div>
  ) : (
    <div className="flex justify-center text-muted-foreground">
      <Minus size={10} />
    </div>
  );
};

export default EyeWeightCell;
