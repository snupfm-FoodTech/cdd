'use client';

import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { DIET_MANAGEMENT_CREATE_URL } from '@/constants/routes';
import { useDiets } from '@/hooks/diet.hook';
import Link from 'next/link';
import { FC, useMemo, useState } from 'react';
import DietMenu from './diet-menu';
import { useMediaQuery } from 'usehooks-ts';

interface DietSidebarProps {
  onClose?: () => void;
}

const DietSidebar: FC<DietSidebarProps> = ({ onClose }) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useDiets();

  const filteredDiets = useMemo(() => {
    const safeData = data ?? [];
    return safeData.filter((diet) =>
      diet.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText]);

  const sidebarWidth = isDesktop ? '25rem' : isTablet ? '50vw' : '80vw';

  return (
    <div
      className="fixed z-50 h-screen space-y-4 border-r bg-white p-4 md:z-0"
      style={{ width: sidebarWidth }}
    >
      <div className="mt-4 flex justify-between">
        <h4 className="text-lg font-semibold">식단 목록</h4>
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
      <CDInput
        className="mt-4"
        placeholder="식단 검색"
        endIcon={Icons.search}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <DietMenu
        diets={filteredDiets}
        loading={isLoading}
        isDesktop={isDesktop}
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
