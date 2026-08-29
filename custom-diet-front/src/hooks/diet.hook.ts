import { dietApi } from '@/api-client/diet.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import { FavouriteFlag, MandatoryFlag } from '@/types';
import { ICalculatorInput } from '@/types/calculator.type';
import {
  DietDetail,
  IAllergenCheckFood,
  IDietAddFoodToTray,
  IDietDetail,
  IUpdateDietParams,
  ITrayTemplate
} from '@/types/diet.type';
import {
  CreateMaterial,
  DetailMaterial,
  DetailMaterialQueryParams,
  GetMyMaterialsParams,
  GetMyRecipesParams,
  GetRecipesParams,
  SaveRecipePayload,
  SearchMaterialWithPaginationParams
} from '@/types/food.type';
import { INutrientSummary } from '@/types/nutrient.type';
import {
  keepPreviousData,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';
import { create } from 'zustand';
import { toast } from './use-toast';

export const useDietReportsMonthlyPrice = () => {
  return useQuery({
    queryKey: [QueryKeys.DIET_REPORTS_MONTHLY_PRICE],
    queryFn: () => dietApi.getDietReportsMonthlyPrice()
  });
};

export const useNutritionStandardCategoryReport = () => {
  return useQuery({
    queryKey: [QueryKeys.DIET_NUTRITION_STANDARD_CATEGORY_REPORT],
    queryFn: () => dietApi.getNutritionStandardCategoryReport()
  });
};

export const useDiets = () => {
  return useQuery({
    queryKey: [QueryKeys.DIET_LIST],
    queryFn: () => dietApi.getDiets()
  });
};

export const useDietAllergens = () => {
  return useQuery({
    queryKey: [QueryKeys.DIET_ALLERGENS],
    queryFn: () => dietApi.getAllergens()
  });
};

//handle checked accessory has no name
interface AccessoryNameStore {
  isError: boolean;
  setIsError: (f: boolean) => void;
}

export const useCheckErrorAccessoryName = create<AccessoryNameStore>((set) => ({
  isError: false,
  setIsError: (value) => set(() => ({ isError: value }))
}));

//handle reset data in calculation table
interface CalculateStore {
  isReset: boolean;
  setIsReset: () => void;
}

export const useResetCalculatorTable = create<CalculateStore>((set) => ({
  isReset: false,
  setIsReset: () => set((state) => ({ isReset: !state.isReset }))
}));

//handle scroll when create diet without recommend foods
interface ScrollStore {
  isScroll: boolean;
  setIsScroll: (f: boolean) => void;
}

export const useScrollPage = create<ScrollStore>((set) => ({
  isScroll: false,
  setIsScroll: (value) => set(() => ({ isScroll: value }))
}));

// avoid calling api repeat
interface DietByIdStore {
  dietDataStore: DietDetail;
  setDietData: (f: DietDetail) => void;
}

export const useGetDietValue = create<DietByIdStore>((set) => ({
  dietDataStore: {
    id: 0,
    description: '',
    favouriteFlag: FavouriteFlag.No,
    name: '',
    servingQuantity: 1,
    adjustmentPercent: 1,
    accessories: [],
    standard: {
      code: '',
      name: '',
      typeCode: '',
      typeName: '',
      nutrients: []
    },
    tray: {
      id: 0,
      name: '',
      representativeTrayCode: '',
      mandatoryFlag: MandatoryFlag.No,
      representativeTrayName: '',
      foods: []
    },
    allergens: [],
    excludedAllergens: []
  },
  setDietData: (valueDiet) => set({ dietDataStore: { ...valueDiet } })
}));

export const useDiet = (dietId: number) => {
  return useQuery({
    queryKey: [QueryKeys.DIET, dietId],
    queryFn: () => dietApi.getDiet(dietId)
  });
};

export const useNutrientStandardTemplates = (dietId?: number) => {
  return useQuery({
    queryKey: [QueryKeys.NUTRIENT_STANDARD_TEMPLATES],
    queryFn: () => dietApi.getNutrientStandardTemplates(dietId)
  });
};

export const useTrayTemplates = (
  dietId?: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.TRAY_TEMPLATE_LIST],
    queryFn: () => dietApi.getTrayTemplates(dietId),
    enabled: options?.enabled ?? true
  });
};

export const useTemplateTrays = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: [QueryKeys.TEMPLATE_TRAY_LIST],
    queryFn: () => dietApi.getTemplateTrays(),
    ...options
  });
};

export const useTrayNutritionSummary = (dietId: number) => {
  return useQuery({
    queryKey: [QueryKeys.DIET_TRAY_NUTRITION_SUMMARY],
    queryFn: () => dietApi.getTrayNutritionSummary(dietId)
  });
};

