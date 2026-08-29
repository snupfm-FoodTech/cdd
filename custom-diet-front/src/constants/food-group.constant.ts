/**
 * 식품공전 식품유형(tmpl_mat_cat) → 기초식품군 매핑. 분류 기준은 식품구성자전거.
 *
 * DB 의 식품군(mat_cat)은 재료를 찾기 위한 식품공전 분류라서 "장류", "조미료류",
 * "절임류 또는 조림류" 처럼 식단 균형을 볼 수 없는 항목이 섞여 있다. 화면에서는
 * 한국인 영양소 섭취기준의 기초식품군으로 다시 묶어 보여준다.
 *
 * 식품구성자전거를 따른 분류 판단:
 *  - 감자·고구마·옥수수는 곡류군 (전분 공급원)
 *  - 견과 및 종실류는 고기·생선·달걀·콩류군 (식품구성탑에서 자전거로 바뀌며 단백질류로 이동)
 *  - 버섯·해조류·김치는 채소류군
 *
 * 이름이 아니라 categoryId 로 매핑한다 — "당류"(8, 11), "기타"(48, 58, 71),
 * "구이류"(24, 61, 72, 73)처럼 같은 이름이 여러 id 로 존재하기 때문이다.
 */

export const FOOD_GROUPS = {
  GRAIN: '곡류',
  PROTEIN: '고기·생선·달걀·콩류',
  VEGETABLE: '채소류',
  FRUIT: '과일류',
  DAIRY: '우유·유제품류',
  FAT_SUGAR: '유지·당류',
  SEASONING: '양념류',
  ETC: '기타'
} as const;

export type FoodGroupName = (typeof FOOD_GROUPS)[keyof typeof FOOD_GROUPS];

/** 화면에 always 이 순서로 표시한다 (식품구성자전거 순서). */
export const FOOD_GROUP_ORDER: FoodGroupName[] = [
  FOOD_GROUPS.GRAIN,
  FOOD_GROUPS.PROTEIN,
  FOOD_GROUPS.VEGETABLE,
  FOOD_GROUPS.FRUIT,
  FOOD_GROUPS.DAIRY,
  FOOD_GROUPS.FAT_SUGAR,
  FOOD_GROUPS.SEASONING,
  FOOD_GROUPS.ETC
];

