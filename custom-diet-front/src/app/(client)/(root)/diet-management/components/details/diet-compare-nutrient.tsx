import { ITrayItem, NutrientCompare, NutrientTotal } from '@/types/diet.type';
import {
  INutrientSummary,
  NutrientStandardTemplate
} from '@/types/nutrient.type';
import { useEffect, useState } from 'react';
import {
  calculateNutrientTotals,
  convertItemArrayToFoods,
  mergeNutrients,
  withSeparateRiceIfSevenDish
} from '../../helpers';
import NutrientTable from './compare-nutrient-table/nutrient-table';

interface DietCompareNutrientProps {
  standard: NutrientStandardTemplate;
  initialNutrientsSummary: INutrientSummary[];
  foods: ITrayItem[];
  onWarningNutrientsChange: (nutrients: NutrientCompare[]) => void;
  onChangeNutrientsSummary: (nutrients: NutrientCompare[]) => void;
}

const DietCompareNutrient = ({
  standard,
  foods,
  initialNutrientsSummary,
  onWarningNutrientsChange,
  onChangeNutrientsSummary
}: DietCompareNutrientProps) => {
  const [combinedNutrients, setCombinedNutrients] = useState<NutrientCompare[]>(
    []
  );
  const [warningNutrients, setWarningNutrients] = useState<NutrientCompare[]>(
    []
  );

  useEffect(() => {
    if (foods) {
      const filteredFoods = foods.filter(
        (food) => food.code && food.code.trim() !== ''
      );
      const checkFoods = filteredFoods.every((item) => item.code !== undefined);
      if (!checkFoods) return;
      const nutrientTotals: NutrientTotal[] = calculateNutrientTotals(
        withSeparateRiceIfSevenDish(convertItemArrayToFoods(foods))
      );
      const cNutrients: NutrientCompare[] = mergeNutrients(
        standard?.nutrients,
        nutrientTotals
      );
      cNutrients.map((item) => {
        const found = initialNutrientsSummary.find(
          (n) => n.nutrientCode === item.code
        );
        if (found) {
          item.customAmount = found.nutrientFinalAmount;
        }
        return item;
      });
      setCombinedNutrients(cNutrients);
      const warningNutrients = cNutrients.filter(
        (item) => item.isCompare && item.compare !== 0
      );
      setWarningNutrients(warningNutrients);
      onWarningNutrientsChange(warningNutrients);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods, initialNutrientsSummary]);

  const handleChangeNutrientsSummary = (nutrients: NutrientCompare[]) => {
    const localCombinedNutrients = combinedNutrients.map((item) => {
      const found = nutrients.find((n) => n.code === item.code);
      if (found) {
        return {
          ...item,
          customAmount: found.customAmount
        };
      }
      return item;
    });
    setCombinedNutrients(localCombinedNutrients);
    onChangeNutrientsSummary(localCombinedNutrients);
  };

  return (
    combinedNutrients.length > 0 && (
      <div>
        <div className="mt-4 xl:mt-0">
          <NutrientTable
            nutrients={combinedNutrients}
            warningNutrients={warningNutrients}
            onChangeNutrientsSummary={handleChangeNutrientsSummary}
          />
        </div>
      </div>
    )
  );
};

export default DietCompareNutrient;
