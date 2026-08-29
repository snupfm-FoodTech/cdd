import { ITrayItem, NutrientCompare, NutrientTotal } from '@/types/diet.type';
import { GroupedMaterial } from '@/types/food.type';
import {
  INutrientSummary,
  NutrientStandardTemplate
} from '@/types/nutrient.type';
import { useEffect, useState } from 'react';
import {
  calculateNutrientTotals,
  convertItemArrayToFoods,
  groupMaterialsByCategory,
  mergeNutrients,
  withSeparateRiceIfSevenDish
} from '../../helpers';
import MaterialChart from './compare-nutrient-table/material-chart';

interface DietCompareNutrientProps {
  standard: NutrientStandardTemplate;
  initialNutrientsSummary: INutrientSummary[];
  foods: ITrayItem[];
  onWarningNutrientsChange: (nutrients: NutrientCompare[]) => void;
}

const DietCompareChart = ({
  standard,
  foods,
  initialNutrientsSummary,
  onWarningNutrientsChange
}: DietCompareNutrientProps) => {
  const [combinedNutrients, setCombinedNutrients] = useState<NutrientCompare[]>(
    []
  );

  const [groupMaterials, setGroupMaterials] = useState<GroupedMaterial[]>([]);

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
      onWarningNutrientsChange(warningNutrients);

      const localGroupMaterials = groupMaterialsByCategory(foods);
      setGroupMaterials(localGroupMaterials);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foods, initialNutrientsSummary]);

  return (
    combinedNutrients.length > 0 && (
      <div>
        <div className="mt-4">
          <MaterialChart
            nutrients={combinedNutrients}
            groupMaterials={groupMaterials}
          />
        </div>
      </div>
    )
  );
};

export default DietCompareChart;
