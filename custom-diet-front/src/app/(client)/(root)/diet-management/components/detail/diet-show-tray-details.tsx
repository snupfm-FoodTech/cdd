import { MandatoryFlag, SeparatedFlag } from '@/types';
import { Tray } from '@/types/tray.type';
import { TYPE_FOODS } from '@/constants';
import fruitsImage from '@/assets/icons/fruits.svg';
import noodlesImage from '@/assets/icons/noodles.svg';
import riceImage from '@/assets/icons/rice.svg';
import Image from 'next/image';

const DietShowTrayDetails = ({ tray }: { tray: Tray }) => {
  // Find the food items with the defined type codes
  const riceFood = tray.foods.find((food) => food.typeCode === TYPE_FOODS.RICE);
  const soupFood = tray.foods.find((food) => food.typeCode === TYPE_FOODS.SOUP);

  // Count remaining typeCodes other than the defined ones
  const remainingFoodCount = tray.foods.filter(
    (food) =>
      food.typeCode !== TYPE_FOODS.RICE && food.typeCode !== TYPE_FOODS.SOUP
  ).length;

  // Determine the inclusion and separation text for rice
  const riceInclusionText = riceFood
    ? riceFood.mandatoryFlag === MandatoryFlag.Yes
      ? '포함'
      : '포함되지않음'
    : '';
  const riceSeparationText = riceFood
    ? riceFood.separatedFlag === SeparatedFlag.Yes
      ? '(별도 용기)'
      : '(별도의 용기가 아님)'
    : '';

  // Determine the inclusion and separation text for soup
  const soupInclusionText = soupFood
    ? soupFood.mandatoryFlag === MandatoryFlag.Yes
      ? '포함'
      : '포함되지않음'
    : '';
  const soupSeparationText = soupFood
    ? soupFood.separatedFlag === SeparatedFlag.Yes
      ? '(별도 용기)'
      : '(별도의 용기가 아님)'
    : '';

  return (
    <ul className="text-sm text-gray-700">
      <li className="flex items-center justify-between py-1">
        <span className="flex items-center gap-2">
          <Image className="w-5" src={riceImage} alt="Picture rice" />
          밥/죽/면
        </span>
        <span>
          {riceFood
            ? `${riceInclusionText} ${riceSeparationText}`
            : '정보 없음'}
        </span>
      </li>
      <li className="flex items-center justify-between py-1">
        <span className="flex items-center gap-2">
          <Image className="w-5" src={noodlesImage} alt="Picture noodles" />
          국/탕
        </span>
        <span>
          {soupFood
            ? `${soupInclusionText} ${soupSeparationText}`
            : '정보 없음'}
        </span>
      </li>
      <li className="flex items-center justify-between py-1">
        <span className="flex items-center gap-2">
          <Image className="w-5" src={fruitsImage} alt="Fruits noodles" />
          반찬
        </span>
        <span>{`${remainingFoodCount}개`}</span>
      </li>
    </ul>
  );
};

export default DietShowTrayDetails;
