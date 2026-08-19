import { FormulaBetween } from '@/types';
import { Nutrient, NutrientUnitAdditionalInfo } from '@/types/nutrient.type';
import { isNil } from 'lodash';

interface NutrientStandardItemProps {
  nutrient: Nutrient;
}

const NutrientStandardItem = ({ nutrient }: NutrientStandardItemProps) => {
  const showNutrientWeight = () => {
    if (nutrient.formula) {
      if (FormulaBetween.test(nutrient.formula)) {
        const splitBrackets = nutrient.formula.split(FormulaBetween);
        return <div className='text-right text-xs max-w-44'>{splitBrackets.join('\n')}</div>;
      } else {
        return <div className='text-right text-xs'>{nutrient.formula}</div>;
      }
    } else {
      if (!isNil(nutrient?.weightFrom) && !isNil(nutrient?.weightTo)) {
        return `${nutrient?.weightFrom} ~ ${nutrient?.weightTo} ${nutrient?.unitName}`;
      }

      if (isNil(nutrient?.weightFrom) && !isNil(nutrient?.weightTo)) {
        return `${nutrient?.weightTo} ${nutrient?.unitName} ${NutrientUnitAdditionalInfo.Less}`;
      }

      if (!isNil(nutrient?.weightFrom) && isNil(nutrient?.weightTo)) {
        return `${nutrient?.weightFrom} ${nutrient?.unitName} ${NutrientUnitAdditionalInfo.More}`;
      }
    }

    return '';
  };

  return (
    <div className="flex items-center justify-between rounded border bg-secondary/80 px-4 py-2">
      <p className="text-sm font-medium text-muted-foreground">
        {nutrient?.name}
      </p>
      <div>
        <span className="mr-1 inline-block text-right text-sm font-medium">
          {showNutrientWeight()}
        </span>
      </div>
    </div>
  );
};

export default NutrientStandardItem;
