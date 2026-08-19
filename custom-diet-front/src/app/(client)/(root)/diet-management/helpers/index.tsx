import { NUTRIENT_CODE_FORMULA, NUTRIENT_CODES_NINE } from '@/constants';
import { CalorieCode, FormulaBetween, MandatoryFlag } from '@/types';
import {
  ITrayItem,
  NutrientCompare,
  NutrientFormulaCase,
  NutrientTotal
} from '@/types/diet.type';
import { Food, GroupedMaterial, Material } from '@/types/food.type';
import { Nutrient } from '@/types/nutrient.type';
import isEmpty from 'lodash/isEmpty';

export function convertToNutrients(nutrientObjects: any[]): Nutrient[] {
  // Map the validated nutrient objects to Nutrient type
  return nutrientObjects.map((nutrient) => ({
    code: nutrient.code,
    name: nutrient.name,
    unitCode: nutrient.unitCode,
    unitName: nutrient.unitName,
    mandatoryFlag:
      nutrient.mandatoryFlag === MandatoryFlag.Yes
        ? MandatoryFlag.Yes
        : MandatoryFlag.No,
    weightFrom: nutrient.weightFrom,
    weightTo: nutrient.weightTo,
    orderSeq: 0
  }));
}

export function convertFoodToTrayItem(
  food: Food,
  trayItem: ITrayItem
): ITrayItem {
  return {
    code: food.code || trayItem.code,
    sequence: food.sequence?.toString() || trayItem.sequence,
    capacityVolume: food.capacityVolume || trayItem.capacityVolume,
    typeName: food.typeName || trayItem.typeName,
    typeCode: food.typeCode || trayItem.typeCode,
    mandatoryFlag: food.mandatoryFlag || trayItem.mandatoryFlag,
    separatedFlag: food.separatedFlag || trayItem.separatedFlag,
    name: food.name || trayItem.name,
    unitName: food.unitName || trayItem.unitName,
    materials: food.materials || trayItem.materials,
    recipeDescription: food.recipeDescription || trayItem.recipeDescription
  };
}

export function convertFoodsToTrayItemArray(foods: Food[]): ITrayItem[] {
  return foods.map((food) => ({
    code: food?.code,
    sequence: food.sequence?.toString(),
    capacityVolume: food.capacityVolume,
    typeName: food.typeName,
    typeCode: food.typeCode,
    mandatoryFlag: food.mandatoryFlag,
    separatedFlag: food.separatedFlag,
    name: food.name,
    unitName: food.unitName,
    materials: food?.materials,
    recipeDescription: food?.recipeDescription
  }));
}

export function convertItemArrayToFoods(trayItems: ITrayItem[]): Food[] {
  return trayItems.map((trayItem) => ({
    sequence: parseInt(trayItem.sequence, 10),
    mandatoryFlag: trayItem.mandatoryFlag,
    separatedFlag: trayItem.separatedFlag,
    capacityVolume: trayItem.capacityVolume,
    displayedSequence: parseInt(trayItem.sequence, 10), // assuming displayedSequence is same as sequence
    typeCode: trayItem.typeCode,
    typeName: trayItem.typeName,
    unitCode: '', // this field was not available in ITrayItem, assuming default empty string
    unitName: trayItem.unitName || '',
    code: trayItem.code || '',
    name: trayItem.name || '',
    seasonCode: '', // this field was not available in ITrayItem, assuming default empty string
    recipeDescription: trayItem.recipeDescription || '',
    materials: trayItem.materials || []
  }));
}

export function convertITrayItemToFood(trayItem: ITrayItem): Food {
  return {
    sequence: parseInt(trayItem.sequence),
    mandatoryFlag: trayItem.mandatoryFlag,
    separatedFlag: trayItem.separatedFlag,
    capacityVolume: trayItem.capacityVolume,
    displayedSequence: parseInt(trayItem.sequence),
    typeCode: trayItem.typeCode,
    typeName: trayItem.typeName,
    unitCode: trayItem.unitName || '',
    unitName: trayItem.unitName || '',
    code: trayItem.code || '',
    name: trayItem.name || '',
    seasonCode: '',
    recipeDescription: trayItem?.recipeDescription || '',
    materials: trayItem?.materials || []
  };
}

