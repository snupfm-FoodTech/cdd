import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { useFoodsWithPaging } from '@/hooks/diet.hook';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import NutrientSkeleton from '../nutrient-skeleton';
import { ITrayItem } from '@/types/diet.type';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-keys.constant';
import { Search } from 'lucide-react';

interface FoodCategory {
  code: string;
  label: string;
}

// com_intg_cd_dtl 테이블의 CD00013 그룹 (식품유형코드) 기준
const FOOD_CATEGORIES: FoodCategory[] = [
  { code: 'FT00001', label: '밥/죽/면' },
  { code: 'FT00002', label: '국/탕' },
  { code: 'FT00003', label: '채소류 반찬' },
  { code: 'FT00004', label: '단백질 반찬' },
  { code: 'FT00005', label: '김치류 반찬' },
  { code: 'FT00006', label: '기타 반찬' }
];

const FOOD_PAGE_LIMIT = 30;

const highlightText = (text: string, highlight: string) => {
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

interface FoodSearchBarListProps {
  onSelectFood: (food: ITrayItem) => void;
  value: string;
  typeCode?: string;
  allergens: number[];
}

const FoodSearchBarList = ({
  onSelectFood,
  value,
  typeCode,
  allergens
}: FoodSearchBarListProps) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [typeCode, value]);

  const { data, isPending } = useFoodsWithPaging({
    page,
    limit: FOOD_PAGE_LIMIT,
    searchValue: value,
    typeCode,
    excludedAllergenIds:
      process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens
  });

  if (isPending) {
    return <NutrientSkeleton count={1} />;
  }

  const foods = data?.items ?? [];
  const totalPages = data?.totalPageNo ?? 1;

  return (
    <div className="flex flex-col gap-2">
      <Command>
        <CommandList className="max-h-[55vh]">
          <CommandEmpty>
            해당 카테고리에 검색 결과가 없어요. 다른 카테고리를 선택해보세요.
          </CommandEmpty>
          {foods.length > 0 && (
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
                  <Badge className="ml-auto !whitespace-nowrap !px-3">
                    추가
                  </Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
      {totalPages > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-3 border-t pt-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            이전
          </Button>
          <span className="whitespace-nowrap text-sm text-gray-500">
            {page} / {totalPages}
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            다음
          </Button>
        </div>
      )}
    </div>
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
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedTrayItem.typeCode
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const debouncedFilter = debounce((input: string) => {
    if (oldValue !== input) {
      queryClient.removeQueries({
        queryKey: [QueryKeys.DIET_FOOD_LIST]
      });
      setOldValue(input);
    }
  }, 300);

  useEffect(() => {
    debouncedFilter(value);
    return () => {
      debouncedFilter.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isOpenDialog) {
      setSelectedCategory(selectedTrayItem.typeCode);
      const timeoutId = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenDialog]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (food: ITrayItem) => {
    onSelectFood(food);
    setValue('');
    setOldValue('');
    setIsOpenDialog(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpenDialog(true)}
        className="w-72 rounded-md border border-input bg-white px-3 py-2 text-left text-sm text-gray-500"
      >
        <div className="flex items-center justify-between">
          <span>다른 음식 검색</span>
          <Search className="h-4 w-4 text-gray-400" />
        </div>
      </button>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent className="flex h-[75vh] w-full max-w-3xl flex-col">
          <DialogHeader>
            <DialogTitle>다른 음식 검색</DialogTitle>
          </DialogHeader>
          <CDInput
            placeholder="음식 이름으로 검색"
            value={value}
            onChange={handleInputChange}
            endIcon={Icons.search}
            className="w-full"
            ref={searchInputRef}
          />
          <div className="flex flex-1 gap-4 overflow-hidden">
            <div className="flex w-40 shrink-0 flex-col gap-2 overflow-y-auto border-r pr-3">
              {FOOD_CATEGORIES.map((category) => (
                <Button
                  key={category.code}
                  type="button"
                  size="sm"
                  variant={
                    selectedCategory === category.code
                      ? 'default'
                      : 'outline'
                  }
                  className="justify-start"
                  onClick={() => setSelectedCategory(category.code)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              <FoodSearchBarList
                allergens={allergens}
                typeCode={selectedCategory}
                onSelectFood={handleSelect}
                value={oldValue}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FoodSearchBar;