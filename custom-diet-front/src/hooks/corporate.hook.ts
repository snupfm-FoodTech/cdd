import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';
import { UpdateCompanyInput } from './../types/corporate.type';

import { corporateApi } from '@/api-client/corporate.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import {
  CompanyQueryParams,
  CompanyResponse,
  CreateCompanyInput
} from '@/types/corporate.type';
import { toast } from './use-toast';

type UseCompanyQueryOptions = Omit<
  UseQueryOptions<CompanyResponse>,
  'queryKey' | 'queryFn'
>;

export const useCompanies = (
  params: CompanyQueryParams,
  options?: UseCompanyQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.COMPANY_LIST, { ...params }],
    queryFn: () => corporateApi.getCompanies(params),
    placeholderData: keepPreviousData
  });
};

export const useCompany = (companyId: string) => {
  return useQuery({
    queryKey: [QueryKeys.COMPANY, companyId],
    queryFn: () => corporateApi.getCompany(companyId),
    enabled: !!companyId
  });
};

export const useCompanySizes = () => {
  return useQuery({
    queryKey: [QueryKeys.COMPANY_SIZES],
    queryFn: corporateApi.getCompanySizes
  });
};

export const useCompanyTypes = () => {
  return useQuery({
    queryKey: [QueryKeys.COMPANY_TYPES],
    queryFn: corporateApi.getCompanyTypes
  });
};

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (params: CreateCompanyInput) =>
      corporateApi.createCompany(params),
    onError: (error) => {
      toast({
        title: '회사 추가 실패',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '회사가 추가되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useUpdateCompany = (companyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      companyId,
      input
    }: {
      companyId: string;
      input: UpdateCompanyInput;
    }) => corporateApi.updateCompany(companyId, input),
    onError: () => {
      toast({
        title: '수정 실패',
        description: '다시 확인 해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.COMPANY, companyId]
      });

      toast({
        title: '성공',
        description: '회사가 수정되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useDeleteCompany = () => {
  return useMutation({
    mutationFn: (companyId: string) => corporateApi.deleteCompany(companyId),
    onError: () => {
      toast({
        title: '회사 삭제 실패',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '회사가 삭제되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useIncreaseCompanyViewCount = () => {
  return useMutation({
    mutationFn: (companyId: string) => corporateApi.increaseViewCount(companyId)
  });
};
