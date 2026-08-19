import { BASE_PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { ITrayItem } from '@/types/diet.type';
import { Food } from '@/types/food.type';
import Image from 'next/image';
import { FC } from 'react';

interface DietTemplateMobileTrayProps {
  list: ITrayItem[];
  onClick: (trayItem: ITrayItem) => void;
}

interface DietTemplateMobileTrayItemProps {
  trayItem: ITrayItem;
  isLast?: boolean;
  onClick: (trayItem: ITrayItem) => void;
}

interface DietTemplateMobileTrayItemSelectedProps {
  tray: ITrayItem;
  onBack: () => void;
}

const DietTemplateMobileTrayItem: FC<DietTemplateMobileTrayItemProps> = ({
  trayItem,
  isLast = false,
  onClick
}) => {
  const isEmptyFood = !trayItem.code;

  return (
    <div className="flex cursor-pointer flex-col gap-3">
      <div className={cn('flex items-start gap-3 py-3', !isLast && '')}>
        <div className="shrink-0">
          <Image
            src={`${BASE_PATH}/img/${trayItem.typeCode}.png`}
            alt={`image-tray-${trayItem.typeCode}`}
            width={32}
            height={32}
            className={cn(
              'rounded bg-gray-100 p-1',
              isEmptyFood && 'opacity-50 grayscale'
            )}
          />
        </div>
        <div className="flex-1 text-sm">
          <p
            className={cn(
              'truncate font-medium',
              isEmptyFood ? 'italic text-destructive' : 'text-gray-900'
            )}
          >
            {isEmptyFood ? '빈 음식' : trayItem.name}
          </p>
          <p className="text-xs text-gray-500">{trayItem.typeName}</p>
          <p className="text-xs text-gray-500">{trayItem.capacityVolume} ml</p>
        </div>
        <div className="flex justify-end px-1">
          <Button
            type="button"
            size="sm"
            className="rounded-md px-4 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onClick(trayItem);
            }}
          >
            선택
          </Button>
        </div>
      </div>
    </div>
  );
};

export const DietTemplateMobileTray: FC<DietTemplateMobileTrayProps> = ({
  list,
  onClick
}) => {
  return (
    <div className="divide-y rounded-md border bg-white p-4 shadow-sm">
      {list.map((item, index) => (
        <DietTemplateMobileTrayItem
          onClick={onClick}
          key={item.sequence}
          trayItem={item}
          isLast={index === list.length - 1}
        />
      ))}
    </div>
  );
};

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DietTemplateMobileTrayItemSelected: FC<
  DietTemplateMobileTrayItemSelectedProps
> = ({ tray, onBack }) => {
  const isEmptyFood = !tray.name;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="font-semibold text-primary">선택 중입니다</div>
      <div className="flex w-full flex-col gap-3 rounded-xl border-2 border-primary bg-primary/5 shadow-sm transition-all duration-200">
        <div className="flex items-start gap-3 px-4 py-3">
          <div className="relative shrink-0">
            <Image
              src={`${BASE_PATH}/img/${tray.typeCode}.png`}
              alt={`image-tray-${tray.typeCode}`}
              width={40}
              height={40}
              className={cn(
                'rounded-lg bg-white p-1 shadow-md ring-1 ring-primary',
                isEmptyFood && 'opacity-50 grayscale'
              )}
            />
            {/* Lucide Check Icon */}
            <div className="absolute -right-1.5 -top-1.5 rounded-full bg-primary p-1 shadow">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="flex-1 text-sm">
            <p
              className={cn(
                'font-semibold text-primary',
                isEmptyFood && 'italic text-gray-400'
              )}
            >
              {tray.name || '빈 음식'}
            </p>
            <p className="text-xs text-gray-500">{tray.typeName}</p>
            <p className="text-xs text-gray-500">{tray.capacityVolume} ml</p>
          </div>

          <div className="flex justify-end px-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-md px-4 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
            >
              목록으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DietTemplateMobileTrayItemSmallSelected: FC<
  DietTemplateMobileTrayItemSelectedProps
> = ({ tray, onBack }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-3 rounded-xl border-2 border-primary bg-primary/5 shadow-sm transition-all duration-200">
        <div className="flex items-start gap-3 px-4 py-3">
          <div className="relative shrink-0">
            <Image
              src={`${BASE_PATH}/img/${tray.typeCode}.png`}
              alt={`image-tray-${tray.typeCode}`}
              width={40}
              height={40}
              className="rounded-lg bg-white p-1 shadow-md ring-1 ring-primary"
            />
            {/* Lucide Check Icon */}
            <div className="absolute -right-1.5 -top-1.5 rounded-full bg-primary p-1 shadow">
              <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="flex-1 text-sm">
            <p className="font-semibold text-primary">
              {tray.name || '빈 음식'}
            </p>
            <p className="text-xs text-gray-500">{tray.typeName}</p>
          </div>

          <div className="flex justify-end px-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-md px-4 text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
            >
              목록으로
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
