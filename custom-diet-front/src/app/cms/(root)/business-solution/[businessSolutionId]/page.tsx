/* eslint-disable @next/next/no-img-element */
'use client';

import BackButton from '@/components/back-button';
import { Spinner } from '@/components/spinner';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import {
  CMS_BUSINESS_SOLUTION_CONTENT_CREATE_URL,
  CMS_BUSINESS_SOLUTION_CONTENT_UPDATE_URL,
  CMS_BUSINESS_SOLUTION_CREATE_URL,
  CMS_BUSINESS_SOLUTION_UPDATE_URL,
  CMS_BUSINESS_SOLUTION_URL
} from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  useDeleteSolutionType,
  useSolutionContents,
  useSolutionType
} from '@/hooks/solution.hook';
import { useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Base64Image } from '@/components/ui/base64-image';
import NotFoundData from '@/components/ui/not-found-data';
import { AlertModal } from '@/components/modal/alert-modal';
import { useState } from 'react';

export default function CMSBusinessSolutionDetailPage() {
  const router = useRouter();
  const { businessSolutionId } = useParams();
  const { data: detail, isLoading } = useSolutionType(
    businessSolutionId ? Number(businessSolutionId) : 0
  );

  const [showAlert, setShowAlert] = useState(false);

  const {
    data: contents,
    isLoading: isLoadingContents,
    isError: isErrorContents
  } = useSolutionContents({
    page: 1,
    limit: 9999,
    typeId: detail ? detail.id : 0
  });

  const mutateDelete = useDeleteSolutionType();

  if (isLoading || isLoadingContents || mutateDelete.isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!detail) {
    return (
      <NotFoundData
        className="w-full px-8 pt-4"
        labelSize="medium"
        backUrl={CMS_BUSINESS_SOLUTION_URL}
        label={CMS_BACK_TO_LIST_TITLE}
      />
    );
  }

  const renderContents = () => {
    if (!contents) return null;
    if (!contents.data) return null;
    const localContents = contents.data;

    if (localContents.length === 0) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {/* Empty state (replace with your mapped content later) */}
          <div className="col-span-full rounded-lg border bg-white p-8 text-center text-sm text-muted-foreground">
            등록된 콘텐츠가 없습니다.
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {localContents.map((item) => (
            <div
              onClick={() => {
                window.location.href = CMS_BUSINESS_SOLUTION_CONTENT_UPDATE_URL(
                  Number(businessSolutionId),
                  item.id
                );
              }}
              key={item.id}
              className="flex cursor-pointer flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              {/* Icon */}
              <div className="mb-3 flex items-center">
                <Base64Image
                  src={item.iconUrl}
                  alt={item.title}
                  className="h-14 w-14 rounded-lg object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="mb-2 text-lg font-bold text-slate-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm text-slate-600">{item.subTitle}</p>

              {/* Tag */}
              {item.tag && (
                <span className="inline-block w-fit rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
                  {item.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  const handleDelete = async () => {
    try {
      await mutateDelete.mutateAsync(
        businessSolutionId ? Number(businessSolutionId) : 0
      );
      setShowAlert(false);
      router.push(CMS_BUSINESS_SOLUTION_URL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <AlertModal
        title="삭제 하시겠습니까?"
        description="삭제 시 복구할 수 없습니다."
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleDelete}
        loading={mutateDelete.isPending}
      />
      <div className="cms-qa-detail">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <BackButton
            url={CMS_BUSINESS_SOLUTION_URL}
            label={CMS_BACK_TO_LIST_TITLE}
            size="large"
          />
          <div className="flex gap-4">
            <Button
              size="sm"
              className="w-32 gap-2"
              variant="outline"
              onClick={() =>
                router.push(
                  CMS_BUSINESS_SOLUTION_UPDATE_URL(String(businessSolutionId))
                )
              }
            >
              <Icons.edit size={16} />
              편집
            </Button>
            <Button
              size="sm"
              className="w-32 gap-2"
              variant="destructive"
              onClick={() => setShowAlert(true)}
            >
              <Icons.trash2 size={16} />
              삭제
            </Button>
          </div>
        </div>

        {/* Main */}
        <div className="mt-4 flex w-full justify-between gap-4">
          <div className="flex w-full flex-col gap-4">
            {/* Header Card */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                {/* Right: basic info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                      No.{detail.id}
                    </span>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                      {new Date(detail.updatedDate).toLocaleString()}
                    </span>
                  </div>

                  <h2 className="mt-2 text-xl font-bold md:text-2xl">
                    {detail.title}
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {detail.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">
                      태그
                    </span>
                    <Badge>{detail.tag || '—'}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Action + Content grid */}
            <div className="rounded-xl border bg-[#f8fafc] p-5">
              {/* Action */}
              <div className="mb-4 flex justify-end">
                <Button
                  onClick={() => {
                    router.push(
                      CMS_BUSINESS_SOLUTION_CONTENT_CREATE_URL(
                        String(businessSolutionId)
                      )
                    );
                  }}
                >
                  <Icons.add className="mr-1 h-5 w-5" />
                  콘텐츠 등록
                </Button>
              </div>

              {renderContents()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