export const transformMaterials = (
  input: {
    code: string;
    recipeWeight?: number;
    calculationWeight?: number;
  }[],
  existing: Material[] | undefined
): Material[] => {
  const existingMap = new Map((existing ?? []).map((m) => [m.code, m]));

  return input.map((inputMaterial) => {
    const existingMaterial = existingMap.get(inputMaterial.code);
    if (existingMaterial) {
      return {
        code: inputMaterial.code,
        name: existingMaterial.name,
        originalCode: existingMaterial.originalCode,
        unitCode: existingMaterial.unitCode,
        unitName: existingMaterial.unitName,
        eyeReferenceName: existingMaterial.eyeReferenceName,
        eyeReferenceUnitName: existingMaterial.eyeReferenceUnitName,
        eyeReferenceWeight: existingMaterial.eyeReferenceWeight,
        categoryId: existingMaterial.categoryId,
        categoryName: existingMaterial.categoryName,
        recipeWeight: inputMaterial.recipeWeight ?? 0,
        calculationWeight: inputMaterial.calculationWeight ?? 0,
        geos: existingMaterial.geos ?? []
      };
    }
    // Handle the case where the inputMaterial code does not exist in existingMaterials
    return {
      code: inputMaterial.code,
      name: '',
      originalCode: '',
      unitCode: '',
      unitName: '',
      recipeWeight: inputMaterial.recipeWeight ?? 0,
      calculationWeight: inputMaterial.calculationWeight ?? 0
    };
  });
};

const getConversionFactor = (unitCode: string): number => {
  const conversionFactors: { [key: string]: number } = {
    KG: 1000
    // Add other units and their conversion factors as needed
  };
  return conversionFactors[unitCode] || 1; // Default to 1 if no found
};

export const calculateTotalWeightInGrams = (
  materials: Material[] | undefined
): string => {
  if (!materials) return '0.00';
  const totalWeight = materials.reduce((total, material) => {
    if (
      !material ||
      material.recipeWeight == null ||
      material.unitCode == null
    ) {
      return total;
    }
    let weightInGrams = material.recipeWeight;
    if (material.unitCode !== 'GAM') {
      const conversionFactor = getConversionFactor(material.unitCode);
      weightInGrams = material.recipeWeight * conversionFactor;
    }
    return total + weightInGrams;
  }, 0);
  return totalWeight.toFixed(2);
};

export const calculateNutrientTotals = (foods: Food[]): NutrientTotal[] => {
  const nutrientMap: { [key: string]: NutrientTotal } = {};
  let totalCalculationWeight = 0;

  foods.forEach((food) => {
    food.materials.forEach((material) => {
      totalCalculationWeight += material.calculationWeight;

      material?.nutrients?.forEach((nutrient) => {
        const nutrientKey = nutrient.code;

        if (!nutrientMap[nutrientKey]) {
          nutrientMap[nutrientKey] = {
            code: nutrient.code,
            name: nutrient.name,
            unitName: nutrient.unitName,
            totalAmount: 0,
            totalAmountCalculation: 0
          };
        }

        nutrientMap[nutrientKey].totalAmount +=
          nutrient.amount * material.calculationWeight;
      });
    });
  });

  // rewrite by all item CalculationWeight
  if (!isEmpty(nutrientMap)) {
    nutrientMap[Object.keys(nutrientMap)[0]].totalAmountCalculation =
      totalCalculationWeight;
  }

  // Convert totalAmount to three decimal places
  const result = Object.values(nutrientMap);
  result.forEach((nutrientTotal) => {
    nutrientTotal.totalAmount = parseFloat(
      nutrientTotal.totalAmount.toFixed(3)
    );
  });

  return result;
};

const convertToUnit = (
  amount: number,
  sourceUnit: string,
  targetUnit: string,
  nutrientType?: string
): number => {
  let grams: number;

  // Convert sourceUnit to grams
  switch (sourceUnit) {
    case 'mg':
      grams = (amount ?? 0) / 1000; // Convert mg to g
      break;
    case 'μg':
      grams = (amount ?? 0) / 1000000; // Convert μg to g
      break;
    case 'g':
      grams = amount ?? 0; // Already in g
      break;
    case 'kcal':
      if (nutrientType) {
        switch (nutrientType) {
          case 'carbohydrate':
          case 'protein':
            grams = amount / 4; // Convert kcal to grams for carbs/protein
            break;
          case 'fat':
            grams = amount / 9; // Convert kcal to grams for fat
            break;
          default:
            grams = amount / 4; // Unsupported nutrient type
        }
      } else {
        grams = 0; // kcal provided but no nutrient type specified
      }
      break;
    default:
      grams = 0;
  }

  // Convert grams to targetUnit
  switch (targetUnit) {
    case 'mg':
      return grams * 1000; // Convert g to mg
    case 'μg':
      return grams * 1000000; // Convert g to μg
    case 'g':
      return grams; // Already in g
    default:
      return 0;
  }
};

