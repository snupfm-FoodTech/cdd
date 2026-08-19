import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useNotices } from '@/hooks/notice.hook';
import { Notice } from '@/types/notice.type';
import { CLIENT_NOTICE_URL } from '@/constants/routes';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TruncateText from '@/components/ui/truncate-text';

interface ItemCardProps {
  item: Notice;
  onClickDetail: (item: Notice) => void;
}

const ItemCard = ({ item, onClickDetail }: ItemCardProps) => (
  <div className="p-4">
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <div
        className="flex h-10 cursor-pointer items-center bg-primary/50 p-6"
        onClick={() => onClickDetail(item)}
      >
        <TruncateText
          className="text-xl font-semibold text-white"
          line={1}
          text={`${item.ntcTit}`}
        />
      </div>
      <div className="h-28 w-full p-6">
        <div className="flex w-full min-w-0">
          <TruncateText
            className="text-gray-600"
            line={2}
            text={`${item.ntcCtnt}`}
          />
        </div>
      </div>
    </div>
  </div>
);

const SectionNotices = () => {
  const sliderRef = useRef<Slider>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    className: 'center',
    centerMode: true,
    dots: true,
    infinite: true,
    autoplay: autoplay,
    autoplaySpeed: 2000,
    rows: 2,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    afterChange: (index: number) => setCurrentSlide(index)
  };

  const router = useRouter();

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
    if (!autoplay) {
      sliderRef?.current?.slickPlay();
    }
  };

  const handleGoToNotices = () => {
    router.push(CLIENT_NOTICE_URL);
  };

  const handleClickDetail = (item: Notice) => {
    router.push(`${CLIENT_NOTICE_URL}/${item.ntcId}`);
  };

  const { data: notices, isPending: isNoticePending } = useNotices({
    page: 1,
    limit: 10,
    orderByField: 'creDt',
    isDesc: true
  });

  if (isNoticePending) {
    return (
      <div className="py-8">
        <Skeleton className="h-60 w-full bg-gray-200" />
      </div>
    );
  }

  if (!notices) {
    return null;
  }

  return (
    <div className="py-4">
      <div className="items-left flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-2xl font-semibold text-primary">공지사항</h3>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm font-semibold">
            {currentSlide + 1}/{Math.round(notices.notices.length / 2)}
          </span>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-200"
            onClick={toggleAutoplay}
          >
            {autoplay ? (
              <PauseIcon className="h-4 w-4 text-gray-600" />
            ) : (
              <PlayIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-200"
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
          </button>
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-200"
            onClick={() => sliderRef?.current?.slickNext()}
          >
            <ChevronRightIcon className="h-4 w-4 text-gray-600" />
          </button>
          <Button type="button" onClick={handleGoToNotices} className="ml-2">
            모든 공지사항 보기
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* ✅ Fixed bug related to "react-slick Slider" space hight in this div */}
      <div className="mt-4 w-full [&_.slick-list]:h-auto [&_.slick-slider]:h-auto [&_.slick-track:after]:hidden [&_.slick-track:before]:hidden [&_.slick-track]:flex [&_.slick-track]:h-auto">
        <Slider ref={sliderRef} {...settings}>
          {notices.notices.map((item, index) => (
            <ItemCard
              key={index}
              item={item}
              onClickDetail={handleClickDetail}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionNotices;
