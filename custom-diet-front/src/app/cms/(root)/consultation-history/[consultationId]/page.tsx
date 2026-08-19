'use client';

import BackButton from '@/components/back-button';
import { Spinner } from '@/components/spinner';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_CONSULTATION_URL } from '@/constants/routes';
import { useConsultationById } from '@/hooks/consultation.hook';

interface ConsultationDetailProps {
  params: { consultationId: string };
}

export default function CMSConsultationDetailPage({
  params
}: ConsultationDetailProps) {
  const { consultationId } = params;

  const { data: dataDetailById, isLoading } =
    useConsultationById(consultationId);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  const iconMapSolutionTypes = {
    '01': '📋',
    '02': '💡',
    '03': '📝',
    '04': '👨‍🏫',
    '05': '➕'
  } as const;

  const iconMapSolutionTargets = {
    '01': '👤',
    '02': '👴',
    '03': '🏥',
    '04': '🌱',
    '05': '➕'
  } as const;

  return (
    <div className="cms-qa-detail">
      <div className="flex items-center gap-4">
        <BackButton
          url={CMS_CONSULTATION_URL}
          label={CMS_BACK_TO_LIST_TITLE}
          size="large"
        />
      </div>

      {/* ✅ Title */}
      <h2 className="mb-4 mt-8 text-xl font-bold tracking-tight">
        상담신청내역 - {consultationId}
      </h2>

      {/* ✅ Body */}
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-4 lg:w-4/5">
          <div className="rounded-lg border-2 bg-secondary p-4">
            <h2 className="mb-4 font-bold">신청자 정보</h2>
            <div className="grid grid-cols-2 gap-2">
              <p>신청자명</p>
              <p>{dataDetailById?.senderName}</p>
              <p>휴대폰 번호</p>
              <p>{dataDetailById?.senderPhoneNo}</p>
              <p>이메일</p>
              <p className="wrap-anywhere">{dataDetailById?.senderEmail}</p>
            </div>
          </div>

          <div className="rounded-lg border-2 bg-secondary p-4">
            <h2 className="mb-4 font-bold">기업 정보</h2>
            <div className="grid grid-cols-2 gap-2">
              <p>기업 푸드테크 분야</p>
              <p>{dataDetailById?.foodTech.content}</p>
              <p>기업명</p>
              <p className="wrap-anywhere">{dataDetailById?.companyName}</p>
              <p>사업자등록번호</p>
              <p>{dataDetailById?.companyBizNo}</p>
              <p>기업주소</p>
              <p className="wrap-anywhere">
                {dataDetailById?.companyAddress.content}
              </p>
            </div>
          </div>

          <div className="rounded-lg border-2 bg-secondary p-4">
            <h2 className="mb-4 font-bold">솔루션 신청내용</h2>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <p>제목</p>
              <p className="wrap-anywhere font-medium">{dataDetailById?.solutionTitle}</p>
            </div>
            <div className="w-full rounded-lg bg-white p-4">
              <p className="wrap-anywhere">{dataDetailById?.solutionDetail}</p>
            </div>
          </div>

          <div className="rounded-lg border-2 bg-[#f3f7fa] p-4">
            <h2 className="mb-4 font-bold">솔루션</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {dataDetailById?.solutionTypes?.map((solutionType, index) => (
                <div
                  key={`solution-type-${solutionType.code}-${index}`}
                  className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl bg-[#234784] p-6 text-center text-white"
                >
                  <div className="mb-4 text-4xl">
                    {iconMapSolutionTypes[
                      solutionType.code as keyof typeof iconMapSolutionTypes
                    ] || '📋'}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {solutionType.content}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-200">
                    {solutionType.description}
                  </p>
                </div>
              )) || (
                <div className="col-span-full py-8 text-center text-gray-500">
                  선택된 솔루션이 없습니다.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg border-2 bg-[#f3f7fa] p-4">
            <h2 className="mb-4 font-bold">솔루션 대상</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {dataDetailById?.solutionTargets?.map((solutionTarget, index) => (
                <div
                  key={`solution-target-${solutionTarget.code}-${index}`}
                  className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl bg-[#234784] p-6 text-center text-white"
                >
                  <div className="mb-4 text-4xl">
                    {iconMapSolutionTargets[
                      solutionTarget.code as keyof typeof iconMapSolutionTargets
                    ] || '👤'}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">
                    {solutionTarget.content}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-200">
                    {solutionTarget.description}
                  </p>
                </div>
              )) || (
                <div className="col-span-full py-8 text-center text-gray-500">
                  선택된 솔루션 대상이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
