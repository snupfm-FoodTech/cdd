'use client';

import { useDiets } from '@/hooks/diet.hook';
import { Spinner } from '@/components/spinner';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { FavouriteFlag } from '@/types';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { BASE_PATH } from '@/constants';

const DietManagement = () => {
  const { data: diets, isPending: isPendingDiets } = useDiets();
  const [emptyLayout, setEmptyLayout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (diets && !isEmpty(diets)) {
      const dietSelected = diets.find(
        (item) => item.favouriteFlag === FavouriteFlag.Yes
      );

      dietSelected
        ? router.replace(`${DIET_MANAGEMENT_URL}/${dietSelected.id}`)
        : router.replace(`${DIET_MANAGEMENT_URL}/${diets[0].id}`);
    } else {
      setEmptyLayout(true);
      router.push(DIET_MANAGEMENT_URL);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diets]);

  if (isPendingDiets) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      {emptyLayout && (
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
      )}
    </>
  );
};

export default DietManagement;
