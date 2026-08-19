import { openApi } from '@/api-client/open.api';
import { AdminListSolutionContentParams } from '@/api-client/solution.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import { PaginationQuery } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';

export const useOpenSolutionTypes = (params: PaginationQuery) => {
  return useQuery({
    queryKey: [QueryKeys.OPEN_SOLUTION_TYPES, { ...params }],
    queryFn: () => openApi.getSolutionTypes(params)
  });
};

export const useOpenSolutionContents = (
  params: AdminListSolutionContentParams
) => {
  return useQuery({
    queryKey: [QueryKeys.OPEN_SOLUTION_CONTENTS, { ...params }],
    queryFn: () => openApi.getSolutionContents(params),
    enabled: params.typeId > 0
  });
};

export const useOpenSolutionContent = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.OPEN_SOLUTION_CONTENT, id],
    queryFn: () => openApi.getSolutionContent(id),
    enabled: id > 0
  });
};
