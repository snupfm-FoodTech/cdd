'use client';

import { Spinner } from '@/components/spinner';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';

import {
  useAllergenCheckFood,
  useDiet,
  useDownloadDietExcel,
  useGetDietValue,
  useSaveExcludedAllergen,
  useScrollPage
} from '@/hooks/diet.hook';

import DietDetailHeader from '../../components/detail/diet-detail-header';
import {
  DietSeperateTray,
  DietTemplateTray
} from '../../components/detail/diet-detail-template-tray';
import { useEffect, useState, useTransition } from 'react';
import { ITrayItem } from '@/types/diet.type';
import { convertFoodsToTrayItemArray } from '../../helpers';
import { SeparatedFlag } from '@/types';
import { useRouter } from 'next/navigation';
import DietShowNutrition from '../../components/detail/diet-show-nutrition';
import { MixIcon } from '@radix-ui/react-icons';
import { Download, Plus, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClientFooter from '@/components/layout/client/client-footer';
import { checkTokenExisted } from '@/utils';
import { BASE_PATH } from '@/constants';
import { useMediaQuery } from 'usehooks-ts';
import DietDetailMobileTray from '../../components/detail/diet-detail-mobile-tray';
import Allergens, { EAllergenMode } from '../../components/allergens';
import useWait from '@/hooks/use-wait';

interface DietDetailProps {
  params: {
    dietId: number;
  };
}

const DietDetail = ({ params }: DietDetailProps) => {
  const { data, isPending, error, refetch } = useDiet(params.dietId);
  const { isScroll, setIsScroll } = useScrollPage();
  const { setDietData } = useGetDietValue();

  const [isPendingAll, startTransitionAll] = useTransition();
  const { mutateAsync: mutateAllergenCheckFood } = useAllergenCheckFood();
  const { mutateAsync: mutateDownloadDietExcel, isPending: isDownloadingExcel } =
    useDownloadDietExcel(params.dietId);
  const { mutateAsync: mutateSaveExcludedAllergen } = useSaveExcludedAllergen(
    params.dietId
  );

  const { startWait, cancelWait } = useWait(500);

  const isDesktop = useMediaQuery('(min-width: 1285px)');
  const isShowTray = useMediaQuery('(min-width: 900px)');

  const [listTrayItems, setListTrayItem] = useState<ITrayItem[]>([]);
  const [separateList, setSeparateList] = useState<ITrayItem[]>([]);

  const [previousListTrayItems] = useState<ITrayItem[]>([]);
  const [previousSeparateList] = useState<ITrayItem[]>([]);

  const [allergens, setAllergens] = useState<number[]>(
    Array.isArray(data?.excludedAllergens)
      ? data.excludedAllergens.map((item) => item.id)
      : []
  );

  useEffect(() => {
    if (data?.excludedAllergens && Array.isArray(data.excludedAllergens)) {
      setAllergens(data.excludedAllergens.map((item) => item.id));
    }
    checkTokenExisted(router);

    if (data?.tray?.foods) {
      const trayItems = convertFoodsToTrayItemArray(data.tray.foods);
      const separateItems = trayItems.filter(
        (item) => item.separatedFlag === SeparatedFlag.Yes
      );
      const nonSeparateItems = trayItems.filter(
        (item) => item.separatedFlag !== SeparatedFlag.Yes
      );

      setDietData({ ...data }); // store data DietById
      setListTrayItem(nonSeparateItems);
      setSeparateList(separateItems);
    }

    let timeout: any;
    if (isScroll) {
      window.scrollTo({
        top: 400,
        behavior: 'smooth'
      });

      timeout = setTimeout(() => {
        setIsScroll(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const router = useRouter();

  const goToRoute = (urlLink: string) => {
    router.push(`${DIET_MANAGEMENT_URL}/${urlLink}/${params.dietId}`);
    setIsScroll(false);
  };

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveAllergens = (newAllergens: number[]) => {
    startTransitionAll(async () => {
      try {
        await mutateSaveExcludedAllergen(newAllergens);
        await startWait();
        await refetch();
      } catch (err) {
        return;
      }
    });
  };

  const handleSelectAllergens = (newAllergens: number[]) => {
    if (!data) return;
    if (newAllergens.length === 0) {
      setAllergens(newAllergens);
      return;
    }

    startTransitionAll(async () => {
      try {
        const filteredFoods = data?.tray.foods.filter(
          (food) => food.code && food.code.trim() !== ''
        );
        if (filteredFoods.length === 0) return;
        const foodChecked = await mutateAllergenCheckFood({
          excludedAllergenIds: newAllergens,
          //@ts-ignore
          foods: filteredFoods
        });
        if (foodChecked.length > 0) {
          const checkedCodes = new Set(foodChecked.map((item) => item.code));
          if (checkedCodes && checkedCodes.size > 0) {
            const newTray = listTrayItems.map((food) => {
              if (food.code && checkedCodes.has(food.code)) {
                return { ...food, code: undefined, materials: [] };
              }
              return food;
            });
            const newSeparatedTray = separateList.map((food) => {
              if (food.code && checkedCodes.has(food.code)) {
                return { ...food, code: undefined, materials: [] };
              }
              return food;
            });
            setListTrayItem(newTray);
            setSeparateList(newSeparatedTray);
          }
        }
        setAllergens(newAllergens);
      } catch (err) {
        return;
      }
    });
  };

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <picture>
          <img
            src={`${BASE_PATH}/img/tray-6.png`}
            alt="tray"
            className="h-40 w-40"
          />
        </picture>
        <p className="mt-8 text-xl font-bold">식단 목록이 비어있습니다</p>
      </div>
    );
  }

  const combinedListTrayItems = listTrayItems.concat(separateList);
  const combinedListClassNames = cn('flex items-center mt-4', {
    'w-10/12': combinedListTrayItems.length === 4,
    'w-full': combinedListTrayItems.length > 4,
    'w-9/12': combinedListTrayItems.length <= 3
  });

  return (
    <>
      <div className="bg-gray-100">
        <DietDetailHeader detail={data} />
        <div className="section-padding-sidebar section-padding-y flex w-full flex-col gap-4 rounded-lg bg-gray-100 px-4">
          <DietShowNutrition
            listTrayItems={listTrayItems}
            listSeparateItems={separateList}
            nutrients={data?.standard?.nutrients}
            name={data?.standard?.name}
            tray={data?.tray}
          />
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <h3 className="text-lg font-semibold">식단 미리보기</h3>
              <div className="flex flex-col gap-4 md:flex-row">
                {data.tray.foods.some((item) => item.code?.trim()) && (
                  <button
                    className="flex items-center space-x-2 rounded-md border border-blue-500 bg-white px-4 py-2 font-bold text-primary"
                    onClick={() => goToRoute('calculator')}
                  >
                    <MixIcon className="h-4 w-4" />
                    <span>예상 가격 계산하기</span>
                  </button>
                )}

                {/* <Popover open={isScroll}>
                  <PopoverTrigger asChild className="cursor-default opacity-0">
                    <Button variant="outline" />
                  </PopoverTrigger>
                  <PopoverContent className="flex w-fit justify-between bg-gray-500 text-white">
                    <span>여기를 클릭하여 음식을 추가하세요</span>
                    <X
                      className="ml-4 w-fit cursor-pointer"
                      onClick={() => setIsScroll(false)}
                      size={20}
                    />
                  </PopoverContent>
                </Popover> */}

                <button
                  className="flex w-fit items-center space-x-2 rounded-md bg-primary px-4 py-2 text-white"
                  onClick={() => goToRoute('diet-details')}
                >
                  <Utensils className="h-4 w-4" />
                  <span>식단 상세</span>
                </button>
                  
                <button
                  className="flex items-center space-x-2 rounded-md border border-primary bg-white px-4 py-2 font-bold text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => mutateDownloadDietExcel()}
                  disabled={isDownloadingExcel}
                >
                  <Download className="h-4 w-4" />
                  <span>{isDownloadingExcel ? '다운로드 중...' : '엑셀 다운로드'}</span>
                </button>
              </div>
            </div>
            <div className="my-2">
              <Allergens
                loading={isPendingAll}
                reset={false}
                mode={EAllergenMode.Edit}
                defaultValue={allergens}
                onSave={handleSaveAllergens}
                onSelect={handleSelectAllergens}
                onCancel={() => {
                  setAllergens(
                    Array.isArray(data?.excludedAllergens)
                      ? data.excludedAllergens.map((item) => item.id)
                      : []
                  );

                  if (data?.tray?.foods) {
                    const trayItems = convertFoodsToTrayItemArray(
                      data.tray.foods
                    );
                    const separateItems = trayItems.filter(
                      (item) => item.separatedFlag === SeparatedFlag.Yes
                    );
                    const nonSeparateItems = trayItems.filter(
                      (item) => item.separatedFlag !== SeparatedFlag.Yes
                    );

                    setDietData({ ...data }); // store data DietById
                    setListTrayItem(nonSeparateItems);
                    setSeparateList(separateItems);
                  }
                }}
              />
            </div>
            {isShowTray ? (
              <div className="flex items-center justify-center">
                <div className={combinedListClassNames}>
                  <DietTemplateTray
                    total={listTrayItems.length}
                    listItems={listTrayItems}
                  />
                  {separateList.length > 0 && <div className="w-4" />}
                  <DietSeperateTray listSeperate={separateList} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <DietDetailMobileTray trayItems={listTrayItems} />
                {separateList.length > 0 && (
                  <>
                    <div className="flex w-full items-center justify-center">
                      <Plus className="h-6 w-6 font-bold" />
                    </div>
                    <DietDetailMobileTray trayItems={separateList} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={cn('bg-gray-600', !isDesktop && 'pb-[90px]')}>
          <ClientFooter />
        </div>
      </div>
    </>
  );
};

export default DietDetail;
