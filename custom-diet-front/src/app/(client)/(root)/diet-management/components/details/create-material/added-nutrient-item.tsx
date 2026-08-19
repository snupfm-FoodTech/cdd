import FloatInput from '@/components/float-input';
import { cn } from '@/lib/utils';
import { MaterialNutrient } from '@/types/food.type';
import { CircleX } from 'lucide-react';
import { REQUIRED_NUTRIENTS } from './create-material-modal';

interface AddedNutrientItemProps {
  nutrient: MaterialNutrient;
  onChange: (nutrient: MaterialNutrient) => void;
  onRemove: (nutrientCode: string) => void;
}

const AddedNutrientItem = ({
  nutrient,
  onChange,
  onRemove
}: AddedNutrientItemProps) => {
  const handleWeightChange = (newWeight: number) => {
    onChange({ ...nutrient, amount: newWeight });
  };

  const isRequiredNutrient = (nutrientCode: string) => {
    return REQUIRED_NUTRIENTS.some(
      (nutrient) => nutrient.code === nutrientCode
    );
  };

  const isValidNutrient = nutrient.amount > 0;

  return (
    <div className="flex flex-col items-start justify-center gap-4 space-y-0 md:flex-row md:items-center md:space-y-2">
      <div
        className={cn('w-24 text-xs font-semibold', {
          'text-destructive': !isValidNutrient
        })}
      >
        {nutrient.name}
      </div>
      <div className="flex items-center gap-2">
        <FloatInput
          value={nutrient.amount}
          onChange={handleWeightChange}
          className={cn('h-8 w-20 text-right text-sm md:w-36', {
            'border-destructive focus-visible:ring-red-500': !isValidNutrient
          })}
          precision={3}
          maxLength={4}
        />
        <div className="w-10 text-xs text-muted-foreground">
          {nutrient.unitName}
        </div>
        <div className="flex w-6 justify-end md:hidden">
          {!isRequiredNutrient(nutrient.code) && (
            <CircleX
              className="h-4 w-4 cursor-pointer text-red-500"
              onClick={() => onRemove(nutrient.code)}
            />
          )}
        </div>
      </div>
      <div className="hidden w-6 justify-end md:flex">
        {!isRequiredNutrient(nutrient.code) && (
          <CircleX
            className="h-4 w-4 cursor-pointer text-red-500"
            onClick={() => onRemove(nutrient.code)}
          />
        )}
      </div>
    </div>
  );
};

export default AddedNutrientItem;
