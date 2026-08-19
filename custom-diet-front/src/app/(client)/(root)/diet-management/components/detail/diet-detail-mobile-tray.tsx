import { cn } from '@/lib/utils';
import { ITrayItem } from '@/types/diet.type';
import { Material } from '@/types/food.type';
import { extractGeoData } from '../../helpers';
import DietDetailSpecialNutritionButton from './diet-detail-special-nutrition-button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BASE_PATH } from '@/constants';

const DietDetailMobileTrayItem: React.FC<{
  trayItem: ITrayItem;
  isLast?: boolean;
}> = ({ trayItem, isLast = false }) => {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    if (trayItem) {
      setMaterials(extractGeoData(trayItem));
    }
  }, [trayItem]);

  return (
    <div className="flex flex-col gap-3">
      <div className={cn('flex items-start gap-3 py-3', !isLast && '')}>
        <div className="shrink-0">
          <Image
            src={`${BASE_PATH}/img/${trayItem.typeCode}.png`}
            alt={`image-tray-${trayItem.typeCode}`}
            width={32}
            height={32}
            className="rounded bg-gray-100 p-1"
          />
        </div>
        <div className="flex-1 text-sm">
          <p className="text-xs text-gray-500">{trayItem.typeName}</p>
          {trayItem.code ? (
            <p className="truncate font-semibold text-gray-900">
              {trayItem.name}
            </p>
          ) : (
            <p className="truncate font-semibold text-destructive">빈 음식</p>
          )}
        </div>
      </div>
      {materials.length > 0 && (
        <div className="-mt-3 pb-3">
          <DietDetailSpecialNutritionButton
            className="text-xs"
            foodTray={trayItem}
            materials={materials}
          />
        </div>
      )}
    </div>
  );
};

const DietDetailMobileTray: React.FC<{
  trayItems: ITrayItem[];
  separateItems?: ITrayItem[];
}> = ({ trayItems, separateItems = [] }) => {
  return (
    <div className="divide-y rounded-md border bg-white p-4 shadow-sm">
      {trayItems.map((item, index) => (
        <DietDetailMobileTrayItem
          key={item.sequence}
          trayItem={item}
          isLast={index === trayItems.length - 1 && separateItems.length === 0}
        />
      ))}

      {separateItems.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="mb-2 text-sm font-semibold text-gray-700">별도 용기</p>
          {separateItems.map((item, index) => (
            <DietDetailMobileTrayItem
              key={item.sequence}
              trayItem={item}
              isLast={index === separateItems.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DietDetailMobileTray;