const convertToKcal = (amount: number, unitName: string): number => {
  switch (unitName) {
    case 'g':
      return (amount ?? 0) * 4; // Assuming 1 gram of carbohydrate or protein = 4 kcal
    case 'mg':
      return (amount ?? 0) * 0.004; // 1 mg of carbohydrate or protein = 0.004 kcal
    case 'μg':
      return (amount ?? 0) * 0.000004; // 1 μg of carbohydrate or protein = 0.000004 kcal
    case 'kcal':
      return amount ?? 0; // Already in kcal
    default:
      return 0;
  }
};

const calculateTotalMass = (
  data: NutrientTotal[],
  nutrient: NutrientCompare,
  targetUnitName: string
): number => {
  let totalMass = 0;
  if (targetUnitName === 'kcal') {
    data.map((item) => {
      if (item.code === CalorieCode) {
        totalMass = item.totalAmount;
      }
    });
  } else {
    data.map((item) => {
      if (item.code === nutrient.code) {
        totalMass += item.totalAmount;
      }
    });
  }
  return parseFloat(totalMass.toFixed(3));
};

const getPerAmount = (
  nutrient: NutrientCompare,
  nutrientTotals: NutrientTotal[],
  type: NutrientFormulaCase
): number => {
  let trimmedStr = nutrient?.formula?.replace(/\s+/g, '');
  const matches = trimmedStr?.match(/(\d+(?:\.\d+)?)([a-zA-Z]+)/g);
  if (matches && matches.length > 1) {
    const thresholdMatch = matches[0].match(/(\d+(?:\.\d+)?)([a-zA-Z]+)/);
    const valueMatch = matches[1].match(/(\d+(?:\.\d+)?)([a-zA-Z]+)/);

    if (thresholdMatch && valueMatch) {
      let thresholdValue = thresholdMatch[1];
      const thresholdUnit = thresholdMatch[2];
      let valueValue = valueMatch[1];
      const valueUnit = valueMatch[2];
      const totalCalculationWeight = nutrientTotals[0].totalAmountCalculation;

      thresholdUnit === 'kcal'
        ? (thresholdValue = convertToKcal(
            parseFloat(thresholdValue),
            thresholdUnit
          ).toString())
        : (thresholdValue = convertToUnit(
            parseFloat(thresholdValue),
            thresholdUnit,
            thresholdUnit
          ).toString());

      valueUnit === 'kcal'
        ? (valueValue = convertToKcal(
            parseFloat(valueValue),
            valueUnit
          ).toString())
        : (valueValue = convertToUnit(
            parseFloat(valueValue),
            valueUnit,
            nutrient.unitName
          ).toString());

      const totalMass = calculateTotalMass(
        nutrientTotals,
        nutrient,
        thresholdUnit
      );
      const totalCalculation =
        thresholdUnit === 'kcal' ? totalMass : totalCalculationWeight;
      const amountPer = (totalCalculation * Number(valueValue)) / 100;

      switch (type) {
        case NutrientFormulaCase.LessThanPer:
          const ltp =
            Number(totalMass) < amountPer ? 0 : Number(totalMass) - amountPer;
          return parseFloat(ltp.toFixed(3));
        case NutrientFormulaCase.MoreThanPer:
          const protein_item = nutrientTotals.find(
            (nutrientItem) => nutrientItem.code === nutrient.code
          );
          if (protein_item) {
            if (thresholdUnit === 'kcal') {
              return (nutrient.totalAmount ?? 0) >= amountPer
                ? 0
                : parseFloat(
                    ((nutrient.totalAmount ?? 0) - amountPer).toFixed(3)
                  );
            } else {
              const mtp =
                protein_item.totalAmount -
                (totalMass * Number(valueValue)) / 100;
              return mtp > 0 ? 0 : parseFloat(mtp.toFixed(3));
            }
          }
          return 0;
        default:
          return parseFloat(amountPer.toFixed(3));
      }
    }
    return 0;
  }
  return 0;
};

