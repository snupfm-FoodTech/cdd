import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { QueryKeys } from '@/constants/query-keys.constant';
import { useFood } from '@/hooks/diet.hook';
import { cn } from '@/lib/utils';
import { SeparatedFlag } from '@/types';
import { DietDetail, ITrayItem, NutrientCompare } from '@/types/diet.type';
import { Food, FoodMaterialForm } from '@/types/food.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  convertFoodsToTrayItemArray,
  convertFoodToTrayItem,
  convertITrayItemToFood,
  transformMaterials
} from '../../helpers';
import { DietSearchRecommend } from './diet-search-recommend';
import { DietSeperateTray, DietTemplateTray } from './diet-template-tray';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useMediaQuery } from 'usehooks-ts';
import {
  DietTemplateMobileTray,
  DietTemplateMobileTrayItemSelected,
  DietTemplateMobileTrayItemSmallSelected
} from './diet-template-mobile-tray';
import { Plus } from 'lucide-react';
import { scrollToTop } from '@/utils';
import { useWindowScroll } from 'react-use';
import Allergens from '../allergens';
import DietCompareNutrient from './diet-compare-nutrient';
import { INutrientSummary } from '@/types/nutrient.type';
import { useAtom, useAtomValue } from 'jotai';
import { foodIdentityAtom, setFoodIdentityAtom } from '@/atoms/foodIdentity';

const materialSchema = z.object({
  code: z.string().min(1),
  recipeWeight: z.number().optional(),
  calculationWeight: z.number().optional()
});

const foodSchema = z.object({
  sequence: z.number(),
  name: z.string(),
  code: z.string(),
  recipeDescription: z.string().optional(),
  materials: z.array(materialSchema)
});

const formSchema = z.object({
  id: z.number().min(1),
  foods: z
    .array(foodSchema)
    .refine((foods) => foods.some((f) => f.code && f.code.trim() !== ''), {
      message: 'At least one food must have a non-empty code'
    })
  // foods: z.array(foodSchema).min(1)
});

type DietDetailsFormValue = z.infer<typeof formSchema>;

interface DietFoodSelectProps {
  onSelectAllergens: (allergens: number[]) => void;
  onResetAllergens: () => void;
  originalFoods: ITrayItem[];
  allergens: number[];
  diet: DietDetail;
  selectedOriginalFood?: Food;
  onFood: (food: Food | undefined) => void;
  onFoods: (foods: ITrayItem[]) => void;
  onCancel: () => void;
  onLoadingFood: (isFetching: boolean) => void;
  materials?: FoodMaterialForm;
  onSaveAll: (data: DietDetailsFormValue) => void;
  warningNutrients: NutrientCompare[];
  checkedCodes: Set<string>;
  loading?: boolean;
  initialNutrientsSummary: INutrientSummary[];
  onChangeNutrientsSummary: (nutrients: NutrientCompare[]) => void;
  onWarningNutrientsChange: (nutrients: NutrientCompare[]) => void;
}

