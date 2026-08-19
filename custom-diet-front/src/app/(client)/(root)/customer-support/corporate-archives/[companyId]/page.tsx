'use client';

import BackButton from '@/components/back-button';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Spinner } from '@/components/spinner';
import NotFoundData from '@/components/ui/not-found-data';
import { BASE_PATH } from '@/constants';
import { CORPORATE_ARCHIVES_URL } from '@/constants/routes';
import {
  useCompany,
  useIncreaseCompanyViewCount
} from '@/hooks/corporate.hook';
import { ensureProtocol } from '@/utils';
import { loadImage } from '@/utils/file.util';
import { formatBusinessNumber, formatCompanyNumber } from '@/utils/format.util';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface CorporateInfoProps {
  params: { companyId: string };
}

const CorporateInfo = ({ params }: CorporateInfoProps) => {
  const { companyId } = params;
  const { data: company, isLoading } = useCompany(companyId);
  const mutation = useIncreaseCompanyViewCount();
  const hasIncreasedViewCount = useRef(false);

  useEffect(() => {
    if (company && companyId && !hasIncreasedViewCount.current) {
      mutation.mutate(companyId);
      hasIncreasedViewCount.current = true;
    }
  }, [company, companyId, mutation]);

  if (isLoading) {
    return (
      <div className="mt-10 flex h-52 items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!company)
    return <NotFoundData backUrl={CORPORATE_ARCHIVES_URL} label="기업 정보" />;

  const safe = (value: any) =>
    value === null || value === undefined || value === '' ? '' : value;

  const rows = [
    ['기업명', safe(company.coNm), '영문기업명', safe(company.coEngNm)],
    [
      '사업자번호',
      safe(formatBusinessNumber(company.coBizNo)),
      '법인번호',
      safe(formatCompanyNumber(company.coNo))
    ],
    ['대표자명', safe(company.coRepNm), '직원수', safe(company.coTtlEmpNo)],
    ['설립 형태', safe(company.coEstFom), '설립 일자', safe(company.coEstDt)],
    ['기업 형태', safe(company.coFom), '기업 규모', safe(company.coSzNm)],
    ['전화번호', safe(company.coPhnNo), '팩스번호', safe(company.coPalsNo)],
    ['홈페이지', safe(company.coHpgUrl), '이메일', safe(company.coEml)],
    ['주소', safe(company.coAddr), '업종(KSIC 10차)', safe(company.coIndus)]
  ];

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-corporate-archive.png`}
        title={company.coNm || '기업 정보'}
        breadcrumbs={[
          { label: '기업 아카이브', url: CORPORATE_ARCHIVES_URL },
          { label: company.coNm || '기업 정보' }
        ]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full max-w-[80rem] flex-col gap-4">
          <BackButton
            url={CORPORATE_ARCHIVES_URL}
            label={company.coNm || '기업 정보'}
            size="large"
          />

          {/* Desktop version */}
          <div className="hidden md:block">
            <table className="w-full table-auto overflow-hidden rounded-lg shadow">
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td className="border bg-secondary px-4 py-2 font-medium">
                      {row[0]}
                    </td>
                    <td className="border px-4 py-2">
                      {row[0] === '홈페이지' && row[1] !== '' ? (
                        <a
                          href={ensureProtocol(row[1])}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          {row[1]}
                        </a>
                      ) : (
                        row[1]
                      )}
                    </td>
                    <td className="border bg-secondary px-4 py-2 font-medium">
                      {row[2]}
                    </td>
                    <td className="border px-4 py-2">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile version */}
          <div className="block md:hidden">
            <div className="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow">
              {rows.map((row, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="text-sm font-medium text-gray-600">
                    {row[0]}
                  </div>
                  <div className="break-all text-base text-black">
                    {row[0] === '홈페이지' && row[1] !== '' ? (
                      <a
                        href={ensureProtocol(row[1])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        {row[1]}
                      </a>
                    ) : (
                      row[1]
                    )}
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-600">
                    {row[2]}
                  </div>
                  <div className="break-all text-base text-black">{row[3]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">기업 주요 상품 및 서비스</h4>
            {company.coImgUrls?.length ? (
              <div className="flex justify-center">
                <Image
                  src={loadImage(company.coImgUrls[0])}
                  alt="Company's main products and services"
                  width={1000}
                  height={0}
                  quality={100}
                  objectFit="contain"
                  className="h-auto"
                />
              </div>
            ) : (
              <div>이미지 없음</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateInfo;
