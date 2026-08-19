'use client';

import { companyColumns } from '@/app/cms/(root)/company/components/company-columns';
import CompanyTable from '@/app/cms/(root)/company/components/company-table';
import { useCompanies } from '@/hooks/corporate.hook';
import { CMSCompanySearchParams } from '@/types/corporate.type';
import { keepPreviousData } from '@tanstack/react-query';
import CompanySearchBar from './components/company-search-bar';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';

const CompanyPage = () => {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<CMSCompanySearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useCompanies(
    {
      ...searchCriteria,
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize
    },
    {
      placeholderData: keepPreviousData
    }
  );

  return (
    <div className="space-y-4">
      <CompanySearchBar
        onSearch={handleSearch}
        initialSearchParams={searchCriteria}
      />
      <CompanyTable
        columns={companyColumns}
        data={data?.companies || []}
        total={data?.totalRecordNo || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
};

export default CompanyPage;