export const useTrayTemplatesAll = () => {
  return useQuery({
    queryKey: [QueryKeys.TRAY_TEMPLATE_LIST_ALL],
    queryFn: () => dietApi.getTrayTemplates()
  });
};

export const useNutrients = () => {
  return useQuery({
    queryKey: [QueryKeys.DIET_NUTRIENT_LIST],
    queryFn: () => dietApi.getNutrients()
  });
};

export const useFoods = ({
  limit,
  searchValue,
  typeCode,
  excludedAllergenIds
}: {
  limit?: number;
  searchValue?: string;
  typeCode?: string;
  excludedAllergenIds?: number[];
}) => {
  return useQuery({
    queryKey: [QueryKeys.DIET_FOOD_LIST],
    queryFn: () =>
      dietApi.getFoods({
        limit,
        searchValue,
        fdTpCd: typeCode,
        excludedAllergenIds
      })
  });
};

export const useRecommendFoods = ({
  limit,
  foodCode,
  typeCode,
  excludedAllergenIds,
  dietId,
  currentFoodCode,
  currentTrayFoods
}: {
  limit?: number;
  foodCode?: string;
  typeCode?: string;
  excludedAllergenIds?: number[];
  dietId?: number;
  currentFoodCode?: string;
  currentTrayFoods?: string[];
}) => {
  return useQuery({
    queryKey: [QueryKeys.DIET_FOOD_RECOMMEND_LIST, { limit, foodCode, typeCode, dietId, currentFoodCode, excludedAllergenIds, currentTrayFoods }],
    queryFn: () =>
      dietApi.getRecommendFoods({
        limit,
        foodCode,
        typeCode,
        excludedAllergenIds,
        dietId,
        currentFoodCode,
        currentTrayFoods
      }),
    enabled: !!(foodCode || typeCode)
  });
};

export const useFood = (foodCode: string, foodName: string) => {
  return useQuery({
    queryKey: [QueryKeys.DIET_FOOD, foodCode, foodName],
    queryFn: () => dietApi.getFood(foodCode, foodName),
    enabled: false
  });
};

export const useRecipeDetail = (
  foodCode: string,
  foodName: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.DIET_FOOD, foodCode, foodName],
    queryFn: () => dietApi.getFood(foodCode, foodName),
    enabled: !!foodCode && (options?.enabled ?? true)
  });
};

export const useAllergenCheckFood = () => {
  return useMutation({
    mutationFn: (params: IAllergenCheckFood) =>
      dietApi.postCheckAllergenFood(params),
    onError: () => {
      toast({
        title: '알레르기 검사 중 서버 오류가 발생했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useSaveExcludedAllergen = (dietId: number) => {
  return useMutation({
    mutationFn: (excludedAllergenIds: number[]) =>
      dietApi.postSaveExcludedAllergen(dietId, excludedAllergenIds),
    onSuccess: () => {
      toast({
        title: '알레르기 제외 항목이 성공적으로 저장되었습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '알레르기 제외 항목 저장에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useDownloadDietExcel = (dietId: number) => {
  return useMutation({
    mutationFn: () => dietApi.downloadDietExcel(dietId),
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast({
        title: '엑셀 파일 다운로드에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useDownloadDietsExcel = () => {
  return useMutation({
    mutationFn: (dietIds: number[]) => dietApi.downloadDietsExcel(dietIds),
    onSuccess: ({ blob, fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: () => {
      toast({
        title: '엑셀 파일 다운로드에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useAddFoodsToTray = (dietId: number) => {
  return useMutation({
    mutationFn: (params: IDietAddFoodToTray) =>
      dietApi.addFoodsToTray(dietId, params),
    onSuccess: () => {
      toast({
        title: '음식이 트레이에 성공적으로 놓였습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '음식을 트레이에 넣었는데 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateTrayNutritionSummary = (dietId: number) => {
  return useMutation({
    mutationFn: (params: INutrientSummary[]) =>
      dietApi.updateTrayNutritionSummary(dietId, params)
  });
};

export const useCreateDiet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: IDietDetail) => dietApi.createDiet(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET_LIST]
      });
    },
    onError: (error: any) => {
      if (error.statusCode !== 400) {
        toast({
          title: '생성에 실패했습니다',
          variant: 'destructive'
        });
      } else if (error?.errors && error?.errors.length > 0) {
        toast({
          title: error.errors[0],
          variant: 'destructive'
        });
      }
    }
  });
};

export const useUpdateDiet = (dietId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dietId, params }: { dietId: number; params: IUpdateDietParams }) =>
      dietApi.updateDiet(dietId, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET, dietId]
      });

      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET_LIST]
      });

      toast({
        title: '성공적으로 수정되었습니다',
        variant: 'success'
      });
    },
    onError: (error: any) => {
      if (error.statusCode !== 400) {
        toast({
          title: '수정에 실패했습니다',
          variant: 'destructive'
        });
      } else if (error?.errors && error?.errors.length > 0) {
        toast({
          title: error.errors[0],
          variant: 'destructive'
        });
      }
    }
  });
};

export const useUpdateFavorite = (dietId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ dietId, favorite }: { dietId: number; favorite: string }) =>
      dietApi.updateFavorite(dietId, favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET_LIST]
      });

      if (dietId) {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.DIET, dietId]
        });
      }

      toast({
        title: '수정되었습니다',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '즐겨찾기 수정에 실패했습니다',
        variant: 'destructive'
      });
    }
  });
};

export const useDeleteDiet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dietId: number) => dietApi.deleteDiet(dietId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET_LIST]
      });

      toast({
        title: '삭제되었습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '삭제하지 못했습니다.',
        variant: 'destructive'
      });
    }
  });
};

