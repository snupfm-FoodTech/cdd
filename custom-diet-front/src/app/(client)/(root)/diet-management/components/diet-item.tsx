'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  DIET_MANAGEMENT_UPDATE_URL,
  DIET_MANAGEMENT_URL
} from '@/constants/routes';
import { cn } from '@/lib/utils';
import { FavouriteFlag } from '@/types';
import { Diet } from '@/types/diet.type';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { MoreHorizontal, Star, Trash2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface DietItemProps {
  isFavorite: boolean;
  diet: Diet;
  onDelete: (id: number) => void;
  onFavorite: (id: number, favorite: string) => void;
  onUpdate?: () => void;
  onDetail?: () => void;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (id: number) => void;
}

const DietItem = ({
  isFavorite,
  diet,
  onDelete,
  onFavorite,
  onUpdate,
  onDetail,
  selectable = false,
  selected = false,
  onToggleSelect
}: DietItemProps) => {
  const path = usePathname();
  const router = useRouter();

  const pathId = path.split('/').pop();
  const isSelected = diet.id.toString() === pathId;

  const handleClick = () => {
    if (selectable) {
      onToggleSelect && onToggleSelect(diet.id);
      return;
    }
    router.push(`${DIET_MANAGEMENT_URL}/${diet.id}`);
    onDetail && onDetail();
  };

  const handleToggleSelect = (event: React.MouseEvent | React.ChangeEvent) => {
    event.stopPropagation();
    onToggleSelect && onToggleSelect(diet.id);
  };

  const goToUpdate = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    router.push(`${DIET_MANAGEMENT_UPDATE_URL}/${diet?.id}`);
    onUpdate && onUpdate();
  };

  const handleDelete = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onDelete(diet.id);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'flex h-10 w-full cursor-pointer items-center justify-between rounded-lg p-4 pr-2 text-foreground transition-colors hover:rounded-lg hover:bg-secondary',
        isSelected &&
          !selectable &&
          'rounded-lg bg-primary text-white hover:bg-primary hover:text-white',
        selectable &&
          selected &&
          'rounded-lg bg-secondary text-foreground'
      )}
    >
      <div className="flex items-center gap-2">
        {selectable && (
          <input
            type="checkbox"
            checked={selected}
            onChange={handleToggleSelect}
            onClick={(e) => e.stopPropagation()}
            className="h-4 w-4 shrink-0 accent-primary"
          />
        )}
        {isFavorite && (
          <Star fill="#ffc30f" color="#ffc30f" className="h-4 w-4" />
        )}
        <p
          className={cn(
            'w-full truncate text-left text-sm font-semibold md:w-56'
          )}
        >
          {diet.name}
        </p>
      </div>
      {!selectable && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn('rounded-l-none')}
            >
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>행위</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(event) => {
                event.stopPropagation();
                const favorite: string = isFavorite
                  ? FavouriteFlag.No
                  : FavouriteFlag.Yes;
                onFavorite(diet.id, favorite);
              }}
            >
              <Star
                className="mr-2 h-4 w-4"
                fill={!isFavorite ? '#ffc30f' : '#cccccc'}
                color={!isFavorite ? '#ffc30f' : '#cccccc'}
              />
              {isFavorite ? '즐겨찾기 해제' : '즐겨찾기에 추가'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={goToUpdate}>
              <Pencil1Icon className="mr-2 h-4 w-4 text-primary" /> 수정
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4 text-destructive" /> 삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default DietItem;
