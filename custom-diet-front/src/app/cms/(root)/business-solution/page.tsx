'use client';

import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { CMS_BUSINESS_SOLUTION_CREATE_URL } from '@/constants/routes';
import { BusinessSolutionColumns } from './components/business-solution-columns';
import BusinessSolutionTable from './components/business-solution-table';
import { BusinessSolutionParams } from '@/types/business-solution.type';
import { useSolutionTypes } from '@/hooks/solution.hook';

const BusinessSolutionPage = () => {
  const router = useRouter();

  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<BusinessSolutionParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useSolutionTypes({
    ...searchCriteria,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const handleSearchBarSubmit = (value: string) => {
    handleSearch({
      ...searchCriteria,

      keyword: value
    });
  };

  const handleClickCreate = () => {
    router.push(CMS_BUSINESS_SOLUTION_CREATE_URL);
  };

  return (
    <div className="space-y-4">
      <SearchBarCard className="flex justify-between">
        <div />
        {/* <SearchBar
          onSearch={handleSearchBarSubmit}
          value={searchCriteria.keyword}
        /> */}
        <Button onClick={handleClickCreate}>
          <Icons.add className="mr-1 h-5 w-5" />
          카테고리 등록
        </Button>
      </SearchBarCard>

      <BusinessSolutionTable
        columns={BusinessSolutionColumns}
        data={data?.data || []}
        total={data?.meta.totalItems || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
};

export default BusinessSolutionPage;
