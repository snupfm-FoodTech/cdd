'use client';

import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DIET_MANAGEMENT_CREATE_URL } from '@/constants/routes';
import { useDiets, useDownloadDietsExcel } from '@/hooks/diet.hook';
import { DIET_GROUP_BY_LABEL, DietGroupBy } from '@/types/diet.type';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import DietMenu from './diet-menu';
import { useMediaQuery } from 'usehooks-ts';
import { Download, ListChecks, X } from 'lucide-react';

interface DietSidebarProps {
  onClose?: () => void;
}

const DietSidebar: FC<DietSidebarProps> = ({ onClose }) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const [searchText, setSearchText] = useState('');
  const [groupBy, setGroupBy] = useState<DietGroupBy>('standard');
  const { data, isLoading } = useDiets();

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    mutateAsync: mutateDownloadDietsExcel,
    isPending: isDownloadingSelected
  } = useDownloadDietsExcel();

  const filteredDiets = useMemo(() => {
    const safeData = data ?? [];
    const keyword = searchText.trim().toLowerCase();
    if (!keyword) return safeData;

    // 식단명뿐 아니라 영양기준·식판으로도 찾게 한다 ("당뇨"로 검색하면 그 기준 식단이 모두 나온다)
    return safeData.filter((diet) =>
      [diet.name, diet.standardName, diet.trayName].some((field) =>
        field?.toLowerCase().includes(keyword)
      )
    );
  }, [data, searchText]);

  const sidebarWidth = isDesktop ? '25rem' : isTablet ? '50vw' : '80vw';

  const toggleSelectMode = () => {
    setSelectMode((prev) => !prev);
    setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDownloadSelected = () => {
    if (selectedIds.length === 0) return;
    mutateDownloadDietsExcel(selectedIds);
  };

  return (
    <div
      className="fixed z-50 h-screen space-y-4 border-r bg-white p-4 md:z-0"
      style={{ width: sidebarWidth }}
    >
      <div className="mt-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold">식단 목록</h4>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={selectMode ? 'secondary' : 'outline'}
            onClick={toggleSelectMode}
          >
            {selectMode ? (
              <>
                <X className="mr-1 h-4 w-4" />
                취소
              </>
            ) : (
              <>
                <ListChecks className="mr-1 h-4 w-4" />
                선택
              </>
            )}
          </Button>
          <Link
            href={DIET_MANAGEMENT_CREATE_URL}
            onClick={() => {
              if (!isDesktop) {
                onClose && onClose();
              }
            }}
          >
            <Button size="sm">
              <Icons.add className="mr-1 h-4 w-4" />
              식단 추가
            </Button>
          </Link>
        </div>
      </div>
      <CDInput
        className="mt-4"
        placeholder="식단 검색"
        endIcon={Icons.search}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <span className="shrink-0 text-sm text-muted-foreground">묶기</span>
        <Select
          value={groupBy}
          onValueChange={(value) => setGroupBy(value as DietGroupBy)}
        >
          <SelectTrigger className="h-8 flex-1 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(
              Object.keys(DIET_GROUP_BY_LABEL) as DietGroupBy[]
            ).map((key) => (
              <SelectItem key={key} value={key}>
                {DIET_GROUP_BY_LABEL[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectMode && (
        <div className="flex items-center justify-between rounded-md bg-secondary px-3 py-2">
          <span className="text-sm font-medium text-foreground">
            {selectedIds.length}개 선택됨
          </span>
          <Button
            size="sm"
            onClick={handleDownloadSelected}
            disabled={selectedIds.length === 0 || isDownloadingSelected}
          >
            <Download className="mr-1 h-4 w-4" />
            {isDownloadingSelected ? '다운로드 중...' : '선택 다운로드'}
          </Button>
        </div>
      )}
      <DietMenu
        diets={filteredDiets}
        loading={isLoading}
        isDesktop={isDesktop}
        groupBy={groupBy}
        forceExpand={searchText.trim().length > 0}
        selectable={selectMode}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onDeleteItem={() => {
          if (!isDesktop) {
            onClose && onClose();
          }
        }}
        onDetailItem={() => {
          if (!isDesktop) {
            onClose && onClose();
          }
        }}
        onUpdateItem={() => {
          if (!isDesktop) {
            onClose && onClose();
          }
        }}
      />
    </div>
  );
};

export default DietSidebar;