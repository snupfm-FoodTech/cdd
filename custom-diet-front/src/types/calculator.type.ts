import { Food, Material } from './food.type';

export interface ICalculationItem extends Material {
  sequence: number;
  typeCode: string;
}

export interface IAccessory {
  name: string;
  price: number;
  receiptIncludeFlag: ReceiptIncludedFlag.Yes | ReceiptIncludedFlag.No;
  sequence: number;
}

export enum ReceiptIncludedFlag {
  Yes = 'Y',
  No = 'N'
}

export interface ICalculatorInput {
  id: number;
  foods: Food[];
  accessories: IAccessory[];
  servingQuantity?: number;
  adjustmentPercent?: number;
  unitPrice: number;
  finalPrice: number;
}
