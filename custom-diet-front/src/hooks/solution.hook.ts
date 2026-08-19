import {
  AdminCreateSolutionContentParams,
  AdminCreateSolutionParams,
  AdminListSolutionContentParams,
  adminSolutionApi
} from '@/api-client/solution.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from './use-toast';
import { PaginationQuery } from '@/types/pagination.type';
import { QueryKeys } from '@/constants/query-keys.constant';

export const useSolutionType = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.SOLUTION_TYPE, id],
    queryFn: () => adminSolutionApi.getSolutionType(id),
    enabled: id > 0
  });
};

export const useSolutionTypes = (params: PaginationQuery) => {
  return useQuery({
    queryKey: [QueryKeys.SOLUTION_TYPES, { ...params }],
    queryFn: () => adminSolutionApi.getSolutionTypes(params)
  });
};

export const useSolutionContents = (params: AdminListSolutionContentParams) => {
  return useQuery({
    queryKey: [QueryKeys.SOLUTION_CONTENTS, { ...params }],
    queryFn: () => adminSolutionApi.getSolutionContents(params),
    enabled: params.typeId > 0
  });
};

export const useSolutionContent = (id: number) => {
  return useQuery({
    queryKey: [QueryKeys.SOLUTION_CONTENT, id],
    queryFn: () => adminSolutionApi.getSolutionContent(id),
    enabled: id > 0
  });
};

export const useCreateSolutionType = () => {
  return useMutation({
    mutationFn: (params: AdminCreateSolutionParams) =>
      adminSolutionApi.createSolutionType(params),
    onError: (error) => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '작업이 성공적으로 완료되었습니다.',
        variant: 'success'
      });
    }
  });
};

export const useUpdateSolutionType = (id: number) => {
  return useMutation({
    mutationFn: (params: AdminCreateSolutionParams) =>
      adminSolutionApi.updateSolutionType(id, params),
    onError: (error) => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '작업이 성공적으로 완료되었습니다.',
        variant: 'success'
      });
    }
  });
};

export const useDeleteSolutionType = () => {
  return useMutation({
    mutationFn: (id: number) => adminSolutionApi.deleteSolutionType(id),
    onError: () => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '성공적으로 삭제되었습니다.',
        variant: 'success'
      });
    }
  });
};

export const useDeleteSolutionContent = () => {
  return useMutation({
    mutationFn: (id: number) => adminSolutionApi.deleteSolutionContent(id),
    onError: () => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공',
        description: '성공적으로 삭제되었습니다.',
        variant: 'success'
      });
    }
  });
};

export const useCreateSolutionContent = () => {
  return useMutation({
    mutationFn: (params: AdminCreateSolutionContentParams) =>
      adminSolutionApi.createSolutionContent(params),
    onError: (error) => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateSolutionContent = () => {
  return useMutation({
    mutationFn: (params: {
      props: AdminCreateSolutionContentParams;
      id: number;
    }) => adminSolutionApi.updateSolutionContent(params.id, params.props),
    onError: (error) => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateDescriptionSolutionContent = () => {
  return useMutation({
    mutationFn: (params: { id: number; desc: string }) => {
      return adminSolutionApi.updateSolutionContentDesc(params.id, params.desc);
    },
    onError: (error) => {
      toast({
        title: '오류',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive'
      });
    }
  });
};
