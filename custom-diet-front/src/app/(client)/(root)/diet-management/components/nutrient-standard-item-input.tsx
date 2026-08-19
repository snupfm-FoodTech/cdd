import { MandatoryFlag } from '@/types';
import { Nutrient, NutrientUnitAdditionalInfo } from '@/types/nutrient.type';
import { CircleX } from 'lucide-react';
import WeightInput from './nutrient-weight-input';
import { useEffect, useState } from 'react';
import isNil from 'lodash/isNil';
import { Button } from '@/components/ui/button';

interface NutrientInputProps {
  nutrient: Nutrient;
  onChange: (nutrient: Nutrient) => void;
  onRemove?: (nutrientCode: string) => void;
  isMobile?: boolean;
}

const NutrientInput = ({
  nutrient,
  onChange,
  onRemove,
  isMobile = false
}: NutrientInputProps) => {
  const [initialMinWeightFrom, setInitialMinWeightFrom] = useState<
    number | null
  >(null);
  const [initialMinWeightTo, setInitialMinWeightTo] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!isNil(nutrient.weightFrom) && !isNil(initialMinWeightFrom)) {
      setInitialMinWeightFrom(nutrient.weightFrom);
    }
    if (!isNil(nutrient.weightTo) && !isNil(initialMinWeightTo)) {
      setInitialMinWeightTo(nutrient.weightTo);
    }
  }, [
    nutrient.weightFrom,
    nutrient.weightTo,
    initialMinWeightFrom,
    initialMinWeightTo
  ]);

  const updateWeightFrom = (newWeight: number) => {
    onChange({ ...nutrient, weightFrom: newWeight });
  };

  const updateWeightTo = (newWeight: number) => {
    const MIN_WEIGHT = 0;
    onChange({ ...nutrient, weightTo: Math.max(newWeight, MIN_WEIGHT) });
  };

  const renderWeightInputs = () => {
    if (!isNil(nutrient.weightFrom) && !isNil(nutrient.weightTo)) {
      return (
        <>
          <div className="w-fit md:w-40">
            <WeightInput
              weight={nutrient.weightFrom}
              onChange={updateWeightFrom}
              minWeight={0}
              maxWeight={nutrient.weightTo - 1}
            />
          </div>
          <div className="flex w-4 items-center justify-center">
            <span className="text-lg font-semibold">~</span>
          </div>
          <div className="w-fit md:w-40">
            <WeightInput
              weight={nutrient.weightTo}
              onChange={updateWeightTo}
              minWeight={nutrient.weightFrom + 1}
            />
          </div>
          <div>{nutrient.unitName}</div>
        </>
      );
    } else if (isNil(nutrient.weightFrom) && !isNil(nutrient.weightTo)) {
      return (
        <>
          {!isMobile && (
            <>
              <div className="w-fit md:w-40" />
              <div className="w-4" />
            </>
          )}
          <div className="w-fit md:w-40">
            <WeightInput
              weight={nutrient.weightTo}
              onChange={updateWeightTo}
              minWeight={0}
              maxWeight={initialMinWeightTo ?? nutrient.weightTo}
            />
          </div>
          <div>
            {nutrient.unitName} {NutrientUnitAdditionalInfo.Less}
          </div>
        </>
      );
    } else if (!isNil(nutrient.weightFrom) && isNil(nutrient.weightTo)) {
      return (
        <>
          {!isMobile && (
            <>
              <div className="w-fit md:w-40" />
              <div className="w-4" />
            </>
          )}

          <div className="w-fit md:w-40">
            <WeightInput
              weight={nutrient.weightFrom}
              onChange={updateWeightFrom}
              minWeight={initialMinWeightFrom ?? nutrient.weightFrom}
            />
          </div>
          <div>
            {nutrient.unitName} {NutrientUnitAdditionalInfo.More}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pr-4">
      <div className="text-medium w-28 text-nowrap">{nutrient.name} </div>
      <div className="flex w-full flex-wrap items-center gap-4 md:w-[30rem]">
        {renderWeightInputs()}
      </div>
      {isMobile && nutrient.mandatoryFlag === MandatoryFlag.No && (
        <div className="w-full">
          <Button
            type="button"
            onClick={() => onRemove?.(nutrient.code)}
            variant="destructive"
            size="sm"
          >
            삭제
          </Button>
        </div>
      )}
      {!isMobile && <div className="w-6" />}
      {nutrient.mandatoryFlag === MandatoryFlag.No ? (
        isMobile ? null : (
          <CircleX
            className="h-4 w-4 cursor-pointer text-destructive"
            onClick={() => onRemove?.(nutrient.code)}
          />
        )
      ) : (
        <div className="w-4" />
      )}
    </div>
  );
};

export default NutrientInput;
