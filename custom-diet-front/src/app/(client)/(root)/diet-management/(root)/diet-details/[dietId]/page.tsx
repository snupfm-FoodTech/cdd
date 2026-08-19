'use client';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import NotFoundData from '@/components/ui/not-found-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import {
  useAddFoodsToTray,
  useAllergenCheckFood,
  useDiet,
  useTrayNutritionSummary,
  useUpdateTrayNutritionSummary
} from '@/hooks/diet.hook';
import { toast } from '@/hooks/use-toast';
import {
  IDietAddFoodToTray,
  ITrayItem,
  NutrientCompare
} from '@/types/diet.type';
import { Food, FoodMaterialForm, Material } from '@/types/food.type';
import { INutrientSummary } from '@/types/nutrient.type';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import isNil from 'lodash/isNil';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import DietCompareNutrient from '../../../components/details/diet-compare-nutrient';
import DietFoodSelect from '../../../components/details/diet-food-select';
import FoodInfo from '../../../components/details/food-info';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { ChangeStandardFlag } from '@/types';
import { checkTokenExisted } from '@/utils';
import { BASE_PATH } from '@/constants';
import DietCompareChart from '../../../components/details/diet-compare-chart';
import { useAtom } from 'jotai';
import {
  clearFoodNameDirtyAtom,
  setFoodIdentityAtom
} from '@/atoms/foodIdentity';

interface DietDetailProps {
  params: {
    dietId: number;
  };
}

