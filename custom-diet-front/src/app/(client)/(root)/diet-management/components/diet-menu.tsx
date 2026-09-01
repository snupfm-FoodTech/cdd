'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { ScrollAreaMenu } from '@/components/ui/scroll-area-menu';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { useDeleteDiet, useUpdateFavorite } from '@/hooks/diet.hook';
import { FavouriteFlag } from '@/types';
import { Diet, DietGroupBy } from '@/types/diet.type';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import DietCopyDialog from './diet-copy-dialog';
import DietItem from './diet-item';
import DietItemSkeleton from './diet-item-skeleton';
import { checkTokenExisted } from '@/utils';

const DividerWithText = ({ text }: { text: string }) => {
  return (
    <div className="relative my-2 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-500"></div>
      </div>
      <div className="relative flex w-40 items-center justify-center bg-white px-3">
        <span className="font-semibold text-foreground">{text}</span>
      </div>
    </div>
  );
};

interface DietMenuProps {
  diets: Diet[];
  loading: boolean;
  isDesktop?: boolean;
  onUpdateItem?: () => void;
  onDeleteItem?: () => void;
  onDetailItem?: () => void;
  selectable?: boolean;
  selectedIds?: number[];
  onToggleSelect?: (id: number) => void;
  groupBy?: DietGroupBy;
  /** 검색 중에는 접힌 그룹도 펼쳐서, 결과가 접힌 채 숨는 일이 없게 한다 */
  forceExpand?: boolean;
}

const NO_STANDARD = '유형 미지정';
const NO_TRAY = '구성 미지정';

/** 최근에 손댄 식단이 위로. updatedAt 이 없으면 뒤로 민다. */
const byRecent = (a: Diet, b: Diet) =>
  (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '');

