'use client';

import { keepPreviousData } from '@tanstack/react-query';
import { useNotices } from '@/hooks/notice.hook';
import { NoticeSearchParams } from '@/types/notice.type';

import { noticeColumns } from '@/app/(client)/(root)/customer-support/components/notice/notice-columns';
import SearchBar from '@/components/search-bar';
import NoticeTable from '../components/notice/notice-table';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { BASE_PATH } from '@/constants';

export default function UserNoticePage() {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<NoticeSearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useNotices(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      ntcTit: searchCriteria.ntcTit
    },
    {
      placeholderData: keepPreviousData
    }
  );

  const handleSearchBarSubmit = (value: string) => {
    handleSearch({
      ...searchCriteria,
      ntcTit: value
    });
  };

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-notice.png`}
        title="공지사항"
        breadcrumbs={[{ label: '공지사항' }]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full flex-col gap-4 lg:w-[80vw]">
          <div className="flex justify-end">
            <SearchBar
              onSearch={handleSearchBarSubmit}
              value={searchCriteria.ntcTit}
            />
          </div>
          <NoticeTable
            columns={noticeColumns}
            data={data?.notices || []}
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
