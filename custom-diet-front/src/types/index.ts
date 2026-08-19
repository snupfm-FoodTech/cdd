export const ModeType = {
  CREATE: 'create',
  UPDATE: 'update',
  VIEW: 'view'
} as const;

export type ModeType = (typeof ModeType)[keyof typeof ModeType];

export enum ChangeStandardFlag {
  Yes = 'Y',
  No = 'N'
}

export enum MandatoryFlag {
  Yes = 'Y',
  No = 'N'
}

export enum SeparatedFlag {
  Yes = 'Y',
  No = 'N'
}

export enum FavouriteFlag {
  Yes = 'Y',
  No = 'N'
}

export const FormulaBetween = /\\n/;
export const CalorieCode = 'ENG';

export const TRAY_TEMPLATES_NOT_UPDATED = [
  '4찬 한식',
  '5찬 한식',
  '6찬 한식',
  '7차 한식'
];
