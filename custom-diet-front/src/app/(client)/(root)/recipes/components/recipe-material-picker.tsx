'use client';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDetailMaterialsWithPagination } from '@/hooks/diet.hook';
import { useState } from 'react';

const LIMIT = 10;

export interface PickedMaterial {
  code: string;
  name: string;
  unitName?: string;
  recipeWeight: number;
}

interface RecipeMaterialPickerProps {
  /** 이미 담긴 재료 코드 - 중복 추가를 막는다 */
  selectedCodes: string[];
  onSelect: (material: PickedMaterial) => void;
}

const RecipeMaterialPicker = ({
  selectedCodes,
  onSelect
}: RecipeMaterialPickerProps) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isFetching } = useDetailMaterialsWithPagination(
    { page, limit: LIMIT, keyword },
    { enabled: open }
  );

  const items = data?.items ?? [];
  const totalPageNo = data?.totalPageNo ?? 1;

  const handleSearch = () => {
    setPage(1);
    setKeyword(searchInput);
  };

  const handleAdd = (code: string, name: string, unitName?: string) => {
    // 식단 설계에서 재료를 새로 담을 때와 동일하게 1g 으로 시작한다
    onSelect({ code, name, unitName, recipeWeight: 1 });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm">
          재료 추가
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>재료 검색</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            autoFocus
            placeholder="재료명 검색"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={handleSearch}>
            검색
          </Button>
        </div>

        <ScrollArea className="h-72 rounded-md border">
          {isFetching ? (
            <div className="flex h-72 items-center justify-center">
              <Spinner size="large" />
            </div>
          ) : items.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              {keyword
                ? '검색 결과가 없습니다.'
                : '재료명을 검색해 주세요.'}
            </p>
          ) : (
            items.map((material) => {
              const isAdded = selectedCodes.includes(material.code);
              return (
                <div
                  key={material.code}
                  className="flex items-center justify-between gap-3 border-b px-4 py-2 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      {material.originalCode}
                    </p>
                    <h4 className="truncate text-sm font-semibold">
                      {material.name}
                    </h4>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 shrink-0"
                    disabled={isAdded}
                    onClick={() =>
                      handleAdd(material.code, material.name, material.unitName)
                    }
                  >
                    {isAdded ? '추가됨' : '추가'}
                  </Button>
                </div>
              );
            })
          )}
        </ScrollArea>

        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            이전
          </Button>
          <span className="text-sm">
            {page} / {totalPageNo}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={page >= totalPageNo}
            onClick={() => setPage((p) => p + 1)}
          >
            다음
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeMaterialPicker;
