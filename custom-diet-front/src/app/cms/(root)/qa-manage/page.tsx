'use client';

import { QAColumns } from '@/app/cms/(root)/qa-manage/components/qa-columns';
import QATable from '@/app/cms/(root)/qa-manage/components/qa-table';
import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { useQA } from '@/hooks/qa.hook';
import { QASearchParams } from '@/types/qa.type';
import { keepPreviousData } from '@tanstack/react-query';

export default function CustomerSupportPage() {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<QASearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useQA(
    {
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      title: searchCriteria.title
    },
    {
      placeholderData: keepPreviousData
    }
  );

  const handleSearchBarSubmit = (value: string) => {
    handleSearch({
      ...searchCriteria,
      title: value
    });
  };

  return (
    <div className="space-y-4">
      <SearchBarCard className="flex justify-between">
        <SearchBar
          onSearch={handleSearchBarSubmit}
          value={searchCriteria.title}
        />
      </SearchBarCard>
      <QATable
        columns={QAColumns}
        data={data?.userQuestions || []}
        total={data?.totalRecordNo || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
}
