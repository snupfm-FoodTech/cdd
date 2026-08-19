import NumberInputValidate from '@/components/number-input-validate';
import { Button } from '@/components/ui/button';
import isNil from 'lodash/isNil';
import { Minus, Plus } from 'lucide-react';

interface WeightInputProps {
  weight: number;
  onChange: (newWeight: number) => void;
  minWeight?: number;
  maxWeight?: number;
  maxLength?: number;
}

const WeightInput = ({
  weight,
  onChange,
  minWeight = 0,
  maxWeight,
  maxLength = 4
}: WeightInputProps) => {
  const maxWeightBasedOnLength = maxLength
    ? Math.pow(10, maxLength) - 1
    : undefined;

  const updateWeight = (newWeight: number) => {
    if (minWeight !== undefined && newWeight < minWeight) {
      newWeight = minWeight;
    }
    if (maxWeight !== undefined && newWeight > maxWeight) {
      newWeight = maxWeight;
    }
    if (
      maxWeightBasedOnLength !== undefined &&
      newWeight > maxWeightBasedOnLength
    ) {
      newWeight = maxWeightBasedOnLength;
    }

    onChange(newWeight);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        type="button"
        variant="secondary"
        disabled={weight <= minWeight}
        className="h-8 w-8 border"
        onClick={() => updateWeight(weight - 1)}
      >
        <Minus className="h-4 w-4 text-muted-foreground" />
      </Button>
      <NumberInputValidate
        value={weight}
        onChange={(value) => updateWeight(Number(value))}
        min={minWeight}
        max={isNil(maxWeight) ? maxWeightBasedOnLength : maxWeight}
        className="h-8 w-16 appearance-none text-center text-sm md:w-24"
      />
      <Button
        size="icon"
        type="button"
        variant="secondary"
        disabled={
          (maxWeight !== undefined && weight >= maxWeight) ||
          (maxWeightBasedOnLength !== undefined &&
            weight >= maxWeightBasedOnLength)
        }
        className="h-8 w-8 border"
        onClick={() => updateWeight(weight + 1)}
      >
        <Plus className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default WeightInput;
