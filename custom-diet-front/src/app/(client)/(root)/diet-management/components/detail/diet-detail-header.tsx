import { DietDetail } from '@/types/diet.type';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Copy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { DIET_MANAGEMENT_UPDATE_URL } from '@/constants/routes';
import { FavouriteFlag } from '@/types';
import { Button } from '@/components/ui/button';
import TruncateText from '@/components/ui/truncate-text';
import Image from 'next/image';
import { BASE_PATH } from '@/constants';
import DietGuideDialog from '../diet-guide-dialog';
import DietCopyDialog from '../diet-copy-dialog';
import { useState } from 'react';

const DietDetailHeader = ({ detail }: { detail: DietDetail }) => {
  const router = useRouter();
  const [isCopyOpen, setIsCopyOpen] = useState(false);

  const goToUpdate = () => {
    router.push(`${DIET_MANAGEMENT_UPDATE_URL}/${detail?.id}`);
  };

  return (
    // Wrapper keeps aspect ratio on desktop, fixed height on mobile
    <div className="relative h-[12rem] w-full overflow-hidden 2xl:aspect-[1882/386] 2xl:h-auto">
      {/* Background image with overlay */}
      <Image
        src={`${BASE_PATH}/img/bg-diet-detail.png`}
        alt="Background"
        fill
        priority
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />
      {/* <div className="absolute inset-0 z-0 bg-black/50" />{' '} */}
      {/* overlay for readability */}
      {/*
        사용법은 이 식단에 대한 동작이 아니라 화면 전체 안내라,
        식단 정보 수정·복사와 같은 줄에 두지 않고 오른쪽 위에 띄운다.
      */}
      <div className="section-padding absolute inset-x-0 top-0 z-20 flex justify-end pt-6 md:pt-8 lg:pt-10">
        <DietGuideDialog className="h-9 border-white bg-white/95 px-3 text-foreground hover:bg-white md:h-10 md:px-4" />
      </div>

      {/* Content block */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="section-padding w-full text-left">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Title with favourite star */}
            <div className="flex items-center">
              {detail?.favouriteFlag === FavouriteFlag.Yes && (
                <Star
                  fill="#ffc30f"
                  color="#ffc30f"
                  className="h-5 w-5 md:h-7 md:w-7"
                />
              )}
              <h2
                className={cn('text-lg font-bold text-white 2xl:text-2xl', {
                  'ml-3': detail?.favouriteFlag === FavouriteFlag.Yes
                })}
              >
                {detail?.name}
              </h2>
            </div>

            {/* Description */}
            <TruncateText
              className="text-sm font-semibold text-white md:text-base"
              line={1}
              text={detail?.description}
            />

            {/* Action button */}
            <div className="flex w-fit flex-wrap items-center gap-2">
              <Button type="button" onClick={goToUpdate}>
                <div className="flex items-center gap-2">
                  <Pencil1Icon className="h-4 w-4" />
                  <span>식단 정보 수정</span>
                </div>
              </Button>
              {/* 이미 기준에 맞춰 둔 식단에서 변형을 뜰 때 쓴다 */}
              <Button
                type="button"
                variant="outline"
                className="border-white bg-white/95 text-foreground hover:bg-white"
                onClick={() => setIsCopyOpen(true)}
              >
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  <span>복사</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DietCopyDialog
        dietId={detail?.id}
        dietName={detail?.name}
        open={isCopyOpen}
        onOpenChange={setIsCopyOpen}
      />
    </div>
  );
};

export default DietDetailHeader;
