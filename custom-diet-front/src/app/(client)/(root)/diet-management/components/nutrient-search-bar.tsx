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
import { Nutrient } from '@/types/nutrient.type';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import NutrientSkeleton from './nutrient-skeleton';
import { MandatoryFlag } from '@/types';
import { useMediaQuery } from 'usehooks-ts';
import { Search } from 'lucide-react';

interface NutrientSearchBarProps {
  onSelectNutrient: (nutrient: Nutrient) => void;
  nutrientsExclude?: Nutrient[];
}

const NutrientSearchBar = ({
  onSelectNutrient,
  nutrientsExclude = []
}: NutrientSearchBarProps) => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Nutrient[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useMediaQuery('(max-width: 640px)');

  const { data: nutrients, isPending } = useNutrients();

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
          mandatoryFlag: MandatoryFlag.No,
          weightFrom: 0,
          weightTo: 1
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

  const handleSelect = (nutrient: Nutrient) => {
    onSelectNutrient(nutrient);
    setIsOpen(false);
    setIsOpenDialog(false);
  };

  if (isPending) {
    return <NutrientSkeleton count={1} />;
  }

  const NutrientResultsList = (
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
              {NutrientResultsList}
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
            className="w-full md:w-72"
            ref={searchInputRef}
          />
        </PopoverTrigger>
        <PopoverContent>{NutrientResultsList}</PopoverContent>
      </Popover>
    </div>
  );
};

export default NutrientSearchBar;
