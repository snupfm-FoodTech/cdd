import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import FoodSearchBar from './food-search-bar';
import { ChevronRightIcon, Cross2Icon } from '@radix-ui/react-icons';
import { ITrayItem } from '@/types/diet.type';
import { useFood, useRecommendFoods } from '@/hooks/diet.hook';
import { Spinner } from '@/components/spinner';
import { Food } from '@/types/food.type';
import {
  calculateTotalWeightInGrams,
  convertITrayItemToFood
} from '../../helpers';
import * as Popover from '@radix-ui/react-popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMediaQuery } from 'usehooks-ts';
import useWait from '@/hooks/use-wait';
import TruncateText from '@/components/ui/truncate-text';

interface DietSearchRecommendProps {
  selectedTrayItem: ITrayItem;
  listFoods: ITrayItem[];
  onSelectFood: (item: Food) => void;
  mode?: 'click' | 'hover';
  allergens: number[];
  dietId?: number;
}

export const DietSearchRecommend = ({
  selectedTrayItem,
  listFoods,
  onSelectFood,
  mode = 'click',
  allergens,
  dietId
}: DietSearchRecommendProps) => {
  const { startWait, cancelWait } = useWait(500);
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);

  const currentTrayFoods = listFoods
    .filter((item) => item.code)
    .map((item) => `${item.code}:${item.capacityVolume}`);

  const {
    data: foods,
    isPending
  } = useRecommendFoods({
    limit: 6,
    foodCode: selectedTrayItem.code,
    typeCode: selectedTrayItem?.typeCode,
    excludedAllergenIds: process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens,
    dietId: dietId,
    currentFoodCode: selectedTrayItem?.code,
    currentTrayFoods: dietId ? currentTrayFoods : undefined
  });
  const {
    data: foodView,
    isPending: isFetchingView,
    refetch: refetchFoodView
  } = useFood(selectedFood?.code || '', selectedFood?.name || '');

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleOpenChange = async (food: Food, index: number) => {
    setSelectedFood(food);
    setOpenPopoverIndex(index);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      refetchFoodView();
    }, 100);
    setTimeoutId(id);
  };

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  const renderModal = (food: Food) => {
    return (
      <Dialog
        open={openPopoverIndex !== null}
        onOpenChange={(open) => {
          if (open) {
            handleOpenChange(food, openPopoverIndex ?? 0);
          } else {
            setOpenPopoverIndex(null);
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {isFetchingView ? (
            <div className="flex h-32 w-full items-center justify-center">
              <Spinner size="medium" />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  {foodView?.name || foodView?.typeName}
                </DialogTitle>
                <DialogDescription className="text-xs">{`${calculateTotalWeightInGrams(foodView?.materials)}g 기준`}</DialogDescription>
              </DialogHeader>
              <div className="text-xs">레시피</div>
              {renderPopupContent()}
              <div className="flex w-full items-center justify-center">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (selectedFood) {
                      onSelectFood(selectedFood);
                      setOpenPopoverIndex(null);
                    }
                  }}
                >
                  변경하기
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  };

  const renderPopupContent = () => {
    const children = (
      <ul className="mt-2 list-inside list-none text-sm">
        {foodView?.materials &&
          foodView.materials.map((material) => (
            <li key={material.code} className="mt-1">
              {material.name}
            </li>
          ))}
      </ul>
    );
    if (foodView && foodView.materials?.length > 5) {
      return <ScrollArea className="mb-2 h-32">{children}</ScrollArea>;
    }
    return <div className="my-2">{children}</div>;
  };

  const renderPopup = (food: Food, index: number) => {
    if (isMobile) {
      return (
        <>
          <div
            onClick={async () => {
              setSelectedFood(food);
              setOpenPopoverIndex(index);
              await startWait();
              refetchFoodView();
            }}
            className="flex cursor-pointer items-center justify-center text-sm font-semibold"
          >
            <TruncateText className="text-xs" text={food.name} />
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </div>
          {renderModal(food)}
        </>
      );
    }
    const isOpen = openPopoverIndex === index;
    return (
      <Popover.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (open) {
            handleOpenChange(food, index);
          } else {
            setOpenPopoverIndex(null);
          }
        }}
      >
        <Popover.Trigger asChild>
          <div className="flex cursor-help items-center justify-center text-sm font-semibold">
            <div className="truncate">{food.name}</div>
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </div>
        </Popover.Trigger>
        <Popover.Content
          className="z-50 w-64 rounded-lg bg-white p-6 shadow-md"
          side="right"
          sideOffset={5}
        >
          {isFetchingView ? (
            <div className="flex h-32 w-full items-center justify-center">
              <Spinner size="medium" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className="truncate text-base font-semibold">
                  {foodView?.name || foodView?.typeName}
                </h3>
                <Popover.Close className="text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Cross2Icon className="h-4 w-4" />
                </Popover.Close>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{`${calculateTotalWeightInGrams(foodView?.materials)}g 기준`}</div>
              <div className="my-2 text-xs">레시피</div>
              {renderPopupContent()}
              <div className="flex w-full items-center justify-center">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (selectedFood) {
                      onSelectFood(selectedFood);
                      setOpenPopoverIndex(null);
                    }
                  }}
                >
                  변경하기
                </Button>
              </div>
            </>
          )}
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Root>
    );
  };

  return (
    <>
      <div className="mb-4 flex justify-center border-none bg-transparent p-0 md:border md:bg-secondary md:p-4">
        {selectedTrayItem && (
          <FoodSearchBar
            allergens={allergens}
            selectedTrayItem={selectedTrayItem}
            onSelectFood={(food: ITrayItem) => {
              onSelectFood(convertITrayItemToFood(food));
            }}
          />
        )}
      </div>
      <h4 className="mb-0 flex-grow text-base font-semibold text-muted-foreground md:text-lg">{`“${selectedTrayItem?.name || selectedTrayItem.typeName}”과 비슷한 음식`}</h4>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
        {foods?.map((food, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between rounded border bg-secondary/80 px-4 py-2"
          >
            {renderPopup(food, index)}
            <div className="mt-4">
              <span className="mr-1 inline-block text-right text-sm font-medium">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => onSelectFood(food)}
                >
                  변경하기
                </Button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
