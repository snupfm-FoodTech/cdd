import { Nutrient } from '@/types/nutrient.type';
import DietShowNutritionItem from './diet-show-nutrition-item';
import { Tray } from '@/types/tray.type';
import DietDetailTray from './diet-detail-tray';
import { ITrayItem } from '@/types/diet.type';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DietShowNutritionProps {
  nutrients: Nutrient[];
  name: string;
  tray: Tray;
  listTrayItems: ITrayItem[];
  listSeparateItems: ITrayItem[];
}

const DietShowNutrition = ({
  nutrients,
  name,
  tray,
  listTrayItems,
  listSeparateItems
}: DietShowNutritionProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Left Card */}
      <div className="w-full rounded-lg bg-white p-4 shadow-md md:w-1/2">
        <h3 className="mb-2 border-b px-3 pb-2 font-semibold text-gray-800">
          식단 영양 기준
        </h3>
        <h4 className="mb-2 px-3 text-lg font-semibold text-black">{name}</h4>
        <ScrollArea className="h-56">
          <ul className="text-sm text-gray-700">
            {nutrients.map((nutrient) => (
              <DietShowNutritionItem key={nutrient.code} nutrient={nutrient} />
            ))}
          </ul>
        </ScrollArea>
      </div>

      {/* Right Card */}
      <DietDetailTray
        tray={tray}
        listTrayItems={listTrayItems}
        listSeparateItems={listSeparateItems}
      />
    </div>
  );
};

export default DietShowNutrition;
