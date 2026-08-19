'use client';

import NumberInputInteger from '@/components/number-input-integer';
import { useEffect, useMemo, useState } from 'react';
import CalculatorTable from '../components/calculator-table';
import { ICalculationItem, ReceiptIncludedFlag } from '@/types/calculator.type';
import {
  useAddPrices,
  useCheckErrorAccessoryName,
  useDiet,
  useResetCalculatorTable
} from '@/hooks/diet.hook';
import { Material } from '@/types/food.type';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/spinner';
import { checkTokenExisted, formatNumber } from '@/utils';
import { useRouter } from 'next/navigation';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { AlertModal } from '@/components/modal/alert-modal';
import { toast } from '@/hooks/use-toast';
import { BASE_PATH } from '@/constants';
import { useIsMounted, useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { useWindowScroll } from 'react-use';

interface CalculatorProps {
  params: {
    dietId: number;
  };
}

const Calculator = ({ params }: CalculatorProps) => {
  const isMounted = useIsMounted();
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { data: dietData } = useDiet(params.dietId);
  const { isReset, setIsReset } = useResetCalculatorTable();
  const { setIsError } = useCheckErrorAccessoryName();
  const { mutateAsync: mutateAddPrice, isPending } = useAddPrices();
  const router = useRouter();

  const { y: scrollY } = useWindowScroll();
  const shouldShowFixedPrice = isMobile && scrollY > 80;
  const shouldShowBtn = isMobile && scrollY > 50;

  const [servings, setServings] = useState(
    (dietData && dietData.servingQuantity) || 1
  );
  const [percentTax, setPercentTax] = useState(
    (dietData && dietData.adjustmentPercent) || 1
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [calculationData, setCalculationData] = useState<ICalculationItem[]>(
    []
  );
  const [listSelectedRow, setListSelectedRow] = useState<ICalculationItem[]>(
    []
  );
  const [showAlertReset, setShowAlertReset] = useState(false);

  useEffect(() => {
    checkTokenExisted(router);

    let total = 0;
    listSelectedRow.forEach((item) => {
      if (item.sequence === 0 && item.price) {
        total += item.price;
      } else {
        item.price
          ? (total += (item.recipeWeight / 1000) * item.price)
          : (total += 0);
      }
    });

    setTotalPrice(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSelectedRow]);

  const calculateFinalPrice = useMemo(
    () => servings * totalPrice + (servings * totalPrice * percentTax) / 100,
    [servings, percentTax, totalPrice]
  );

  useEffect(() => {
    const DEFAULT_TABLE_ITEM = {
      sequence: 0,
      typeName: '',
      typeCode: '',
      calculationWeight: 0,
      name: '',
      code: '',
      originalCode: '',
      recipeWeight: 0,
      unitCode: '',
      unitName: '',
      price: 0,
      receiptIncludeFlag: ReceiptIncludedFlag.Yes
    };

    const dataTable: ICalculationItem[] = [];
    // add accessory

    dataTable.push({
      ...DEFAULT_TABLE_ITEM,
      sequence: 0,
      name: '기타 부자재',
      receiptIncludeFlag:
        (dietData && dietData.accessories[0]?.receiptIncludeFlag) ??
        ReceiptIncludedFlag.Yes,
      typeCode: 'Y' // the flag for distinguishing between 2 rows
    });
    dataTable.push({
      ...DEFAULT_TABLE_ITEM,
      sequence: 0,
      receiptIncludeFlag:
        (dietData && dietData.accessories[0]?.receiptIncludeFlag) ??
        ReceiptIncludedFlag.Yes,
      price: (dietData && dietData.accessories[0]?.price) ?? 0,
      code: '2',
      name: (dietData && dietData.accessories[0]?.name) ?? ''
    });

    // add food data for calculating
    dietData &&
      dietData.tray.foods.forEach((itemFood) => {
        let tableItem: ICalculationItem = { ...DEFAULT_TABLE_ITEM };

        tableItem.sequence = itemFood.sequence;
        tableItem.name = itemFood.name;
        tableItem.typeCode = itemFood.typeCode;
        tableItem.receiptIncludeFlag = itemFood.materials.some(
          (itemMaterial) =>
            itemMaterial.receiptIncludeFlag === ReceiptIncludedFlag.Yes
        )
          ? ReceiptIncludedFlag.Yes
          : ReceiptIncludedFlag.No;

        dataTable.push(tableItem);

        if (itemFood.materials.length > 0) {
          itemFood.materials.forEach((itemMaterial: Material) => {
            tableItem = {
              sequence: tableItem.sequence,
              typeCode: '',
              ...itemMaterial
            };

            dataTable.push(tableItem);
          });
        }
      });

    setListSelectedRow(
      dataTable.filter(
        (item) => item.receiptIncludeFlag === ReceiptIncludedFlag.Yes
      )
    );

    const filteredData = dataTable.filter(
      (item) => item.sequence === 0 || !!item.name?.trim()
    );
    setCalculationData(filteredData);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dietData, isReset]);

  const handleSetTableData = () => {
    setCalculationData([...calculationData]);
  };

  const handleSubmitCalculate = async () => {
    // find item accessory
    const itemAccessory = calculationData.find(
      (item) => !item.sequence && !item.typeCode
    );

    if (
      itemAccessory &&
      itemAccessory.receiptIncludeFlag === ReceiptIncludedFlag.Yes &&
      !itemAccessory.name
    ) {
      setIsError(true);
    } else {
      setIsError(false);
      if (dietData && itemAccessory) {
        dietData.accessories[0] = {
          name: itemAccessory.name,
          price: itemAccessory.price || 0,
          sequence: itemAccessory.sequence,
          receiptIncludeFlag:
            itemAccessory.receiptIncludeFlag ?? ReceiptIncludedFlag.No
        };
        dietData.adjustmentPercent = percentTax;
        dietData.servingQuantity = servings;
        const listFoods = dietData.tray.foods;

        let startPoint = 2;
        for (let i = 0; i < listFoods.length; i++) {
          let dadIdx = 0;

          for (let j = startPoint; j < calculationData.length; j++) {
            if (calculationData[j].typeCode) {
              dadIdx = i;
            } else {
              listFoods[dadIdx].materials.forEach((itemMaterial) => {
                itemMaterial.receiptIncludeFlag =
                  calculationData[j].receiptIncludeFlag;
                itemMaterial.price = calculationData[j].price;
                j++;
              });

              startPoint = j;
              break;
            }
          }
        }

        await mutateAddPrice({
          servingQuantity: dietData.servingQuantity,
          adjustmentPercent: dietData.adjustmentPercent,
          accessories: dietData.accessories,
          id: dietData.id,
          foods: dietData.tray.foods,
          unitPrice: totalPrice,
          finalPrice: calculateFinalPrice
        }).then(() => {
          router.back();
        });
      }
    }
  };

  const handleReset = () => {
    setIsReset();
    setIsError(false);
    setShowAlertReset(false);
    toast({
      title: '성공적으로 재설정되었습니다',
      variant: 'success'
    });
  };

  if (!isMounted()) return;

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  const bottomActionClass = shouldShowBtn
    ? 'fixed left-0 right-0 top-[4rem] z-[11] mt-0 justify-end bg-white px-4 py-2 shadow-md'
    : 'mt-4 justify-center';

  return (
    <div>
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-diet-manage.png`}
        title={dietData?.name || ''}
        breadcrumbs={[
          { label: '식단 관리', url: DIET_MANAGEMENT_URL },
          {
            label: dietData?.name || '',
            url: `${DIET_MANAGEMENT_URL}/${params.dietId}`
          },
          { label: '음식 계산기' }
        ]}
      />
      {shouldShowFixedPrice && (
        <div className="fixed top-[120px] z-30 flex w-full items-center justify-between bg-white px-4 py-2 shadow-md md:hidden">
          <span className="text-sm">인분 예상 가격</span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold">
              {formatNumber(totalPrice)}
            </span>
            <span className="font-bold">￦</span>
          </div>
        </div>
      )}
      <div className="section-padding section-padding-y flex w-full justify-center">
        <div className="calculator flex w-full flex-col md:w-4/5">
          <div className="mb-4 flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <span className="text-sm font-semibold md:text-lg">
              {dietData?.standard.name}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm md:text-base">인분 예상 가격</span>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold md:text-2xl">
                  {formatNumber(totalPrice)}
                </span>
                <span className="font-bold">￦</span>
              </div>
            </div>
          </div>
          <div className="mb-4 flex w-full flex-col items-start justify-between gap-4 rounded-xl bg-secondary p-4 md:flex-row md:items-center">
            <span className="text-sm md:text-base">대량조리 예상 가격</span>
            <div className="flex w-fit items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2">
                <NumberInputInteger
                  className="w-fit md:w-24"
                  maxLength={4}
                  value={servings}
                  min={1}
                  onChange={(value) => {
                    if (isMobile) return;
                    setServings(value);
                  }}
                  onBlur={(value) => {
                    if (!isMobile) return;
                    setServings(value);
                  }}
                />
                <span>인분</span>
              </div>
              <div className="flex items-center gap-2">
                <NumberInputInteger
                  className="w-fit md:w-16"
                  maxLength={3}
                  value={percentTax}
                  min={1}
                  onChange={(value) => {
                    if (isMobile) return;
                    setPercentTax(value);
                  }}
                  onBlur={(value) => {
                    if (!isMobile) return;
                    setPercentTax(value);
                  }}
                />
                <span>% 폐기율</span>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-base font-bold md:text-xl">
                  {formatNumber(calculateFinalPrice)}
                </span>
                <span className="font-bold">￦</span>
              </div>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-base font-bold md:text-xl">
                {formatNumber(calculateFinalPrice)}
              </span>
              <span className="font-bold">￦</span>
            </div>
          </div>

          <CalculatorTable
            setListSelectedRow={setListSelectedRow}
            calculatorTableData={calculationData}
            allUpdateChanges={handleSetTableData}
          />

          <div className={cn('flex gap-4', bottomActionClass)}>
            <Button
              className="w-fit rounded-lg md:w-36"
              onClick={handleSubmitCalculate}
            >
              실제 구매가 저장
            </Button>
            <Button
              className="w-fit rounded-lg md:w-36"
              variant="outline"
              onClick={() => setShowAlertReset(true)}
            >
              초기화
            </Button>
          </div>
        </div>
      </div>

      <AlertModal
        title="예상 가격 계산 내용을 초기화 하시겠습니까?"
        description=""
        isOpen={showAlertReset}
        loading={false}
        onClose={() => setShowAlertReset(false)}
        onConfirm={handleReset}
        confirmText="예"
        closeText="아니오"
      />
    </div>
  );
};

export default Calculator;
