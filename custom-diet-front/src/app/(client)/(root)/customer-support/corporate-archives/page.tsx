'use client';

import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { useCompanies } from '@/hooks/corporate.hook';
import { CompanySearchParams } from '@/types/corporate.type';
import { companyColumns } from './components/corporate-archive-columns';
import CompanyArchiveSearchBar, {
  CorporateSearchFormValue
} from './components/corporate-archive-search-bar';
import CompanyArchiveTable from './components/corporate-archive-table';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { BASE_PATH } from '@/constants';
import { useEffect, useState } from 'react';

const CorporateArchive = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<CompanySearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isPending } = useCompanies({
    ...searchCriteria,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const handleSearchFormSubmit = (values: CorporateSearchFormValue) => {
    const searchParams: CompanySearchParams = {};

    if (values.searchBy === 'companyName') {
      searchParams.coNm = values.query;
    } else if (values.searchBy === 'representativeName') {
      searchParams.coRepNm = values.query;
    }

    if (!values.companySize?.includes('all')) {
      searchParams.coSzCd = values.companySize;
    }

    if (!values.companyTypeId?.includes('all') && values.companyTypeId) {
      searchParams.coTpId = Number(values.companyTypeId);
    }

    handleSearch({
      ...searchParams,
      coEstYrFm: values.fromYear,
      coEstYrTo: values.toYear
    });
  };

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-corporate-archive.png`}
        title="기업 아카이브"
        breadcrumbs={[{ label: '기업 아카이브' }]}
      />
      <div className="section-padding section-padding-y">
        <div className="flex w-full flex-col gap-4">
          {mounted && (
            <>
              <CompanyArchiveSearchBar
                onSearch={handleSearchFormSubmit}
                initialSearchParams={searchCriteria}
              />
              <CompanyArchiveTable
                columns={companyColumns}
                data={data?.companies || []}
                total={data?.totalRecordNo || 0}
                onPaginationChange={updatePaginationState}
                pagination={pagination}
                loading={isPending}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateArchive;