const DietDetails = ({ params }: DietDetailProps) => {
  const clearDirty = useAtom(clearFoodNameDirtyAtom)[1];
  const [_, setIdentity] = useAtom(setFoodIdentityAtom);

  const router = useRouter();
  const { data: diet, isPending } = useDiet(params.dietId);
  const [food, setFood] = useState<Food>();
  const [isFetchingFood, setIsFetchingFood] = useState<boolean>(false);
  const [materials, setMaterials] = useState<FoodMaterialForm>();
  const [foods, setFoods] = useState<ITrayItem[]>([]);
  const [allergenCodes, setAllergenCodes] = useState<Set<string>>(new Set());
  const [materialsNutrients, setMaterialsNutrients] = useState<Material[]>([]);
  const [warningNutrients, setWarningNutrients] = useState<NutrientCompare[]>(
    []
  );
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [showModalMobileError, setShowModalMobileError] =
    useState<boolean>(false);
  const [dataAddFoodToTray, setDataAddFoodToTray] = useState<any>();
  const [updatedFoodsNutrientsAdding, setUpdatedFoodsNutrientsAdding] =
    useState<ITrayItem[]>([]);
  const nutrientsSummary = useRef<NutrientCompare[]>([]);
  const [isManualUpdate, setIsManualUpdate] = useState(false);

  const [allergens, setAllergens] = useState<number[]>(
    Array.isArray(diet?.excludedAllergens)
      ? diet.excludedAllergens.map((item) => item.id)
      : []
  );
  const [isPendingAll, startTransitionAll] = useTransition();
  const { mutateAsync: mutateAllergenCheckFood } = useAllergenCheckFood();

  useEffect(() => {
    if (diet?.excludedAllergens && Array.isArray(diet.excludedAllergens)) {
      setAllergens(diet.excludedAllergens.map((item) => item.id));
    }
  }, [diet]);

  const {
    mutateAsync: mutateAsyncAddFoodsToTray,
    isPending: isPendingAddFoodsToTray
  } = useAddFoodsToTray(params.dietId);
  const {
    mutateAsync: mutateAsyncUpdateTrayNutritionSummary,
    isPending: isUpdateTrayNutritionSummary
  } = useUpdateTrayNutritionSummary(params.dietId);
  const {
    data: trayNutritionSummary,
    isPending: isPendingTrayNutritionSummary
  } = useTrayNutritionSummary(params.dietId);

  const initialNutrientsSummary = useMemo(
    () => trayNutritionSummary || [],
    [trayNutritionSummary]
  );

  useEffect(() => {
    checkTokenExisted(router);
  }, [router]);

  useEffect(() => {
    return () => {
      clearDirty();
      setIdentity({ code: '', name: '', sequence: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    isPending ||
    isPendingAddFoodsToTray ||
    isPendingTrayNutritionSummary ||
    isUpdateTrayNutritionSummary
  ) {
    return (
      <div className="flex h-[30rem] items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!diet)
    return (
      <NotFoundData
        backUrl={`${DIET_MANAGEMENT_URL}/${params.dietId}`}
        label="식단 관리"
      />
    );

  if (!diet.standard)
    return (
      <NotFoundData
        backUrl={`${DIET_MANAGEMENT_URL}/${params.dietId}`}
        label="식단 관리"
      />
    );

  if (!diet.tray)
    return (
      <NotFoundData
        backUrl={`${DIET_MANAGEMENT_URL}/${params.dietId}`}
        label="식단 관리"
      />
    );

  if (!diet.tray.foods)
    return (
      <NotFoundData
        backUrl={`${DIET_MANAGEMENT_URL}/${params.dietId}`}
        label="식단 관리"
      />
    );

  const goBack = () => {
    router.push(`${DIET_MANAGEMENT_URL}/${params.dietId}`);
  };

  const handleOnSaveFoods = () => {
    toast({
      title: '성공적으로 저장 되었음.',
      variant: 'success'
    });

    if (food && foods) {
      setFood(food);
      setFoods(foods);
    }
  };

  const handleOnSaveMaterial = (foodWithMaterials: FoodMaterialForm) => {
    toast({
      title: '성공적으로 저장 되었음.',
      variant: 'success'
    });

    setMaterials(foodWithMaterials);

    if (food && foods) {
      const newMaterials =
        foodWithMaterials.materials.map((material) => {
          const newMaterial = materialsNutrients.find(
            (m) => m.code === material.code
          );
          return {
            ...material,
            nutrients: newMaterial?.nutrients
          };
        }) || [];

      // Update current food data after saving materials
      setFood({
        ...food,
        recipeDescription: foodWithMaterials.recipeDescription || '',
        materials: newMaterials
      });

      const updatedFoods = foods.map((foodItem) => {
        if (foodItem.code === food?.code) {
          return {
            ...foodItem,
            recipeDescription: foodWithMaterials.recipeDescription || '',
            materials: newMaterials
          };
        }
        return foodItem;
      });

      setFoods(updatedFoods);
    }
  };

  const handleMutateAdd = (data: any) => {
    const changeStandardFlag =
      warningNutrients.length > 0
        ? ChangeStandardFlag.Yes
        : ChangeStandardFlag.No;

    //@ts-ignore
    const filteredFoods = data.foods.filter((food) => food.code.trim() !== '');

    const paramsAddFoodToTray: IDietAddFoodToTray = {
      id: params.dietId,
      foods: filteredFoods,
      changeStandardFlag,
      excludedAllergenIds: process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens
    };

    mutateAsyncAddFoodsToTray(paramsAddFoodToTray).then(() =>
      router.push(`${DIET_MANAGEMENT_URL}/${params.dietId}`)
    );
    const nutrientsSummaryLocal: INutrientSummary[] = nutrientsSummary.current
      .filter(
        (nutrient) => !isNil(nutrient.customAmount) && nutrient.customAmount > 0
      )
      .map((nutrient) => ({
        nutrientCode: nutrient.code,
        nutrientFinalAmount: nutrient.customAmount
      })) as INutrientSummary[];
    if (nutrientsSummaryLocal.length > 0) {
      mutateAsyncUpdateTrayNutritionSummary(nutrientsSummaryLocal);
    }
  };

  const handleSubmit = (data: any) => {
    if (data?.foods.length > 0) {
      warningNutrients.length > 0
        ? (setDataAddFoodToTray(data),
          setTimeout(() => setShowModalError(true), 300))
        : handleMutateAdd(data);
    }
  };

  const handleOnUpdateTotalWeight = (
    totalWeight: number,
    materials: Material[]
  ) => {
    setIsManualUpdate(true);
    if (!food || !foods) return;

    if (!totalWeight) {
      toast({
        title: '총 중량을 입력해주세요.', // "Please enter the total weight."
        variant: 'destructive'
      });
      return;
    }

    // Calculate the total sum of recipeWeight from all materials
    const totalRecipeWeight = materials.reduce(
      (sum, m) => sum + (m.recipeWeight || 0),
      0
    );

    const totalCalculationWeight = materials.reduce(
      (sum, m) => sum + (m.calculationWeight || 0),
      0
    );

    // If totalRecipeWeight is 0, we can't calculate proportions
    if (totalRecipeWeight === 0) {
      toast({
        title: '재료의 레시피 중량이 0입니다.', // "Recipe weight of materials is zero."
        variant: 'destructive'
      });
      return;
    }

    // Calculate the new calculationWeight for each material
    const updatedMaterials = materials.map((m) => {
      const ratioRecipeWeight = (m.recipeWeight || 0) / totalRecipeWeight;
      const ratioCalculationWeight =
        (m.calculationWeight || 0) / totalCalculationWeight;
      return {
        ...m,
        calculationWeight: parseFloat(
          (totalWeight * ratioCalculationWeight).toFixed(2)
        ),
        recipeWeight: parseFloat((totalWeight * ratioRecipeWeight).toFixed(2))
      };
    });

    // Save updated materials temporarily
    setMaterialsNutrients(updatedMaterials);

    // Update current food with new materials
    const updatedFood = { ...food, materials: updatedMaterials };
    setFood(updatedFood);

    // Update the global food list
    const updatedFoods = foods.map((foodItem) => {
      if (foodItem.code === food.code) {
        return updatedFood;
      }

      const matchedItem = updatedFoodsNutrientsAdding.find(
        (item) => item.code === foodItem.code
      );

      if (matchedItem) {
        return {
          ...foodItem,
          materials: matchedItem.materials
        };
      }

      return foodItem;
    });

    // Update state for foods and the "updated nutrients adding" cache
    setUpdatedFoodsNutrientsAdding(updatedFoods as ITrayItem[]);
    setFoods(updatedFoods as ITrayItem[]);
  };

  const handleMaterialsChange = (materials: Material[]) => {
    if (isManualUpdate) {
      // Ignore if calling handleOnUpdateTotalWeight
      setIsManualUpdate(false);
      return;
    }
    // Ensure both food and foods state are available
    if (!food || !foods) return;

    // Update the local state for preview or temporary processing
    setMaterialsNutrients(materials);

    // Check if the current food already has any nutrients assigned
    const hasNutrients: boolean =
      food?.materials.some(
        (material) => material.nutrients && material.nutrients.length > 0
      ) ?? false;

    // If nutrients already exist, do not proceed with updates
    if (hasNutrients) return;

    // Merge nutrients, categoryId, and categoryName from the incoming materials
    const newMaterials =
      food?.materials.map((material) => {
        const newMaterial = materials.find((m) => m.code === material.code);
        return {
          ...material,
          nutrients: newMaterial?.nutrients,
          categoryId: newMaterial?.categoryId,
          categoryName: newMaterial?.categoryName
        };
      }) || [];

    // Update current food with the new materials
    setFood({ ...food, materials: newMaterials });

    // Update the entire foods list with the modified food and any other matched updates
    const updatedFoods = foods.map((foodItem) => {
      const matchedItem = updatedFoodsNutrientsAdding.find(
        (nutrientItem) => nutrientItem.code === foodItem.code
      );

      // Replace materials for the currently edited food
      if (foodItem.code === food?.code) {
        return {
          ...foodItem,
          materials: newMaterials
        };
      }
      // Replace materials if a matchedItem from the updated list exists
      else if (matchedItem) {
        return {
          ...foodItem,
          materials: matchedItem.materials
        };
      }

      // Otherwise, return the original foodItem unchanged
      return foodItem;
    });

    // Update state for foods and the "updated nutrients adding" cache
    setUpdatedFoodsNutrientsAdding(updatedFoods);
    setFoods(updatedFoods);
  };

  const handleWarningNutrientsChange = (nutrients: NutrientCompare[]) => {
    setWarningNutrients(nutrients);
  };

  const handleModalClose = () => {
    setShowModalError(false);
  };

  const handleChangeNutrientsSummary = (nutrients: NutrientCompare[]) => {
    nutrientsSummary.current = nutrients;
  };

  const handleResetAllergens = () => {
    setAllergens(
      Array.isArray(diet?.excludedAllergens)
        ? diet.excludedAllergens.map((item) => item.id)
        : []
    );
  };

  const handleSelectAllergens = (newAllergens: number[]) => {
    if (newAllergens.length === 0) {
      setAllergens(newAllergens);
      return;
    }
    startTransitionAll(async () => {
      try {
        const filteredFoods = foods.filter(
          (food) => food.code && food.code.trim() !== ''
        );
        if (filteredFoods.length === 0) return;
        const foodChecked = await mutateAllergenCheckFood({
          excludedAllergenIds: newAllergens,
          //@ts-ignore
          foods: filteredFoods
        });
        if (foodChecked.length > 0) {
          const checkedCodes = new Set(foodChecked.map((item) => item.code));
          setAllergenCodes(checkedCodes);

          const newFoods = foods.map((food) => {
            if (food.code && checkedCodes.has(food.code)) {
              return { ...food, code: undefined };
            }
            return food;
          });
        }
        setAllergens(newAllergens);
      } catch (err) {
        return;
      }
    });
  };

  const renderConfirmMobileAlert = () => (
    <Dialog
      open={showModalMobileError}
      onOpenChange={(open) => {
        if (!open) {
          setShowModalMobileError(false);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="mb-4 text-xl font-bold text-red-500">
              영양기준 부적합
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2">
            <div className="w-6">
              <ExclamationTriangleIcon className="mr-2 h-6 w-6 text-destructive" />
            </div>
            <span className="text-sm text-destructive">
              {diet.standard.name}의 영양기준에 부적합입니다. 현재 설정된
              내용으로 저장할 경우, 식단의 영양기준이 일반식으로 변경됩니다.
            </span>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button
              className="w-24"
              variant="outline"
              onClick={() => setShowModalMobileError(false)}
            >
              취소
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const renderConfirmAlert = () => (
    <Dialog open={showModalError} onOpenChange={handleModalClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="mb-4 text-xl font-bold text-red-500">
              영양기준 부적합
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea>
          <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2">
            <div className="w-6">
              <ExclamationTriangleIcon className="mr-2 h-6 w-6 text-red-500" />
            </div>
            <span className="text-sm text-destructive">
              {diet.standard.name}의 영양기준에 부적합입니다. 현재 설정된
              내용으로 저장할 경우, 식단의 영양기준이 일반식으로 변경됩니다.
            </span>
          </div>
        </ScrollArea>
        <DialogFooter>
          <div className="flex w-full items-center justify-end space-x-2 pt-6">
            <Button
              className="w-24"
              variant="destructive"
              onClick={() => {
                setShowModalError(false);
                handleMutateAdd(dataAddFoodToTray);
              }}
            >
              저장
            </Button>
            <Button
              className="w-24"
              variant="outline"
              onClick={handleModalClose}
            >
              취소
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-diet-manage.png`}
        title={diet.name}
        breadcrumbs={[
          { label: '식단 관리', url: DIET_MANAGEMENT_URL },
          { label: diet.name, url: `${DIET_MANAGEMENT_URL}/${params.dietId}` },
          { label: '트레이에 음식 추가' }
        ]}
      />

      <div className="section-padding section-padding-y w-full">
        {warningNutrients.length > 0 && (
          <div className="fixed bottom-16 right-4 z-20 md:hidden">
            <Button
              variant="destructive"
              size="icon"
              type="button"
              className="rounded-full shadow-lg"
              onClick={() => setShowModalMobileError(true)}
            >
              <ExclamationTriangleIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
        {renderConfirmAlert()}
        {renderConfirmMobileAlert()}
        <DietFoodSelect
          originalFoods={foods}
          loading={isPendingAll}
          onResetAllergens={handleResetAllergens}
          checkedCodes={allergenCodes}
          onSelectAllergens={handleSelectAllergens}
          allergens={allergens}
          selectedOriginalFood={food}
          warningNutrients={warningNutrients}
          onSaveAll={handleSubmit}
          onFoods={(foods) => {
            setFoods(foods);
          }}
          onLoadingFood={(loading) => setIsFetchingFood(loading)}
          materials={materials}
          initialNutrientsSummary={initialNutrientsSummary}
          diet={diet}
          onFood={(food) => {
            setFood(food);
          }}
          onCancel={goBack}
          onChangeNutrientsSummary={handleChangeNutrientsSummary}
          onWarningNutrientsChange={handleWarningNutrientsChange}
        />
        {isFetchingFood ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner size="medium" />
          </div>
        ) : (
          food && (
            <div className="mt-4">
              <FoodInfo
                onSaveFoods={handleOnSaveFoods}
                allergens={allergens}
                onUpdateTotalWeight={handleOnUpdateTotalWeight}
                onSave={handleOnSaveMaterial}
                food={food}
                onMaterialsChange={handleMaterialsChange}
              />
            </div>
          )
        )}

        {foods.length > 0 && (
          <div className="mt-4">
            <DietCompareChart
              foods={foods}
              standard={diet.standard}
              onWarningNutrientsChange={handleWarningNutrientsChange}
              initialNutrientsSummary={initialNutrientsSummary || []}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DietDetails;
