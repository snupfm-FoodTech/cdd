import { Spinner } from '@/components/spinner';
import { useDetailMaterials } from '@/hooks/diet.hook';
import { Material } from '@/types/food.type';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { calculateTotalWeightInGrams } from '../../helpers';
import NutrientSummaryList, { NutrientSummary } from './nutrient-summary-list';

interface FoodNutrientSummaryProps {
  onMaterialsChange: (materials: Material[]) => void;
  totalWeight: number | undefined;
  allergens: number[];
}

const FoodNutrientSummary = ({
  onMaterialsChange,
  totalWeight,
  allergens
}: FoodNutrientSummaryProps) => {
  const { getValues, watch } = useFormContext();

  const materials = watch('materials') as Material[];

  const materialCodes = useMemo(() => {
    return materials.map((material) => material.code) || [];
  }, [materials]);

  const {
    data: detailMaterials,
    isPending,
    isSuccess: isSuccessMaterials
  } = useDetailMaterials(
    {
      codes: materialCodes,
      excludedAllergenIds: allergens
    },
    {
      enabled: !!materialCodes.length
    }
  );

  useEffect(() => {
    if (isSuccessMaterials) {
      onMaterialsChange(detailMaterials);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessMaterials]);

  const items: NutrientSummary[] = useMemo(() => {
    if (!detailMaterials) return [];

    const nutrientSummary = new Map<string, NutrientSummary>();

    materials.forEach((material) => {
      const detailMaterial = detailMaterials.find(
        (item) => item.code === material.code
      );

      if (!detailMaterial) return;

      detailMaterial.nutrients.forEach((nutrient) => {
        const summary = nutrientSummary.get(nutrient.code);

        if (summary) {
          summary.totalWeight += nutrient.amount * material.calculationWeight;
          return;
        }

        nutrientSummary.set(nutrient.code, {
          code: nutrient.code,
          name: nutrient.name,
          unit: nutrient.unitName,
          totalWeight: nutrient.amount * material.calculationWeight
        });
      });
    });

    return Array.from(nutrientSummary.values());
  }, [detailMaterials, materials]);

  useEffect(() => {
    if (!totalWeight) return;

    const originalTotalWeight = parseFloat(
      calculateTotalWeightInGrams(materials)
    );

    if (originalTotalWeight === 0 || totalWeight === originalTotalWeight)
      return;

    const ratio = totalWeight / originalTotalWeight;

    const scaledMaterials = materials.map((material) => {
      const newRecipeWeight = parseFloat(
        (material.recipeWeight * ratio).toFixed(2)
      );
      const newCalculationWeight = parseFloat(
        (material.calculationWeight * ratio).toFixed(2)
      );

      return {
        ...material,
        recipeWeight: newRecipeWeight,
        calculationWeight: newCalculationWeight
      };
    });

    onMaterialsChange(scaledMaterials);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalWeight]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-secondary/80 px-6 py-4">
      <div>
        <h4 className="text-lg font-semibold">{getValues('foodName')}</h4>
        <span>{calculateTotalWeightInGrams(materials)}g</span>
      </div>
      <NutrientSummaryList items={items} />
    </div>
  );
};

export default FoodNutrientSummary;