export const CATEGORY_ID_TO_FOOD_GROUP: Record<number, FoodGroupName> = {
  // ── 곡류 (감자·전분류 포함 - 식품구성자전거 기준)
  1: FOOD_GROUPS.GRAIN, // 과자류·빵류 또는 떡류
  2: FOOD_GROUPS.GRAIN, // 곡류
  3: FOOD_GROUPS.GRAIN, // 밥류
  4: FOOD_GROUPS.GRAIN, // 감자 및 전분류
  6: FOOD_GROUPS.GRAIN, // 빵 및 과자류
  9: FOOD_GROUPS.GRAIN, // 면 및 만두류
  12: FOOD_GROUPS.GRAIN, // 죽 및 스프류
  23: FOOD_GROUPS.GRAIN, // 면류
  59: FOOD_GROUPS.GRAIN, // 빵 및 과자류
  60: FOOD_GROUPS.GRAIN, // 죽 및 스프류
  75: FOOD_GROUPS.GRAIN, // 밥류

  // ── 고기·생선·달걀·콩류 (견과·종실류 포함)
  10: FOOD_GROUPS.PROTEIN, // 두류
  14: FOOD_GROUPS.PROTEIN, // 견과 및 종실류
  17: FOOD_GROUPS.PROTEIN, // 두부류 또는 묵류
  42: FOOD_GROUPS.PROTEIN, // 식육가공품 및 포장육
  45: FOOD_GROUPS.PROTEIN, // 알가공품류
  47: FOOD_GROUPS.PROTEIN, // 수산가공식품류
  50: FOOD_GROUPS.PROTEIN, // 동물성가공식품류
  53: FOOD_GROUPS.PROTEIN, // 육류
  54: FOOD_GROUPS.PROTEIN, // 난류
  55: FOOD_GROUPS.PROTEIN, // 어패류 및 기타 수산물
  68: FOOD_GROUPS.PROTEIN, // 젓갈류

  // ── 채소류 (버섯·해조류, 채소 조리품 포함)
  16: FOOD_GROUPS.VEGETABLE, // 채소류
  20: FOOD_GROUPS.VEGETABLE, // 버섯류
  31: FOOD_GROUPS.VEGETABLE, // 해조류
  33: FOOD_GROUPS.VEGETABLE, // 나물·숙채류
  35: FOOD_GROUPS.VEGETABLE, // 절임류 또는 조림류
  37: FOOD_GROUPS.VEGETABLE, // 생채·무침류
  39: FOOD_GROUPS.VEGETABLE, // 김치류
  43: FOOD_GROUPS.VEGETABLE, // 장아찌·절임류
  66: FOOD_GROUPS.VEGETABLE, // 생채·무침류
  67: FOOD_GROUPS.VEGETABLE, // 김치류
  69: FOOD_GROUPS.VEGETABLE, // 장아찌·절임류

  // ── 과일류
  22: FOOD_GROUPS.FRUIT, // 과일류

  // ── 우유·유제품류
  46: FOOD_GROUPS.DAIRY, // 유가공품류
  56: FOOD_GROUPS.DAIRY, // 우유류

  // ── 유지·당류
  5: FOOD_GROUPS.FAT_SUGAR, // 빙과류
  7: FOOD_GROUPS.FAT_SUGAR, // 코코아가공품류 또는 초콜릿류
  8: FOOD_GROUPS.FAT_SUGAR, // 당류
  11: FOOD_GROUPS.FAT_SUGAR, // 당류
  15: FOOD_GROUPS.FAT_SUGAR, // 잼류
  21: FOOD_GROUPS.FAT_SUGAR, // 식용유지류
  36: FOOD_GROUPS.FAT_SUGAR, // 유지류
  57: FOOD_GROUPS.FAT_SUGAR, // 유지류

  // ── 양념류 (6군에 넣으면 균형 판단이 왜곡되므로 따로 둔다)
  32: FOOD_GROUPS.SEASONING, // 장류
  34: FOOD_GROUPS.SEASONING, // 조미식품
  44: FOOD_GROUPS.SEASONING, // 조미료류
  70: FOOD_GROUPS.SEASONING, // 조미료류

  // ── 기타 (조리형태 분류, 음료, 특수식품 - 구성이 섞여 있어 한 군으로 못 넣는다)
  13: FOOD_GROUPS.ETC, // 국 및 탕류
  18: FOOD_GROUPS.ETC, // 찌개 및 전골류
  19: FOOD_GROUPS.ETC, // 찜류
  24: FOOD_GROUPS.ETC, // 구이류
  25: FOOD_GROUPS.ETC, // 전·적 및 부침류
  26: FOOD_GROUPS.ETC, // 음료류
  27: FOOD_GROUPS.ETC, // 특수영양식품
  28: FOOD_GROUPS.ETC, // 볶음류
  29: FOOD_GROUPS.ETC, // 조림류
  30: FOOD_GROUPS.ETC, // 특수의료용도식품
  38: FOOD_GROUPS.ETC, // 차류
  40: FOOD_GROUPS.ETC, // 주류
  41: FOOD_GROUPS.ETC, // 농산가공식품류
  48: FOOD_GROUPS.ETC, // 기타
  49: FOOD_GROUPS.ETC, // 음료 및 차류
  51: FOOD_GROUPS.ETC, // 즉석식품류
  52: FOOD_GROUPS.ETC, // 기타식품류
  58: FOOD_GROUPS.ETC, // 기타
  61: FOOD_GROUPS.ETC, // 구이류
  62: FOOD_GROUPS.ETC, // 전·적 및 부침류
  63: FOOD_GROUPS.ETC, // 볶음류
  64: FOOD_GROUPS.ETC, // 조림류
  65: FOOD_GROUPS.ETC, // 튀김류
  71: FOOD_GROUPS.ETC, // 기타
  72: FOOD_GROUPS.ETC, // 구이류
  73: FOOD_GROUPS.ETC, // 구이류
  74: FOOD_GROUPS.ETC // 볶음류
};

/** 매핑에 없는 categoryId 는 기타로 떨어뜨린다 (새 식품유형이 추가돼도 화면이 깨지지 않게). */
export const resolveFoodGroup = (categoryId?: number): FoodGroupName =>
  (categoryId !== undefined && CATEGORY_ID_TO_FOOD_GROUP[categoryId]) ||
  FOOD_GROUPS.ETC;
