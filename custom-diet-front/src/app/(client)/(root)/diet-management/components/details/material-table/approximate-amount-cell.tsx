import FloatInput from '@/components/float-input';
import { Material } from '@/types/food.type';
import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

const ApproximateAmountCell = ({
  getValue
}: CellContext<Material, unknown>) => {
  const initialValue = getValue() as number;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <FloatInput
        value={value}
        onChange={(value) => setValue(value)}
        className="mx-auto h-7 w-20 text-center"
      />
      <span></span>
    </div>
  );
};

export default ApproximateAmountCell;
