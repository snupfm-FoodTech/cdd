import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query';

import { membershipApi } from '@/api-client/membership.api';
import { QueryKeys } from '@/constants/query-keys.constant';
import {
  IClientMembershipUpdate,
  MembershipQueryParams,
  MembershipResponse
} from '@/types/membership.type';
import { toast } from './use-toast';
type UseProductsQueryOptions = Omit<
  UseQueryOptions<MembershipResponse>,
  'queryKey' | 'queryFn'
>;

export const useMemberships = (
  params: MembershipQueryParams,
  options?: UseProductsQueryOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.MEMBERSHIP_LIST, params],
    queryFn: () => membershipApi.getMemberships(params),
    placeholderData: keepPreviousData
  });
};

export const useMembership = (membershipId: string) => {
  return useQuery({
    queryKey: [QueryKeys.MEMBERSHIP, membershipId],
    queryFn: () => membershipApi.getMembership(membershipId),
    enabled: !!membershipId
  });
};

export const useDeleteMembership = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (membershipId: string) =>
      membershipApi.deleteMembership(membershipId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIP_LIST]
      });

      toast({
        title: '삭제되었습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '삭제하지 못했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (membershipId: string) =>
      membershipApi.resetPassword(membershipId),
    onSuccess: () => {
      toast({
        title: '비밀번호를 재설정했습니다.',
        variant: 'success'
      });
    },
    onError: () => {
      toast({
        title: '비밀번호를 재설정하지 못했습니다.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateMembership = (membershipId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: IClientMembershipUpdate) =>
      membershipApi.updateMembership(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MEMBERSHIP, membershipId]
      });
      toast({
        title: '정보가 성공적으로 편집되었습니다.',
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    }
  });
};
