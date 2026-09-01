'use client';

import ClientFooter from '@/components/layout/client/client-footer';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import NotFoundData from '@/components/ui/not-found-data';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import {
  useAddRecommendFoods,
  useDiet,
  useScrollPage,
  useUpdateDiet
} from '@/hooks/diet.hook';
import { IDietDetail, IUpdateDietParams } from '@/types/diet.type';
import { Nutrient } from '@/types/nutrient.type';
import { checkTokenExisted } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DietInfo from '../../../components/diet-info';
import DietPlan from '../../../components/diet-plan';
import NutrientStandard from '../../../components/nutrient-standard';
import { convertToNutrients } from '../../../helpers';
import { BASE_PATH } from '@/constants';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';
import { useWindowScroll } from 'react-use';
import Allergens from '../../../components/allergens';
import ClientHeaderDetail from '@/components/layout/client/client-header-detail';

interface DietDetailProps {
  params: {
    dietId: number;
  };
}

const dietFormSchema = z.object({
  dietName: z.string().trim().min(1, {
    message: '필수 입력 항목입니다'
  }),
  // 생성 화면과 같이 선택 입력
  dietDescription: z.string().trim().optional(),
  tray: z
    .object({
      id: z.number(),
      name: z.string(),
      mandatoryFlag: z.string(),
      representativeTrayCode: z.string(),
      foods: z.array(
        z
          .object({
            capacityVolume: z.number(),
            typeCode: z.string(),
            mandatoryFlag: z.string(),
            separatedFlag: z.string()
          })
          .passthrough()
      )
    })
    .passthrough(),
  trayCode: z.number({ message: '필수 입력 항목입니다' }),
  nutrientTemplateCode: z.string(),
  nutrientTemplate: z
    .object({
      code: z.string(),
      name: z.string(),
      typeName: z.string().optional(),
      typeCode: z.string().optional(),
      nutrients: z.array(
        z
          .object({
            code: z.string(),
            name: z.string(),
            unitCode: z.string(),
            unitName: z.string().optional(),
            mandatoryFlag: z.string(),
            weightFrom: z.number().optional(),
            weightTo: z.number().optional()
          })
          .passthrough()
      )
    })
    .passthrough()
});

type DietForm = z.infer<typeof dietFormSchema>;