const getFormula = (
  nutrient: NutrientCompare,
  nutrientTotals: NutrientTotal[],
  type: NutrientFormulaCase
): number => {
  let trimmedStr = nutrient?.formula?.replace(/\s+/g, '');
  if (!trimmedStr) return 0;
  if (!nutrient.totalAmount) return 0;
  trimmedStr = trimmedStr.replace(/x/g, '×');
  const totalMass = calculateTotalMass(nutrientTotals, nutrient, 'kcal');
  let result: { operators: string[]; numbers: number[] } = {
    operators: [],
    numbers: []
  };
  const regex = /([×÷+\-])|(\d+\.?\d*|\d*\.\d+)|([가-힣]+)/g;
  let match;
  while ((match = regex.exec(trimmedStr)) !== null) {
    if (match[1]) {
      result.operators.push(match[1]);
    } else if (match[2]) {
      result.numbers.push(parseFloat(match[2]));
    }
  }

  const index = trimmedStr.indexOf('총칼로리');
  if (index !== -1) {
    result.numbers.splice(index, 0, totalMass);
  }

  let numbers = result.numbers.slice();
  let operators = result.operators.slice();

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '×') {
      numbers[i] = numbers[i] * numbers[i + 1];
      numbers.splice(i + 1, 1);
      operators.splice(i, 1);
      i--;
    } else if (operators[i] === '÷') {
      numbers[i] = numbers[i] / numbers[i + 1];
      numbers.splice(i + 1, 1);
      operators.splice(i, 1);
      i--;
    }
  }

  let calculation = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      calculation += numbers[i + 1];
    } else if (operators[i] === '-') {
      calculation -= numbers[i + 1];
    }
  }

  switch (type) {
    case NutrientFormulaCase.LessThanFormula:
      const ltp = calculation - nutrient.totalAmount;
      // Return 0 if ltp is positive, otherwise return ltp rounded to 3 decimal places
      return ltp > 0 ? 0 : parseFloat(ltp.toFixed(3));
    case NutrientFormulaCase.LessThanEqualFormula:
      const lte = calculation - nutrient.totalAmount;
      // Return 0 if lte is negative, otherwise return lte rounded to 3 decimal places
      return lte >= 0 ? 0 : parseFloat(lte.toFixed(3));
    case NutrientFormulaCase.MoreThanFormula:
      const mtp = calculation - nutrient.totalAmount;
      // Return 0 if mtp is positive, otherwise return mtp rounded to 3 decimal places
      return mtp < 0 ? 0 : parseFloat(mtp.toFixed(3));
    default:
      return 0;
  }
};

const calculateFormulaBetween = (
  formulaStr: string,
  totalMass: number
): number => {
  let trimmedStr = formulaStr.replace(/\s+/g, '');
  if (!trimmedStr) return 0;
  trimmedStr = trimmedStr.replace(/x/g, '×');
  let result: { operators: string[]; numbers: number[] } = {
    operators: [],
    numbers: []
  };
  const regex = /([×÷+\-])|(\d+\.?\d*|\d*\.\d+)|([가-힣]+)/g;
  let match;
  while ((match = regex.exec(trimmedStr)) !== null) {
    if (match[1]) {
      result.operators.push(match[1]);
    } else if (match[2]) {
      result.numbers.push(parseFloat(match[2]));
    }
  }

  const index = trimmedStr.indexOf('총칼로리');
  if (index !== -1) {
    result.numbers.splice(index, 0, totalMass);
  }

  let numbers = result.numbers.slice();
  let operators = result.operators.slice();

  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '×') {
      numbers[i] = numbers[i] * numbers[i + 1];
      numbers.splice(i + 1, 1);
      operators.splice(i, 1);
      i--;
    } else if (operators[i] === '÷') {
      numbers[i] = numbers[i] / numbers[i + 1];
      numbers.splice(i + 1, 1);
      operators.splice(i, 1);
      i--;
    }
  }

  let calculation = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      calculation += numbers[i + 1];
    } else if (operators[i] === '-') {
      calculation -= numbers[i + 1];
    }
  }

  return calculation;
};

