'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useDetailMaterialsWithPagination } from '@/hooks/diet.hook';
import { debounce } from 'lodash';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export interface SelectedMaterial {
  code: string;
  name: string;
}

interface RecipeMaterialFilterProps {
  value: SelectedMaterial | null;
  onChange: (material: SelectedMaterial | null) => void;
}

const RecipeMaterialFilter = ({ value, onChange }: RecipeMaterialFilterProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const debouncedSetSearch = useMemo(() => debounce(setSearchValue, 300), []);

  useEffect(() => {
    debouncedSetSearch(inputValue);
    return () => debouncedSetSearch.cancel();
  }, [inputValue, debouncedSetSearch]);

  const { data, isPending } = useDetailMaterialsWithPagination(
    { keyword: searchValue, page: 1, limit: 20 },
    { enabled: open }
  );

  if (value) {
    return (
      <Badge
        variant="secondary"
        className="flex items-center gap-1.5 py-1.5 pl-3 pr-2 text-sm"
      >
        재료: {value.name}
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-label="식재료 필터 해제"
          className="rounded-full p-0.5 hover:bg-black/10"
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    );
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setInputValue('');
          setSearchValue('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          식재료로 필터
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start">
        <Input
          autoFocus
          placeholder="식재료명 검색"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-2"
        />
        <Command>
          <CommandList>
            <CommandEmpty>
              {isPending ? '검색 중...' : '검색 결과가 없습니다.'}
            </CommandEmpty>
            <CommandGroup>
              {data?.items.map((material) => (
                <CommandItem
                  key={material.code}
                  value={material.name}
                  onSelect={() => {
                    onChange({ code: material.code, name: material.name });
                    setOpen(false);
                  }}
                >
                  {material.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default RecipeMaterialFilter;
