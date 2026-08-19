'use client';

import fruitsImage from '@/assets/icons/fruits.svg';
import noodlesImage from '@/assets/icons/noodles.svg';
import riceImage from '@/assets/icons/rice.svg';
import { Icons } from '@/components/icons';
import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ENUM_TRAY_TEMPLATES,
  FOOD,
  TRAY_TEMPLATES,
  TYPE_FOODS
} from '@/constants';
import {
  useDeleteTrayTemplate,
  useRepresentTemplates,
  useUpdateTrayTemplate
} from '@/hooks/diet.hook';
import { MandatoryFlag, SeparatedFlag } from '@/types';
import { ITrayItem, ITrayTemplate } from '@/types/diet.type';
import { zodResolver } from '@hookform/resolvers/zod';
import isEmpty from 'lodash/isEmpty';
import Image from 'next/image';
import { SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Switch from 'react-switch';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { StyledRoundCheckbox } from './diet.style';
import { SeperateTray, TemplateTray } from './template-tray';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { GripVertical, X } from 'lucide-react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import DietModalNoticeDelete from './detail/diet-modal-notice-delete';
import cloneDeep from 'lodash/cloneDeep';
import { cn } from '@/lib/utils';
import isEqual from 'lodash/isEqual';
import countBy from 'lodash/countBy';
import useWait from '@/hooks/use-wait';
import { useMediaQuery } from 'usehooks-ts';
import { Separator } from '@/components/ui/separator';
import { SelectTemplate } from '@/components/ui/select-template';
import DialogMobilePreviewTray from './dialog-mobile-preview-tray';
import { useIsMobile } from '@/hooks/use-is-mobile';

export enum EDietMode {
  Add = 'Add',
  Edit = 'Edit'
}

interface IDietProps {
  isOpen: boolean;
  isCurrentDietTray: boolean;
  handleClose: () => void;
  selectedTrayData: any;
  onAddTray: (data: any) => void;
  onUpdateTray: (data: any) => void;
  onDeleteTray?: () => void;
  deleted?: boolean;
  mode: EDietMode;
}

const MIN_CAPACITY_VOLUME = 1;
const DEFAULT_CAPACITY_RICE_VOLUME = 1;
const DEFAULT_CAPACITY_SOUP_VOLUME = 1;
const MAX_CAPACITY_VOLUME = 9999;
const MAX_TRAY_ITEMS = 12;

const uncheckedIcon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: 8,
        paddingRight: 2
      }}
    >
      비포함
    </div>
  );
};

const checkedIcon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        fontSize: 8,
        borderRadius: '20px 0 0 20px',
        paddingRight: 2
      }}
    >
      포함
    </div>
  );
};

type AvailableFood = Omit<ITrayItem, 'id'>;

const formSchema = z.object({
  trayName: z.string().min(1, { message: '이 필드는 필수 입력란입니다.' })
});

type TrayFormValue = z.infer<typeof formSchema>;