const getFormulaBetween = (
  nutrient: NutrientCompare,
  nutrientTotals: NutrientTotal[]
): number => {
  if (!nutrient.formula) return 0;
  const formulas = nutrient.formula.split(FormulaBetween);
  const totalMass = calculateTotalMass(nutrientTotals, nutrient, 'kcal');
  const calculateFormulaOne = calculateFormulaBetween(formulas[0], totalMass);
  const calculateFormulaTwo = calculateFormulaBetween(formulas[1], totalMass);
  const totalAmount = nutrient.totalAmount ?? 0;
  let compare = 0;

  if (totalAmount < calculateFormulaOne) {
    compare = parseFloat((totalAmount - calculateFormulaOne).toFixed(3));
  } else if (totalAmount > calculateFormulaTwo) {
    compare = parseFloat((totalAmount - calculateFormulaTwo).toFixed(3));
  }
  return compare;
};

const getAdditionalFormula = (
  nutrient: NutrientCompare,
  nutrientTotals: NutrientTotal[],
  type: NutrientFormulaCase
): number => {
  if (type === NutrientFormulaCase.LessThan10PerCalories) {
    const totalNutrient = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;
    const divisor = NUTRIENT_CODES_NINE.includes(nutrient.code) ? 9 : 4;

    const calcTotalEng = (totalEng * 0.1) / divisor;
    return totalNutrient <= calcTotalEng
      ? 0
      : parseFloat((totalNutrient - calcTotalEng).toFixed(3));
  } else if (type === NutrientFormulaCase.FifteenTo30Calories) {
    // (TOTAL_FAT >= TOTAL_ENG * 0.15 /9
    // AND
    // TOTAL_FAT <= TOTAL_ENG * 0.30 / 9)
    const totalFat = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;

    const calcTotalLowerEng = (totalEng * 0.15) / 9;
    const calcTotalHigherEng = (totalEng * 0.3) / 9;
    let compare = 0;

    if (totalFat < calcTotalLowerEng) {
      compare = parseFloat((totalFat - calcTotalLowerEng).toFixed(3));
    } else if (totalFat > calcTotalHigherEng) {
      compare = parseFloat((totalFat - calcTotalHigherEng).toFixed(3));
    }
    return compare;
  } else if (type === NutrientFormulaCase.MoreThan12PerCalories) {
    const totalNutrient = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;

    const divisor = NUTRIENT_CODES_NINE.includes(nutrient.code) ? 9 : 4;
    const calcTotalEng = (totalEng * 0.12) / divisor;
    return totalNutrient >= calcTotalEng
      ? 0
      : parseFloat((totalNutrient - calcTotalEng).toFixed(3));
  } else if (type === NutrientFormulaCase.MoreThan18PerCalories) {
    const totalNutrient = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;

    const divisor = NUTRIENT_CODES_NINE.includes(nutrient.code) ? 9 : 4;
    const calcTotalEng = (totalEng * 0.18) / divisor;
    return totalNutrient >= calcTotalEng
      ? 0
      : parseFloat((totalNutrient - calcTotalEng).toFixed(3));
  } else if (type === NutrientFormulaCase.FatLessThan7PerCalories) {
    const totalNutrient = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;

    const divisor = NUTRIENT_CODES_NINE.includes(nutrient.code) ? 9 : 4;
    const calcTotalEng = (totalEng * 0.07) / divisor;
    return totalNutrient <= calcTotalEng
      ? 0
      : parseFloat((totalNutrient - calcTotalEng).toFixed(3));
  } else if (type === NutrientFormulaCase.FifteenTo35Calories) {
    // (TOTAL_FAT >= TOTAL_ENG * 0.15 /9
    // AND
    // TOTAL_FAT <= TOTAL_ENG * 0.35 / 9)
    const totalFat = nutrient.totalAmount || 0;
    const totalEng =
      nutrientTotals.find((item) => item.code === NUTRIENT_CODE_FORMULA.ENERGY)
        ?.totalAmount || 0;

    const calcTotalLowerEng = (totalEng * 0.15) / 9;
    const calcTotalHigherEng = (totalEng * 0.35) / 9;
    let compare = 0;

    if (totalFat < calcTotalLowerEng) {
      compare = parseFloat((totalFat - calcTotalLowerEng).toFixed(3));
    } else if (totalFat > calcTotalHigherEng) {
      compare = parseFloat((totalFat - calcTotalHigherEng).toFixed(3));
    }
    return compare;
  }
  return 0;
};

