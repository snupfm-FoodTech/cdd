/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ChevronRight as ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BASE_PATH } from '@/constants';
import {
  BUSINESS_SOLUTION_URL,
  DIET_MANAGEMENT_URL
} from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Slide = {
  id: number;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonHref: string;
  bgSrc: string;
  align: 'left' | 'center' | 'right';
  buttonIcon: 'left' | 'right';
  titleClassName?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'CCD: Customized Diet Design',
    description: (
      <>
        <span className="font-bold text-primary">국내 최대 식이 데이터베이스</span>
        와 <span className="font-bold text-primary">알고리즘을 기반</span>으로,
        <br />
        맞춤형 식이를 설계하고{' '}
        <span className="font-bold text-primary">
          맞춤 식이 비즈니스 솔루션을 제공하는 플랫폼
        </span>
      </>
    ),
    buttonText: '맞춤 식단 시작하기',
    buttonHref: DIET_MANAGEMENT_URL,
    bgSrc: '/img/landing-3.png',
    align: 'center',
    buttonIcon: 'right',
    titleClassName: 'mx-auto w-fit whitespace-nowrap'
  },
  {
    id: 2,
    title: '맞춤형 식이 설계 프로그램',
    description: (
      <>
        식단에서부터 가공식품, 원재료까지 영양성분 등
        <br />
        <span className="font-bold text-primary">
          다양한 특성 정보를 기반
        </span>
        으로 맞춤 식단을 설계하는
        <br />
        <span className="font-bold text-primary">
          &apos;맞춤형 식이 설계 프로그램&apos;
        </span>
      </>
    ),
    buttonText: '맞춤 식단 만들기',
    buttonHref: DIET_MANAGEMENT_URL,
    bgSrc: '/img/landing-1.png',
    align: 'left',
    buttonIcon: 'right'
  },
  {
    id: 3,
    title: '맞춤형 식이 비즈 솔루션',
    description: (
      <>
        개인맞춤형 식이 비즈니스를 하고자 하는{' '}
        <span className="font-bold text-primary">
          기업의 니즈에 맞춤
        </span>
        으로
        <br />
        <span className="font-bold text-primary">맞춤형 식이 솔루션 제공</span>
      </>
    ),
    buttonText: '비즈 솔루션 상담',
    buttonHref: BUSINESS_SOLUTION_URL,
    bgSrc: '/img/landing-4.png',
    align: 'right',
    buttonIcon: 'left'
  }
];

export default function SectionBannerCarousel() {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <section className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => {
            return (
              <article
                key={slide.id}
                className="relative h-[360px] flex-[0_0_100%] overflow-hidden sm:h-[420px] md:h-[440px]"
              >
                <img
                  src={`${BASE_PATH}${slide.bgSrc}`}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative z-10 mx-auto flex h-full w-full items-center px-5 sm:px-8 md:px-10 lg:px-12">
                  <div
                    className={cn(
                      'max-w-[620px]',
                      slide.align === 'left' && 'text-left',
                      slide.align === 'center' &&
                        'mx-auto flex w-full max-w-[900px] flex-col items-center text-center',
                      slide.align === 'right' && 'ml-auto text-right'
                    )}
                  >
                    <h2
                      className={cn(
                        'text-[28px] font-extrabold leading-tight text-primary sm:text-[32px] md:text-[40px] lg:text-[56px]',
                        slide.titleClassName
                      )}
                    >
                      {slide.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg md:text-xl">
                      {slide.description}
                    </p>

                    <div className="mt-6">
                      <Button
                        size="lg"
                        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => router.push(slide.buttonHref)}
                      >
                        {slide.buttonIcon === 'left' ? (
                          <ArrowLeft className="h-5 w-5" />
                        ) : null}
                        {slide.buttonText}
                        {slide.buttonIcon === 'right' ? (
                          <ArrowRight className="h-5 w-5" />
                        ) : null}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              'h-3 w-3 rounded-full border border-foreground/30 transition',
              selectedIndex === index
                ? 'border-primary bg-primary'
                : 'bg-white hover:bg-foreground/10'
            )}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </section>
  );
}
