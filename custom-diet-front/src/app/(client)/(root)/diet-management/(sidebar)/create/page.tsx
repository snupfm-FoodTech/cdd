'use client';

import ClientFooter from '@/components/layout/client/client-footer';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { useCreateDiet, useDiets, useTemplateTrays } from '@/hooks/diet.hook';
import { IDietDetail } from '@/types/diet.type';
import { Nutrient, NutrientStandardTemplate } from '@/types/nutrient.type';
import { checkTokenExisted } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import cloneDeep from 'lodash/cloneDeep';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import DietInfo from '../../components/diet-info';
import DietPlan from '../../components/diet-plan';
import NutrientStandard from '../../components/nutrient-standard';
import { buildDietNameSuggestion, convertToNutrients } from '../../helpers';
import { BASE_PATH } from '@/constants';
import { cn } from '@/lib/utils';
import { useMediaQuery } from 'usehooks-ts';
import { useWindowScroll } from 'react-use';
import Allergens from '../../components/allergens';
import ClientHeaderDetail from '@/components/layout/client/client-header-detail';

const dietFormShema = z.object({
  dietName: z.string().trim().min(1, {
    message: '필수 입력 항목입니다'
  }),
  // 설명은 선택 입력. 이름만으로도 목록에서 구분된다.
  dietDescription: z.string().trim().optional(),
  // ✨ tray 관련 필드는 이제 localTrays state로 관리되므로 optional로 변경
  tray: z
    .object({
      id: z.number().optional(),
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
    .passthrough()
    .optional(),
  trayCode: z.number().optional(),
  nutrientTemplateCode: z.string(),
  nutrientTemplate: z
    .object({
      code: z.string(),
      name: z.string(),
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

type DietForm = z.infer<typeof dietFormShema>;

const DietCreate = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const { y: scrollY } = useWindowScroll();
  const shouldShowBtn = isMobile && scrollY > 50;
  const isDesktop = useMediaQuery('(min-width: 1285px)');
  const router = useRouter();
  const form = useForm<DietForm>({
    resolver: zodResolver(dietFormShema),
    mode: 'onSubmit',
    defaultValues: {
      dietName: '',
      dietDescription: '',
      nutrientTemplateCode: '',
      nutrientTemplate: {},
      tray: {},
      trayCode: 1
    }
  });

  const templateUSR = useRef<NutrientStandardTemplate>();

  const [isKeepLoading, setIsKeepLoading] = useState(false);
  const [allergens, setAllergens] = useState<number[]>([]);

  // ✨ 단일 state로 모든 trays 관리 (시스템 + 사용자 추가)
  const [allTrays, setAllTrays] = useState<any[]>([]);
  const [representativeTrayIndex, setRepresentativeTrayIndex] = useState<number>(0);

  const { mutateAsync: mutateCreateDiet } = useCreateDiet();


  // ✨ Load system templates
  const { data: dataSystemTemplates } = useTemplateTrays();

  // ✨ 시스템 템플릿이 로드되면 allTrays state 초기화
  useEffect(() => {
    if (dataSystemTemplates && allTrays.length === 0) {
      setAllTrays(dataSystemTemplates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSystemTemplates]);

  useEffect(() => {
    checkTokenExisted(router);
  }, [router]);

  // ✨ trayCode 변경 시 representativeTrayIndex 자동 업데이트
  const selectedTrayCode = form.watch('trayCode');
  useEffect(() => {
    if (selectedTrayCode && allTrays.length > 0) {
      const selectedIndex = allTrays.findIndex(tray => tray.id === selectedTrayCode);
      if (selectedIndex !== -1 && selectedIndex !== representativeTrayIndex) {
        console.log('[DietCreate] Tray selection changed, updating representativeTrayIndex to:', selectedIndex);
        setRepresentativeTrayIndex(selectedIndex);
      }
    }
  }, [selectedTrayCode, allTrays, representativeTrayIndex]);

  // ✨ 식단명 기본값 — 영양기준과 식판이 정해지면 지어 준다.
  //    이름 짓기가 부담이라 목록에 ㅁㅁ·1111 같은 이름이 쌓이던 걸 막는다.
  const { data: existingDiets } = useDiets();
  const nutrientTemplate = form.watch('nutrientTemplate');
  const isDietNameEdited = !!form.formState.dirtyFields.dietName;

  const suggestedDietName = useMemo(
    () =>
      buildDietNameSuggestion(
        nutrientTemplate?.name,
        (existingDiets ?? []).map((diet) => diet.name)
      ),
    [nutrientTemplate?.name, existingDiets]
  );

  useEffect(() => {
    // 사용자가 한 번이라도 직접 고쳤으면 그대로 둔다
    if (!suggestedDietName || isDietNameEdited) return;
    form.setValue('dietName', suggestedDietName);
  }, [suggestedDietName, isDietNameEdited, form]);

  // ✨ Tray 관리 handlers
  const handleAddTray = (trayData: any) => {
    console.log('[DietCreate] handleAddTray called with:', trayData);

    // 새로운 tray를 위한 고유 임시 ID 생성 (현재 시간 + 랜덤 값으로 충돌 방지)
    const tempId = -(Date.now() + Math.floor(Math.random() * 1000));
    const newTray = {
      ...trayData,
      id: tempId  // 임시 ID (저장 시 null로 변환됨)
    };

    console.log('[DietCreate] Adding new tray with tempId:', tempId);
    setAllTrays(prev => {
      const newTrays = [...prev, newTray];
      // 새로 추가된 tray의 index를 대표 tray로 설정
      const newIndex = newTrays.length - 1;
      setRepresentativeTrayIndex(newIndex);
      console.log('[DietCreate] Set representativeTrayIndex to:', newIndex);
      return newTrays;
    });

    // 새로 추가된 tray를 자동으로 선택
    console.log('[DietCreate] Auto-selecting new tray');
    form.setValue('trayCode', tempId);
    form.setValue('tray', newTray);
  };

  const handleRemoveTray = (index: number) => {
    setAllTrays(prev => prev.filter((_, i) => i !== index));

    // 대표 tray 인덱스 조정
    if (representativeTrayIndex === index) {
      // 대표 tray가 삭제되면 첫 번째 tray로 변경
      setRepresentativeTrayIndex(0);
    } else if (representativeTrayIndex > index) {
      // 대표 tray보다 앞의 tray가 삭제되면 인덱스 감소
      setRepresentativeTrayIndex(prev => prev - 1);
    }
  };

  const handleEditTray = (index: number, updatedTray: any) => {
    setAllTrays(prev => prev.map((tray, i) =>
      i === index ? updatedTray : tray
    ));

    // 현재 선택된 tray가 수정된 경우 form도 업데이트
    const currentTrayCode = form.getValues('trayCode');
    if (allTrays[index] && allTrays[index].id === currentTrayCode) {
      form.setValue('tray', updatedTray);
    }
  };

  const handleSelectRepresentativeTray = (index: number) => {
    setRepresentativeTrayIndex(index);
  };

  const onSubmit = async (data: DietForm) => {
    console.log('[DietCreate] onSubmit called with data:', data);
    console.log('[DietCreate] allTrays:', allTrays);

    const newNutrients: Nutrient[] = convertToNutrients(
      data.nutrientTemplate.nutrients
    );

    // ✨ Validation: 최소 1개 이상의 tray가 필요
    if (allTrays.length === 0) {
      alert('최소 1개 이상의 트레이가 필요합니다.');
      return;
    }

    setIsKeepLoading(true);

    try {
      // ✨ 임시 ID(음수)를 null로 변환하여 전송
      const traysToSubmit = allTrays.map(tray => ({
        ...tray,
        id: (tray.id && tray.id < 0) ? null : tray.id
      }));

      // ✨ Create diet with all trays (system templates + local trays) and representative index
      const createdDiet = await mutateCreateDiet({
        name: data.dietName,
        description: data.dietDescription,
        standardCode: data.nutrientTemplateCode,
        standardName: data.nutrientTemplate.name,
        nutrients: newNutrients,
        trays: traysToSubmit,
        representativeTrayIndex: representativeTrayIndex,
        excludedAllergenIds: process.env.NEXT_PUBLIC_FEATURE_ALLERGEN === 'false' ? [] : allergens
      });

      setTimeout(() => setIsKeepLoading(false), 1000);
      router.push(`${DIET_MANAGEMENT_URL}/${createdDiet.id}`);
    } catch (error) {
      setIsKeepLoading(false);
    }
  };

  const handleSelectAllergens = (newAllergens: number[]) => {
    setAllergens(newAllergens);
  };

  const onError = (errors: any) => {
    console.log('[DietCreate] Form validation errors:', errors);
    console.log('[DietCreate] Current form values:', form.getValues());
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
        title="식단 추가"
        breadcrumbs={[
          { label: '식단 관리', url: DIET_MANAGEMENT_URL },
          { label: '식단 추가' }
        ]}
      />
      <div className="section-padding section-padding-y mx-auto w-full">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit, onError)}>
            {form.getValues('nutrientTemplateCode') && <DietInfo />}
            <NutrientStandard
              handleCustomTemplate={(template) =>
                (templateUSR.current = cloneDeep(template))
              }
              templateUSR={templateUSR.current}
            />
            <Allergens
              defaultValue={allergens}
              onSelect={handleSelectAllergens}
              reset={false}
            />
            {form.getValues('nutrientTemplateCode') && (
              <>
                <DietPlan
                  allTrays={allTrays}
                  representativeTrayIndex={representativeTrayIndex}
                  onAddTray={handleAddTray}
                  onEditTray={handleEditTray}
                  onRemoveTray={handleRemoveTray}
                  onSelectRepresentative={handleSelectRepresentativeTray}
                />
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
              </>
            )}
          </form>
        </Form>
      </div>
      <div className={cn('bg-gray-600', !isDesktop && 'pb-[90px]')}>
        <ClientFooter />
      </div>
    </div>
  );
};

export default DietCreate;
