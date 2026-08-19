import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useFoodConversion } from '@/hooks/diet.hook';
import { useState } from 'react';

interface FoodConversionModalProps {
  foodCode: string;
  foodName: string;
}

const FoodConversionModal = ({
  foodCode,
  foodName
}: FoodConversionModalProps) => {
  const [open, setOpen] = useState(false);
  const { data: foodConversion, isPending } = useFoodConversion(foodCode);

  if (isPending) {
    return null;
  }

  if (!foodConversion) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="h-6" size="sm">
          평균 부피/중량 데이터
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[40rem] pb-12">
        <DialogHeader>
          <DialogTitle>평균 부피/중량 데이터</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="w-full bg-secondary p-5 text-center text-base font-semibold md:text-lg">
            {foodName}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative z-0 flex h-full flex-col items-center justify-center gap-2 bg-secondary p-4 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-0 after:border-b-[2rem] after:border-r-[2rem] after:border-t-[2rem] after:border-solid after:border-b-transparent after:border-r-white after:border-t-transparent after:content-['']">
              <div className="text-xs md:text-sm">조리 전 중량</div>
              <div className="">
                <div className="text-center text-sm font-semibold md:text-lg">
                  {foodConversion.preWeight}
                </div>
                <div className="text-center text-xs text-muted-foreground md:text-sm">
                  g
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative z-10 h-16 w-full bg-slate-200 p-2 after:absolute after:-right-8 after:bottom-0 after:top-0 after:h-0 after:w-0 after:border-b-[2rem] after:border-l-[2rem] after:border-t-[2rem] after:border-solid after:border-b-transparent after:border-l-slate-200 after:border-t-transparent after:content-['']">
                <div className="text-center text-xs md:text-sm">
                  중량 → 부피 변환비
                </div>
                <div className="text-center text-sm font-semibold md:text-lg">
                  {foodConversion.preWeightToPostVolumeRatio}
                </div>
              </div>
              <div className="relative h-16 w-full bg-slate-200 p-2 before:absolute before:-left-8 before:bottom-0 before:top-0 before:h-0 before:w-0 before:border-b-[2rem] before:border-r-[2rem] before:border-t-[2rem] before:border-solid before:border-b-transparent before:border-l-slate-200 before:border-t-transparent before:content-['']">
                <div className="text-center text-xs md:text-sm">
                  부피 → 중량 변환비
                </div>
                <div className="text-center text-sm font-semibold md:text-lg">
                  {foodConversion.postVolumeToPreWeightRatio}
                </div>
              </div>
            </div>
            <div className="bg-secondary">
              <div className="relative z-0 flex h-full flex-col items-center justify-center gap-2 bg-secondary p-4 before:absolute before:left-0 before:top-0 before:h-0 before:w-0 before:border-b-[2rem] before:border-l-[2rem] before:border-t-[2rem] before:border-solid before:border-b-transparent before:border-l-white before:border-t-transparent before:content-['']">
                <div className="mt-8 text-xs md:pt-0 md:text-sm">
                  조리 후 부피
                </div>
                <div className="">
                  <div className="text-center text-sm font-semibold md:text-lg">
                    {foodConversion.postVolume}
                  </div>
                  <div className="text-center text-xs text-muted-foreground md:text-sm">
                    g
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodConversionModal;
