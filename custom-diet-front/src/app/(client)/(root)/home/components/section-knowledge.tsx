import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  useIncreaseKnowledgeViewCount,
  useListKnowledge
} from '@/hooks/knowledge.hook';
import { Knowledge } from '@/types/knowledge.type';
import { KNOWLEDGE_ARCHIVES_URL } from '@/constants/routes';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import { BASE_PATH } from '@/constants';
import { Button } from '@/components/ui/button';
import TruncateText from '@/components/ui/truncate-text';

const DEFAULT_IMG_URL = `${BASE_PATH}/img/knowledge.png`;

interface ItemCardProps {
  item: Knowledge;
  onClickDetail: (item: Knowledge) => void;
}

const ItemCard = ({ item, onClickDetail }: ItemCardProps) => (
  <div className="mb-5">
    <div className="overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="p-6 text-center">
        <TruncateText
          className="mb-2 mt-3 text-xl font-semibold"
          line={1}
          text={`${item.kwlgTit}`}
        />

        <div className="mb-2 h-20">
          <div className="flex w-full min-w-0 justify-center">
            <TruncateText
              className="text-gray-600"
              line={2}
              text={`${item.kwlgAut}`}
            />
          </div>
        </div>

        <div className="flex justify-around">
          <Button
            type="button"
            onClick={(event) => {
              const RIGHT_CLICK_BUTTON = 2;
              if (event.button === RIGHT_CLICK_BUTTON) return;
              onClickDetail(item);
            }}
            variant="blue"
          >
            링크
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const SectionKnowledge = () => {
  const sliderRef = useRef<Slider>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: autoplay,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
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

  const mutation = useIncreaseKnowledgeViewCount();

  const { data: knowledgeList, isPending: isKnowledgePending } =
    useListKnowledge({
      page: 1,
      limit: 10,
      orderByField: 'creDt',
      isDesc: true
    });

  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
    if (!autoplay) {
      sliderRef?.current?.slickPlay();
    }
  };

  const handleGoToKnowledge = () => {
    router.push(KNOWLEDGE_ARCHIVES_URL);
  };

  const handleLinkClick = (item: Knowledge) => {
    if (item.kwlgId) {
      mutation.mutate(item.kwlgId);
      window.open(item.kwlgLinkUrl, '_blank');
    }
  };

  if (isKnowledgePending || mutation.isPending) {
    return (
      <div className="my-2">
        <Skeleton className="h-60 w-full bg-gray-200" />
      </div>
    );
  }

  if (!knowledgeList) {
    return null;
  }

  return (
    <div className="py-4">
      <div className="items-left flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-2xl font-semibold text-primary">지식 아카이브</h3>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm font-semibold">
            {currentSlide + 1}/{knowledgeList.knowledges.length}
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
          <Button type="button" onClick={handleGoToKnowledge} className="ml-2">
            모든 지식 보기
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Slider ref={sliderRef} {...settings} className="-mx-3">
          {knowledgeList.knowledges.map((item, index) => (
            <div key={index} className="px-3">
              <ItemCard
                item={item}
                onClickDetail={() => handleLinkClick(item)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionKnowledge;
