import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';

import { noticeApi } from '@/api-client/notice.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import {
  NoticeCreateParams,
  NoticeQueryParams,
  NoticeResponse,
  UpdateNoticeInput
} from '@/types/notice.type';
import { toast } from './use-toast';

type UseNoticeQueryOptions = Omit<
  UseQueryOptions<NoticeResponse>,
  'queryKey' | 'queryFn'
>;

export const useNotices = (
  params: NoticeQueryParams,
  options?: UseNoticeQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.USER_NOTICES, { ...params }],
    queryFn: () => noticeApi.getNotices(params),
    placeholderData: keepPreviousData
  });
};

export const useNoticeByID = (noticeId: string) => {
  return useQuery({
    queryKey: [QueryKeys.USER_NOTICE_BY_ID, { noticeId }],
    queryFn: () => noticeApi.getNoticeById(noticeId),
    enabled: !!noticeId
  });
};

export const useDeleteNotice = () => {
  return useMutation({
    mutationFn: (noticeId: string) => noticeApi.deleteNotice(noticeId),
    onSuccess: () => {
      toast({
        title: '성공',
        description: '공지가 삭제되었습니다!',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '공지사항 삭제 실패.',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    }
  });
};

export const useAddNotice = () => {
  return useMutation({
    mutationFn: (params: NoticeCreateParams) => noticeApi.saveNotices(params),
    onError: () => {
      toast({
        title: '공지사항 추가에 실패했습니다',
        description: '다시 확인해 주세요',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '새로운 공지가 추가되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useUpdateNotice = (noticeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      noticeId,
      input
    }: {
      noticeId: string;
      input: UpdateNoticeInput;
    }) => noticeApi.updateNotice(noticeId, input),
    onError: () => {
      toast({
        title: '수정 실패',
        description: '다시 확인 해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_NOTICE_BY_ID, { noticeId }]
      });

      toast({
        title: '성공',
        description: '공지사항이 수정되었습니다!',
        variant: 'success'
      });
    }
  });
};