interface DraggableItemProps {
  id: string;
  itemFood: ITrayItem;
  idx: number;
  mandatoryTray: string;
  handleChangeVolume: (value: number, itemFood: ITrayItem) => void;
  handleRemoveFood: (id: string) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  itemFood,
  idx,
  handleChangeVolume,
  handleRemoveFood,
  mandatoryTray
}) => {
  const isSeparate = itemFood.separatedFlag === SeparatedFlag.Yes;

  const isMobile = useIsMobile();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled: isSeparate
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isMobile) {
    return (
      <motion.li
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="relative mb-2 rounded-xl bg-white p-4 shadow-md dark:bg-secondary"
      >
        {/* Close button (absolute) */}
        {itemFood.mandatoryFlag !== MandatoryFlag.Yes &&
          mandatoryTray !== MandatoryFlag.Yes && (
            <Icons.close
              className="absolute right-3 top-3 cursor-pointer rounded-full p-1 text-destructive transition hover:bg-destructive/10"
              onClick={() => handleRemoveFood(itemFood.sequence)}
              size={22}
            />
          )}

        {/* Content */}
        <div className="flex flex-col gap-3">
          {/* Drag handle + Index + Name */}
          <div className="flex items-center gap-4">
            <div className="cursor-grab text-neutral-400" {...listeners}>
              {isSeparate ? (
                <X size={20} className="text-destructive" />
              ) : (
                <GripVertical size={25} className="text-primary" />
              )}
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {idx + 1}.
            </span>
            <span className="truncate text-sm font-medium text-foreground">
              {itemFood.typeName}
            </span>
          </div>

          {/* Input volume */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <NumberInput
                min={MIN_CAPACITY_VOLUME}
                max={MAX_CAPACITY_VOLUME}
                onChange={(value) => handleChangeVolume(value, itemFood)}
                value={itemFood.capacityVolume}
                maxLength={4}
                className="w-24 rounded-md border border-input bg-background px-2 py-1 shadow-sm"
              />
              <span className="text-sm text-muted-foreground">ml</span>
            </div>
          </div>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li ref={setNodeRef} style={style} {...attributes}>
      <div className="mt-2 flex h-fit w-full items-center rounded-lg bg-secondary p-2">
        <div className="flex w-14 cursor-grab items-center" {...listeners}>
          {isSeparate ? (
            <X size={20} className="text-destructive" />
          ) : (
            <GripVertical size={20} className="text-neutral-500" />
          )}
        </div>
        <span className="w-14 cursor-grab" {...listeners}>
          {idx + 1}
        </span>
        <div className="flex w-80 items-center justify-around">
          <span className="w-56 cursor-grab" {...listeners}>
            {itemFood.typeName}
          </span>
          <NumberInput
            min={MIN_CAPACITY_VOLUME}
            max={MAX_CAPACITY_VOLUME}
            onBlur={(value) => {
              if (!isMobile) return;
              handleChangeVolume(value, itemFood);
            }}
            onChange={(value) => {
              if (isMobile) return;
              handleChangeVolume(value, itemFood);
            }}
            value={itemFood.capacityVolume}
            maxLength={4}
          />
          <span className="ml-2 cursor-grab" {...listeners}>
            ml
          </span>
        </div>
        {itemFood.mandatoryFlag !== MandatoryFlag.Yes &&
        mandatoryTray !== MandatoryFlag.Yes ? (
          <Icons.close
            className="w-20 cursor-pointer"
            onClick={() => handleRemoveFood(itemFood.sequence)}
            size={16}
          />
        ) : (
          <span className="w-4" />
        )}
      </div>
    </motion.li>
  );
};

const DietModal = ({
  isOpen,
  handleClose,
  selectedTrayData,
  onAddTray,
  onUpdateTray,
  onDeleteTray,
  deleted,
  isCurrentDietTray,
  mode = EDietMode.Add
}: IDietProps) => {
  const [isCheckedRice, setIsCheckRice] = useState(false);
  const [isCheckedSoup, setIsCheckSoup] = useState(false);
  const [isRiceSeparate, setIsRiceSeparate] = useState(false);
  const [isSoupSeparate, setIsSoupSeparate] = useState(false);
  const [listTrayItems, setListTrayItem] = useState<ITrayItem[]>([]);
  const [seperateList, setSeperateList] = useState<ITrayItem[]>([]);
  const [availableTemp, setAvailableTemp] = useState('');
  const [showAlertDelete, setShowAlertDelete] = useState(false);
  const idTrayTemplate = useRef(-1);
  const [isOpenModalNoticeDelete, setIsOpenModalNoticeDelete] =
    useState<boolean>(false);
  const [showTrayToast, setShowTrayToast] = useState(false);

  const isSmallMobile = useMediaQuery('(max-width: 640px)');
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const {
    mutateAsync: mutateUpdateTray,
    isPending: updatePending,
    data: dataUpdateTray,
    isSuccess: isSuccessUpdateTray
  } = useUpdateTrayTemplate(idTrayTemplate.current);
  const { mutateAsync: deleteMutation, isPending: deletePending } =
    useDeleteTrayTemplate();
  const { data: dataTemplates } = useRepresentTemplates();

  const prevTrayIdRef = useRef<number | undefined>();

  const optionalFoodFlag = {
    mandatoryFlag: MandatoryFlag.No,
    separatedFlag: SeparatedFlag.No
  };
  const mandatoryFoodFlag = {
    mandatoryFlag: MandatoryFlag.Yes,
    separatedFlag: SeparatedFlag.No
  };

  const form = useForm<TrayFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      trayName: ''
    }
  });

  const isTemplateMandatory = useMemo(() => {
    return selectedTrayData.mandatoryFlag === MandatoryFlag.Yes;
  }, [selectedTrayData.mandatoryFlag]);

  const { startWait, cancelWait } = useWait(500);
  const { startWait: startWaitLong, cancelWait: cancelWaitLong } =
    useWait(1000);

  const isInitialized = useRef(false);

  const resetToTemplateVolumes = async () => {
    if (!selectedTrayData) return;
    if (!selectedTrayData.foods) return;

    await startWaitLong();

    const foodOnTray = selectedTrayData.foods.filter(
      (item: ITrayItem) => item.separatedFlag !== SeparatedFlag.Yes
    );
    const foodSeparated = selectedTrayData.foods.filter(
      (item: ITrayItem) => item.separatedFlag === SeparatedFlag.Yes
    );

    setListTrayItem(foodOnTray);
    setSeperateList(foodSeparated);
  };

  useEffect(() => {
    if (isOpen) {
      if (selectedTrayData) {
        isInitialized.current = true;
      }
    } else {
      setAvailableTemp('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    return () => {
      cancelWait();
      cancelWaitLong();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccessUpdateTray) {
      onUpdateTray(dataUpdateTray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateTray]);

  // handle edit form
  useEffect(() => {
    const trayId = selectedTrayData?.id;
    if (prevTrayIdRef.current === trayId) return;
    prevTrayIdRef.current = trayId;

    if (!selectedTrayData || isEmpty(selectedTrayData)) {
      form.reset();
      setIsCheckRice(false);
      setIsCheckSoup(false);
      setAvailableTemp('');
      setListTrayItem([]);
      setIsRiceSeparate(false);
      setIsSoupSeparate(false);
      setSeperateList([]);
    } else {
      if (!selectedTrayData) return;
      if (!selectedTrayData.foods) return;

      form.setValue('trayName', selectedTrayData.name);
      form.trigger();

      idTrayTemplate.current = selectedTrayData.id;
      const foodOnTray = selectedTrayData.foods.filter(
        (item: ITrayItem) => item.separatedFlag !== SeparatedFlag.Yes
      );
      const foodSeparated = selectedTrayData.foods.filter(
        (item: ITrayItem) => item.separatedFlag === SeparatedFlag.Yes
      );

      setListTrayItem(foodOnTray);
      setSeperateList(foodSeparated);

      const riceItem: ITrayItem = selectedTrayData.foods.find(
        (item: ITrayItem) => item.typeCode === TYPE_FOODS.RICE
      );
      const soupItem: ITrayItem = selectedTrayData.foods.find(
        (item: ITrayItem) => item.typeCode === TYPE_FOODS.SOUP
      );

      setFoodItemState(riceItem, setIsCheckRice, setIsRiceSeparate);
      setFoodItemState(soupItem, setIsCheckSoup, setIsSoupSeparate);

      resetToTemplateVolumes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrayData]);

  const setFoodItemState = (
    item: ITrayItem,
    setIsCheck: (value: SetStateAction<boolean>) => void,
    setIsSeparate: (value: SetStateAction<boolean>) => void
  ) => {
    if (item) {
      setIsCheck(true);
      setIsSeparate(item.separatedFlag === SeparatedFlag.Yes);
    } else {
      setIsCheck(false);
      setIsSeparate(false);
    }
  };

  const handleTemplateMatching = (
    tray: ITrayItem[],
    separates: ITrayItem[]
  ) => {
    // if (!isInitialized.current) return;

    if (shouldMatchTemplateA(tray, separates)) {
      setAvailableTemp(ENUM_TRAY_TEMPLATES.A);
      selectedTrayData.representativeTrayCode = ENUM_TRAY_TEMPLATES.A;
      applyTemplateAIfMatched(tray, separates);
    } else if (shouldMatchTemplateB(tray, separates)) {
      setAvailableTemp(ENUM_TRAY_TEMPLATES.B);
      selectedTrayData.representativeTrayCode = ENUM_TRAY_TEMPLATES.B;
      applyTemplateBIfMatched(tray, separates);
    } else if (shouldMatchTemplateC(tray, separates)) {
      setAvailableTemp(ENUM_TRAY_TEMPLATES.C);
      selectedTrayData.representativeTrayCode = ENUM_TRAY_TEMPLATES.C;
      applyTemplateCIfMatched(tray, separates);
    } else if (shouldMatchTemplateD(tray, separates)) {
      setAvailableTemp(ENUM_TRAY_TEMPLATES.D);
      selectedTrayData.representativeTrayCode = ENUM_TRAY_TEMPLATES.D;
      applyTemplateDIfMatched(tray, separates);
    } else {
      setAvailableTemp('');
      selectedTrayData.representativeTrayCode = '';
      setListTrayItem(tray);
      setSeperateList(separates);
    }

    if (isMobile) {
      // setShowTrayToast(true);
    }
  };

  useEffect(() => {
    const hasRice =
      listTrayItems.some((item) => item.typeCode === TYPE_FOODS.RICE) ||
      seperateList.some((item) => item.typeCode === TYPE_FOODS.RICE);

    if (isCheckedRice) {
      if (!hasRice) {
        const newItem = {
          sequence: uuidv4(),
          typeName: FOOD.RICE,
          typeCode: TYPE_FOODS.RICE,
          capacityVolume: DEFAULT_CAPACITY_RICE_VOLUME,
          ...mandatoryFoodFlag
        };
        const updatedList = [...listTrayItems, newItem];
        handleTemplateMatching(updatedList, seperateList);
      }
    } else {
      setIsRiceSeparate(false);

      const updatedTrayItems = listTrayItems.filter(
        (item) => item.typeName !== FOOD.RICE
      );
      const updatedSeparates = seperateList.filter(
        (item) => item.typeName !== FOOD.RICE
      );

      // Apply matching templates after rice is removed
      handleTemplateMatching(updatedTrayItems, updatedSeparates);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedRice]);

  useEffect(() => {
    const hasSoup =
      listTrayItems.some((item) => item.typeCode === TYPE_FOODS.SOUP) ||
      seperateList.some((item) => item.typeCode === TYPE_FOODS.SOUP);

    if (isCheckedSoup) {
      if (!hasSoup) {
        const newItem = {
          sequence: uuidv4(),
          typeName: FOOD.SOUP,
          typeCode: TYPE_FOODS.SOUP,
          capacityVolume: DEFAULT_CAPACITY_SOUP_VOLUME,
          ...mandatoryFoodFlag
        };
        const updatedList = [...listTrayItems, newItem];
        handleTemplateMatching(updatedList, seperateList);
      }
    } else {
      setIsSoupSeparate(false);

      const updatedTrayItems = listTrayItems.filter(
        (item) => item.typeName !== FOOD.SOUP
      );
      const updatedSeparates = seperateList.filter(
        (item) => item.typeName !== FOOD.SOUP
      );

      // Apply matching templates after rice is removed
      handleTemplateMatching(updatedTrayItems, updatedSeparates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedSoup]);

  const removeItemByName = (
    nameItem: string,
    nameList: ITrayItem[],
    actionSetList: (f: ITrayItem[]) => void
  ) => {
    const updatedList = nameList.filter((item) => item.typeName !== nameItem);
    actionSetList(updatedList);
  };

  useEffect(() => {
    if (!isCheckedRice) return;

    let updatedTray = [...listTrayItems];
    let updatedSeparates = [...seperateList];

    if (isRiceSeparate) {
      const rice = updatedTray.find(
        (item) => item.typeCode === TYPE_FOODS.RICE
      );
      if (rice) {
        const moved = { ...rice, separatedFlag: SeparatedFlag.Yes };
        updatedTray = updatedTray.filter((i) => i.typeCode !== TYPE_FOODS.RICE);
        updatedSeparates.push(moved);
      }
    } else {
      const rice = updatedSeparates.find(
        (item) => item.typeCode === TYPE_FOODS.RICE
      );
      if (rice) {
        const moved = { ...rice, separatedFlag: SeparatedFlag.No };
        updatedSeparates = updatedSeparates.filter(
          (i) => i.typeCode !== TYPE_FOODS.RICE
        );
        updatedTray.push(moved);
      }
    }

    handleTemplateMatching(updatedTray, updatedSeparates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRiceSeparate]);

  useEffect(() => {
    if (!isCheckedSoup) return;

    let updatedTray = [...listTrayItems];
    let updatedSeparates = [...seperateList];

    if (isSoupSeparate) {
      const soup = updatedTray.find(
        (item) => item.typeCode === TYPE_FOODS.SOUP
      );
      if (soup) {
        const moved = { ...soup, separatedFlag: SeparatedFlag.Yes };
        updatedTray = updatedTray.filter((i) => i.typeCode !== TYPE_FOODS.SOUP);
        updatedSeparates.push(moved);
      }
    } else {
      const soup = updatedSeparates.find(
        (item) => item.typeCode === TYPE_FOODS.SOUP
      );
      if (soup) {
        const moved = { ...soup, separatedFlag: SeparatedFlag.No };
        updatedSeparates = updatedSeparates.filter(
          (i) => i.typeCode !== TYPE_FOODS.SOUP
        );
        updatedTray.push(moved);
      }
    }

    handleTemplateMatching(updatedTray, updatedSeparates);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSoupSeparate]);

  // clear timeout
  let timeout: any;
  useEffect(() => {
    return () => clearTimeout(timeout);
  }, [timeout]);

  const handleAlertConfirm = () => {
    if (!deleted && !isCurrentDietTray) {
      deleteMutation(idTrayTemplate.current).then(() => {
        onDeleteTray && onDeleteTray();
        handleClose();
      });
    } else {
      setIsOpenModalNoticeDelete(true);
    }
    setShowAlertDelete(false);
  };

  // TEMPLATE A

  const shouldMatchTemplateA = (
    items: ITrayItem[],
    separates: ITrayItem[]
  ): boolean => {
    // Must have exactly 4 items in main tray
    if (items.length !== 4) return false;

    // Must have exactly 1 soup in separates
    const soupsInSeparates = separates.filter(
      (item) => item.typeCode === TYPE_FOODS.SOUP
    );
    if (soupsInSeparates.length !== 1) return false;

    // Count item types in tray
    const count = countBy(items, (item) => item.typeCode);

    const hasOneProtein = count[TYPE_FOODS.PROTEIN] === 1;
    const hasOneRice = count[TYPE_FOODS.RICE] === 1;
    const hasOneKimchi = count[TYPE_FOODS.KIMCHI] === 1;
    const hasOneVegetable = count[TYPE_FOODS.VEGETABLE] === 1;

    return hasOneProtein && hasOneRice && hasOneKimchi && hasOneVegetable;
  };

  const fixItemsToMatchTemplateA = (items: ITrayItem[]): ITrayItem[] => {
    const template = TRAY_TEMPLATES.A;

    const updated = items.map((item) => {
      // 이미 특정 음식이 선택된 슬롯(item.code 존재)은 그 음식의 실제 용량을 유지한다.
      // 슬롯 기본값(TRAY_TEMPLATES)은 빈 슬롯에만 적용한다.
      if (item.code) return item;
      const match = template.find((t) => t.typeCode === item.typeCode);
      return match ? { ...item, capacityVolume: match.capacityVolume } : item;
    });

    return isEqual(updated, items) ? items : updated;
  };

  const fixItemsToMatchSeparatesA = (separates: ITrayItem[]): ITrayItem[] => {
    const soupTemplate = TRAY_TEMPLATES.A.find(
      (t) => t.typeCode === TYPE_FOODS.SOUP
    );

    if (!soupTemplate) return separates;

    // Update soup item(s) to match template capacityVolume (빈 슬롯일 때만)
    return separates.map((item) => {
      if (item.typeCode === TYPE_FOODS.SOUP && !item.code) {
        return { ...item, capacityVolume: soupTemplate.capacityVolume };
      }
      return item;
    });
  };

  const applyTemplateAIfMatched = (
    updatedList: ITrayItem[],
    updatedSeparateList: ITrayItem[]
  ) => {
    if (shouldMatchTemplateA(updatedList, updatedSeparateList)) {
      const fixed = fixItemsToMatchTemplateA(updatedList);
      const fixedSeparate = fixItemsToMatchSeparatesA(updatedSeparateList);
      setListTrayItem(fixed);
      setSeperateList(fixedSeparate);
    } else {
      setListTrayItem(updatedList);
      setSeperateList(updatedSeparateList);
    }
  };

  // END TEMPLATE A

  // TEMPLATE B
  const shouldMatchTemplateB = (
    items: ITrayItem[],
    separates: ITrayItem[]
  ): boolean => {
    // Must have exactly 5 items in main tray
    if (items.length !== 5) return false;

    // Must have exactly 1 soup in separates
    const soupsInSeparates = separates.filter(
      (item) => item.typeCode === TYPE_FOODS.SOUP
    );
    if (soupsInSeparates.length !== 1) return false;

    // Count item types in tray
    const count = countBy(items, (item) => item.typeCode);

    const hasTwoProtein = count[TYPE_FOODS.PROTEIN] === 2;
    const hasOneRice = count[TYPE_FOODS.RICE] === 1;
    const hasOneKimchi = count[TYPE_FOODS.KIMCHI] === 1;
    const hasOneVegetable = count[TYPE_FOODS.VEGETABLE] === 1;

    return hasTwoProtein && hasOneRice && hasOneKimchi && hasOneVegetable;
  };

  const fixItemsToMatchTemplateB = (items: ITrayItem[]): ITrayItem[] => {
    const template = [...TRAY_TEMPLATES.B]; // clone template

    const updated = items.map((item) => {
      // Try exact match: type and volume
      const exactMatchIndex = template.findIndex(
        (t) =>
          t.typeCode === item.typeCode &&
          t.capacityVolume === item.capacityVolume
      );

      if (exactMatchIndex !== -1) {
        template.splice(exactMatchIndex, 1); // remove to avoid reuse
        return item; // already matches, keep as is
      }

      // Fallback: match by typeCode. 빈 슬롯(item.code 없음)일 때만 capacityVolume을 덮어쓴다.
      const looseMatchIndex = template.findIndex(
        (t) => t.typeCode === item.typeCode
      );

      if (looseMatchIndex !== -1) {
        const matched = template.splice(looseMatchIndex, 1)[0];
        return item.code
          ? item
          : { ...item, capacityVolume: matched.capacityVolume };
      }

      // No match: return as is
      return item;
    });

    return isEqual(updated, items) ? items : updated;
  };

  const fixItemsToMatchSeparatesB = (separates: ITrayItem[]): ITrayItem[] => {
    const soupTemplate = TRAY_TEMPLATES.B.find(
      (t) => t.typeCode === TYPE_FOODS.SOUP
    );

    if (!soupTemplate) return separates;

    // Update soup item(s) to match template capacityVolume (빈 슬롯일 때만)
    return separates.map((item) => {
      if (item.typeCode === TYPE_FOODS.SOUP && !item.code) {
        return { ...item, capacityVolume: soupTemplate.capacityVolume };
      }
      return item;
    });
  };

  const applyTemplateBIfMatched = (
    updatedList: ITrayItem[],
    updatedSeparateList: ITrayItem[]
  ) => {
    if (shouldMatchTemplateB(updatedList, updatedSeparateList)) {
      const fixed = fixItemsToMatchTemplateB(updatedList);
      const fixedSeparate = fixItemsToMatchSeparatesB(updatedSeparateList);
      setListTrayItem(fixed);
      setSeperateList(fixedSeparate);
    } else {
      setListTrayItem(updatedList);
      setSeperateList(updatedSeparateList);
    }
  };

  // END TEMPLATE B

  // TEMPLATE C

  const shouldMatchTemplateC = (
    items: ITrayItem[],
    separates: ITrayItem[]
  ): boolean => {
    // Must have exactly 6 items in main tray
    if (items.length !== 6) return false;

    // Must have exactly 1 soup in separates
    const soupsInSeparates = separates.filter(
      (item) => item.typeCode === TYPE_FOODS.SOUP
    );
    if (soupsInSeparates.length !== 1) return false;

    // Count item types in tray
    const count = countBy(items, (item) => item.typeCode);

    const hasTwoProtein = count[TYPE_FOODS.PROTEIN] === 2;
    const hasOneRice = count[TYPE_FOODS.RICE] === 1;
    const hasOneKimchi = count[TYPE_FOODS.KIMCHI] === 1;
    const hasTwoVegetable = count[TYPE_FOODS.VEGETABLE] === 2;

    return hasTwoProtein && hasOneRice && hasOneKimchi && hasTwoVegetable;
  };

  const fixItemsToMatchTemplateC = (items: ITrayItem[]): ITrayItem[] => {
    const template = [...TRAY_TEMPLATES.C]; // clone template

    const updated = items.map((item) => {
      // Try exact match: type and volume
      const exactMatchIndex = template.findIndex(
        (t) =>
          t.typeCode === item.typeCode &&
          t.capacityVolume === item.capacityVolume
      );

      if (exactMatchIndex !== -1) {
        template.splice(exactMatchIndex, 1); // remove to avoid reuse
        return item; // already matches, keep as is
      }

      // Fallback: match by typeCode. 빈 슬롯(item.code 없음)일 때만 capacityVolume을 덮어쓴다.
      const looseMatchIndex = template.findIndex(
        (t) => t.typeCode === item.typeCode
      );

      if (looseMatchIndex !== -1) {
        const matched = template.splice(looseMatchIndex, 1)[0];
        return item.code
          ? item
          : { ...item, capacityVolume: matched.capacityVolume };
      }

      // No match: return as is
      return item;
    });

    return isEqual(updated, items) ? items : updated;
  };

  const fixItemsToMatchSeparatesC = (separates: ITrayItem[]): ITrayItem[] => {
    const soupTemplate = TRAY_TEMPLATES.C.find(
      (t) => t.typeCode === TYPE_FOODS.SOUP
    );

    if (!soupTemplate) return separates;

    // Update soup item(s) to match template capacityVolume (빈 슬롯일 때만)
    return separates.map((item) => {
      if (item.typeCode === TYPE_FOODS.SOUP && !item.code) {
        return { ...item, capacityVolume: soupTemplate.capacityVolume };
      }
      return item;
    });
  };

  const applyTemplateCIfMatched = (
    updatedList: ITrayItem[],
    updatedSeparateList: ITrayItem[]
  ) => {
    if (shouldMatchTemplateC(updatedList, updatedSeparateList)) {
      const fixed = fixItemsToMatchTemplateC(updatedList);
      const fixedSeparate = fixItemsToMatchSeparatesC(updatedSeparateList);
      setListTrayItem(fixed);
      setSeperateList(fixedSeparate);
    } else {
      setListTrayItem(updatedList);
      setSeperateList(updatedSeparateList);
    }
  };

  // END TEMPLATE C

  const shouldMatchTemplateD = (
    items: ITrayItem[],
    separates: ITrayItem[]
  ): boolean => {
    // Must have exactly 6 items in main tray
    if (items.length !== 6) return false;

    // Must have exactly 1 soup in separates
    const soupsInSeparates = separates.filter(
      (item) => item.typeCode === TYPE_FOODS.SOUP
    );
    if (soupsInSeparates.length !== 1) return false;

    // Count item types in tray
    const count = countBy(items, (item) => item.typeCode);

    const hasTwoProteins = count[TYPE_FOODS.PROTEIN] === 2;
    const hasThreeVegetables = count[TYPE_FOODS.VEGETABLE] === 3;
    const hasOneKimchi = count[TYPE_FOODS.KIMCHI] === 1;

    return hasTwoProteins && hasThreeVegetables && hasOneKimchi;
  };

  const fixItemsToMatchTemplateD = (items: ITrayItem[]): ITrayItem[] => {
    // Clone template D and remove soup (since soup is in separates)
    const template = cloneDeep(TRAY_TEMPLATES.D).filter(
      (t) => t.typeCode !== TYPE_FOODS.SOUP
    );

    const usedIndices: Set<number> = new Set();

    // Assign matching capacityVolume based on template's typeCode
    const updatedItems = items.map((item) => {
      const matchIndex = template.findIndex(
        (t, idx) => !usedIndices.has(idx) && t.typeCode === item.typeCode
      );

      if (matchIndex !== -1) {
        const matched = template[matchIndex];
        usedIndices.add(matchIndex);
        // 이미 특정 음식이 선택된 슬롯(item.code 존재)은 그 음식의 실제 용량을 유지한다.
        if (item.code) return item;
        return {
          ...item,
          capacityVolume: matched.capacityVolume
        };
      }

      return item;
    });

    // Handle vegetable rule: volumes should be 90, 90, 60 (빈 슬롯일 때만)
    const vegetables = updatedItems.filter(
      (item) => item.typeCode === TYPE_FOODS.VEGETABLE
    );

    const fixedVegetables = vegetables.map((item, index) => {
      if (item.code) return item;
      if (index < 2) {
        return { ...item, capacityVolume: 90 };
      }
      return { ...item, capacityVolume: 60 };
    });

    let vegIndex = 0;
    return updatedItems.map((item) =>
      item.typeCode === TYPE_FOODS.VEGETABLE
        ? fixedVegetables[vegIndex++]
        : item
    );
  };

  const fixItemsToMatchSeparates = (separates: ITrayItem[]): ITrayItem[] => {
    // Get soup configuration from template D
    const soupTemplate = TRAY_TEMPLATES.D.find(
      (t) => t.typeCode === TYPE_FOODS.SOUP
    );

    if (!soupTemplate) return separates;

    // Update soup item(s) to match template capacityVolume (빈 슬롯일 때만)
    return separates.map((item) => {
      if (item.typeCode === TYPE_FOODS.SOUP && !item.code) {
        return { ...item, capacityVolume: soupTemplate.capacityVolume };
      }
      return item;
    });
  };

  const applyTemplateDIfMatched = (
    updatedList: ITrayItem[],
    updatedSeparateList: ITrayItem[]
  ) => {
    if (seperateList.length > 1 || updatedList.length !== 6) {
      setListTrayItem(updatedList);
      setSeperateList(updatedSeparateList);
      return;
    }

    if (shouldMatchTemplateD(updatedList, updatedSeparateList)) {
      const fixed = fixItemsToMatchTemplateD(updatedList);
      const fixedSeparate = fixItemsToMatchSeparates(updatedSeparateList);
      setListTrayItem(fixed);
      setSeperateList(fixedSeparate);
    } else {
      setListTrayItem(updatedList);
      setSeperateList(updatedSeparateList);
    }
  };

  const handleAddFood = (foodName: string, foodType: string) => {
    if (listTrayItems.length + seperateList.length < MAX_TRAY_ITEMS) {
      const newItem = {
        sequence: uuidv4(),
        typeName: foodName,
        capacityVolume: MIN_CAPACITY_VOLUME,
        typeCode: foodType,
        ...optionalFoodFlag
      };

      const updatedList = [...listTrayItems, newItem];
      handleTemplateMatching(updatedList, seperateList);
    }
  };

  const handleRemoveFood = (foodId: string) => {
    const updatedList = listTrayItems.filter(
      (item) => item.sequence !== foodId
    );
    const updatedSeparates = [...seperateList];

    handleTemplateMatching(updatedList, updatedSeparates);
  };

  const totalFood: number = useMemo(() => {
    return listTrayItems.filter(
      (item) => item.typeName !== FOOD.RICE && item.typeName !== FOOD.SOUP
    ).length;
  }, [listTrayItems]);

  type AvailableFoodWithoutSequence = Omit<AvailableFood, 'sequence'>;

  const addFoodAvailable = (listFoods: AvailableFoodWithoutSequence[]) => {
    const newListItem = listFoods.map(
      (item): ITrayItem => ({
        sequence: uuidv4(),
        ...item
      })
    );

    setListTrayItem(newListItem);
  };

  const addFoodToTray = (foods: AvailableFoodWithoutSequence[]) => {
    timeout = setTimeout(() => {
      addFoodAvailable(foods);
    }, 0);
  };

  const getAvailableTemplate = async (value: string) => {
    setAvailableTemp(value);
    setIsRiceSeparate(false);
    setIsCheckSoup(false);
    setSeperateList([]);

    switch (value) {
      case 'A':
        addFoodToTray(
          TRAY_TEMPLATES.A.map((item) => ({
            ...item,
            mandatoryFlag: MandatoryFlag.No,
            separatedFlag: SeparatedFlag.No
          }))
        );
        await startWait();
        setIsCheckRice(true);
        setIsCheckSoup(true);
        setIsSoupSeparate(true);
        break;
      case 'B':
        addFoodToTray(
          TRAY_TEMPLATES.B.map((item) => ({
            ...item,
            mandatoryFlag: MandatoryFlag.No,
            separatedFlag: SeparatedFlag.No
          }))
        );
        await startWait();
        setIsCheckRice(true);
        setIsCheckSoup(true);
        setIsSoupSeparate(true);
        break;
      case 'C':
        addFoodToTray(
          TRAY_TEMPLATES.C.map((item) => ({
            ...item,
            mandatoryFlag: MandatoryFlag.No,
            separatedFlag: SeparatedFlag.No
          }))
        );
        await startWait();
        setIsCheckRice(true);
        setIsCheckSoup(true);
        setIsSoupSeparate(true);
        break;
      case 'D':
        addFoodToTray(
          TRAY_TEMPLATES.D.map((item) => ({
            ...item,
            mandatoryFlag: MandatoryFlag.No,
            separatedFlag: SeparatedFlag.No
          }))
        );
        await startWait();
        setIsCheckRice(false);
        setIsCheckSoup(true);
        setIsSoupSeparate(true);
        break;
      default:
        break;
    }
  };

  const conditionDisableRiceSoup = (typeFood: string) => {
    return (
      totalFood > 11 ||
      (listTrayItems.length + seperateList.length === MAX_TRAY_ITEMS &&
        !listTrayItems.some((item) => item.typeName === typeFood) &&
        !seperateList.some((item) => item.typeName === typeFood))
    );
  };

  const handleChangeVolume = (value: number, foodItem: ITrayItem) => {
    if (foodItem.separatedFlag === SeparatedFlag.Yes) {
      const index = seperateList.findIndex(
        (item) => item.sequence === foodItem.sequence
      );
      seperateList[index].capacityVolume = value;
      setSeperateList([...seperateList]);
    } else {
      const index = listTrayItems.findIndex(
        (item) => item.sequence === foodItem.sequence
      );
      listTrayItems[index].capacityVolume = value;
      setListTrayItem([...listTrayItems]);
    }
    foodItem.capacityVolume = value;
  };

  const handleAddTray = (dataForm: TrayFormValue) => {
    seperateList.forEach((item) => {
      item.separatedFlag = SeparatedFlag.Yes;
    });

    const createTrayData: ITrayTemplate = {
      name: dataForm.trayName,
      representativeTrayCode: availableTemp,
      mandatoryFlag: MandatoryFlag.No,
      foods: [...listTrayItems, ...seperateList]
    };

    if (createTrayData.foods.length > 0) {
      // Generate temporary negative ID to distinguish from server-created trays
      // This will be replaced with real ID when diet is saved
      const tempId = -Date.now();
      const newTrayData: any = { ...createTrayData, id: tempId };

      // Pass data to parent without calling API
      // API call will happen when main "저장" button is clicked
      onAddTray(newTrayData);
      handleClose();
    }
  };

  const handleUpdateTray = (dataForm: TrayFormValue) => {
    seperateList.forEach((item) => {
      item.separatedFlag = SeparatedFlag.Yes;
    });

    listTrayItems.forEach((item) => {
      if (
        item.typeCode === TYPE_FOODS.RICE ||
        item.typeCode === TYPE_FOODS.SOUP
      ) {
        item.separatedFlag = SeparatedFlag.No;
      }
    });

    const updateTrayData: ITrayTemplate = {
      name: dataForm.trayName,
      mandatoryFlag: selectedTrayData.mandatoryFlag,
      representativeTrayCode: availableTemp
        ? availableTemp
        : selectedTrayData.representativeTrayCode,
      foods: [...listTrayItems, ...seperateList]
    };

    // Only update locally, do not send to server
    const newUpdatedTrayData: any = cloneDeep(updateTrayData);
    newUpdatedTrayData.id = selectedTrayData.id;
    onUpdateTray(newUpdatedTrayData);
    handleClose();
  };

  const handleAddMandatoryFood = (mandatoryFood: string) => {
    if (mandatoryFood === FOOD.RICE) {
      setIsCheckRice((prev) => !prev);
    } else {
      setIsCheckSoup((prev) => !prev);
    }
  };

  const listKindFoods = [...listTrayItems, ...seperateList];

  const onDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = listKindFoods.findIndex(
        (item) => item.sequence === active.id
      );
      const newIndex = listKindFoods.findIndex(
        (item) => item.sequence === over.id
      );

      const newItems = arrayMove(listKindFoods, oldIndex, newIndex);
      setListTrayItem(
        newItems.filter((item) => item.separatedFlag !== SeparatedFlag.Yes)
      );
      setSeperateList(
        newItems.filter((item) => item.separatedFlag === SeparatedFlag.Yes)
      );
    }
  };

  const renderList = () => {
    const content = (
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={listKindFoods.map((item) => item.sequence)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {listKindFoods.map((itemFood, idx) => (
              <DraggableItem
                key={itemFood.sequence}
                id={itemFood.sequence}
                itemFood={itemFood}
                idx={idx}
                handleChangeVolume={handleChangeVolume}
                handleRemoveFood={handleRemoveFood}
                mandatoryTray={selectedTrayData.mandatoryFlag}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    );

    if (isSmallMobile) {
      return (
        <div
          className={cn(
            'mt-4 max-h-72 w-full overflow-auto pr-2',
            isTemplateMandatory && 'mt-0'
          )}
        >
          {content}
        </div>
      );
    }

    return (
      <ScrollArea
        className={cn(
          'mt-4 h-72 w-full rounded-xl bg-white p-4 shadow-lg',
          isTemplateMandatory && 'mt-0'
        )}
      >
        {content}
      </ScrollArea>
    );
  };

  if (updatePending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <>
      <DialogMobilePreviewTray
        isOpen={showTrayToast}
        handleChange={setShowTrayToast}
        message="Đã khôi phục dung tích khay mẫu!"
      />
      <DietModalNoticeDelete
        open={isOpenModalNoticeDelete}
        handleClose={() => setIsOpenModalNoticeDelete(false)}
      />
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleClose();
          }
        }}
      >
        <DialogContent
          className={cn(
            'p-0 pt-4 md:px-6',
            !isMobile
              ? 'h-9/11 max-w-[90rem]'
              : 'w-screen max-w-[800px] overflow-hidden'
          )}
        >
          <DialogHeader>
            <DialogTitle className="p-4 pb-0">식단 구성 추가</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] w-full overflow-auto">
            <div className="my-6 w-full space-y-4 px-4">
              {isTemplateMandatory ? (
                <div className="text-xl font-semibold">
                  {selectedTrayData.name}
                </div>
              ) : (
                <Form {...form}>
                  <form className="w-full md:h-fit md:w-1/2">
                    <FormField
                      control={form.control}
                      name="trayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="text-sm font-semibold md:text-base"
                            required
                          >
                            식단구성명
                          </FormLabel>
                          <FormControl>
                            <Input
                              tabIndex={
                                selectedTrayData?.id || isMobile ? -1 : 0
                              }
                              {...field}
                              maxLength={30}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              )}
              {!isTemplateMandatory ? (
                <p className="hidden text-sm font-semibold md:text-base xl:block">
                  식단 트레이 설정
                </p>
              ) : (
                <>
                  <p className="hidden text-sm font-semibold md:text-base xl:block">
                    ml를 편집하고 트레이에서 순서를 끌어서 놓을 수 있습니다
                  </p>
                </>
              )}
              <div className="flex flex-col justify-between xl:flex-row">
                {/* left content */}
                <div className="w-full rounded-none bg-transparent p-0 xl:w-3/5 xl:rounded-lg xl:bg-secondary xl:p-4">
                  {!isTemplateMandatory && (
                    <>
                      <p className="mb-4 text-sm font-semibold md:text-base xl:my-4">
                        대표 식단 트레이 불러오기
                      </p>
                      {dataTemplates && (
                        <SelectTemplate
                          value={availableTemp}
                          onChange={getAvailableTemplate}
                          templates={dataTemplates}
                        />
                      )}
                      <p className="mb-4 mt-8 hidden font-semibold xl:block">
                        식단 트레이 예시
                      </p>
                    </>
                  )}
                  <div className="hidden gap-4 xl:flex">
                    <TemplateTray
                      total={listTrayItems.length}
                      listItems={listTrayItems}
                    />
                    <SeperateTray listSeperate={seperateList} />
                  </div>
                </div>

                <div className="mt-4 xl:hidden" />

                {/* right content */}
                <div className="ml-0 flex-1 rounded-lg bg-secondary px-4 py-4 md:px-6 xl:ml-2">
                  {!isTemplateMandatory && (
                    <div>
                      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-6 md:w-8"
                            src={riceImage}
                            alt="Picture rice"
                          />
                          <p className="w-24 text-sm md:text-base">밥/죽/면</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            className="w-20 md:w-32"
                            disabled={conditionDisableRiceSoup(FOOD.RICE)}
                            onChange={() => handleAddMandatoryFood(FOOD.RICE)}
                            checked={isCheckedRice}
                            uncheckedIcon={uncheckedIcon()}
                            checkedIcon={checkedIcon()}
                            onColor="#e5e7eb"
                            onHandleColor="#2693e6"
                          />

                          <StyledRoundCheckbox $isDisable={!isCheckedRice}>
                            <input
                              type="checkbox"
                              id="rice"
                              checked={isRiceSeparate}
                              onChange={() =>
                                setIsRiceSeparate(!isRiceSeparate)
                              }
                              disabled={!isCheckedRice}
                            />
                            <label htmlFor="rice"></label>
                            <span>별도용기</span>
                          </StyledRoundCheckbox>
                        </div>
                      </div>

                      <Separator className="mt-6 bg-primary/30 md:hidden" />

                      {/* Soup */}
                      <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
                        <div className="flex items-center gap-2">
                          <Image
                            className="w-6 md:w-8"
                            src={noodlesImage}
                            alt="Picture noodles"
                          />
                          <p className="w-24 text-sm md:text-base">국 / 탕</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            className="w-20 md:w-32"
                            disabled={conditionDisableRiceSoup(FOOD.SOUP)}
                            onChange={() => handleAddMandatoryFood(FOOD.SOUP)}
                            checked={isCheckedSoup}
                            uncheckedIcon={uncheckedIcon()}
                            checkedIcon={checkedIcon()}
                            onColor="#e5e7eb"
                            onHandleColor="#2693e6"
                          />

                          <StyledRoundCheckbox $isDisable={!isCheckedSoup}>
                            <input
                              type="checkbox"
                              id="soup"
                              checked={isSoupSeparate}
                              onChange={() =>
                                setIsSoupSeparate(!isSoupSeparate)
                              }
                              disabled={!isCheckedSoup}
                            />
                            <label htmlFor="soup" />
                            <span>별도용기</span>
                          </StyledRoundCheckbox>
                        </div>
                      </div>

                      <Separator className="mt-6 bg-primary/30 md:hidden" />

                      {/* Fruit */}
                      <div className="mt-4 flex items-center gap-2">
                        <Image
                          className="w-6 md:w-8"
                          src={fruitsImage}
                          alt="Picture noodles"
                        />
                        <p className="w-24 text-sm md:text-base">반찬</p>
                        <p className="w-24 text-sm font-semibold md:text-base">
                          총 {totalFood} 개
                        </p>
                      </div>

                      <div className="my-4 flex flex-wrap gap-2 md:gap-4">
                        <Button
                          type="button"
                          className="w-fit text-xs md:text-base"
                          variant="outline"
                          onClick={() =>
                            handleAddFood(FOOD.VEGETABLE, TYPE_FOODS.VEGETABLE)
                          }
                        >
                          채소류 반찬 추가
                        </Button>
                        <Button
                          type="button"
                          className="w-fit text-xs md:text-base"
                          variant="outline"
                          onClick={() =>
                            handleAddFood(FOOD.PROTEIN, TYPE_FOODS.PROTEIN)
                          }
                        >
                          단백질 반찬 추가
                        </Button>
                        <Button
                          type="button"
                          className="w-fit text-xs md:text-base"
                          variant="outline"
                          onClick={() =>
                            handleAddFood(FOOD.KIMCHI, TYPE_FOODS.KIMCHI)
                          }
                        >
                          김치류 반찬 추가
                        </Button>
                        <Button
                          type="button"
                          className="w-fit text-xs md:text-base"
                          variant="outline"
                          onClick={() =>
                            handleAddFood(
                              FOOD.OTHER_FOOD,
                              TYPE_FOODS.OTHER_FOOD
                            )
                          }
                        >
                          기타 반찬 추가
                        </Button>
                      </div>
                    </div>
                  )}
                  {renderList()}
                </div>
              </div>
              <div className="xl:hidden">
                <TemplateTray
                  total={listTrayItems.length}
                  listItems={listTrayItems}
                />
                <SeperateTray listSeperate={seperateList} isMobile={true} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="section-padding mb-4 flex w-full items-center justify-end gap-4 md:justify-center">
              {mode === EDietMode.Add ? (
                <>
                  <Button
                    disabled={
                      !form.formState.isValid || listKindFoods.length === 0
                    }
                    className="w-20 md:w-32"
                    onClick={form.handleSubmit(handleAddTray)}
                  >
                    추가
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-20 md:w-32"
                    onClick={handleClose}
                  >
                    취소
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={
                      !form.formState.isValid || listKindFoods.length === 0
                    }
                    className="w-20 md:w-32"
                    onClick={form.handleSubmit(handleUpdateTray)}
                  >
                    저장
                  </Button>
                  {selectedTrayData.mandatoryFlag === MandatoryFlag.No && (
                    <Button
                      className="w-20 gap-2 md:w-32"
                      variant="destructive"
                      onClick={() => setShowAlertDelete(true)}
                    >
                      <Icons.trash2 size={16} />
                      삭제
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-20 md:w-32"
                    onClick={handleClose}
                  >
                    취소
                  </Button>
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>

        {/* dialog confirm delete */}
        <AlertModal
          title="삭제 하시겠습니까?"
          description="삭제 시 복구할 수 없습니다."
          isOpen={showAlertDelete}
          onClose={() => setShowAlertDelete(false)}
          loading={deletePending}
          onConfirm={handleAlertConfirm}
        />
      </Dialog>
    </>
  );
};

export default DietModal;
