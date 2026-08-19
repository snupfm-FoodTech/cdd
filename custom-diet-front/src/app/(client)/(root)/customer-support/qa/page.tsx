'use client';

import { keepPreviousData } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { IUserData } from '@/api-client/auth.api';
import { Icons } from '@/components/icons';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Button } from '@/components/ui/button';
import { USER_QA_ASK_URL } from '@/constants/routes';
import { useQA } from '@/hooks/qa.hook';
import Link from 'next/link';
import { QAColumns } from '../components/qa/qa-columns';
import QATable from '../components/qa/qa-table';
import { useRouter } from 'next/navigation';
import { checkTokenExisted } from '@/utils';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { BASE_PATH } from '@/constants';

export default function QAPage() {
  const userData: IUserData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;

  const router = useRouter();

  useEffect(() => {
    checkTokenExisted(router);
  }, [router]);

  const { pagination, updatePaginationState } = useDynamicPagination({
    initialSearchParams: { queUsrId: userData?.usrId },
    pageSize: 10
  });

  const { data, isLoading } = useQA(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      queUsrId: userData.usrId
    },
    {
      placeholderData: keepPreviousData
    }
  );

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-qa.png`}
        title="질의응답"
        breadcrumbs={[{ label: 'Q&A' }]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full flex-col gap-4 lg:w-[80vw]">
          <div className="flex justify-end">
            <Link href={USER_QA_ASK_URL}>
              <Button>
                <Icons.add className="mr-1 h-5 w-5" />
                문의하기
              </Button>
            </Link>
          </div>
          <QATable
            columns={QAColumns}
            data={data?.userQuestions || []}
            total={data?.totalRecordNo || 0}
            pagination={pagination}
            onPaginationChange={updatePaginationState}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
