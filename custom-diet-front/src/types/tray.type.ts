import { MandatoryFlag } from '.';
import { Food } from './food.type';

export interface Tray {
  id: number;
  name: string;
  representativeTrayCode: string;
  representativeTrayName: string;
  mandatoryFlag: MandatoryFlag;
  foods: Food[];
}
