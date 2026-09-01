import { ICalculatorInput } from '@/types/calculator.type';
import {
  Allergen,
  Diet,
  DietDetail,
  DietReportsMonthlyPrice,
  IAllergenCheckFood,
  IAllergenFood,
  IDietAddFoodToTray,
  IDietDetail,
  IUpdateDietParams,
  ITrayItem,
  ITrayTemplate,
  RepresentativeTemplate
} from '@/types/diet.type';
import {
  CreateMaterial,
  DetailMaterial,
  DetailMaterialPagination,
  DetailMaterialQueryParams,
  Food,
  FoodConversion,
  FoodTypeOption,
  GetMyMaterialsParams,
  GetMyRecipesParams,
  GetRecipesParams,
  MaterialCategory,
  MaterialRepresentative,
  MaterialType,
  MyMaterial,
  MyMaterialPagination,
  RecipePagination,
  SaveRecipePayload,
  SearchMaterialWithPaginationParams
} from '@/types/food.type';
import {
  INutrientSummary,
  Nutrient,
  NutrientStandardTemplate,
  NutritionStandardCategoryReport
} from '@/types/nutrient.type';

import { Tray } from '@/types/tray.type';
import { AxiosResponse } from 'axios';
import { http } from './http-wrapper';

const DIET_BASE_URL = '/diets';

