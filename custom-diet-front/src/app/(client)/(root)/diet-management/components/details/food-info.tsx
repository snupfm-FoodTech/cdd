'use client';

import { Form } from '@/components/ui/form';
import { Food, Material } from '@/types/food.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FoodDetailInfo from './food-detail-info';
import FoodNutrientSummary from './food-nutrient-summary';
import { useAtom, useAtomValue } from 'jotai';
import {
  clearFoodNameDirtyAtom,
  foodIdentityAtom,
  foodNameDirtyAtom,
  setFoodIdentityAtom
} from '@/atoms/foodIdentity';

const foodInfoSchema = z.object({
  foodCode: z.string(),
  foodName: z.string(),
  recipeDescription: z.string().optional(),
  materials: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      originalCode: z.string(),
      unitCode: z.string(),
      unitName: z.string(),
      recipeWeight: z.number(),
      calculationWeight: z.number(),
      eyeReferenceName: z.string().optional(),
      eyeReferenceUnitName: z.string().optional(),
      eyeReferenceWeight: z.number().optional(),
      categoryId: z.number().optional(),
      categoryName: z.string().optional()
    })
  )
});

export type FoodInfoFormValue = z.infer<typeof foodInfoSchema>;

interface FoodInfoProps {
  food: Food;
  onSaveFoods: () => void;
  onSave: (materials: FoodInfoFormValue) => void;
  onMaterialsChange: (materials: Material[]) => void;
  onUpdateTotalWeight: (
    totalWeight: number,
    materials: Material[],
    unit: number
  ) => void;
  allergens: number[];
}

const FoodInfo = ({
  food,
  onSaveFoods,
  onSave,
  onMaterialsChange,
  onUpdateTotalWeight,
  allergens
}: FoodInfoProps) => {
  const [totalWeight, setTotalWeight] = useState<number | undefined>();
  const [_, setFoodIdentity] = useAtom(setFoodIdentityAtom);
  const foodDirty = useAtomValue(foodNameDirtyAtom);
  const clearDirty = useAtom(clearFoodNameDirtyAtom)[1];

  useEffect(() => {
    setTotalWeight(undefined);
  }, [food]);

  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(foodInfoSchema),
    defaultValues: {
      foodCode: food.code || '',
      foodName: food.name || '',
      recipeDescription: food.recipeDescription || '',
      materials: food.materials || []
    }
  });

  const materials = form.watch('materials');

  const handleUpdateTotalWeight = (totalWeight: number, unit: number) => {
    setTotalWeight(totalWeight);
    onUpdateTotalWeight(totalWeight, materials, unit);
  };

  // When selected food changes:
  useEffect(() => {
    if (!food) return;

    // if the selected item actually changed (by code), reset dirty,
    // then push both code & name to the atom
    const isNewFood = food.code !== form.getValues('foodCode');

    if (isNewFood) {
      clearDirty(); // allow auto-update of name for the new item
      setFoodIdentity({
        code: food.code || '',
        name: food.name || '',
        sequence: food.sequence
      });
      form.reset({
        foodCode: food.code || '',
        foodName: food.name || '',
        recipeDescription: food.recipeDescription || '',
        materials: food.materials || []
      });
      setTotalWeight(undefined);
      return;
    }

    // same food code → update non-name fields; name only if not dirty
    setFoodIdentity({ code: food.code || '', sequence: food.sequence });
    if (!foodDirty) setFoodIdentity({ name: food.name || '' });

    form.setValue('foodCode', food.code || '', { shouldDirty: true });
    form.setValue('recipeDescription', food.recipeDescription || '', {
      shouldDirty: true
    });
    form.setValue('materials', food.materials || [], { shouldDirty: true });
    if (!foodDirty) {
      form.setValue('foodName', food.name || '', { shouldDirty: false });
    }
  }, [food]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep form’s foodName in sync with the Jotai name (when same code)
  const identity = useAtomValue(foodIdentityAtom);
  useEffect(() => {
    if (!identity.code) return;
    const currentCode = form.getValues('foodCode');
    if (currentCode === identity.code) {
      // update name in form to atom’s name; do not mark dirty here
      form.setValue('foodName', identity.name || '', { shouldDirty: true });
    }
  }, [identity.name, identity.code]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!food) return null;

  return (
    <Form {...form}>
      <form>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <FoodDetailInfo
            allergens={allergens}
            onSaveFoods={onSaveFoods}
            onSaveMaterials={onSave}
            food={food}
            onUpdateTotalWeight={handleUpdateTotalWeight}
            onCancelTotalWeight={() => setTotalWeight(undefined)}
          />
          <FoodNutrientSummary
            allergens={allergens}
            onMaterialsChange={onMaterialsChange}
            totalWeight={totalWeight}
          />
        </div>
      </form>
    </Form>
  );
};

export default FoodInfo;
