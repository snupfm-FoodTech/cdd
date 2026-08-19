'use client';

import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { ScrollAreaMenu } from '@/components/ui/scroll-area-menu';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { useDeleteDiet, useUpdateFavorite } from '@/hooks/diet.hook';
import { FavouriteFlag } from '@/types';
import { Diet } from '@/types/diet.type';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
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
}

const DietMenu = ({
  diets,
  loading,
  isDesktop = true,
  onUpdateItem,
  onDeleteItem,
  onDetailItem
}: DietMenuProps) => {
  const router = useRouter();

  const [selectedId, setSelectedId] = useState<number>(0);

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
      <ScrollAreaMenu className="h-[calc(100vh-13rem)]">
        <div className="mr-3 h-full space-y-4">
          {favouriteDiets.length > 0 && (
            <div>
              <DividerWithText text="즐겨찾기" />
              <div className="space-y-2">
                {loading ? (
                  <DietItemSkeleton count={2} />
                ) : (
                  renderDietItems(favouriteDiets, true)
                )}
              </div>
            </div>
          )}
          {normalDiets.length > 0 && (
            <div>
              <DividerWithText text="대상자 목록" />
              <div className="space-y-2 pb-4">
                {loading ? (
                  <DietItemSkeleton count={2} />
                ) : (
                  renderDietItems(normalDiets, false)
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollAreaMenu>
    </>
  );
};

export default DietMenu;
