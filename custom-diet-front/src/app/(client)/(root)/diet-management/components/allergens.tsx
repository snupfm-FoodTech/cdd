'use client';

import { useDietAllergens } from '@/hooks/diet.hook';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorMessage } from '@/components/ui/error-message';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import AllergenDialogContent from './allergen-dialog-content'; // Bạn cần tạo thêm file này
import { useIsMobile } from '@/hooks/use-is-mobile';
import { cn } from '@/lib/utils';
import isEqual from 'lodash/isEqual';

export enum EAllergenMode {
  Edit = 'Edit',
  View = 'View'
}

enum ELocalMode {
  Edit = 'Update',
  View = 'Viewing'
}

interface AllergensProps {
  defaultValue: number[]; // List of selected allergen IDs
  onSelect: (ids: number[]) => void;
  onReset?: () => void;
  onCancel?: () => void;
  onSave?: (ids: number[]) => void;
  mode?: EAllergenMode;
  reset?: boolean;
  loading?: boolean;
}

const Allergens: FC<AllergensProps> = ({
  defaultValue = [],
  onSelect,
  mode = EAllergenMode.View,
  reset = true,
  onReset,
  onCancel,
  onSave,
  loading = false
}) => {
  const { isLoading, data, isError, isSuccess } = useDietAllergens();
  const [selectedIds, setSelectedIds] = useState<number[]>(defaultValue);
  const isMobile = useIsMobile();
  const [openDialog, setOpenDialog] = useState(false);
  const [localMode, setLocalMode] = useState<ELocalMode>(ELocalMode.View);
  const sortedRef = useRef<typeof data>([]);
  const [isSortedReady, setIsSortedReady] = useState(false);

  useEffect(() => {
    if (!isEqual(selectedIds, defaultValue)) {
      setSelectedIds(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (isSuccess && data && sortedRef.current?.length === 0) {
      sortedRef.current = [...data].sort((a, b) => {
        const aSelected = defaultValue.includes(a.id);
        const bSelected = defaultValue.includes(b.id);
        if (aSelected === bSelected) return 0;
        return aSelected ? -1 : 1;
      });
      setIsSortedReady(true);
    }
  }, [isSuccess, data, defaultValue]);

  if (process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false') return null;

  const handleToggle = (id: number) => {
    const newIds = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    setSelectedIds(newIds);
    onSelect?.(newIds);
  };

  const renderAllergenTags = () => {
    if (!isSortedReady || !sortedRef.current) return null;

    const visibleCount = 8;
    const visible = sortedRef.current.slice(0, visibleCount);
    const hiddenItems = sortedRef.current.slice(visibleCount);
    const hiddenCount = sortedRef.current.length - visible.length;

    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {visible.map((item) => {
          const isActive = selectedIds.includes(item.id);
          return (
            <Badge
              key={item.id}
              variant="outline"
              className={cn(
                'cursor-pointer bg-background text-sm',
                isActive &&
                  'border-transparent bg-primary text-primary-foreground hover:bg-primary/80'
              )}
              onClick={() => {
                if (
                  mode === EAllergenMode.View ||
                  localMode === ELocalMode.Edit
                ) {
                  handleToggle(item.id);
                }
              }}
            >
              {item.name}
            </Badge>
          );
        })}
        {hiddenCount > 0 && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                variant={isMobile ? 'outline' : 'ghost'}
                size="icon"
                className="h-6 w-10 rounded-full md:h-6 md:w-6"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md">
              <AllergenDialogContent
                onClose={() => setOpenDialog(false)}
                data={hiddenItems}
                selectedIds={selectedIds}
                onChange={(ids) => {
                  if (
                    mode === EAllergenMode.View ||
                    localMode === ELocalMode.Edit
                  ) {
                    setSelectedIds(ids);
                    onSelect?.(ids);
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="gap flex flex-col gap-0 md:gap-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <p className="font-medium text-muted-foreground">
              알레르기 유발물질 제외
            </p>
            <p className="text-xs text-muted-foreground md:text-sm">
              선택됨:{' '}
              <span className="font-semibold text-primary">
                {selectedIds.length}
              </span>{' '}
              / {data?.length}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {reset && (
              <div
                className="cursor-pointer text-sm text-primary"
                onClick={onReset}
              >
                초기화
              </div>
            )}
          </div>
        </div>
        {mode === EAllergenMode.Edit && (
          <div className="flex gap-2 md:gap-4">
            {localMode === ELocalMode.View && (
              <Button
                type="button"
                size="sm"
                onClick={() => setLocalMode(ELocalMode.Edit)}
              >
                편집
              </Button>
            )}
            {localMode === ELocalMode.Edit && (
              <>
                <Button
                  type="button"
                  loading={loading}
                  size="sm"
                  onClick={() => {
                    onSave && onSave(selectedIds);
                    // setLocalMode(ELocalMode.Edit);
                  }}
                >
                  저장
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    onCancel && onCancel();
                    setLocalMode(ELocalMode.View);
                  }}
                >
                  취소
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      {isError && <ErrorMessage />}
      {isLoading || !data ? (
        <Skeleton className="h-12 w-full" />
      ) : (
        renderAllergenTags()
      )}
    </div>
  );
};

export default Allergens;