const DietUpdate = ({ params }: DietDetailProps) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { y: scrollY } = useWindowScroll();
  const shouldShowBtn = isMobile && scrollY > 50;
  const isDesktop = useMediaQuery('(min-width: 1285px)');
  const router = useRouter();
  const [isKeepLoading, setIsKeepLoading] = useState(false);
  const { data } = useDiet(params.dietId);
  const { mutateAsync: mutateAddRecommendFood } = useAddRecommendFoods();
  const { setIsScroll } = useScrollPage();
  const [allergens, setAllergens] = useState<number[]>(
    Array.isArray(data?.excludedAllergens)
      ? data.excludedAllergens.map((item) => item.id)
      : []
  );

  const form = useForm<DietForm>({
    resolver: zodResolver(dietFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      dietName: '',
      dietDescription: '',
      nutrientTemplateCode: '',
      nutrientTemplate: {},
      trayCode: 0
    }
  });

  const { reset } = form;

  useEffect(() => {
    if (data?.excludedAllergens && Array.isArray(data.excludedAllergens)) {
      setAllergens(data.excludedAllergens.map((item) => item.id));
    }
  }, [data]);

  useEffect(() => {
    checkTokenExisted(router);

    if (data) {
      reset({
        dietName: data.name,
        dietDescription: data.description ?? '',
        nutrientTemplateCode: data.standard?.code,
        tray: data.tray as any,
        nutrientTemplate: {
          code: data.standard?.code,
          name: data.standard?.name,
          typeCode: data.standard?.typeCode,
          typeName: data.standard?.typeName,
          nutrients: data.standard?.nutrients as any
        },
        trayCode: data.tray?.id ?? 0
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reset]);

  const { mutateAsync: mutateUpdateDiet, isPending: isPendingSave } =
    useUpdateDiet(params.dietId);

  if (!data) {
    return <NotFoundData backUrl={DIET_MANAGEMENT_URL} label="식단 관리" />;
  }

  const handleSelectAllergens = (newAllergens: number[]) => {
    setAllergens(newAllergens);
  };

  const handleSubmit = async (data: any) => {
    const newNutrients: Nutrient[] = convertToNutrients(
      data.nutrientTemplate.nutrients
    );

    setIsKeepLoading(true);

    try {
      const trayId = data.trayCode;

      // Update diet with tray data
      // Locally created tray (negative ID): omit id so backend creates it with correct dietId (Case 1)
      // Existing tray: pass id as-is (Case 2/3)
      const isNewTray = data.tray.id && data.tray.id < 0;

      const normalizedFoods = (data.tray.foods ?? []).map((food: any) => ({
        capacityVolume: food.capacityVolume,
        typeCode: food.typeCode,
        mandatoryFlag: food.mandatoryFlag,
        separatedFlag: food.separatedFlag
      }));

      const updateParams: IUpdateDietParams = {
        name: data.dietName,
        description: data.dietDescription,
        standardCode: data.nutrientTemplateCode,
        standardName: data.nutrientTemplate.name,
        nutrients: newNutrients,
        tray: {
          name: data.tray.name,
          representativeTrayCode: data.tray.representativeTrayCode,
          mandatoryFlag: data.tray.mandatoryFlag,
          foods: normalizedFoods,
          ...(isNewTray ? {} : { id: trayId })
        },
        excludedAllergenIds: process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens
      };
      const updatedDiet = await mutateUpdateDiet({
        dietId: params.dietId,
        params: updateParams
      });

      // Add recommend foods
      try {
        await mutateAddRecommendFood(Number(updatedDiet.id));
      } catch (error) {
        setIsScroll(true);
      }

      setTimeout(() => setIsKeepLoading(false), 1000);
      router.push(`${DIET_MANAGEMENT_URL}/${updatedDiet.id}`);
    } catch (error) {
      setIsKeepLoading(false);
    }
  };

  if (isKeepLoading) {
    return (
      <div className="flex h-80 items-center justify-center md:h-full">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <ClientHeaderDetail
        image={`${BASE_PATH}/img/bg-diet-detail.png`}
        title="식단 수정"
        breadcrumbs={[
          { label: '식단 관리', url: DIET_MANAGEMENT_URL },
          { label: data.name, url: `${DIET_MANAGEMENT_URL}/${params.dietId}` },
          { label: '식단 수정' }
        ]}
      />
      <div className="section-padding section-padding-y mx-auto w-full">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {form.getValues('nutrientTemplateCode') && <DietInfo />}
            <NutrientStandard dietId={params.dietId} />
            <Allergens
              defaultValue={allergens}
              onSelect={handleSelectAllergens}
              onReset={() => {
                setAllergens(
                  Array.isArray(data?.excludedAllergens)
                    ? data.excludedAllergens.map((item) => item.id)
                    : []
                );
              }}
            />
            <DietPlan diet={data} />
            <hr className="hidden md:block" />
            <div
              className={cn(
                'mt-4 flex justify-center gap-4',
                isMobile &&
                  shouldShowBtn &&
                  'fixed left-0 right-0 top-[3rem] z-[11] mt-0 justify-end bg-white px-4 py-2 shadow-md'
              )}
            >
              <Button
                type="submit"
                className="w-20 rounded-xl font-semibold md:w-36"
              >
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-20 rounded-xl font-semibold md:w-36"
                onClick={() => router.push(DIET_MANAGEMENT_URL)}
              >
                취소
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className={cn('bg-gray-600', !isDesktop && 'pb-[90px]')}>
        <ClientFooter />
      </div>
    </div>
  );
};

export default DietUpdate;
