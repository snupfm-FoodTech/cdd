import { MandatoryFlag, SeparatedFlag } from '.';
import { ReceiptIncludedFlag } from './calculator.type';
import { PaginationQuery, PaginationResponse } from './pagination.type';

export interface FoodMaterialForm {
  foodName?: string;
  recipeDescription?: string;
  materials: Material[];
}

export interface Food {
  sequence: number;
  mandatoryFlag: MandatoryFlag.Yes | MandatoryFlag.No;
  separatedFlag: SeparatedFlag.Yes | SeparatedFlag.No;
  capacityVolume: number;
  displayedSequence: number;
  typeCode: string;
  typeName: string;
  unitCode: string;
  unitName: string;
  code: string;
  name: string;
  seasonCode: string;
  recipeDescription: string;
  materials: Material[];
}

export interface IGeo {
  geoId: string;
  regNm: string;
  regNo: string;
  region: string;
}

export interface Material {
  code: string;
  name: string;
  originalCode: string;
  unitCode: string;
  unitName: string;
  recipeWeight: number;
  calculationWeight: number;
  nutrients?: MaterialNutrient[];
  geos?: IGeo[];
  price?: number;
  receiptIncludeFlag?: ReceiptIncludedFlag;
  eyeReferenceName?: string;
  eyeReferenceUnitName?: string;
  eyeReferenceWeight?: number;
  categoryId?: number;
  categoryName?: string;
}

export interface GroupedMaterial {
  categoryName: string;
  materialName: string;
  materialCode: string;
  recipeWeight: number;
  calculationWeight: number;
  unitName: string;
}

export interface MaterialNutrient {
  code: string;
  name: string;
  unitCode: string;
  unitName: string;
  amount: number;
}

export interface DetailMaterial extends Material {
  nutrients: MaterialNutrient[];
}

export interface DetailMaterialSearchParams {
  codes?: string[];
  representativeId?: number;
  excludedAllergenIds?: number[];
}

export type DetailMaterialQueryParams = DetailMaterialSearchParams;

export interface DetailMaterialPagination extends PaginationResponse {
  items: DetailMaterial[];
}

export interface SearchMaterialWithPaginationParams extends PaginationQuery {
  keyword: string;
  excludedAllergenIds?: number[];
}

export interface CreateMaterial {
  name: string;
  weight: number;
  representativeId: number;
  nutrients: MaterialNutrient[];
}

export type AddedMaterial = Material & { isAdded: boolean };

export interface MaterialType {
  code: string;
  name: string;
}

export interface MaterialCategory {
  id: number;
  code: string;
  name: string;
  typeCode: string;
}

export interface MaterialRepresentative {
  id: number;
  name: string;
  categoryId: number;
}

export interface FoodConversion {
  foodCode: string;
  preWeight: number;
  postVolume: number;
  preWeightToPostVolumeRatio: number;
  postVolumeToPreWeightRatio: number;
}

export interface MyMaterial {
  code: string;
  name: string;
  originalCode: string;
  unitCode: string;
  unitName: string;
  categoryId?: number;
  categoryName?: string;
  typeName?: string;
  representativeName?: string;
  weight?: number;
  nutrients?: MaterialNutrient[];
  inUse: boolean;
}

export interface MyMaterialPagination extends PaginationResponse {
  items: MyMaterial[];
}

export interface GetMyMaterialsParams extends PaginationQuery {
  keyword?: string;
}
