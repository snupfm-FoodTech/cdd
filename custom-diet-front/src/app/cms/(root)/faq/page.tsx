'use client';

import { Icons } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { Button } from '@/components/ui/button';
import { CMS_FAQ_CREATE_URL } from '@/constants/routes';
import { useFAQ } from '@/hooks/faq.hook';
import { FAQSearchParam } from '@/types/faq.type';
import { useRouter } from 'next/navigation';
import { faqColumns } from './components/faq-columns';
import FAQTable from './components/faq-table';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';

const FAQPage = () => {
  const router = useRouter();

  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<FAQSearchParam>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useFAQ({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...searchCriteria
  });

  const handleSearchBarSubmit = (valueSearch: string) => {
    handleSearch({ faqQueCtnt: valueSearch });
  };

  const handleClickCreate = () => {
    router.push(CMS_FAQ_CREATE_URL);
  };

  return (
    <div className="faq-page space-y-4">
      <SearchBarCard className="flex justify-between">
        <SearchBar
          onSearch={handleSearchBarSubmit}
          value={searchCriteria.faqQueCtnt}
        />
        <Button onClick={handleClickCreate}>
          <Icons.add className="mr-1 h-5 w-5" />
          <span>FAQ 등록</span>
        </Button>
      </SearchBarCard>
      <FAQTable
        columns={faqColumns}
        data={data?.faqs || []}
        total={data?.totalRecordNo || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
};

export default FAQPage;
