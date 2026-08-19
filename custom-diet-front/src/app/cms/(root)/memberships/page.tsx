'use client';

import { useMemberships } from '@/hooks/membership.hook';
import { MembershipSearchParams } from '@/types/membership.type';
import { membershipColumns } from './components/membership-columns';
import MembershipTable from './components/membership-table';
import MembershipSearchBar from './components/memberships-search-bar';
import { useDynamicPagination } from '@/hooks/dynamic-pagination.hook';

const MembershipPage = () => {
  const { pagination, searchCriteria, handleSearch, updatePaginationState } =
    useDynamicPagination<MembershipSearchParams>({
      initialSearchParams: { name: '', email: '' },
      pageSize: 10
    });

  const { data, isLoading } = useMemberships({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    email: searchCriteria.email,
    name: searchCriteria.name
  });

  return (
    <div className="space-y-4">
      <MembershipSearchBar
        onSearch={handleSearch}
        initialSearchParams={searchCriteria}
      />
      <MembershipTable
        columns={membershipColumns}
        data={data?.users || []}
        total={data?.totalRecordNo || 0}
        pagination={pagination}
        onPaginationChange={updatePaginationState}
        loading={isLoading}
      />
    </div>
  );
};

export default MembershipPage;