export const dietApi = {
  getAllergens: async (): Promise<Allergen[]> => {
    return http.get(`${DIET_BASE_URL}/allergens`);
  },

  getDiets: async (): Promise<Diet[]> => {
    return http.get(DIET_BASE_URL);
  },

  getDiet: async (dietId: number): Promise<DietDetail> => {
    return http.get(`${DIET_BASE_URL}/${dietId}`);
  },

  getNutrientStandardTemplates: async (
    dietId?: number
  ): Promise<NutrientStandardTemplate[]> => {
    let url = `${DIET_BASE_URL}/standard-template`;

    if (dietId !== undefined) {
      url += `?dietId=${dietId}`;
    }

    return http.get(url);
  },

  getTemplateTrays: async (): Promise<ITrayTemplate[]> => {
    return http.get(`${DIET_BASE_URL}/template-trays`);
  },

  getTrayTemplates: async (dietId?: number): Promise<Tray[]> => {
    const params = new URLSearchParams();
    if (dietId) params.append('dietId', dietId.toString());

    const url = `${DIET_BASE_URL}/tray-template${params.toString() ? '?' + params.toString() : ''}`;
    return http.get(url);
  },

  getTrayNutritionSummary: async (
    dietId?: number
  ): Promise<INutrientSummary[]> => {
    const url = `${DIET_BASE_URL}/${dietId}/nutrition-summary`;
    return http.get(url);
  },

  updateTrayNutritionSummary: async (
    dietId: number,
    params: INutrientSummary[]
  ): Promise<any> => {
    return http.post(`${DIET_BASE_URL}/${dietId}/nutrition-summary`, params);
  },

  postCheckAllergenFood: async (
    params: IAllergenCheckFood
  ): Promise<IAllergenFood[]> => {
    return http.post(`${DIET_BASE_URL}/allergens/check-food`, params);
  },

  postSaveExcludedAllergen: async (
    dietId: number,
    excludedAllergenIds: number[]
  ): Promise<string> => {
    return http.post(`${DIET_BASE_URL}/${dietId}/save-excluded-allergen`, {
      excludedAllergenIds
    });
  },

  createTrayTemplates: async (params: ITrayTemplate): Promise<string> => {
    return http.post(`${DIET_BASE_URL}/tray-template`, params);
  },

  deleteTrayTemplates: async (trayId: number): Promise<string> => {
    return http.delete(`${DIET_BASE_URL}/tray-template/${trayId}`);
  },

  updateTrayTemplates: async (
    params: ITrayTemplate,
    trayId: number
  ): Promise<string> => {
    return http.put(`${DIET_BASE_URL}/tray-template/${trayId}`, params);
  },

  getNutrients: async (): Promise<Nutrient[]> => {
    return http.get(`${DIET_BASE_URL}/nutrients`);
  },

  getFoods: async ({
    limit,
    searchValue,
    fdTpCd,
    excludedAllergenIds
  }: {
    limit?: number;
    searchValue?: string;
    fdTpCd?: string;
    excludedAllergenIds?: number[];
  }): Promise<ITrayItem[]> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (searchValue) params.append('keyword', searchValue);
    if (fdTpCd) params.append('fdTpCd', fdTpCd);
    if (excludedAllergenIds && excludedAllergenIds.length > 0) {
      params.append('excludedAllergenIds', excludedAllergenIds.join(','));
    }

    const url = `${DIET_BASE_URL}/foods${params.toString() ? '?' + params.toString() : ''}`;
    return http.get(url);
  },

  getRecommendFoods: async ({
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
  }): Promise<Food[]> => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (foodCode) params.append('foodCode', foodCode);
    if (typeCode) params.append('fdTpCd', typeCode);
    if (excludedAllergenIds && excludedAllergenIds.length > 0) {
      params.append('excludedAllergenIds', excludedAllergenIds.join(','));
    }
    if (dietId) params.append('dietId', dietId.toString());
    if (currentFoodCode) params.append('currentFoodCode', currentFoodCode);
    if (dietId && currentTrayFoods && currentTrayFoods.length > 0) {
      currentTrayFoods.forEach((entry) => params.append('currentTrayFoods', entry));
    }

    const url = `${DIET_BASE_URL}/foods/recommend${params.toString() ? '?' + params.toString() : ''}`;
    return http.get(url);
  },

  getFood: async (foodCode: string, foodName: string): Promise<Food> => {
    return http.get(`${DIET_BASE_URL}/foods/${foodCode}`, {
      params: { foodName }
    });
  },

  createDiet: async (params: IDietDetail): Promise<IDietDetail> => {
    return http.post(DIET_BASE_URL, params);
  },

  /** 식단을 통째로 복사한다. name 을 비우면 서버가 "원본명 (사본)" 을 붙인다. */
  copyDiet: async (dietId: number, name?: string): Promise<DietDetail> => {
    return http.post(`${DIET_BASE_URL}/${dietId}/copy`, { name: name ?? null });
  },

  addFoodsToTray: async (
    dietId: number,
    params: IDietAddFoodToTray
  ): Promise<string> => {
    return http.post(`${DIET_BASE_URL}/${dietId}/add-food-to-tray`, params);
  },

  updateDiet: async (
    dietId: number,
    params: IUpdateDietParams
  ): Promise<DietDetail> => {
    return http.put(`${DIET_BASE_URL}/${dietId}`, params);
  },

  updateFavorite: async (dietId: number, favorite: string): Promise<string> => {
    return http.put(`${DIET_BASE_URL}/${dietId}/favourite-flag/${favorite}`);
  },

  deleteDiet: async (dietId: number): Promise<Diet> => {
    return http.delete(`${DIET_BASE_URL}/${dietId}`);
  },

  createMaterial: async (material: CreateMaterial): Promise<DetailMaterial> => {
    return http.post(`${DIET_BASE_URL}/materials`, material);
  },

  getDetailMaterials: async (
    params: DetailMaterialQueryParams
  ): Promise<DetailMaterial[]> => {
    const searchParams = new URLSearchParams();
    if (params.codes) {
      searchParams.append('codeList', params.codes.join(','));
    }
    if (params.representativeId) {
      searchParams.append(
        'representativeId',
        params.representativeId.toString()
      );
    }
    if (params.excludedAllergenIds && params.excludedAllergenIds.length > 0) {
      searchParams.append(
        'excludedAllergenIds',
        params.excludedAllergenIds.join(',')
      );
    }

    return http.get(`${DIET_BASE_URL}/materials`, {
      params: searchParams
    });
  },

  searchMaterialWithPagination: async (
    params: SearchMaterialWithPaginationParams
  ): Promise<DetailMaterialPagination> => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const value = params[key as keyof typeof params];

      if (
        value !== undefined &&
        value !== null &&
        !Array.isArray(value) &&
        typeof value !== 'object'
      ) {
        searchParams.append(key, value.toString());
      }
    }

    // Handle excludedAllergenIds
    if (params.excludedAllergenIds && params.excludedAllergenIds.length > 0) {
      searchParams.append(
        'excludedAllergenIds',
        params.excludedAllergenIds.join(',')
      );
    }
    return http.get(`${DIET_BASE_URL}/materials/paging`, {
      params: searchParams
    });
  },

  getFoodConversion: async (foodCode: string): Promise<FoodConversion> => {
    return http.get(`${DIET_BASE_URL}/foods/${foodCode}/conversion`);
  },

  getRepresentTemplates: async (): Promise<RepresentativeTemplate[]> => {
    return http.get(`${DIET_BASE_URL}/representative-tray-template`);
  },

  getDietReportsMonthlyPrice: async (): Promise<DietReportsMonthlyPrice[]> => {
    return http.get(`${DIET_BASE_URL}/reports/monthly-price`);
  },

  getNutritionStandardCategoryReport: async (): Promise<
    NutritionStandardCategoryReport[]
  > => {
    return http.get(`${DIET_BASE_URL}/reports/nutrition-standard-category`);
  },

  addPriceForMaterials: async (
    params: ICalculatorInput
  ): Promise<DietDetail> => {
    return http.post(`${DIET_BASE_URL}/${params.id}/add-price`, params);
  },

  saveRecipe: async (
    foodCode?: string,
    recipe?: string,
    foodName?: string
  ): Promise<string> => {
    return http.post(`${DIET_BASE_URL}/foods/save-recipe`, {
      foodCode,
      recipeDescription: recipe,
      foodName
    });
  },

  // Search advanced materials API
  getMaterialTypes: async (): Promise<MaterialType[]> => {
    return http.get(`${DIET_BASE_URL}/materials/type`);
  },

  getMaterialCategories: async (
    typeCode?: string
  ): Promise<MaterialCategory[]> => {
    return http.get(`${DIET_BASE_URL}/materials/category`, {
      params: { typeCode }
    });
  },

  getMaterialRepresentatives: async (
    categoryId: number
  ): Promise<MaterialRepresentative[]> => {
    return http.get(`${DIET_BASE_URL}/materials/representative`, {
      params: { categoryId }
    });
  },

  addRecommendFoods: async (dietId: number): Promise<string> => {
    return http.post(`${DIET_BASE_URL}/${dietId}/recommend-food`);
  },

  getMyMaterials: async (
    params: GetMyMaterialsParams
  ): Promise<MyMaterialPagination> => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', params.page.toString());
    searchParams.append('limit', params.limit.toString());
    if (params.keyword) searchParams.append('keyword', params.keyword);
    return http.get(`${DIET_BASE_URL}/my-materials`, { params: searchParams });
  },

  updateMyMaterialName: async (
    matCd: string,
    name: string
  ): Promise<MyMaterial> => {
    return http.put(`${DIET_BASE_URL}/my-materials/${matCd}`, { name });
  },

  deleteMyMaterial: async (matCd: string): Promise<void> => {
    return http.delete(`${DIET_BASE_URL}/my-materials/${matCd}`);
  },

  getFoodTypes: async (): Promise<FoodTypeOption[]> => {
    return http.get('/commons', { params: { intgCd: 'CD00013' } });
  },

  getRecipes: async (params: GetRecipesParams): Promise<RecipePagination> => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', params.page.toString());
    searchParams.append('limit', params.limit.toString());
    if (params.keyword) searchParams.append('keyword', params.keyword);
    if (params.typeCode) searchParams.append('fdTpCd', params.typeCode);
    if (params.materialCode) searchParams.append('matCd', params.materialCode);
    return http.get(`${DIET_BASE_URL}/foods/paging`, { params: searchParams });
  },

  getMyRecipes: async (params: GetMyRecipesParams): Promise<RecipePagination> => {
    const searchParams = new URLSearchParams();
    searchParams.append('page', params.page.toString());
    searchParams.append('limit', params.limit.toString());
    if (params.keyword) searchParams.append('keyword', params.keyword);
    if (params.typeCode) searchParams.append('fdTpCd', params.typeCode);
    if (params.materialCode) searchParams.append('matCd', params.materialCode);
    return http.get(`${DIET_BASE_URL}/foods/my-recipes/paging`, {
      params: searchParams
    });
  },

  // 사용자가 재료까지 직접 구성해 만드는 레시피
  createRecipe: async (payload: SaveRecipePayload): Promise<Food> => {
    return http.post(`${DIET_BASE_URL}/recipes`, payload);
  },

  updateRecipe: async (
    foodCode: string,
    payload: SaveRecipePayload
  ): Promise<Food> => {
    return http.put(`${DIET_BASE_URL}/recipes/${foodCode}`, payload);
  },

  deleteRecipe: async (foodCode: string): Promise<void> => {
    return http.delete(`${DIET_BASE_URL}/recipes/${foodCode}`);
  },

  // 저장된 식단을 엑셀 파일(.xlsx)로 다운로드
  // (응답 인터셉터가 responseType: 'blob' 요청에 한해 AxiosResponse 전체를 그대로 반환함)
  downloadDietExcel: async (
    dietId: number
  ): Promise<{ blob: Blob; fileName: string }> => {
    const response = (await http.get(`${DIET_BASE_URL}/${dietId}/export/excel`, {
      responseType: 'blob'
    })) as unknown as AxiosResponse<Blob>;

    const disposition = response.headers['content-disposition'] as string | undefined;
    let fileName = `diet_${dietId}.xlsx`;
    if (disposition) {
      const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
      if (utf8Match?.[1]) {
        fileName = decodeURIComponent(utf8Match[1]);
      } else {
        const asciiMatch = disposition.match(/filename="?([^";]+)"?/i);
        if (asciiMatch?.[1]) fileName = asciiMatch[1];
      }
    }

    return { blob: response.data, fileName };
  },

  // 여러 식단을 하나의 엑셀 파일로 한번에 다운로드 (대상자 목록에서 다중 선택)
  downloadDietsExcel: async (
    dietIds: number[]
  ): Promise<{ blob: Blob; fileName: string }> => {
    const response = (await http.post(
      `${DIET_BASE_URL}/export/excel`,
      { dietIds },
      { responseType: 'blob' }
    )) as unknown as AxiosResponse<Blob>;

    const disposition = response.headers['content-disposition'] as string | undefined;
    let fileName = `diets_${dietIds.length}.xlsx`;
    if (disposition) {
      const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
      if (utf8Match?.[1]) {
        fileName = decodeURIComponent(utf8Match[1]);
      } else {
        const asciiMatch = disposition.match(/filename="?([^";]+)"?/i);
        if (asciiMatch?.[1]) fileName = asciiMatch[1];
      }
    }

    return { blob: response.data, fileName };
  }
};
