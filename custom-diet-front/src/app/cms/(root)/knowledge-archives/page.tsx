'use client';

import { Icons } from '@/components/icons';
import SearchBar from '@/components/search-bar';
import { SearchBarCard } from '@/components/search-bar-card';
import { Button } from '@/components/ui/button';
import { CMS_KNOWLEDGE_CREATE_URL } from '@/constants/routes';
import { useListKnowledge } from '@/hooks/knowledge.hook';
import { KnowledgeSearchParams } from '@/types/knowledge.type';
import Link from 'next/link';
import KnowledgeTable from './components/knowledge-table';
import { knowledgeColumns } from './components/knowledge-columns';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';

const KnowledgeArchive = () => {
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

  const handleSearchBarSubmit = (value: string) => {
    handleSearch({
      ...searchCriteria,
      kwlgTit: value
    });
  };

  return (
    <div className="space-y-4">
      <SearchBarCard>
        <div className="flex justify-between">
          <div className="w-full">
            <SearchBar
              onSearch={handleSearchBarSubmit}
              value={searchCriteria.kwlgTit}
            />
          </div>
          <Link href={CMS_KNOWLEDGE_CREATE_URL}>
            <Button>
              <Icons.add className="mr-1 h-5 w-5" />
              문헌 등록
            </Button>
          </Link>
        </div>
      </SearchBarCard>
      <KnowledgeTable
        columns={knowledgeColumns}
        data={data?.knowledges || []}
        total={data?.totalRecordNo || 0}
        onPaginationChange={updatePaginationState}
        pagination={pagination}
        loading={isLoading}
      />
    </div>
  );
};

export default KnowledgeArchive;
