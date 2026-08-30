'use client';

import { CDTextArea } from '@/components/cd-text-area';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import {
  calculateTotalWeightInGrams,
  WEIGHT_UNIT_STORAGE_KEY,
  WEIGHT_UNITS,
  WeightUnit
} from '../../helpers';
import FoodConversionModal from './food-conversion-modal';
import MyFoodsModal from './my-foods-modal';
import { FoodInfoFormValue } from './food-info';
import MaterialAddModal from './material-add-modal';
import MaterialTable from './material-table/material-table';
import { FC, useEffect, useState, useTransition } from 'react';
import NumberInputFloat from '@/components/number-input-float';
import { Food } from '@/types/food.type';
import { useCreateRecipe, useSaveRecipe } from '@/hooks/diet.hook';
import { toast } from '@/hooks/use-toast';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  foodIdentityAtom,
  foodNameDirtyAtom,
  markFoodNameDirtyAtom,
  setFoodIdentityAtom
} from '@/atoms/foodIdentity';
import useWait from '@/hooks/use-wait';
import { BookmarkPlus, Loader2 } from 'lucide-react';

enum ETotalWeightMode {
  EDIT = 'edit',
  VIEW = 'view'
}

enum EEditMode {
  VIEW = 'view',
  EDIT = 'edit'
}

interface FoodDetailInfoProps {
  onSaveMaterials: (materials: FoodInfoFormValue) => void;
  onSaveFoods: () => void;
  food: Food;
  onUpdateTotalWeight: (totalWeight: number, unit: number) => void;
  onCancelTotalWeight: () => void;
  allergens: number[];
}

