import { useMemo } from 'react';
import { MandatoryFlag, SeparatedFlag } from '@/types';
import { Food } from '@/types/food.type';
import { Tray } from '@/types/tray.type';
import { TYPE_FOODS } from '@/constants';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import fruitsImage from '@/assets/icons/fruits.svg';
import noodlesImage from '@/assets/icons/noodles.svg';
import riceImage from '@/assets/icons/rice.svg';

const FoodList = ({ foods }: { foods: Food[] }) => {
  // Memoize the counted occurrences to avoid recalculating on every render
  const countedOccurrences = useMemo(() => {
    const typeCodeMap: Record<string, number> = {};
    let counter = 1;

    return foods.reduce(
      (acc, food) => {
        if (food.mandatoryFlag === MandatoryFlag.No) {
          typeCodeMap[food.typeCode] = counter++;
          acc[food.sequence] = typeCodeMap[food.typeCode];
        }
        return acc;
      },
      {} as Record<number, number>
    );
  }, [foods]);

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {foods
        .sort((a, b) => a.sequence - b.sequence)
        .map((food: Food) => (
          <div
            key={food.sequence}
            className="w-100 flex items-center gap-4 rounded-lg border bg-secondary px-4 py-2"
          >
            <div className="w-15 truncate text-nowrap text-sm text-muted-foreground">
              {food.mandatoryFlag === MandatoryFlag.Yes
                ? food.typeCode === TYPE_FOODS.RICE
                  ? '밥/죽/면'
                  : '국/탕'
                : `반찬 ${countedOccurrences[food.sequence]}`}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 text-sm">
                {food.capacityVolume}
                {food.unitName}
              </div>
              <div className="truncate text-wrap border-l-2 pl-2 text-xs text-muted-foreground">
                {food.typeName ? food.typeName : 'ml'}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

const TrayDetails = ({ tray }: { tray: Tray }) => {
  // Find the food items with the defined type codes
  const riceFood = tray.foods.find((food) => food.typeCode === TYPE_FOODS.RICE);
  const soupFood = tray.foods.find((food) => food.typeCode === TYPE_FOODS.SOUP);

  const getInclusionText = (food?: Food) =>
    food?.mandatoryFlag === MandatoryFlag.Yes ? '포함' : '';

  const getSeparationText = (food?: Food) => {
    if (food?.mandatoryFlag !== MandatoryFlag.Yes) {
      return '';
    }

    return food.separatedFlag === SeparatedFlag.Yes
      ? '(별도 용기)'
      : '(별도 용기가 아님)';
  };

  // Count remaining typeCodes other than the defined ones
  const remainingFoodCount = tray.foods.filter(
    (food) =>
      food.typeCode !== TYPE_FOODS.RICE && food.typeCode !== TYPE_FOODS.SOUP
  ).length;

  // Determine the inclusion text for rice and soup
  const riceInclusionText = getInclusionText(riceFood);
  const riceSeparationText = getSeparationText(riceFood);
  const soupInclusionText = getInclusionText(soupFood);
  const soupSeparationText = getSeparationText(soupFood);

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex rounded-lg border bg-secondary/80 p-4">
        <div className="mr-4 w-[6rem] border-r-2">
          <div className="flex items-center gap-2">
            <Image className="w-6" src={riceImage} alt="Picture rice" />
            <div className="text-sm text-muted-foreground">밥/죽/면</div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Image className="w-6" src={noodlesImage} alt="Picture noodles" />
            <div className="text-sm text-muted-foreground">국/탕</div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Image className="w-6" src={fruitsImage} alt="Fruits noodles" />
            <div className="text-sm text-muted-foreground">반찬</div>
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">
            {riceInclusionText
              ? `${riceInclusionText} ${riceSeparationText}`
              : ''}
          </div>
          <div className="mt-3 text-sm font-medium">
            {soupInclusionText
              ? `${soupInclusionText} ${soupSeparationText}`
              : ''}
          </div>
          <div className="mt-3 text-sm font-medium">{`${remainingFoodCount}개`}</div>
        </div>
      </div>
      <div>
        <FoodList foods={tray?.foods ?? []} />
      </div>
    </div>
  );
};

export default TrayDetails;
