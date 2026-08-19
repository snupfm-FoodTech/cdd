import { knowledgeApi } from '@/api-client/knowledge.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import {
  CreateKnowledgeInput,
  KnowledgeQueryParams,
  KnowledgeResponse,
  UpdateKnowledgeInput
} from '@/types/knowledge.type';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';
import { toast } from './use-toast';

type UseKnowledgeQueryOptions = Omit<
  UseQueryOptions<KnowledgeResponse>,
  'queryKey' | 'queryFn'
>;

export const useListKnowledge = (
  params: KnowledgeQueryParams,
  options?: UseKnowledgeQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.KNOWLEDGE_LIST, { ...params }],
    queryFn: () => knowledgeApi.getListKnowledge(params),
    placeholderData: keepPreviousData
  });
};

export const useKnowledge = (knowledgeId: string) => {
  return useQuery({
    queryKey: [QueryKeys.KNOWLEDGE, { knowledgeId }],
    queryFn: () => knowledgeApi.getKnowledge(knowledgeId),
    enabled: !!knowledgeId
  });
};

export const useFunctionTypes = () => {
  return useQuery({
    queryKey: [QueryKeys.KNOWLEDGE_FUNCTION_TYPES],
    queryFn: knowledgeApi.getFunctionTypes
  });
};

export const useDietTypes = () => {
  return useQuery({
    queryKey: [QueryKeys.KNOWLEDGE_DIET_TYPES],
    queryFn: knowledgeApi.getDietTypes
  });
};

export const useAddKnowledge = () => {
  return useMutation({
    mutationFn: (input: CreateKnowledgeInput) =>
      knowledgeApi.createKnowledge(input),
    onError: () => {
      toast({
        title: '문헌 추가 실패',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '새로운 문헌이 추가되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useUpdateKnowledge = (knowledgeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      knowledgeId,
      input
    }: {
      knowledgeId: string;
      input: UpdateKnowledgeInput;
    }) => knowledgeApi.updateKnowledge(knowledgeId, input),
    onError: () => {
      toast({
        title: '수정 실패',
        description: '다시 확인 해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.KNOWLEDGE, { knowledgeId }]
      });

      toast({
        title: '성공',
        description: '문헌이 수정되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useDeleteKnowledge = () => {
  return useMutation({
    mutationFn: (knowledgeId: string) =>
      knowledgeApi.deleteKnowledge(knowledgeId),
    onError: () => {
      toast({
        title: '문헌을 삭제하지 못했습니다.',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '문헌이 삭제되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useIncreaseKnowledgeViewCount = () => {
  return useMutation({
    mutationFn: (knowledgeId: string) =>
      knowledgeApi.increaseViewCount(knowledgeId)
  });
};
