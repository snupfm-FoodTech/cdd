import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useFoods } from '@/hooks/diet.hook';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import NutrientSkeleton from '../nutrient-skeleton';
import { ITrayItem } from '@/types/diet.type';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-keys.constant';
import { useMediaQuery } from 'usehooks-ts';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface FoodSearchBarListProps {
  onSelectFood: (food: ITrayItem) => void;
  selectedTrayItem: ITrayItem;
  value: string;
  allergens: number[];
}

const highlightText = (text: string, highlight: string) => {
  // Kiểm tra nếu highlight rỗng hoặc chỉ có khoảng trắng
  if (!highlight || !highlight.trim()) {
    return text;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span
        key={index}
        className="rounded bg-blue-100 px-1 font-semibold text-blue-600"
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

const FoodSearchBarList = ({
  onSelectFood,
  value,
  selectedTrayItem,
  allergens
}: FoodSearchBarListProps) => {
  const { data: foods, isPending } = useFoods({
    limit: 20,
    searchValue: value,
    typeCode: selectedTrayItem.typeCode,
    excludedAllergenIds: process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens
  });

  if (isPending) {
    return <NutrientSkeleton count={1} />;
  }

  return (
    <Command>
      <CommandList>
        <CommandEmpty>
          특정한 식품 검색 없이 카테고리별로 식품을 찾을 수 있어요.
        </CommandEmpty>
        {foods && foods.length > 0 && (
          <CommandGroup>
            {foods.map((food) => (
              <CommandItem
                key={food.code}
                value={food.name}
                className="data-[disabled='false']"
                onSelect={() => onSelectFood(food)}
              >
                <p className="wrap-anywhere pr-1">
                  {highlightText(food.name || '', value)}
                </p>
                <Badge className="ml-auto !whitespace-nowrap !px-3">추가</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

interface FoodSearchBarProps {
  onSelectFood: (food: ITrayItem) => void;
  selectedTrayItem: ITrayItem;
  allergens: number[];
}

const FoodSearchBar = ({
  onSelectFood,
  selectedTrayItem,
  allergens
}: FoodSearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const [oldValue, setOldValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();

  const queryClient = useQueryClient();

  const debouncedFilter = debounce((input: string) => {
    if (oldValue !== input) {
      queryClient.removeQueries({
        queryKey: [QueryKeys.DIET_FOOD_LIST]
      });
      setOldValue(input);
    }
    setIsOpen(!!input); // Set popover open state based on input presence
  }, 300);

  useEffect(() => {
    debouncedFilter(value);
    return () => {
      debouncedFilter.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    if (isOpen && searchInputRef.current) {
      // Delay focusing to ensure popover content is rendered
      timeoutId = window.setTimeout(() => {
        searchInputRef.current!.focus();
      }, 0);
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (food: ITrayItem) => {
    onSelectFood(food);
    setValue('');
    setOldValue('');
    setIsOpen(false);
    setIsOpenDialog(false);
  };

  const List = (
    <FoodSearchBarList
      allergens={allergens}
      selectedTrayItem={selectedTrayItem}
      onSelectFood={handleSelect}
      value={oldValue}
    />
  );

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsOpenDialog(true)}
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-left text-sm"
        >
          <div className="flex items-center justify-between">
            <div className="text-gray-500">영양소 추가</div>
            <div className="">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </button>

        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                영양소 검색
              </DialogTitle>
            </DialogHeader>
            <div className="h-[60vh] p-2">
              <CDInput
                placeholder="영양소 검색"
                value={value}
                onChange={handleInputChange}
                endIcon={Icons.search}
                className="mb-3 w-full"
                ref={searchInputRef}
              />
              {List}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <CDInput
            placeholder="다른 음식 검색"
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputChange}
            endIcon={Icons.search}
            className="w-72"
            ref={searchInputRef}
          />
        </PopoverTrigger>
        <PopoverContent>{List}</PopoverContent>
      </Popover>
    </div>
  );
};

export default FoodSearchBar;
