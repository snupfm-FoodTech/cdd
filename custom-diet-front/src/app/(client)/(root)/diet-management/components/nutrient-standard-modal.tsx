'use client';

import { Icons } from '@/components/icons';
import Overlay from '@/components/modal/overlay';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TEMPORARY_NUTRIENT_TEMPLATE } from '@/constants';
import { Nutrient, NutrientStandardTemplate } from '@/types/nutrient.type';
import { useEffect, useState } from 'react';
import NutrientSearchBar from './nutrient-search-bar';
import NutrientStandardItemInput from './nutrient-standard-item-input';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';

interface NutrientStandardModalProps {
  nutrientTemplate: NutrientStandardTemplate;
  onSave: (nutrientTemplate: NutrientStandardTemplate) => void;
}

const NutrientStandardModal = ({
  nutrientTemplate,
  onSave
}: NutrientStandardModalProps) => {
  const [open, setOpen] = useState(false);
  const [nutrients, setNutrients] = useState<Nutrient[]>([]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    if (open) {
      const localNutrients = nutrientTemplate.nutrients.filter(
        (nutrient) => !nutrient.formula
      );
      setNutrients(localNutrients);
      setValidationErrors({});
    }
  }, [open, nutrientTemplate.nutrients]);

  const handleNutrientSelect = (nutrient: Nutrient) => {
    setNutrients((prevNutrients) => [...prevNutrients, nutrient]);
  };

  const handleNutrientChange = (updatedNutrient: Nutrient) => {
    setNutrients((prevNutrients) =>
      prevNutrients.map((nutrient) =>
        nutrient.code === updatedNutrient.code ? updatedNutrient : nutrient
      )
    );
  };

  const handleNutrientRemove = (nutrientCode: string) => {
    setNutrients((prevNutrients) =>
      prevNutrients.filter((nutrient) => nutrient.code !== nutrientCode)
    );
  };

  const handleSave = () => {
    onSave({
      code: TEMPORARY_NUTRIENT_TEMPLATE.CODE,
      name: TEMPORARY_NUTRIENT_TEMPLATE.NAME,
      nutrients
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <Overlay isVisible={open} />
      <DialogTrigger asChild>
        <Button size="sm" type="button" className="ml-auto">
          <Icons.settings className="mr-2 h-4 w-4" />
          영양 기준 상세 설정
        </Button>
      </DialogTrigger>

      <DialogContent
        className={cn(
          'p-0',
          isMobile
            ? 'w-full rounded-none py-4'
            : 'max-w-[50rem] overflow-hidden px-6 py-6'
        )}
      >
        <DialogHeader>
          <DialogTitle>영양 기준 상세 설정</DialogTitle>
        </DialogHeader>

        <div className={cn(isMobile && 'h-[70vh] flex-1 overflow-auto')}>
          <div className="flex justify-center border bg-secondary p-4">
            <NutrientSearchBar
              onSelectNutrient={handleNutrientSelect}
              nutrientsExclude={nutrients}
            />
          </div>
          {isMobile ? (
            <div className="mt-4 space-y-4 px-4 pb-[65px]">
              {nutrients.map((nutrient) => (
                <div key={nutrient.code}>
                  <NutrientStandardItemInput
                    isMobile={isMobile}
                    nutrient={nutrient}
                    onChange={handleNutrientChange}
                    onRemove={handleNutrientRemove}
                  />
                  {validationErrors[nutrient.code] && (
                    <div className="my-2 text-center text-sm text-destructive">
                      {validationErrors[nutrient.code]}
                    </div>
                  )}
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          ) : (
            <ScrollArea className="mt-4">
              <div className="max-h-[20rem]">
                {nutrients.map((nutrient: Nutrient) => (
                  <div key={nutrient.code}>
                    <NutrientStandardItemInput
                      nutrient={nutrient}
                      onChange={handleNutrientChange}
                      onRemove={handleNutrientRemove}
                    />
                    {validationErrors[nutrient.code] && (
                      <div className="my-2 text-center text-sm text-destructive">
                        {validationErrors[nutrient.code]}
                      </div>
                    )}
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
        <div
          className={cn(
            'mt-4 flex items-center justify-end gap-2',
            isMobile &&
              'fixed bottom-0 left-0 right-0 z-50 border-t bg-white px-4 py-3'
          )}
        >
          <Button type="button" className="w-24" onClick={() => handleSave()}>
            저장
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-24"
            onClick={() => handleCancel()}
          >
            취소
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NutrientStandardModal;
