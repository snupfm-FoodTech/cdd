/* eslint-disable @next/next/no-img-element */
'use client';

import ClientHeaderBusinessSolution from '@/components/layout/client/client-header-business-solution';
import { Skeleton } from '@/components/ui/skeleton';
import { BASE_PATH } from '@/constants';
import {
  useOpenSolutionContents,
  useOpenSolutionTypes
} from '@/hooks/open.hook';
import { BusinessSolutionTabs } from './components/business-solution-tabs';
import {
  BUSINESS_SOLUTION_CONTENT_URL,
  CONSULTATION_REQUEST_URL
} from '@/constants/routes';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Base64Image } from '@/components/ui/base64-image';
import { useRouter, useSearchParams } from 'next/navigation';

const businessSolutionParams = {
  page: 1,
  limit: 9999
};

const BusinessSolution = () => {
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: solutionTypes,
    isError: isErrorSolutionTypes,
    isLoading: isLoadingSolutionTypes
  } = useOpenSolutionTypes(businessSolutionParams);

  const {
    data: contents,
    isError: isErrorContents,
    isLoading: isLoadingContents
  } = useOpenSolutionContents({
    page: businessSolutionParams.page,
    limit: businessSolutionParams.limit,
    typeId: selectedTypeId ? selectedTypeId : 0
  });

  useEffect(() => {
    const q = searchParams.get('typeId');
    if (q) {
      const n = Number(q);
      if (!Number.isNaN(n)) setSelectedTypeId(n);
    }
  }, [searchParams]);

  useEffect(() => {
    if (solutionTypes?.data?.length && selectedTypeId == null) {
      setSelectedTypeId(solutionTypes.data[0].id);
    }
  }, [solutionTypes, selectedTypeId]);

  const renderSolutionTypes = () => {
    if (isErrorSolutionTypes) {
      return (
        <div className="section-padding">
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
            <div className="mb-2 text-base font-semibold text-destructive">
              솔루션 목록을 불러올 수 없습니다.
            </div>
          </div>
        </div>
      );
    }

    if (isLoadingSolutionTypes || isLoadingContents) {
      return (
        <div className="section-padding">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (solutionTypes?.data?.length === 0) {
      return (
        <div className="section-padding">
          <div className="rounded-xl border bg-white p-4">
            <div className="mb-2 text-base font-semibold text-gray-400">
              관리자 페이지에서 새 솔루션을 추가하거나 나중에 다시 시도해주세요.
            </div>
          </div>
        </div>
      );
    }

    if (!solutionTypes) return null;

    return (
      <div className="section-padding">
        <BusinessSolutionTabs
          items={solutionTypes.data}
          value={selectedTypeId?.toString() ?? ''}
          onValueChange={(val) => setSelectedTypeId(Number(val))}
        />
      </div>
    );
  };

  const renderContents = () => {
    if (!contents) return null;
    if (!contents.data) return null;
    const localContents = contents.data;

    if (localContents.length === 0) {
      return (
        <div className="section-padding mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {/* Empty state (replace with your mapped content later) */}
          <div className="col-span-full rounded-lg border bg-white p-8 text-center text-sm text-muted-foreground">
            등록된 콘텐츠가 없습니다.
          </div>
        </div>
      );
    } else {
      return (
        <div className="section-padding mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {localContents.map((item) => (
            <div
              key={item.id}
              className="flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
              onClick={() => {
                if (!selectedTypeId) return;
                window.location.href = BUSINESS_SOLUTION_CONTENT_URL(
                  selectedTypeId,
                  item.id
                );
              }}
            >
              {/* Icon */}
              <div className="mb-3 flex items-center">
                <Base64Image
                  src={item.iconUrl}
                  alt={item.title}
                  className="h-14 w-14 rounded-lg object-contain md:h-20 md:w-20"
                />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold text-slate-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-3 text-sm text-slate-600">
                {item.subTitle}
              </p>

              {/* Tag */}
              <div className="w-fit">
                {item.tag && (
                  <Badge className="px-2 text-sm md:px-3 md:text-base">
                    {item.tag}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <ClientHeaderBusinessSolution
        ctaHref={CONSULTATION_REQUEST_URL}
        image={`${BASE_PATH}/img/bg-knowledge.png`}
        title="맞춤 식이 비즈 솔루션"
        breadcrumbs={[{ label: '맞춤 식이 비즈 솔루션' }]}
      />
      <div className="my-4 flex flex-col gap-4">
        <div>{renderSolutionTypes()}</div>
        <div>{renderContents()}</div>
      </div>
    </div>
  );
};

export default BusinessSolution;
