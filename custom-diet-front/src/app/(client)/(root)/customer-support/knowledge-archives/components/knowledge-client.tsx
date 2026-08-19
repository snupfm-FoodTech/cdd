'use client';

import { useListKnowledge } from '@/hooks/knowledge.hook';
import { KnowledgeSearchParams } from '@/types/knowledge.type';
import { knowledgeColumns } from './knowledge-columns';
import KnowledgeSearchBar, {
  KnowledgeSearchFormValue
} from './knowledge-search-bar';
import KnowledgeTable from './knowledge-table';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';
import { BASE_PATH } from '@/constants';
import { useEffect, useState } from 'react';

const KnowledgeArchiveClient = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<KnowledgeSearchParams>({
      initialSearchParams: {},
      pageSize: 10
    });

  const { data, isLoading } = useListKnowledge({
    ...searchCriteria,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize
  });

  const handleSearchFormSubmit = (values: KnowledgeSearchFormValue) => {
    handleSearch({
      ...searchCriteria,
      kwlgTit: values.query,
      kwlgFuncTpCd:
        values.funcTypeCode === 'all' ? undefined : values.funcTypeCode,
      kwlgDietTpCd:
        values.dietTypeCode === 'all' ? undefined : values.dietTypeCode,
      creDtFm: values.fromDate,
      creDtTo: values.toDate
    });
  };

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-knowledge.png`}
        title="지식 아카이브"
        breadcrumbs={[{ label: '지식 아카이브' }]}
      />
      <div className="section-padding section-padding-y">
        <div className="flex w-full flex-col gap-4">
          {mounted && (
            <>
              <KnowledgeSearchBar
                onSearch={handleSearchFormSubmit}
                initialSearchParams={searchCriteria}
              />
              <KnowledgeTable
                columns={knowledgeColumns}
                data={data?.knowledges || []}
                total={data?.totalRecordNo || 0}
                onPaginationChange={updatePaginationState}
                pagination={pagination}
                loading={isLoading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeArchiveClient;
