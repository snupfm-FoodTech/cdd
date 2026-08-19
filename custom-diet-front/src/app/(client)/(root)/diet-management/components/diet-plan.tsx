import { Icons } from '@/components/icons';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QueryKeys } from '@/constants/query-keys.constant';
import {
  useTemplateTrays,
  useTrayTemplates
} from '@/hooks/diet.hook';
import { MandatoryFlag } from '@/types';
import { DietDetail } from '@/types/diet.type';
import { Tray } from '@/types/tray.type';
import { useQueryClient } from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';
import { SquarePen } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import DietModal, { EDietMode } from './diet-modal';
import TrayDetails from './diet-tray-details';
import useWait from '@/hooks/use-wait';

interface DietPlanProps {
  diet?: DietDetail;
  // ✨ 새로운 props for multiple trays management
  allTrays?: any[]; // create mode에서 parent가 관리하는 모든 trays
  representativeTrayIndex?: number;
  onAddTray?: (tray: any) => void;
  onEditTray?: (index: number, tray: any) => void;
  onRemoveTray?: (index: number) => void;
  onSelectRepresentative?: (index: number) => void;
}

const DietPlan = ({
  diet,
  allTrays: allTraysFromParent,
  representativeTrayIndex = 0,
  onAddTray: onAddTrayProp,
  onEditTray: onEditTrayProp,
  onRemoveTray: onRemoveTrayProp,
  onSelectRepresentative
}: DietPlanProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [dietMode, setDietMode] = useState<EDietMode>(EDietMode.Add);

  // Conditional API calls based on mode (add vs edit)
  // Add mode: Only fetch system templates (1 API call)
  // Edit mode: Only fetch diet-specific templates (1 API call) - 시스템 템플릿 제외
  const { data: dataTemplatesFromDiet, isPending: isPendingFromDiet } =
    useTrayTemplates(diet?.id, {
      enabled: !!diet  // Edit mode일 때만 API 호출
    });
  const { data: dataSystemTemplates, isPending: isPendingSystemTemplates } =
    useTemplateTrays({
      enabled: !diet  // Create mode일 때만 API 호출
    });

  // ✨ Edit mode에서는 시스템 템플릿 사용하지 않음
  const dataTemplates = useMemo(() => {
    // Add mode: Use only system templates
    if (!diet) {
      return dataSystemTemplates;
    }

    // Edit mode: Use only diet-specific user templates (시스템 템플릿 제외)
    return dataTemplatesFromDiet || [];
  }, [diet, dataSystemTemplates, dataTemplatesFromDiet]);

  // Select appropriate loading state based on mode
  const isPending = diet
    ? isPendingFromDiet
    : isPendingSystemTemplates;
  const { watch, setValue } = useFormContext();
  const { startWait, cancelWait } = useWait(200);
  const selectedTrayData = useRef<any>({});
  const isInitializedRef = useRef<boolean>(false);

  const selectedTrayCode = watch('trayCode');

  // ✨ Use allTraysFromParent in create mode (if provided), data in edit mode
  const trays = useMemo(() => {
    if (!diet) {
      // Create mode: parent가 trays를 관리하는 경우 그것을 사용
      if (allTraysFromParent) {
        return allTraysFromParent;
      }

      // Fallback: 시스템 템플릿만 표시 (레거시 지원)
      return dataSystemTemplates || [];
    }
    // Edit mode: local data state 사용
    return data ?? [];
  }, [diet, allTraysFromParent, dataSystemTemplates, data]);
  const queryClient = useQueryClient();

  const handleTrayChange = (tray: any) => {
    setValue('trayCode', tray.id);
    setValue('tray', cloneDeep(tray));
  };

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataTemplates) {
      // Preserve locally added trays (with negative IDs)
      const localTrays = data.filter((tray) => tray.id && tray.id < 0);

      // Create a Set of template IDs to prevent duplicates
      const templateIds = new Set(dataTemplates.map((tray) => tray.id));

      // Filter out local trays that have been converted to real IDs (already in templates)
      const uniqueLocalTrays = localTrays.filter((tray) => !templateIds.has(tray.id));

      if (selectedTrayData.current && selectedTrayData.current.id) {
        const newTrays = dataTemplates.map((tray) => {
          if (tray.id === selectedTrayData.current?.id) {
            return selectedTrayData.current;
          }
          return tray;
        });
        setData([...newTrays, ...uniqueLocalTrays]);
      } else {
        setData([...dataTemplates, ...uniqueLocalTrays]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataTemplates]);

  useEffect(() => {
    if (trays.length && !diet && !isInitializedRef.current) {
      // 초기 로드 시에만 첫 번째 tray를 자동 선택
      const FIRST_TRAY = 0;
      handleTrayChange(trays[FIRST_TRAY]);
      isInitializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trays]);

  useEffect(() => {
    // selectedTrayCode에 해당하는 tray가 있지만 form의 tray 객체와 다른 경우에만 업데이트
    const tray = trays.find((t) => t.id === selectedTrayCode);
    if (tray) {
      const currentTray = watch('tray');
      // 현재 form의 tray와 다른 경우에만 업데이트 (무한 루프 방지)
      if (!currentTray || currentTray.id !== tray.id) {
        setValue('tray', cloneDeep(tray));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrayCode, trays]);

  const selectedTray = useMemo(() => {
    return trays.find((tray) => tray.id === selectedTrayCode);
  }, [selectedTrayCode, trays]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="medium" />
      </div>
    );
  }

  // ✨ Create mode: Allow rendering even if no trays exist yet
  // Edit mode: Return null if no data
  if (!diet) {
    // Create mode - always render (user needs to add trays)
  } else {
    // Edit mode - require data
    if (!data || !selectedTray) {
      return null;
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const openDietTrayDialog = async (inputDataTray: object) => {
    selectedTrayData.current = { ...inputDataTray }; // keep id during flow detail
    await startWait();
    setIsOpen(true);
  };

  const handleAddTray = (tray: any) => {
    if (tray) {
      // ✨ Create mode: call parent handler
      if (!diet && onAddTrayProp) {
        onAddTrayProp(tray);
        return;
      }

      // Edit mode: add to local data state
      setData((prevData) => [...prevData, tray]);
      handleTrayChange(tray);
    }
  };

  const handleUpdateTray = async (tray: any) => {
    if (tray) {
      // ✨ Create mode
      if (!diet) {
        if (onEditTrayProp && allTraysFromParent) {
          // Find index in allTrays and update
          const index = allTraysFromParent.findIndex((t) => t.id === tray.id);
          if (index !== -1) {
            onEditTrayProp(index, tray);
          }
        }
        return;
      }

      // Edit mode: update local data state
      selectedTrayData.current = cloneDeep(tray);
      setData((prevData) =>
        prevData.map((item) => (item.id === tray.id ? tray : item))
      );

      await startWait();
      handleTrayChange(tray);
    }
  };

  const handleDeleteTray = () => {
    // ✨ Create mode: call parent handler with index
    if (!diet && onRemoveTrayProp && allTraysFromParent) {
      const index = allTraysFromParent.findIndex((t) => t.id === selectedTrayData.current.id);
      if (index !== -1) {
        onRemoveTrayProp(index);
        // Switch to first tray after deletion
        if (trays.length > 1) {
          const newSelectedTray = index === 0 ? trays[1] : trays[0];
          handleTrayChange(newSelectedTray);
        }
      }
      return;
    }

    // Edit mode: remove queries and switch tray
    if (trays.length > 0) {
      handleTrayChange(trays[0]);
    }
    queryClient.removeQueries({
      queryKey: [QueryKeys.TRAY_TEMPLATE_LIST]
    });
    queryClient.removeQueries({
      queryKey: [QueryKeys.TEMPLATE_TRAY_LIST]
    });
  };

  const isDeleted = () => {
    if (!diet) return false;
    return !data?.some((template) => template.id === selectedTrayCode);
  };

  const isCurrentDietTray = () => {
    if (!diet) return false;
    if (diet.tray.id === selectedTrayCode) return true;
    return false;
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="font-medium text-muted-foreground">식단 구성 설정</p>
        <div className="flex gap-4">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setDietMode(EDietMode.Add);
              openDietTrayDialog({});
            }}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            추가하기
          </Button>
          {/* {selectedTray?.mandatoryFlag === MandatoryFlag.No && ( */}
          {selectedTray && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setDietMode(EDietMode.Edit);
                openDietTrayDialog(selectedTray);
              }}
            >
              <SquarePen className="mr-2 h-4 w-4" />
              수정하기
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <ScrollArea className="flex max-h-[280px] w-full flex-col pr-4 md:max-h-[430px] md:w-fit">
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-4">
            {trays.map((tray, index) => (
              <Button
                key={tray.id || index}
                type="button"
                variant={tray.id === selectedTray?.id ? 'default' : 'outline'}
                onClick={() => {
                  handleTrayChange(tray);
                }}
                className="w-full md:w-36"
              >
                <span className="truncate">{tray.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="flex-1">
          {selectedTray ? (
            <TrayDetails tray={selectedTray} />
          ) : (
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 md:h-[430px]">
              <p className="text-sm text-muted-foreground">
                트레이를 추가하거나 선택해주세요
              </p>
            </div>
          )}
        </div>
      </div>

      <DietModal
        mode={dietMode}
        isOpen={isOpen}
        handleClose={handleClose}
        isCurrentDietTray={isCurrentDietTray()}
        selectedTrayData={cloneDeep(selectedTrayData.current)}
        onAddTray={handleAddTray}
        onDeleteTray={handleDeleteTray}
        deleted={isDeleted()}
        onUpdateTray={handleUpdateTray}
      />
    </div>
  );
};

export default DietPlan;