const calculateFormula = ({
  nutrient,
  nutrientTotals
}: {
  nutrient: NutrientCompare;
  nutrientTotals: NutrientTotal[];
}) => {
  if (nutrient.formula) {
    // CASE 1 - LESS THAN PER
    if (
      /당/.test(nutrient.formula) &&
      /미만/.test(nutrient.formula) &&
      !/[\+\-\*\/]/.test(nutrient.formula)
    ) {
      const amountPer = getPerAmount(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.LessThanPer
      );
      return { case: NutrientFormulaCase.LessThanPer, value: amountPer };
    }
    // CASE 2 - MORE THAN PER
    if (
      /당/.test(nutrient.formula) &&
      /이상/.test(nutrient.formula) &&
      !/[\+\-\*\/]/.test(nutrient.formula)
    ) {
      const amountPer = getPerAmount(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThanPer
      );
      return { case: NutrientFormulaCase.MoreThanPer, value: amountPer };
    }
    // CASE 3 - LESS THAN FORMULA
    if (
      /미만/.test(nutrient.formula) &&
      /총 칼로리/.test(nutrient.formula) &&
      nutrient.formula.match(new RegExp('총 칼로리', 'g'))?.length === 1
    ) {
      const amount = getFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.LessThanFormula
      );
      return { case: NutrientFormulaCase.LessThanFormula, value: amount };
    }
    // CASE 4 - LESS THAN EQUAL FORMULA
    if (
      /이하/.test(nutrient.formula) &&
      /총 칼로리/.test(nutrient.formula) &&
      nutrient.formula.match(new RegExp('총 칼로리', 'g'))?.length === 1
    ) {
      const amount = getFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.LessThanEqualFormula
      );
      return { case: NutrientFormulaCase.LessThanEqualFormula, value: amount };
    }
    // CASE 5 - MORE THAN
    if (
      /이상/.test(nutrient.formula) &&
      /총 칼로리/.test(nutrient.formula) &&
      nutrient.formula.match(new RegExp('총 칼로리', 'g'))?.length === 1
    ) {
      const amount = getFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThanFormula
      );
      return { case: NutrientFormulaCase.MoreThanFormula, value: amount };
    }
    // CASE 6 - BETWEEN FORMULA
    if (FormulaBetween.test(nutrient.formula)) {
      const amount = getFormulaBetween(nutrient, nutrientTotals);
      return { case: NutrientFormulaCase.BetweenFormula, value: amount };
    }

    //NEW FORMULA

    //NEW FORMULA
    // CASE 7 - Protein: 10% or less of total calories
    if (
      /총 열량의 10% 이하/.test(nutrient.formula) ||
      /총 열량의 10% 미만/.test(nutrient.formula)
    ) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.LessThan10PerCalories
      );
      return { case: NutrientFormulaCase.LessThan10PerCalories, value: amount };
    }

    // CASE 8 - Fat: 15~30% of total calories
    if (/총 열량의 15~30%/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.FifteenTo30Calories
      );
      return { case: NutrientFormulaCase.FifteenTo30Calories, value: amount };
    }

    // CASE 9 - More than 12% of total calories
    if (/총 열량의 12% 이상/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThan12PerCalories
      );
      return { case: NutrientFormulaCase.MoreThan12PerCalories, value: amount };
    }

    // CASE 10 - More than 18% of total calories
    if (/총 열량의 18% 이상/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThan18PerCalories
      );
      return { case: NutrientFormulaCase.MoreThan18PerCalories, value: amount };
    }

    // CASE 11 - Fat less than
    if (/총 열량의 7% 이하/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.FatLessThan7PerCalories
      );
      return {
        case: NutrientFormulaCase.FatLessThan7PerCalories,
        value: amount
      };
    }

    // CASE 12 - Fat: 15~35% of total calories
    if (/총 열량의 15~35%/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.FifteenTo35Calories
      );
      return {
        case: NutrientFormulaCase.FifteenTo35Calories,
        value: amount
      };
    }

    // CASE 9 - More than 12% of total calories
    if (/총 열량의 12% 이상/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThan12PerCalories
      );
      return { case: NutrientFormulaCase.MoreThan12PerCalories, value: amount };
    }

    // CASE 10 - More than 18% of total calories
    if (/총 열량의 18% 이상/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.MoreThan18PerCalories
      );
      return { case: NutrientFormulaCase.MoreThan18PerCalories, value: amount };
    }

    // CASE 11 - Fat less than
    if (/총 열량의 7% 이하/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.FatLessThan7PerCalories
      );
      return {
        case: NutrientFormulaCase.FatLessThan7PerCalories,
        value: amount
      };
    }

    // CASE 12 - Fat: 15~35% of total calories
    if (/총 열량의 15~35%/.test(nutrient.formula)) {
      const amount = getAdditionalFormula(
        nutrient,
        nutrientTotals,
        NutrientFormulaCase.FifteenTo35Calories
      );
      return {
        case: NutrientFormulaCase.FifteenTo35Calories,
        value: amount
      };
    }
  }

  return { case: 0, value: 0 };
};

