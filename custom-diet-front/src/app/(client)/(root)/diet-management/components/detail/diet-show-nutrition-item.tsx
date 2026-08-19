import { FormulaBetween } from '@/types';
import { Nutrient, NutrientUnitAdditionalInfo } from '@/types/nutrient.type';
import isNil from 'lodash/isNil';

interface DietShowNutritionItemProps {
  nutrient: Nutrient;
}

const DietShowNutritionItem = ({ nutrient }: DietShowNutritionItemProps) => {
  const showNutrientWeight = () => {
    if (nutrient.formula) {
      if (FormulaBetween.test(nutrient.formula)) {
        const splitBrackets = nutrient.formula.split(FormulaBetween);
        return (
          <div className="text-right text-xs">{splitBrackets.join('\n')}</div>
        );
      } else {
        return <div className="text-right text-xs">{nutrient.formula}</div>;
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
    <li className="flex justify-between px-3 py-1">
      <span className="flex items-center">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
        <p className="w-full truncate md:w-32">{nutrient?.name}</p>
      </span>
      <span className="w-fit truncate text-right text-sm md:w-44">
        {showNutrientWeight()}
      </span>
    </li>
  );
};

export default DietShowNutritionItem;
