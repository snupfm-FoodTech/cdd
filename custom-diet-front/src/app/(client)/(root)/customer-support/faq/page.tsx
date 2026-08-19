'use client';

import SearchBar from '@/components/search-bar';
import { useFAQ } from '@/hooks/faq.hook';
import { faqColumns } from '../components/faq/faq-columns';
import FAQTable from '../components/faq/faq-table';
import { FAQSearchParam } from '@/types/faq.type';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { BASE_PATH } from '@/constants';

export default function UserFAQPage() {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<FAQSearchParam>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useFAQ({
    ...searchCriteria,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const handleSearchBarSubmit = (valueSearch: string) => {
    handleSearch({ faqQueCtnt: valueSearch });
  };

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-faq.png`}
        title="자주묻는질문"
        breadcrumbs={[{ label: '자주묻는질문' }]}
      />
      <div className="section-padding section-padding-y flex justify-center">
        <div className="flex w-full flex-col gap-4 lg:w-[80vw]">
          <div className="flex justify-end">
            <SearchBar
              onSearch={handleSearchBarSubmit}
              value={searchCriteria.faqQueCtnt}
            />
          </div>
          <FAQTable
            columns={faqColumns}
            data={data?.faqs || []}
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