// hooks for template tray
export const useCreateTrayTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ITrayTemplate) => dietApi.createTrayTemplates(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TRAY_TEMPLATE_LIST]
      });

      toast({
        title: '성공적으로 생성되었습니다',
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    }
  });
};

export const useDeleteTrayTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (trayId: number) => dietApi.deleteTrayTemplates(trayId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TRAY_TEMPLATE_LIST]
      });

      toast({
        title: '삭제되었습니다.',
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      if (error.statusCode !== 400) {
        toast({
          title: '삭제하지 못했습니다.',
          variant: 'destructive'
        });
      }
    }
  });
};

export const useUpdateTrayTemplate = (trayId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ITrayTemplate) =>
      dietApi.updateTrayTemplates(params, trayId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TRAY_TEMPLATE_LIST]
      });

      toast({
        title: '수정 완료',
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      if (error.statusCode !== 400) {
        toast({
          title: '수정 실패',
          variant: 'destructive'
        });
      } else if (error?.errors && error?.errors.length > 0) {
        toast({
          title: error.errors[0],
          variant: 'destructive'
        });
      }
    }
  });
};

type UseDetailMaterialsQueryOptions = Omit<
  UseQueryOptions<DetailMaterial[]>,
  'queryKey' | 'queryFn'
>;

export const useDetailMaterials = (
  params: DetailMaterialQueryParams,
  options?: UseDetailMaterialsQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.MATERIAL_LIST, { ...params }],
    queryFn: () => dietApi.getDetailMaterials(params)
  });
};

export const useDetailMaterialsWithPagination = (
  params: SearchMaterialWithPaginationParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.MATERIAL_LIST_PAGINATION, { ...params }],
    queryFn: () => dietApi.searchMaterialWithPagination(params),
    placeholderData: keepPreviousData,
    ...options
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (material: CreateMaterial) => dietApi.createMaterial(material),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MATERIAL_LIST]
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MY_MATERIAL_LIST]
      });

      toast({
        title: '성공',
        description: '새로운 식재료가 추가되었습니다!',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '재료를 추가하는 데 실패했습니다',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    }
  });
};

export const useRepresentTemplates = () => {
  return useQuery({
    queryKey: [QueryKeys.REPRESENTATIVE_TEMPLATE],
    queryFn: () => dietApi.getRepresentTemplates()
  });
};

export const useAddPrices = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: ICalculatorInput) =>
      dietApi.addPriceForMaterials(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DIET]
      });

      toast({
        title: '예상 가격이 저장 되었습니다.',
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      toast({
        title: error.errors.join(', '),
        variant: 'destructive'
      });
    }
  });
};

export const useGetMaterialTypes = () => {
  return useQuery({
    queryKey: [QueryKeys.MATERIAL_TYPE_LIST],
    queryFn: () => dietApi.getMaterialTypes()
  });
};

export const useGetMaterialCategories = (typeCode?: string) => {
  return useQuery({
    queryKey: [QueryKeys.MATERIAL_CATEGORY_LIST, typeCode],
    queryFn: () => dietApi.getMaterialCategories(typeCode),
    enabled: !!typeCode
  });
};

export const useGetMaterialRepresentatives = (categoryId: number) => {
  return useQuery({
    queryKey: [QueryKeys.MATERIAL_LIST, categoryId],
    queryFn: () => dietApi.getMaterialRepresentatives(categoryId),
    enabled: !!categoryId
  });
};