export const mergeNutrients = (
  nutrients: Nutrient[],
  nutrientTotals: NutrientTotal[]
): NutrientCompare[] => {
  const nutrientMap = new Map<string, NutrientCompare>();

  nutrients.forEach((nutrient) => {
    nutrientMap.set(nutrient.code, {
      ...nutrient,
      isCompare: false,
      customAmount: undefined
    });
  });

  nutrientTotals.forEach((total) => {
    if (nutrientMap.has(total.code)) {
      const nutrient = nutrientMap.get(total.code)!;
      nutrient.totalAmount = total.totalAmount;
      nutrient.isCompare = true;

      if (nutrient.formula) {
        const obj = calculateFormula({
          nutrient,
          nutrientTotals
        });
        nutrient.compare = obj.value;
        nutrient.case = obj.case;
      }

      const { weightFrom, weightTo, totalAmount } = nutrient;
      if (
        weightFrom !== undefined &&
        weightTo !== undefined &&
        totalAmount !== undefined
      ) {
        if (totalAmount < weightFrom) {
          nutrient.compare = parseFloat((totalAmount - weightFrom).toFixed(3));
        } else if (totalAmount > weightTo) {
          nutrient.compare = parseFloat((totalAmount - weightTo).toFixed(3));
        } else {
          nutrient.compare = 0;
        }
      } else if (weightFrom !== undefined && totalAmount !== undefined) {
        nutrient.compare = parseFloat((weightFrom - totalAmount).toFixed(3));
        if (nutrient.compare <= 0) nutrient.compare = 0;
      } else if (weightTo !== undefined && totalAmount !== undefined) {
        nutrient.compare = parseFloat((totalAmount - weightTo).toFixed(3));
        if (nutrient.compare <= 0) nutrient.compare = 0;
      }
    } else {
      nutrientMap.set(total.code, {
        ...total,
        isCompare: false,
        customAmount: undefined
      });
    }
  });

  return Array.from(nutrientMap.values());
};

export const extractGeoData = (food: ITrayItem): Material[] => {
  const geoDataArray: Material[] = [];

  food.materials?.forEach((material) => {
    if (!isEmpty(material.geos)) {
      geoDataArray.push(material);
    }
  });

  return geoDataArray;
};

export const areListsEqual = (list1: any, list2: any) => {
  if (list1.length !== list2.length) return false;
  for (let i = 0; i < list1.length; i++) {
    if (JSON.stringify(list1[i]) !== JSON.stringify(list2[i])) return false;
  }
  return true;
};

export const groupMaterialsByCategory = (
  foods: ITrayItem[]
): GroupedMaterial[] => {
  const groupedMap: { [key: number]: GroupedMaterial } = {};

  foods.forEach((food) => {
    if (food.materials) {
      food.materials.forEach((material) => {
        const {
          categoryId,
          categoryName,
          name,
          code,
          recipeWeight,
          calculationWeight,
          unitName
        } = material;
        if (categoryId && categoryName) {
          // Check if this categoryId already exists in the grouped map
          if (groupedMap[categoryId]) {
            // If exists, update the recipeWeight and totalValue
            groupedMap[categoryId].recipeWeight += recipeWeight;
            groupedMap[categoryId].calculationWeight += calculationWeight;
          } else {
            // If not exists, create a new entry
            groupedMap[categoryId] = {
              categoryName,
              materialName: name,
              materialCode: code,
              recipeWeight,
              calculationWeight,
              unitName
            };
          }
        }
      });
    }
  });

  // Convert the map back into an array
  return Object.values(groupedMap);
};