const FoodDetailInfo: FC<FoodDetailInfoProps> = ({
  onSaveMaterials,
  onSaveFoods,
  food,
  onUpdateTotalWeight,
  onCancelTotalWeight,
  allergens
}) => {
  useEffect(() => {
    setTotalWeightMode(ETotalWeightMode.VIEW);
  }, [food]);

  const identity = useAtomValue(foodIdentityAtom);

  const { startWait, cancelWait } = useWait(1000);

  const [_, setIdentity] = useAtom(setFoodIdentityAtom);
  const [, markDirty] = useAtom(markFoodNameDirtyAtom);

  const [totalWeightMode, setTotalWeightMode] = useState<ETotalWeightMode>(
    ETotalWeightMode.VIEW
  );

  const { getValues, setValue, watch, reset, control, handleSubmit } =
    useFormContext();

  const [tempFoodName, setTempFoodName] = useState(getValues('foodName') ?? '');
  const [nameMode, setNameMode] = useState<EEditMode>(EEditMode.VIEW);

  const materials = watch('materials');

  const [totalWeight, setTotalWeight] = useState<number>(
    Number(calculateTotalWeightInGrams(materials))
  );

  const [isPending, startTransition] = useTransition();

  // 마지막에 고른 정리 단위를 기억한다. 사람마다 쓰는 저울 눈금이 다르고,
  // 매번 다시 고르게 하면 결국 안 쓰게 된다.
  const [weightUnit, setWeightUnit] = useState<number>(WEIGHT_UNITS[0]);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(WEIGHT_UNIT_STORAGE_KEY));
      if (WEIGHT_UNITS.includes(saved as WeightUnit)) setWeightUnit(saved);
    } catch (error) {
      // 브라우저가 저장을 막아도 기본 단위로 동작하면 된다
    }
  }, []);

  const handleChangeUnit = (unit: number) => {
    setWeightUnit(unit);
    try {
      localStorage.setItem(WEIGHT_UNIT_STORAGE_KEY, String(unit));
    } catch (error) {
      // 무시
    }
  };

  const { mutateAsync: mutateAsyncRecipe } = useSaveRecipe();
  const { mutate: createRecipe, isPending: isSavingRecipe } = useCreateRecipe();

  const startEditName = () => {
    setTempFoodName(getValues('foodName') ?? '');
    setNameMode(EEditMode.EDIT);
  };

  const cancelEditName = () => {
    setTempFoodName(getValues('foodName') ?? '');
    setNameMode(EEditMode.VIEW);
  };

  const saveEditName = () => {
    startTransition(async () => {
      try {
        const trimmed = (tempFoodName || '').trim();
        if (!trimmed) {
          toast({ title: '음식명을 입력해주세요.', variant: 'destructive' });
          return;
        }

        // Update atom (same code, new name) + mark dirty
        setIdentity({ name: trimmed });
        markDirty();

        // 2) Update RHF to submit on API
        setValue('foodName', trimmed, { shouldDirty: true, shouldTouch: true });
        setNameMode(EEditMode.VIEW);

        // ✅ Use Wait
        await startWait();

        const foodInfoValues = getValues() as FoodInfoFormValue;

        await mutateAsyncRecipe({
          foodName: getValues('foodName'),
          foodCode: foodInfoValues.foodCode
        });

        onSaveFoods();
      } catch (err) {}
    });
  };

  const onSaveRecipe: SubmitHandler<FieldValues> = (values) => {
    startTransition(async () => {
      try {
        const foodInfoValues = values as FoodInfoFormValue;
        await mutateAsyncRecipe({
          foodCode: foodInfoValues.foodCode,
          recipe: foodInfoValues.recipeDescription || ''
        });
        onSaveMaterials(foodInfoValues);
      } catch (err) {}
    });
  };

  /**
   * 식단에서 구성한 음식을 재료 구성까지 통째로 내 레시피로 저장한다.
   * 기존 "저장"(onSaveRecipe)은 이 식단 안에서 이름·조리법만 덮어쓰는 것이라
   * 다른 식단에서 다시 쓸 수 없었다.
   */
  const handleSaveAsMyRecipe = () => {
    const values = getValues() as FoodInfoFormValue;
    const name = (values.foodName || '').trim();

    if (!name) {
      toast({ title: '음식명을 입력해주세요.', variant: 'destructive' });
      return;
    }
    if (!food?.typeCode) {
      toast({
        title: '음식 분류를 알 수 없어 저장할 수 없습니다.',
        variant: 'destructive'
      });
      return;
    }
    const materialsToSave = (values.materials ?? []).filter(
      (material) => (material.recipeWeight ?? 0) > 0
    );
    if (materialsToSave.length === 0) {
      toast({
        title: '재료가 있어야 레시피로 저장할 수 있습니다.',
        variant: 'destructive'
      });
      return;
    }

    createRecipe({
      name,
      typeCode: food.typeCode,
      recipeDescription: values.recipeDescription || '',
      materials: materialsToSave.map((material) => ({
        code: material.code,
        recipeWeight: material.recipeWeight
      }))
    });
  };

  const handleCancel = () => {
    reset();
  };

  const handleTotalWeightMode = () => {
    setTotalWeightMode((prev) =>
      prev === ETotalWeightMode.VIEW
        ? ETotalWeightMode.EDIT
        : ETotalWeightMode.VIEW
    );
  };

  const handleCancelEditWeightMode = () => {
    setTotalWeightMode(ETotalWeightMode.VIEW);
    onCancelTotalWeight();
  };

  useEffect(() => {
    if (totalWeightMode === ETotalWeightMode.VIEW) {
      setTotalWeight(Number(calculateTotalWeightInGrams(materials)));
    }
  }, [materials, totalWeightMode]);

  // 1) New selection: code changed -> reset title input and leave view mode
  useEffect(() => {
    setTempFoodName(identity.name ?? '');
    setNameMode(EEditMode.VIEW);
    // also reset total weight mode if you want:
    setTotalWeightMode(ETotalWeightMode.VIEW);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity.code]);

  // 2) Same code, name updated elsewhere -> reflect it if not editing
  useEffect(() => {
    if (nameMode === EEditMode.VIEW) {
      setTempFoodName(identity.name ?? '');
    }
  }, [identity.name, nameMode]);

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="col-span-1 space-y-4 bg-secondary px-6 py-4 lg:col-span-2">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            {nameMode === EEditMode.VIEW ? (
              <>
                <h4 className="text-lg font-semibold md:text-xl">
                  {tempFoodName || ''}
                </h4>
                <Button
                  type="button"
                  variant="blue"
                  size="sm"
                  onClick={startEditName}
                >
                  이름 수정
                </Button>
              </>
            ) : (
              <>
                <input
                  className="rounded border px-3 py-2 text-base md:text-lg"
                  value={tempFoodName}
                  onChange={(e) => setTempFoodName(e.target.value)}
                  placeholder="음식명을 입력하세요"
                />

                {isPending ? (
                  <Button type="button" size="sm">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button type="button" size="sm" onClick={saveEditName}>
                    저장
                  </Button>
                )}

                <Button
                  type="button"
                  variant="blue"
                  size="sm"
                  onClick={cancelEditName}
                >
                  취소
                </Button>
              </>
            )}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="text-sm">총 제공량</span>

            {totalWeightMode === ETotalWeightMode.EDIT ? (
              <div className="w-28">
                <NumberInputFloat
                  value={totalWeight}
                  onChange={(value) => {
                    setTotalWeight(value);
                  }}
                />
              </div>
            ) : (
              <span className="font-semibold">
                {totalWeight}
                <span className="font-normal"> g</span>
              </span>
            )}

            {totalWeightMode === ETotalWeightMode.EDIT ? (
              <div className="flex flex-wrap items-center gap-2">
                {/* 저울 눈금이 현장마다 달라 정리 단위를 고르게 하고, 고른 값은 브라우저에 기억시킨다 */}
                <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  단위
                  <select
                    className="h-8 rounded-md border bg-background px-2 text-sm text-foreground"
                    value={weightUnit}
                    onChange={(e) => handleChangeUnit(Number(e.target.value))}
                  >
                    {WEIGHT_UNITS.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}g
                      </option>
                    ))}
                  </select>
                </label>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onUpdateTotalWeight(totalWeight, weightUnit)}
                >
                  저장
                </Button>
                <Button
                  type="button"
                  variant="blue"
                  size="sm"
                  onClick={handleCancelEditWeightMode}
                >
                  취소
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="blue"
                size="sm"
                onClick={handleTotalWeightMode}
              >
                수정
              </Button>
            )}

            {/* <FoodConversionModal
              foodCode={getValues('foodCode')}
              foodName={getValues('foodName')}
            /> */}
          </div>
        </div>
        <div className="mt-2 md:mt-0">
          <MaterialAddModal allergens={allergens} />
        </div>
      </div>
      <MaterialTable
        materials={materials}
        onUpdateMaterials={(materials) => setValue('materials', materials)}
      />
      <div className="flex justify-end">
        <MyFoodsModal />
      </div>
      <div>
        <div className="font-semibold">조리법</div>
        <FormField
          control={control}
          name="recipeDescription"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CDTextArea
                  className="text-sm"
                  maxHeight={128}
                  {...field}
                  placeholder="레시피를 입력하세요"
                  maxLength={200}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-center gap-4">
        <Button
          type="submit"
          loading={isPending}
          size="sm"
          className="w-28 font-semibold"
          onClick={handleSubmit(onSaveRecipe)}
        >
          저장
        </Button>
        <Button
          type="button"
          size="sm"
          className="w-28 font-semibold"
          variant="outline"
          onClick={handleCancel}
        >
          초기화
        </Button>
        <Button
          type="button"
          size="sm"
          className="font-semibold"
          variant="outline"
          loading={isSavingRecipe}
          onClick={handleSaveAsMyRecipe}
        >
          <BookmarkPlus className="mr-1 h-4 w-4" aria-hidden />
          내 레시피로 저장
        </Button>
      </div>
    </div>
  );
};

export default FoodDetailInfo;