export const useSaveRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      foodCode,
      recipe,
      foodName
    }: {
      foodCode?: string;
      foodName?: string;
      recipe?: string | '';
    }) => dietApi.saveRecipe(foodCode, recipe, foodName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MY_RECIPE_LIST] });
      // toast({
      //   title: '레시피 저장 성공!',
      //   variant: 'success'
      // });
    },
    onError: () => {
      toast({
        title: '저장하지 못했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useAddRecommendFoods = () => {
  return useMutation({
    mutationFn: (dietId: number) => dietApi.addRecommendFoods(dietId),
    onSuccess: () => {
      toast({
        title: '성공적으로 생성되었습니다.',
        variant: 'success'
      });
    },
    onError: (error) => {
      // @ts-ignore
      const statusCode = error?.statusCode;

      if (statusCode === 404) {
        toast({
          title: '성공적으로 생성되었습니다.',
          variant: 'success'
        });
      } else {
        toast({
          title: '성공적으로 생성되었습니다.',
          variant: 'success'
        });
      }
    }
  });
};

export const useFoodConversion = (foodCode: string) => {
  return useQuery({
    queryKey: [QueryKeys.FOOD_CONVERSION, foodCode],
    queryFn: () => dietApi.getFoodConversion(foodCode),
    enabled: !!foodCode
  });
};

export const useMyMaterials = (
  params: GetMyMaterialsParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.MY_MATERIAL_LIST, { ...params }],
    queryFn: () => dietApi.getMyMaterials(params),
    placeholderData: keepPreviousData,
    ...options
  });
};

export const useFoodTypes = () => {
  return useQuery({
    queryKey: [QueryKeys.FOOD_TYPE_LIST],
    queryFn: () => dietApi.getFoodTypes(),
    staleTime: 1000 * 60 * 10
  });
};

export const useRecipes = (
  params: GetRecipesParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.RECIPE_LIST, { ...params }],
    queryFn: () => dietApi.getRecipes(params),
    placeholderData: keepPreviousData,
    ...options
  });
};

export const useMyRecipes = (
  params: GetMyRecipesParams,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: [QueryKeys.MY_RECIPE_LIST, { ...params }],
    queryFn: () => dietApi.getMyRecipes(params),
    placeholderData: keepPreviousData,
    ...options
  });
};

/**
 * 레시피를 만들면 레시피 목록뿐 아니라 식단 설계의 음식 검색 결과에도 즉시 반영되어야 하므로
 * 음식 관련 캐시까지 함께 무효화한다.
 */
const invalidateRecipeQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [QueryKeys.RECIPE_LIST] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.MY_RECIPE_LIST] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.DIET_FOOD_LIST] });
  queryClient.invalidateQueries({ queryKey: [QueryKeys.DIET_FOOD] });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SaveRecipePayload) => dietApi.createRecipe(payload),
    onSuccess: () => {
      invalidateRecipeQueries(queryClient);
      toast({
        title: '성공',
        description: '새로운 레시피가 추가되었습니다!',
        variant: 'success'
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.errors?.[0] ?? '레시피 저장에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      foodCode,
      payload
    }: {
      foodCode: string;
      payload: SaveRecipePayload;
    }) => dietApi.updateRecipe(foodCode, payload),
    onSuccess: () => {
      invalidateRecipeQueries(queryClient);
      toast({
        title: '레시피가 수정되었습니다.',
        variant: 'success'
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.errors?.[0] ?? '레시피 수정에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (foodCode: string) => dietApi.deleteRecipe(foodCode),
    onSuccess: () => {
      invalidateRecipeQueries(queryClient);
      toast({
        title: '레시피가 삭제되었습니다.',
        variant: 'success'
      });
    },
    onError: (error: any) => {
      toast({
        title: error?.errors?.[0] ?? '레시피 삭제에 실패했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateMyMaterialName = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ matCd, name }: { matCd: string; name: string }) =>
      dietApi.updateMyMaterialName(matCd, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MY_MATERIAL_LIST] });
      toast({ title: '식품명이 수정되었습니다.', variant: 'success' });
    },
    onError: (error: any) => {
      const message =
        error?.errors?.[0] ?? '식품명 수정에 실패했습니다.';
      toast({ title: message, variant: 'destructive' });
    }
  });
};

export const useDeleteMyMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (matCd: string) => dietApi.deleteMyMaterial(matCd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MY_MATERIAL_LIST] });
      toast({ title: '식품이 삭제되었습니다.', variant: 'success' });
    },
    onError: (error: any) => {
      const message =
        error?.errors?.[0] ?? '식품 삭제에 실패했습니다.';
      toast({ title: message, variant: 'destructive' });
    }
  });
};
