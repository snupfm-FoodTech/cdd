import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCompanies } from '@/hooks/corporate.hook';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  LineChart,
  Brain,
  Hammer,
  Bot,
  HeartPulse,
  Handshake,
  CreditCard,
  BaggageClaim,
  Microscope,
  PackagePlus
} from 'lucide-react';
import { Company } from '@/types/corporate.type';
import { useRouter } from 'next/navigation';
import { CORPORATE_ARCHIVES_URL } from '@/constants/routes';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TruncateText from '@/components/ui/truncate-text';

interface CompanyCardProps {
  item: Company;
  onClickDetail: (item: Company) => void;
}

const CompanyCard = ({ item, onClickDetail }: CompanyCardProps) => {
  const COLOR_BG_CONSTANTS = [
    {
      bg: 'bg-orange-100',
      icon: <Brain />,
      colorIcon: 'text-orange-500'
    },
    {
      bg: 'bg-blue-100',
      icon: <Bot />,
      colorIcon: 'text-primary'
    },
    {
      bg: 'bg-red-100',
      icon: <HeartPulse />,
      colorIcon: 'text-red-500'
    },
    {
      bg: 'bg-green-100',
      icon: <Handshake />,
      colorIcon: 'text-green-500'
    },
    {
      bg: 'bg-yellow-100',
      icon: <CreditCard />,
      colorIcon: 'text-yellow-500'
    },
    {
      bg: 'bg-violet-100',
      icon: <BaggageClaim />,
      colorIcon: 'text-violet-500'
    },
    {
      bg: 'bg-amber-100',
      icon: <Hammer />,
      colorIcon: 'text-amber-500'
    },
    {
      bg: 'bg-lime-100',
      icon: <LineChart />,
      colorIcon: 'text-lime-500'
    },
    {
      bg: 'bg-sky-100',
      icon: <Microscope />,
      colorIcon: 'text-sky-500'
    },
    {
      bg: 'bg-purple-100',
      icon: <PackagePlus />,
      colorIcon: 'text-purple-500'
    }
  ];

  return (
    <div className="mb-5">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="mt-6 flex w-full justify-center">
          <p
            className={cn(
              'flex h-fit w-fit items-center justify-center gap-2 rounded-3xl px-4 py-1 text-sm font-bold',
              COLOR_BG_CONSTANTS[item.coTpId - 1].bg || 'bg-orange-100'
            )}
          >
            <span
              className={
                COLOR_BG_CONSTANTS[item.coTpId - 1].colorIcon ||
                COLOR_BG_CONSTANTS[0].colorIcon
              }
            >
              {COLOR_BG_CONSTANTS[item.coTpId - 1].icon ||
                COLOR_BG_CONSTANTS[0].icon}
            </span>
            <span>{item.coTpNm}</span>
          </p>
        </div>
        <div className="p-6 text-center">
          <TruncateText
            className="mb-2 text-xl font-semibold"
            line={1}
            text={`${item.coNm}`}
          />

          <div className="mb-2 h-16">
            <div className="flex min-w-0 justify-center">
              <TruncateText
                className="text-gray-600"
                line={2}
                text={`${item.coAddr}`}
              />
            </div>
          </div>

          <div className="flex justify-around">
            <Button
              type="button"
              onClick={() => onClickDetail(item)}
              variant="blue"
            >
              세부정보 보기
              <ChevronRightIcon className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionCompany = () => {
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

  const { data: companies, isPending } = useCompanies({
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

  const handleGoToCompany = () => {
    router.push(CORPORATE_ARCHIVES_URL);
  };

  if (isPending) {
    return (
      <div>
        <Skeleton className="h-60 w-full bg-gray-200" />
      </div>
    );
  }

  if (!companies) {
    return null;
  }

  return (
    <div className="py-4">
      <div className="items-left flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h3 className="text-2xl font-semibold text-primary">기업 아카이브</h3>
        <div className="flex items-center gap-2">
          <span className="mr-2 text-sm font-semibold">
            {currentSlide + 1}/{companies.companies.length}
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
          <Button type="button" onClick={handleGoToCompany} className="ml-2">
            모든 회사 보기
            <ChevronRightIcon className="ml-1 h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="mt-4 w-full">
        <Slider ref={sliderRef} {...settings} className="-mx-3">
          {companies.companies.map((company, index) => (
            <div key={index} className="px-3">
              <CompanyCard
                item={company}
                onClickDetail={() => {
                  router.push(`${CORPORATE_ARCHIVES_URL}/${company.coId}`);
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SectionCompany;
