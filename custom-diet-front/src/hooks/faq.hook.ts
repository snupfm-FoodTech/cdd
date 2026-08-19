import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys.constant';

import { faqApi } from '@/api-client/faq.api';
import {
  FAQQueryParams,
  IFAQInput,
  IFAQResponse,
  IFAQUpdateInput
} from '@/types/faq.type';
import { toast } from './use-toast';

type UseProductsQueryOptions = Omit<
  UseQueryOptions<IFAQResponse>,
  'queryKey' | 'queryFn'
>;

export const useFAQ = (
  params: FAQQueryParams,
  options?: UseProductsQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.LIST_FAQ, { ...params }],
    queryFn: () => faqApi.getListFAQs(params),
    placeholderData: keepPreviousData
  });
};

export const useDetailFAQ = (faqId: string) => {
  return useQuery({
    queryKey: [QueryKeys.FAQ, faqId],
    queryFn: () => faqApi.getDetailFAQ(faqId),
    enabled: !!faqId
  });
};

export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (faqId: string) => faqApi.deleteFAQ(faqId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_FAQ]
      });

      toast({
        title: '성공',
        description: 'FAQ가 삭제되었습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: 'FAQ 삭제 실패.',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    }
  });
};

export const useCreateFAQ = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: IFAQInput) => faqApi.createFAQ(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_FAQ]
      });

      toast({
        title: '성공',
        description: '새로운 FAQ 추가!',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: 'FAQ 추가 실패',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateFAQ = (faqId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: IFAQUpdateInput) => faqApi.updateFAQ(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FAQ, faqId]
      });

      toast({
        title: '수정되었습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '수정하지 못했습니다.',
        variant: 'destructive'
      });
    }
  });
};
