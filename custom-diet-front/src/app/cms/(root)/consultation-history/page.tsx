'use client';

import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { useConsultation } from '@/hooks/consultation.hook';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import ConsultationTable from './components/consultation-table';
import { ConsultationColumns } from './components/consultation-columns';
import { ConsultationSearchParams } from '@/types/consultation.type';

export default function ConsultationPage() {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<ConsultationSearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useConsultation({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const handleSearchBarSubmit = (value: string) => {
    handleSearch({
      ...searchCriteria,

      keyword: value
    });
  };

  return (
    <div className="space-y-4">
      {/* <SearchBarCard className="flex justify-between">
        <SearchBar
          onSearch={handleSearchBarSubmit}
          value={searchCriteria.keyword}
        />
      </SearchBarCard> */}
      <ConsultationTable
        columns={ConsultationColumns}
        data={data?.data || []}
        total={data?.meta.totalItems || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
}
