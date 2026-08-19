import { DietDetail } from '@/types/diet.type';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { DIET_MANAGEMENT_UPDATE_URL } from '@/constants/routes';
import { FavouriteFlag } from '@/types';
import { Button } from '@/components/ui/button';
import TruncateText from '@/components/ui/truncate-text';
import Image from 'next/image';
import { BASE_PATH } from '@/constants';

const DietDetailHeader = ({ detail }: { detail: DietDetail }) => {
  const router = useRouter();

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
            <div className="w-fit">
              <Button type="button" onClick={goToUpdate}>
                <div className="flex items-center gap-2">
                  <Pencil1Icon className="h-4 w-4" />
                  <span>식단 정보 수정</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietDetailHeader;
