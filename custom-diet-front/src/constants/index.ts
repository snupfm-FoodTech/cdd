export const YYYY_OR_EMPTY_DATE_REGEX = /^(?:\d{4})?$/;
export const CMS_BACK_TO_LIST_TITLE = '목록으로 돌아가기';

export const REGEX_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+-={}[\]|\\:;'"<>,./_~`?])[a-zA-Z\d!@#$%^&*()+-={}[\]|\\:;'"<>,./_~`?]{8,}$/;

export const REGEX_NUMBER = /^(\d+)?$/;

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 15; // 15MB
export const ACCEPTED_IMAGE_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg'
];

export const ACCEPTED_DOCUMENT_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export const ROLE = {
  USER: 'MEM',
  ADMIN: 'ADM'
};

export const YEAR = {
  MIN: 1960
};

export const FOOD = {
  RICE: '밥/죽/면',
  SOUP: '국/탕',
  VEGETABLE: '채소류 반찬',
  PROTEIN: '단백질 반찬',
  KIMCHI: '김치류 반찬',
  OTHER_FOOD: '기타 반찬'
};

export const TEMPORARY_NUTRIENT_TEMPLATE = {
  CODE: 'USR',
  NAME: '사용자 식단'
};

export const TYPE_FOODS = {
  RICE: 'FT00001',
  SOUP: 'FT00002',
  VEGETABLE: 'FT00003',
  PROTEIN: 'FT00004',
  KIMCHI: 'FT00005',
  OTHER_FOOD: 'FT00006'
};

export const LOCAL_STORAGE = {
  LAST_PAGE: 'lastPathname',
  URLS_HISTORY: 'urlsHistory'
};

export const NUTRIENT_CODE_FORMULA = {
  ENERGY: 'ENG'
};

export const NUTRIENT_CODES_NINE = ['SFA', 'FAT'];
export const NUTRIENT_CODES_FOUR = ['SUGAR', 'PROTEIN'];

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export enum ENUM_TRAY_TEMPLATES {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum IMAGE_TRAY_TEMPLATES {
  A = 'tray-4',
  B = 'tray-5',
  C = 'tray-6',
  D = 'tray-7-alt'
}

export const TRAY_TEMPLATES = {
  A: [
    {
      typeName: FOOD.RICE,
      typeCode: TYPE_FOODS.RICE,
      capacityVolume: 650
    },
    {
      typeName: FOOD.SOUP,
      typeCode: TYPE_FOODS.SOUP,
      capacityVolume: 330
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 400
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 125
    },
    {
      typeName: FOOD.KIMCHI,
      typeCode: TYPE_FOODS.KIMCHI,
      capacityVolume: 75
    }
  ],
  B: [
    {
      typeName: FOOD.RICE,
      typeCode: TYPE_FOODS.RICE,
      capacityVolume: 350
    },
    {
      typeName: FOOD.SOUP,
      typeCode: TYPE_FOODS.SOUP,
      capacityVolume: 330
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 150
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 125
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 100
    },
    {
      typeName: FOOD.KIMCHI,
      typeCode: TYPE_FOODS.KIMCHI,
      capacityVolume: 100
    }
  ],
  C: [
    {
      typeName: FOOD.RICE,
      typeCode: TYPE_FOODS.RICE,
      capacityVolume: 275
    },
    {
      typeName: FOOD.SOUP,
      typeCode: TYPE_FOODS.SOUP,
      capacityVolume: 330
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 175
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 80
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 80
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 75
    },
    {
      typeName: FOOD.KIMCHI,
      typeCode: TYPE_FOODS.KIMCHI,
      capacityVolume: 75
    }
  ],
  D: [
    {
      typeName: FOOD.SOUP,
      typeCode: TYPE_FOODS.SOUP,
      capacityVolume: 330
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 210
    },
    {
      typeName: FOOD.PROTEIN,
      typeCode: TYPE_FOODS.PROTEIN,
      capacityVolume: 210
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 90
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 90
    },
    {
      typeName: FOOD.VEGETABLE,
      typeCode: TYPE_FOODS.VEGETABLE,
      capacityVolume: 60
    },
    {
      typeName: FOOD.KIMCHI,
      typeCode: TYPE_FOODS.KIMCHI,
      capacityVolume: 60
    }
  ]
};
