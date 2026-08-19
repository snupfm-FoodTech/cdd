import { MandatoryFlag } from '.';

export interface Nutrient {
  code: string;
  name: string;
  unitCode: string;
  unitName: string;
  mandatoryFlag: MandatoryFlag.Yes | MandatoryFlag.No;
  weightFrom: number;
  weightTo: number;
  formula?: string;
  orderSeq: number;
}

export interface NutrientStandardTemplate {
  code: string;
  name: string;
  typeName?: string;
  typeCode?: string;
  nutrients: Nutrient[];
}

export interface INutrientSummary {
  nutrientCode: string;
  nutrientFinalAmount: number;
}

export interface NutritionStandardCategoryReport {
  standardName: string;
  totalDiet: number;
}

export enum NutrientUnitAdditionalInfo {
  More = '이상',
  Less = '이하'
}
