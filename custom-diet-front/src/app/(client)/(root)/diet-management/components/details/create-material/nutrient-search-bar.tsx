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
import { useNutrients } from '@/hooks/diet.hook';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { MaterialNutrient } from '@/types/food.type';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

interface NutrientSearchBarProps {
  onSelectNutrient: (nutrient: MaterialNutrient) => void;
  nutrientsExclude?: MaterialNutrient[];
}

const NutrientSearchBar = ({
  onSelectNutrient,
  nutrientsExclude = []
}: NutrientSearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<MaterialNutrient[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();

  const { data: nutrients } = useNutrients();

  const debouncedFilter = debounce((input: string) => {
    const excludedCodes = nutrientsExclude.map((nutrient) => nutrient.code);
    const filteredResults =
      nutrients
        ?.filter(
          (item) =>
            item.name.toLowerCase().includes(input.toLowerCase()) &&
            !excludedCodes.includes(item.code)
        )
        .map((item) => ({
          ...item,
          amount: 1 // Minimum amount
        })) || [];
    setResults(filteredResults);
    setIsOpen(!!input); // Set popover open state based on input presence
  }, 300);

  useEffect(() => {
    debouncedFilter(value);
    return () => {
      debouncedFilter.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, nutrients, nutrientsExclude]);

  useEffect(() => {
    let timeoutId: number | undefined = undefined;

    if ((isOpen || isDialogOpen) && searchInputRef.current) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isDialogOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSelect = (nutrient: MaterialNutrient) => {
    onSelectNutrient(nutrient);
    setIsOpen(false);
    setIsDialogOpen(false);
  };

  const List = (
    <Command>
      <CommandList>
        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
        {results.length > 0 && (
          <CommandGroup>
            {results.map((nutrient) => (
              <CommandItem
                key={nutrient.code}
                value={nutrient.name}
                className="data-[disabled='false']"
                onSelect={() => handleSelect(nutrient)}
              >
                <p>{nutrient.name}</p>
                <Badge className="ml-auto">추가</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );

  if (isMobile) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="w-full rounded-md border border-input bg-white px-3 py-2 text-left text-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-500">영양소 추가</span>
            <Icons.search className="h-4 w-4 text-gray-400" />
          </div>
        </button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>영양소 검색</DialogTitle>
            </DialogHeader>
            <div className="h-[80vh] p-2">
              <CDInput
                placeholder="영양소 추가"
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
            placeholder="영양소 추가"
            value={value}
            onChange={handleInputChange}
            endIcon={Icons.search}
            className="h-8 w-full rounded-2xl text-xs md:w-72"
            ref={searchInputRef}
          />
        </PopoverTrigger>
        <PopoverContent>{List}</PopoverContent>
      </Popover>
    </div>
  );
};

export default NutrientSearchBar;
