'use client';

import { Icons } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { Button } from '@/components/ui/button';
import { CMS_NOTICES_CREATE_URL } from '@/constants/routes';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { useNotices } from '@/hooks/notice.hook';
import { NoticeSearchParams } from '@/types/notice.type';
import { useRouter } from 'next/navigation';
import { noticeColumns } from './components/notice-columns';
import NoticeTable from './components/notice-table';

const NoticePage = () => {
  const router = useRouter();

  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<NoticeSearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useNotices({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...searchCriteria
  });

  const handleClickCreate = () => {
    router.push(CMS_NOTICES_CREATE_URL);
  };

  const handleSearchBarSubmit = (valueSearch: string) => {
    handleSearch({
      ntcTit: valueSearch
    });
  };

  return (
    <div className="space-y-4">
      <SearchBarCard className="flex justify-between">
        <SearchBar
          onSearch={handleSearchBarSubmit}
          value={searchCriteria.ntcTit}
        />
        <Button onClick={handleClickCreate}>
          <Icons.add className="mr-1 h-5 w-5" />
          공지사항 등록
        </Button>
      </SearchBarCard>

      <NoticeTable
        columns={noticeColumns}
        data={data?.notices || []}
        total={data?.totalRecordNo || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
};

export default NoticePage;