const DietFoodSelect = ({
  diet,
  onCancel,
  onFood,
  onFoods,
  onLoadingFood,
  materials,
  onSaveAll,
  warningNutrients,
  originalFoods,
  onSelectAllergens,
  allergens,
  checkedCodes,
  onResetAllergens,
  loading = false,
  initialNutrientsSummary,
  onChangeNutrientsSummary,
  onWarningNutrientsChange
}: DietFoodSelectProps) => {
  const [_, setIdentity] = useAtom(setFoodIdentityAtom);

  const formDietDetails = useForm<DietDetailsFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      id: 0,
      foods: [
        {
          sequence: 0,
          code: '',
          recipeDescription: '',
          materials: [
            {
              code: '',
              recipeWeight: 0,
              calculationWeight: 0
            }
          ]
        }
      ]
    }
  });

  const { y: scrollY } = useWindowScroll();

  const {
    code: renamedCode,
    name: renamedName,
    sequence: renamedSequence
  } = useAtomValue(foodIdentityAtom);
  const [listTrayItems, setListTrayItem] = useState<ITrayItem[]>([]);
  const [seperateList, setSeperateList] = useState<ITrayItem[]>([]);
  const [selectedTrayItem, setSelectedTrayItem] = useState<ITrayItem>();
  const [selectedSeperateTrayItem, setSelectedSeperateTrayItem] =
    useState<ITrayItem>();
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [isScrolled, setIsScrolled] = useState(false);

  const isShowTray = useMediaQuery('(min-width: 900px)');
  const queryClient = useQueryClient();

  const {
    data: food,
    isFetching: isFetchingFood,
    refetch: refetchFood,
    isSuccess
  } = useFood(selectedFood?.code || '', selectedFood?.name || '');

  function updateFoodNameInList(
    list: ITrayItem[],
    code: string,
    newName: string,
    sequence: number
  ) {
    let changed = false;
    const next = list.map((it) => {
      if (it.sequence === String(sequence)) {
        changed = true;
        return { ...it, name: newName };
      }
      return it;
    });
    return { next, changed };
  }

  // Update tray lists, selected items, and formDietDetails
  // Only trigger when renamedName changes (not just renamedCode)
  useEffect(() => {
    if (!renamedCode || !renamedName) return;

    let selectedSequence = renamedSequence;

    if (selectedTrayItem && !selectedSequence) {
      selectedSequence = Number(selectedTrayItem.sequence);
    }

    if (selectedSeperateTrayItem && !selectedSequence) {
      selectedSequence = Number(selectedSeperateTrayItem.sequence);
    }

    if (!selectedSequence) return;

    setIdentity({ sequence: selectedSequence });

    // 1) Update both tray lists
    const { next: nextMain, changed: mainChanged } = updateFoodNameInList(
      listTrayItems,
      renamedCode,
      renamedName,
      selectedSequence
    );
    const { next: nextSep, changed: sepChanged } = updateFoodNameInList(
      seperateList,
      renamedCode,
      renamedName,
      selectedSequence
    );

    if (mainChanged) setListTrayItem(nextMain);
    if (sepChanged) setSeperateList(nextSep);

    // 2) Update selectedTrayItem/selectedSeperateTrayItem if matching code
    if (selectedTrayItem?.sequence === String(selectedSequence)) {
      setSelectedTrayItem({ ...selectedTrayItem, name: renamedName });
    }
    if (selectedSeperateTrayItem?.sequence === String(selectedSequence)) {
      setSelectedSeperateTrayItem({
        ...selectedSeperateTrayItem,
        name: renamedName
      });
    }

    // 3) Sync formDietDetails.foods with the new name
    const foods = formDietDetails.getValues('foods');
    const foodsNext = foods.map((f) =>
      f.sequence === selectedSequence ? { ...f, name: renamedName } : f
    );

    formDietDetails.setValue('foods', foodsNext, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renamedName]); // <-- depend only on renamedName

  useEffect(() => {
    if (checkedCodes && checkedCodes.size > 0) {
      handleRemoveFood();
      const newTray = listTrayItems.map((food) => {
        if (food.code && checkedCodes.has(food.code)) {
          return { ...food, code: undefined, materials: [] };
        }
        return food;
      });

      const newSeparatedTray = seperateList.map((food) => {
        if (food.code && checkedCodes.has(food.code)) {
          return { ...food, code: undefined, materials: [] };
        }
        return food;
      });

      setListTrayItem(newTray);
      setSeperateList(newSeparatedTray);

      const formFoods = [...newTray, ...newSeparatedTray].map((item) => ({
        sequence: Number(item.sequence),
        name: item.name || '',
        code: item?.code ? item.code : '',
        recipeDescription: item?.recipeDescription
          ? item.recipeDescription
          : '',
        materials:
          item?.materials?.map((material) => ({
            code: material?.code,
            recipeWeight: material?.recipeWeight,
            calculationWeight: material?.calculationWeight
          })) || []
      }));

      formDietDetails.setValue('foods', formFoods, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
      onFoods([...newTray, ...newSeparatedTray]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedCodes]);

  useEffect(() => {
    if (materials) {
      const foods = formDietDetails.getValues('foods');
      const updatedFoods = foods.map((foodItem) => {
        if (
          foodItem.sequence?.toString() === selectedTrayItem?.sequence ||
          foodItem.sequence?.toString() === selectedSeperateTrayItem?.sequence
        ) {
          return {
            ...foodItem,
            recipeDescription: materials.recipeDescription,
            materials: materials.materials
          };
        }
        return foodItem;
      });

      formDietDetails.setValue('foods', updatedFoods, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });

      if (selectedTrayItem) {
        const trayItem = { ...selectedTrayItem };
        trayItem.recipeDescription = materials.recipeDescription;
        trayItem.materials = materials.materials;
        setListTrayItem((prevItems) =>
          prevItems.map((item) =>
            item.sequence === trayItem.sequence ? trayItem : item
          )
        );
      }

      if (selectedSeperateTrayItem) {
        const trayItem = { ...selectedSeperateTrayItem };
        trayItem.recipeDescription = materials.recipeDescription;
        trayItem.materials = materials.materials;
        setSeperateList((prevItems) =>
          prevItems.map((item) =>
            item.sequence === trayItem.sequence ? trayItem : item
          )
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materials]);

  useEffect(() => {
    onLoadingFood(isFetchingFood);
  }, [isFetchingFood, onLoadingFood]);

  useEffect(() => {
    if (diet?.tray?.foods) {
      // setup for summary
      onFoods(convertFoodsToTrayItemArray(diet.tray.foods));

      const trayItems = convertFoodsToTrayItemArray(diet.tray.foods);
      const separateItems = trayItems.filter(
        (item) => item.separatedFlag === SeparatedFlag.Yes
      );
      const nonSeparateItems = trayItems.filter(
        (item) => item.separatedFlag !== SeparatedFlag.Yes
      );

      const formFoods = [...separateItems, ...nonSeparateItems].map((item) => ({
        sequence: Number(item.sequence),
        code: item?.code ? item.code : '',
        name: item.name || '',
        recipeDescription: item?.recipeDescription
          ? item.recipeDescription
          : '',
        materials:
          item?.materials?.map((material) => ({
            code: material?.code,
            recipeWeight: material?.recipeWeight,
            calculationWeight: material?.calculationWeight
          })) || []
      }));

      formDietDetails.setValue('id', diet?.tray?.id, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
      formDietDetails.setValue('foods', formFoods, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });

      setListTrayItem(nonSeparateItems);
      setSeperateList(separateItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diet]);

  const handleResetAllergens = () => {
    onFoods(convertFoodsToTrayItemArray(diet.tray.foods));

    const trayItems = convertFoodsToTrayItemArray(diet.tray.foods);
    const separateItems = trayItems.filter(
      (item) => item.separatedFlag === SeparatedFlag.Yes
    );
    const nonSeparateItems = trayItems.filter(
      (item) => item.separatedFlag !== SeparatedFlag.Yes
    );

    setSeperateList(separateItems);
    setListTrayItem(nonSeparateItems);

    const formFoods = [...separateItems, ...nonSeparateItems].map((item) => ({
      sequence: Number(item.sequence),
      name: item.name || '',
      code: item?.code ? item.code : '',
      recipeDescription: item?.recipeDescription ? item.recipeDescription : '',
      materials:
        item?.materials?.map((material) => ({
          code: material?.code,
          recipeWeight: material?.recipeWeight,
          calculationWeight: material?.calculationWeight
        })) || []
    }));

    formDietDetails.setValue('foods', formFoods, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });

    onResetAllergens();
  };

  const updateFoodsToTray = (separate: boolean) => {
    if (selectedFood) {
      onFood(food);

      let trayFood: ITrayItem | undefined;
      let trayList: ITrayItem[] = [...listTrayItems];
      let traySeparateList: ITrayItem[] = [...seperateList];

      if (separate) {
        trayFood =
          food && selectedSeperateTrayItem
            ? convertFoodToTrayItem(food, selectedSeperateTrayItem)
            : undefined;
        traySeparateList = seperateList.map((item) =>
          item.sequence === trayFood?.sequence ? trayFood : item
        );
        setSeperateList((prevItems) =>
          prevItems.map((item) =>
            item.sequence === trayFood?.sequence ? trayFood : item
          )
        );
        setSelectedSeperateTrayItem(trayFood);
      } else {
        trayFood =
          food && selectedTrayItem
            ? convertFoodToTrayItem(food, selectedTrayItem)
            : undefined;
        trayList = listTrayItems.map((item) =>
          item.sequence === trayFood?.sequence ? trayFood : item
        );
        setListTrayItem((prevItems) =>
          prevItems.map((item) =>
            item.sequence === trayFood?.sequence ? trayFood : item
          )
        );
        setSelectedTrayItem(trayFood);
      }

      const mergeTrayItems = [...trayList, ...traySeparateList].filter(
        (item) => !isNil(item?.code)
      );
      onFoods(mergeTrayItems);

      const foods = formDietDetails.getValues('foods');

      const selectedSequence = selectedTrayItem
        ? selectedTrayItem.sequence
        : selectedSeperateTrayItem?.sequence;

      let updatedFoods = foods.map((foodItem) => {
        if (foodItem.sequence?.toString() === trayFood?.sequence) {
          const updateData = {
            ...foodItem,
            code: trayFood?.code || '',
            recipeDescription: food?.recipeDescription || '',
            materials:
              trayFood?.materials?.map((material) => ({
                code: material?.code || '',
                recipeWeight: material?.recipeWeight,
                calculationWeight: material?.calculationWeight
              })) || []
          };

          // update name when only having selectedSequence
          if (selectedSequence && selectedFood?.name) {
            updateData.name = selectedFood.name;
            updateData.code = selectedFood.code;
          }

          return updateData;
        }
        return foodItem;
      });

      setIdentity({
        code: selectedFood.code,
        name: selectedFood.name,
        sequence: selectedSequence ? Number(selectedSequence) : 0
      });

      formDietDetails.setValue('foods', updatedFoods, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (food && selectedTrayItem) {
        updateFoodsToTray(false);
      }
      if (food && selectedSeperateTrayItem) {
        updateFoodsToTray(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onSubmit = (data: DietDetailsFormValue) => {
    onSaveAll(data);
  };

  const handleRemoveFood = () => {
    setSelectedFood(undefined);
    onFood(undefined);
    setSelectedTrayItem(undefined);
    setSelectedSeperateTrayItem(undefined);
  };

  const handleSelectedTrayNoFood = ({
    trayItem,
    separate
  }: {
    trayItem?: ITrayItem;
    separate: boolean;
  }) => {
    if (selectedTrayItem?.sequence === trayItem?.sequence) {
      handleRemoveFood();
      return;
    }

    if (selectedSeperateTrayItem?.sequence === trayItem?.sequence) {
      handleRemoveFood();
      return;
    }

    setSelectedFood(undefined);
    onFood(undefined);
    setSelectedTrayItem(separate ? undefined : trayItem);
    setSelectedSeperateTrayItem(separate ? trayItem : undefined);
  };

  const handleSelectedTray = ({
    item,
    separate
  }: {
    item: ITrayItem;
    separate: boolean;
  }) => {
    setSelectedFood(undefined);
    onFood(undefined);

    const existingFoods = formDietDetails.getValues('foods');
    const existingFood = existingFoods.find(
      (food) =>
        food.code === item.code && food.sequence.toString() === item.sequence
    );

    if (selectedTrayItem?.sequence === item.sequence) {
      handleRemoveFood();
      return;
    }

    if (selectedSeperateTrayItem?.sequence === item.sequence) {
      handleRemoveFood();
      return;
    }

    if (existingFood) {
      const newMaterial = transformMaterials(
        existingFood.materials,
        item.materials
      );
      item.materials = newMaterial;
      item.recipeDescription = existingFood?.recipeDescription || '';
      onFood(convertITrayItemToFood(item));
    }
    setSelectedTrayItem(separate ? undefined : item);
    setSelectedSeperateTrayItem(separate ? item : undefined);
  };

  /**
   * 중량 정보 패널에서 총 중량을 맞췄을 때. 중량만 바뀐 음식 배열을 받아 세 곳에 모두 반영한다.
   *  - 식판 목록(화면에 보이는 것)
   *  - 폼 값(저장되는 것)
   *  - 부모 상태(영양성분·영양평가가 다시 계산되는 것)
   * 하나라도 빠지면 화면과 저장값이 어긋난다.
   */
  const handleAdjustWeights = (adjustedFoods: ITrayItem[]) => {
    const materialsBySequence = new Map(
      adjustedFoods.map((food) => [String(food.sequence), food.materials ?? []])
    );

    const applyToItems = (items: ITrayItem[]) =>
      items.map((item) => {
        const materials = materialsBySequence.get(String(item.sequence));
        return materials ? { ...item, materials } : item;
      });

    setListTrayItem((prev) => applyToItems(prev));
    setSeperateList((prev) => applyToItems(prev));

    const formFoods = formDietDetails.getValues('foods').map((food) => {
      const materials = materialsBySequence.get(String(food.sequence));
      if (!materials) return food;
      return {
        ...food,
        materials: materials.map((material) => ({
          code: material.code,
          recipeWeight: material.recipeWeight,
          calculationWeight: material.calculationWeight
        }))
      };
    });

    formDietDetails.setValue('foods', formFoods, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false
    });

    onFoods(adjustedFoods);
  };

  const handleSelectFoodIntoTray =(foodItem: Food) => {
    setSelectedFood(foodItem);

    queryClient.removeQueries({
      queryKey: [QueryKeys.DIET_FOOD, foodItem.code, foodItem.name]
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(async () => {
      refetchFood();
    }, 200);
    setTimeoutId(id);
  };

  const renderTraysMobilePreview = () => {
    if (selectedSeperateTrayItem) {
      return (
        <div className="flex w-full">
          <DietTemplateMobileTrayItemSmallSelected
            onBack={() => {
              handleRemoveFood();
              scrollToTop();
            }}
            tray={selectedSeperateTrayItem}
          />
        </div>
      );
    } else if (selectedTrayItem) {
      return (
        <div className="flex w-full">
          <DietTemplateMobileTrayItemSmallSelected
            onBack={() => {
              handleRemoveFood();
              scrollToTop();
            }}
            tray={selectedTrayItem}
          />
        </div>
      );
    }
    return null;
  };

  const renderTraysMobile = () => {
    if (selectedSeperateTrayItem) {
      return (
        <div className="flex w-full">
          <DietTemplateMobileTrayItemSelected
            onBack={() => {
              handleRemoveFood();
              scrollToTop();
            }}
            tray={selectedSeperateTrayItem}
          />
        </div>
      );
    } else if (selectedTrayItem) {
      return (
        <div className="flex w-full">
          <DietTemplateMobileTrayItemSelected
            onBack={() => {
              handleRemoveFood();
              scrollToTop();
            }}
            tray={selectedTrayItem}
          />
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col gap-4">
        <DietTemplateMobileTray
          list={listTrayItems}
          onClick={(item) => {
            if (!item?.code) {
              handleSelectedTrayNoFood({
                trayItem: item,
                separate: false
              });
            } else {
              handleSelectedTray({ item, separate: false });
            }
            scrollToTop();
          }}
        />
        {seperateList.length > 0 && (
          <>
            <div className="flex w-full items-center justify-center">
              <Plus className="h-6 w-6 font-bold" />
            </div>
            <DietTemplateMobileTray
              list={seperateList}
              onClick={(item) => {
                if (!item?.code) {
                  handleSelectedTrayNoFood({
                    trayItem: item,
                    separate: true
                  });
                } else {
                  handleSelectedTray({ item, separate: true });
                }
                scrollToTop();
              }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <Form {...formDietDetails}>
      <form onSubmit={formDietDetails.handleSubmit(onSubmit)}>
        <div className="mx-auto">
          <div
            className={cn(
              'mb-5 flex flex-col',
              isScrolled &&
                'section-padding fixed left-0 top-[4rem] z-[11] mb-0 w-full border-none bg-white py-3 shadow-lg md:py-5'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                  {diet?.name}
                </h3>

                {/* 기준 충족 여부는 이 화면의 결론이라 식단명 바로 옆에 둔다 */}
                {originalFoods.length > 0 &&
                  (warningNutrients.length > 0 ? (
                    <span
                      className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-white md:text-sm"
                      title={`기준을 벗어난 영양소: ${warningNutrients
                        .map((item) => item.name)
                        .join(', ')}`}
                    >
                      <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                      <span className="truncate">
                        영양기준 부적합 ·{' '}
                        {warningNutrients.map((item) => item.name).join(', ')}
                      </span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#e6f4ea] px-2.5 py-1 text-xs font-semibold text-[#0f7a2e] md:text-sm">
                      영양기준 충족
                    </span>
                  ))}
              </div>
              <div className="flex shrink-0 items-center justify-end gap-2">
                <Button
                  type="submit"
                  disabled={!formDietDetails.formState.isValid}
                  size="sm"
                  className="w-20 md:w-28"
                >
                  저장
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="w-20 md:w-24"
                  variant="outline"
                  onClick={onCancel}
                >
                  취소
                </Button>
              </div>
            </div>
            {warningNutrients.length > 0 && (
              <div className="border-destructive-200 mt-2 hidden items-center rounded border bg-black/10 px-5 py-3 md:flex">
                <div className="mr-2 w-6">
                  <ExclamationTriangleIcon className="h-6 w-6 text-destructive" />
                </div>
                <span className="text-sm text-destructive">
                  {diet.standard.name}의 영양기준에 부적합입니다. 현재 설정된
                  내용으로 저장할 경우, 식단의 영양기준이 일반식으로 변경됩니다.
                </span>
              </div>
            )}
          </div>
          {(isShowTray || (!selectedTrayItem && !selectedSeperateTrayItem)) &&
            process.env.NEXT_PUBLIC_FEATURE_ALLERGEN !== 'false' && (
              <div className="mb-4 rounded-lg bg-white px-4 py-2 md:py-4">
                <Allergens
                  onReset={handleResetAllergens}
                  defaultValue={allergens}
                  onSelect={onSelectAllergens}
                />
              </div>
            )}

          {!isShowTray &&
            (selectedTrayItem || selectedSeperateTrayItem) &&
            scrollY > 150 && (
              <div
                className={cn(
                  'fixed bottom-0 left-0 right-0 z-[11] mt-0 justify-end bg-white px-4 py-2 shadow-md'
                )}
              >
                {renderTraysMobilePreview()}
              </div>
            )}

          <div className="flex flex-col gap-0 xl:flex-row xl:gap-8">
            <div
              className={cn('flex items-center justify-center', {
                'xl:w-[50%]':
                  isShowTray && listTrayItems.length + seperateList.length <= 5,
                'xl:w-[60%]':
                  isShowTray && listTrayItems.length + seperateList.length > 5
              })}
            >
              <div
                className={cn('flex w-full', {
                  'w-full':
                    isShowTray &&
                    listTrayItems.length + seperateList.length <= 6
                })}
              >
                {isFetchingFood || loading ? (
                  <div className="flex h-64 w-full items-center justify-center">
                    <Spinner size="large" />
                  </div>
                ) : isShowTray ? (
                  <div className="flex w-full flex-row items-center justify-center gap-0 xl:flex-col xl:gap-2">
                    <DietTemplateTray
                      selectedTrayItem={selectedTrayItem}
                      onSelect={(item) => {
                        if (!item?.code) {
                          handleSelectedTrayNoFood({
                            trayItem: item,
                            separate: false
                          });
                        } else {
                          handleSelectedTray({ item, separate: false });
                        }
                      }}
                      total={listTrayItems.length}
                      listItems={listTrayItems}
                    />
                    <div className="w-4" />
                    <DietSeperateTray
                      selectedTrayItem={selectedSeperateTrayItem}
                      onSelect={(item) => {
                        if (!item?.code) {
                          handleSelectedTrayNoFood({
                            trayItem: item,
                            separate: true
                          });
                        } else {
                          handleSelectedTray({ item, separate: true });
                        }
                      }}
                      listSeperate={seperateList}
                    />
                  </div>
                ) : (
                  renderTraysMobile()
                )}
              </div>
            </div>
            {originalFoods.length > 0 && (
              <div
                className={cn('', {
                  'xl:w-[50%]':
                    isShowTray &&
                    listTrayItems.length + seperateList.length <= 5,
                  'xl:w-[40%]':
                    isShowTray && listTrayItems.length + seperateList.length > 5
                })}
              >
                <DietCompareNutrient
                  foods={originalFoods}
                  standard={diet.standard}
                  onWarningNutrientsChange={onWarningNutrientsChange}
                  onChangeNutrientsSummary={onChangeNutrientsSummary}
                  initialNutrientsSummary={initialNutrientsSummary || []}
                  onChangeFoods={handleAdjustWeights}
                />
              </div>
            )}
          </div>
          {selectedTrayItem && (
            <div className="mt-4">
              <DietSearchRecommend
                allergens={allergens}
                selectedTrayItem={selectedTrayItem}
                listFoods={[...listTrayItems, ...seperateList]}
                onSelectFood={handleSelectFoodIntoTray}
                dietId={diet?.id}
              />
            </div>
          )}
          {selectedSeperateTrayItem && (
            <div className="mt-4">
              <DietSearchRecommend
                allergens={allergens}
                selectedTrayItem={selectedSeperateTrayItem}
                listFoods={[...listTrayItems, ...seperateList]}
                onSelectFood={handleSelectFoodIntoTray}
                dietId={diet?.id}
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default DietFoodSelect;
