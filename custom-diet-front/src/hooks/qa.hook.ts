import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { QueryKeys } from '@/constants/query-keys.constant';
import { customerQAApi } from '@/api-client/qa.api';
import { Answer, QACreate, QAQueryParams, QAResponse } from '@/types/qa.type';
import { toast } from '@/hooks/use-toast';

type UseQAOptions = Omit<UseQueryOptions<QAResponse>, 'queryKey' | 'queryFn'>;

export const useQA = (params: QAQueryParams, options?: UseQAOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.USER_QA, params],
    queryFn: () => customerQAApi.getQA(params)
  });
};

export const useQAByID = (qaId: string) => {
  return useQuery({
    queryKey: [QueryKeys.USER_QA_BY_ID, qaId],
    queryFn: () => customerQAApi.getQAById(qaId),
    enabled: !!qaId
  });
};

export const useDeleteQA = () => {
  return useMutation({
    mutationFn: (qaId: string) => customerQAApi.deleteQA(qaId),
    onError: (error) => {
      toast({
        title: 'QA 삭제 실패',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: 'QA가 성공적으로 삭제되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useAddQA = () => {
  return useMutation({
    mutationFn: (params: QACreate) => customerQAApi.createQA(params),
    onError: () => {
      toast({
        title: '품질보증 추가 실패',
        description: '수정 실패 다시 확인 해주세요.',
        variant: 'destructive'
      });
    }
  });
};

export const useAnswer = () => {
  return useMutation({
    mutationFn: (params: Answer) => customerQAApi.answerQA(params),
    onError: (error) => {
      toast({
        title: 'Answer failed',
        description: 'Please check it again',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '성공적으로 답변하세요!',
        variant: 'success'
      });
    }
  });
};
