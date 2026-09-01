import {
  ChangeStandardFlag,
  FavouriteFlag,
  MandatoryFlag,
  SeparatedFlag
} from '.';
import { IAccessory } from './calculator.type';
import { Material } from './food.type';
import { Nutrient, NutrientStandardTemplate } from './nutrient.type';
import { Tray } from './tray.type';

export interface Allergen {
  id: number;
  name: string;
}

export interface Diet {
  id: number;
  name: string;
  description: string;
  favouriteFlag: FavouriteFlag.Yes | FavouriteFlag.No;
  /** 목록 그룹핑에 쓰는 값들 - 목록 API 만 내려준다 */
  standardCode?: string;
  standardName?: string;
  trayName?: string;
  updatedAt?: string;
}

/** 식단 목록을 묶는 기준 */
export type DietGroupBy = 'standard' | 'tray' | 'recent';

export const DIET_GROUP_BY_LABEL: Record<DietGroupBy, string> = {
  standard: '식단 유형',
  tray: '식단 구성',
  recent: '최근 수정순'
};

export interface DietDetail extends Diet {
  standard: NutrientStandardTemplate;
  tray: Tray;
  accessories: IAccessory[];
  servingQuantity?: number;
  adjustmentPercent?: number;
  allergens: {
    id: number;
    name: string;
  }[];
  excludedAllergens: {
    id: number;
    name: string;
  }[];
}

export interface IDietDetail {
  name: string;
  /** 선택 입력 */
  description?: string;
  standardCode: string;
  standardName: string;
  nutrients: Nutrient[];
  excludedAllergenIds: number[];
  trayId?: number;  // optional for backward compatibility
  id?: number;
  trays: {
    id?: number;
    name: string;
    representativeTrayCode: string;
    mandatoryFlag?: string;
    foods: {
      capacityVolume: number;
      typeCode: string;
      mandatoryFlag: string;
      separatedFlag: string;
    }[];
  }[];
  representativeTrayIndex?: number;  // 대표 tray 인덱스 (기본값 0)
}

export interface IUpdateDietTray {
  id?: number;
  name: string;
  representativeTrayCode: string;
  mandatoryFlag: string;
  foods: {
    capacityVolume: number;
    typeCode: string;
    mandatoryFlag: string;
    separatedFlag: string;
  }[];
}

export interface IUpdateDietParams {
  name?: string;
  description?: string;
  standardCode?: string;
  standardName?: string;
  nutrients?: Nutrient[];
  excludedAllergenIds?: number[];
  tray: IUpdateDietTray;
}

interface IDietAddFoodToTrayMaterial {
  code: string;
  recipeWeight: number;
  calculationWeight: number;
}

interface IDietAddFoodToTrayFood {
  sequence: number;
  code: string;
  recipeDescription: string;
  materials: IDietAddFoodToTrayMaterial[];
}

export interface IDietAddFoodToTray {
  id: number;
  foods: IDietAddFoodToTrayFood[];
  changeStandardFlag: ChangeStandardFlag.Yes | ChangeStandardFlag.No;
  excludedAllergenIds?: number[];
}

export interface ITrayItem {
  code?: string;
  sequence: string;
  capacityVolume: number;
  typeName: string;
  typeCode: string;
  mandatoryFlag: MandatoryFlag.Yes | MandatoryFlag.No;
  separatedFlag: SeparatedFlag.Yes | SeparatedFlag.No;
  name?: string;
  unitName?: string;
  materials?: Material[];
  recipeDescription?: string;
}

export interface IAllergenMaterial {
  code: string;
}

export interface IAllergenFood {
  code: string;
  materials: IAllergenMaterial[];
}

export interface IAllergenCheckFood {
  excludedAllergenIds: number[];
  foods: IAllergenFood[];
}

export interface ErrorRemovedItem {
  description: string;
  favouriteFlag: string;
  id: number;
  name: string;
  trayId: string;
  trayName: string;
}

export interface ITrays {
  total: number;
  listItems: ITrayItem[];
  onSelect?: (item?: ITrayItem) => void;
  selectedTrayItem?: ITrayItem;
  icon?: boolean;
}

export interface ISeperateTray {
  listSeperate: ITrayItem[];
  onSelect?: (item?: ITrayItem) => void;
  selectedTrayItem?: ITrayItem;
  icon?: boolean;
  isMobile?: boolean;
}

export interface ITrayTemplate {
  id?: number;
  name: string;
  representativeTrayCode: string;
  representativeTrayName?: string;
  mandatoryFlag?: MandatoryFlag;
  foods: ITrayItem[];
}

export interface NutrientTotal {
  code: string;
  name: string;
  unitName: string;
  totalAmount: number;
  totalAmountCalculation: number;
}

export enum NutrientFormulaCase {
  LessThanPer = 1,
  MoreThanPer = 2,
  LessThanFormula = 3,
  LessThanEqualFormula = 4,
  MoreThanFormula = 5,
  BetweenFormula = 6,
  LessThan10PerCalories = 7,
  FifteenTo30Calories = 8,
  MoreThan12PerCalories = 9,
  MoreThan18PerCalories = 10,
  FatLessThan7PerCalories = 11,
  FifteenTo35Calories = 12
}

export interface NutrientCompare {
  code: string;
  name: string;
  unitName: string;
  totalAmount?: number;
  weightFrom?: number;
  weightTo?: number;
  compare?: number;
  isCompare: boolean;
  customAmount?: number;
  formula?: string;
  case?: NutrientFormulaCase;
}

export interface RepresentativeTemplate {
  code: string;
  content: string;
  description: string;
  seq: string;
}

export interface DietReportsMonthlyPrice {
  yearMonth: string;
  totalPrice: number;
}
