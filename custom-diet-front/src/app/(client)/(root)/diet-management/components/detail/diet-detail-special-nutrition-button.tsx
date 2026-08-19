import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ITrayItem } from '@/types/diet.type';
import { IGeo, Material } from '@/types/food.type';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronRightIcon, Cross2Icon } from '@radix-ui/react-icons';

interface DietDetailSpecialNutritionButtonProps {
  foodTray?: ITrayItem;
  materials?: Material[];
  className?: string;
}

const getWidthClass = (className?: string) => {
  if (!className) return 'w-64';

  if (className.includes('separate')) return 'w-6';

  const colSpanMatch = className.match(/col-span-(\d+)/);
  if (colSpanMatch) {
    const colSpan = parseInt(colSpanMatch[1], 10);
    if (colSpan >= 1 && colSpan <= 3) return 'w-8';
    if (colSpan === 4 || colSpan === 5) return 'w-20';
  }

  return 'w-44';
};

const DietDetailSpecialNutritionButton = ({
  foodTray,
  materials,
  className
}: DietDetailSpecialNutritionButtonProps) => {
  const widthClass = getWidthClass(className);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size="sm" variant="outline" className="rounded-full">
          <span
            className={cn(
              'md:max-w-auto max-w-fit truncate text-xs',
              widthClass
            )}
          >
            지리적 표시제 식재료 가능
          </span>
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[200] w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg md:w-2/5">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-bold">
              지리적 표시제 식재료
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <Cross2Icon className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="mt-4">
            <div className="mb-4 flex flex-col items-start">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-gray-700">
                {foodTray?.name}
              </span>
            </div>
            <ScrollArea className="h-72 w-full">
              <div className="space-y-4 text-xs">
                {materials?.map((materialItem: Material, index) => (
                  <div key={index}>
                    <div className="mb-4 font-bold">
                      식재료: {materialItem.name}
                    </div>
                    {materialItem.geos &&
                      materialItem.geos.map((geoItem: IGeo) => (
                        <div
                          className="my-2 flex rounded-lg bg-gray-100 p-4"
                          key={geoItem.geoId}
                        >
                          <div className="w-1/4">{geoItem.regNo}</div>
                          <div className="w-1/4 font-bold">{geoItem.regNm}</div>
                          <div>{geoItem.region}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DietDetailSpecialNutritionButton;