const DietMenu = ({
  diets,
  loading,
  isDesktop = true,
  onUpdateItem,
  onDeleteItem,
  onDetailItem,
  selectable = false,
  selectedIds = [],
  onToggleSelect,
  groupBy = 'standard',
  forceExpand = false
}: DietMenuProps) => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number>(0);
  /** 복사 대상. 다이얼로그는 목록이 들고 있어야 항목이 다시 그려져도 유지된다. */
  const [copyTarget, setCopyTarget] = useState<Diet | null>(null);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);

  const toggleGroup = (key: string) =>
    setCollapsedGroups((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );

  const selectedDiet = useMemo(() => {
    if (!diets) return undefined;
    return diets.find((diet) => diet.id === selectedId);
  }, [diets, selectedId]);

  const { favouriteDiets, normalDiets } = useMemo(() => {
    const safeDiets = diets ?? [];
    return {
      favouriteDiets: safeDiets.filter(
        (diet) => diet.favouriteFlag === FavouriteFlag.Yes
      ),
      normalDiets: safeDiets.filter(
        (diet) => diet.favouriteFlag === FavouriteFlag.No
      )
    };
  }, [diets]);

  // 그룹은 식단 수가 많은 순으로 세운다. 같으면 이름순(한글 정렬).
  const groups = useMemo(() => {
    if (groupBy === 'recent') {
      return [{ key: 'recent', label: '', items: [...normalDiets].sort(byRecent) }];
    }

    const keyOf = (diet: Diet) =>
      groupBy === 'standard'
        ? diet.standardName || NO_STANDARD
        : diet.trayName || NO_TRAY;

    const buckets = new Map<string, Diet[]>();
    normalDiets.forEach((diet) => {
      const key = keyOf(diet);
      buckets.set(key, [...(buckets.get(key) ?? []), diet]);
    });

    return Array.from(buckets.entries())
      .map(([label, items]) => ({
        key: label,
        label,
        items: [...items].sort(byRecent)
      }))
      .sort(
        (a, b) =>
          b.items.length - a.items.length || a.label.localeCompare(b.label, 'ko')
      );
  }, [normalDiets, groupBy]);

  const renderDietItems = (diets: Diet[], isFavorite: boolean) => {
    return diets.map((diet) => {
      return (
        <DietItem
          onUpdate={() => {
            onUpdateItem && onUpdateItem();
          }}
          key={diet.id}
          isFavorite={isFavorite}
          diet={diet}
          onDelete={(id: number) => {
            setShowAlert(true);
            setSelectedId(id);
          }}
          onDetail={() => {
            onDetailItem && onDetailItem();
          }}
          onFavorite={handleFavorite}
          onCopy={setCopyTarget}
          selectable={selectable}
          selected={selectedIds.includes(diet.id)}
          onToggleSelect={onToggleSelect}
        />
      );
    });
  };

  const { isPending: isPendingDelete, mutateAsync: mutateAsyncDelete } =
    useDeleteDiet();
  const { isPending: isPendingFavorite, mutateAsync: mutateAsyncFavorite } =
    useUpdateFavorite();
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClose = () => setShowAlert(false);

  const handleAlertConfirm = () => {
    if (checkTokenExisted(router)) {
      mutateAsyncDelete(selectedId).then(() => {
        handleAlertClose();
        router.push(DIET_MANAGEMENT_URL);
        onDeleteItem && onDeleteItem();
      });
    }
  };

  const handleFavorite = (id: number, favorite: string) => {
    if (checkTokenExisted(router)) {
      mutateAsyncFavorite({ dietId: id, favorite });
      router.push(`${DIET_MANAGEMENT_URL}/${id}`);
    }
  };

  const renderAlertModal = () => {
    if (!selectedDiet) return null;
    let title = `${selectedDiet.name}을 삭제 하시겠습니까?`;
    let description = '삭제 시 복구할 수 없습니다.';

    return (
      <AlertModal
        title={title}
        description={description}
        isOpen={showAlert}
        onClose={handleAlertClose}
        loading={isPendingDelete}
        onConfirm={handleAlertConfirm}
      />
    );
  };

  if (isPendingDelete || isPendingFavorite) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      {renderAlertModal()}
      <DietCopyDialog
        dietId={copyTarget?.id}
        dietName={copyTarget?.name}
        open={copyTarget !== null}
        onOpenChange={(open) => !open && setCopyTarget(null)}
        onCopied={() => onUpdateItem && onUpdateItem()}
      />
      <ScrollAreaMenu className="h-[calc(100vh-13rem)]">
        <div className="mr-3 h-full space-y-4">
          {favouriteDiets.length > 0 && (
            <div>
              <DividerWithText text="즐겨찾기 식단" />
              <div className="space-y-2">
                {loading ? (
                  <DietItemSkeleton count={2} />
                ) : (
                  renderDietItems(favouriteDiets, true)
                )}
              </div>
            </div>
          )}
          {loading && normalDiets.length === 0 && (
            <div className="space-y-2 pb-4">
              <DietItemSkeleton count={2} />
            </div>
          )}

          {!loading &&
            normalDiets.length > 0 &&
            groups.map((group) => {
              // 'recent' 는 묶지 않고 한 줄로 이어 보여준다
              if (!group.label) {
                return (
                  <div key={group.key} className="space-y-2 pb-4">
                    {renderDietItems(group.items, false)}
                  </div>
                );
              }

              const isCollapsed =
                !forceExpand && collapsedGroups.includes(group.key);

              return (
                <div key={group.key}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.key)}
                    aria-expanded={!isCollapsed}
                    className="flex w-full items-center gap-2 rounded-md px-1 py-2 text-left transition-colors hover:bg-muted"
                  >
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        isCollapsed ? '-rotate-90' : ''
                      }`}
                      aria-hidden
                    />
                    <span
                      className="min-w-0 flex-1 truncate font-semibold text-foreground"
                      title={group.label}
                    >
                      {group.label}
                    </span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold tabular-nums text-muted-foreground">
                      {group.items.length}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="space-y-2 pb-2">
                      {renderDietItems(group.items, false)}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </ScrollAreaMenu>
    </>
  );
};

export default DietMenu;
