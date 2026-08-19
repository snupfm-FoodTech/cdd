import { PaginationQuery } from '@/types/pagination.type';
import { http } from './http-wrapper';
import { Meta } from '@/types/business-solution.type';
import { AdminListSolutionContentParams } from './solution.api';

const BASE_URL = '/open';

export interface SolutionType {
  description: string;
  iconUrl: string;
  id: number;
  tag?: string;
  title: string;
  updatedDate: string;
}

export type SolutionTypesResponse = {
  data: SolutionType[];
  meta: Meta;
};

export interface SolutionContent {
  description: any;
  iconUrl: string;
  id: number;
  subTitle: string;
  tag?: string;
  title: string;
  typeId: number;
}

export type SolutionContentsResponse = {
  data: SolutionContent[];
  meta: Meta;
};

export const openApi = {
  getSolutionTypes: async (
    params: PaginationQuery
  ): Promise<SolutionTypesResponse> => {
    return http.get(`${BASE_URL}/solutions/types`, {
      params
    });
  },
  getSolutionContents: async (
    params: AdminListSolutionContentParams
  ): Promise<SolutionContentsResponse> => {
    return http.get(`${BASE_URL}/solutions/contents`, {
      params
    });
  },
  getSolutionContent: async (id: number): Promise<SolutionContent> => {
    return http.get(`${BASE_URL}/solutions/contents/${id}`);
  }
};
