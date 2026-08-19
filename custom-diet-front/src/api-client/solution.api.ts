import { PaginationQuery } from '@/types/pagination.type';
import { http } from './http-wrapper';
import {
  SolutionContent,
  SolutionContentsResponse,
  SolutionType,
  SolutionTypesResponse
} from './open.api';

const BASE_URL = '/solutions';

export interface AdminCreateSolutionParams {
  title: string;
  description: string;
  tag?: string;
  iconFile: string | File;
}

export interface AdminCreateSolutionContentParams {
  typeId: number;
  title: string;
  subTitle: string;
  description?: string;
  tag?: string;
  iconFile?: string | File;
}

export interface AdminListSolutionContentParams extends PaginationQuery {
  typeId: number;
}

export const adminSolutionApi = {
  getSolutionType: async (id: number): Promise<SolutionType> => {
    return http.get(`${BASE_URL}/types/${id}`);
  },
  getSolutionTypes: async (
    params: PaginationQuery
  ): Promise<SolutionTypesResponse> => {
    return http.get(`${BASE_URL}/types`, {
      params
    });
  },
  getSolutionContent: async (id: number): Promise<SolutionContent> => {
    return http.get(`${BASE_URL}/contents/${id}`);
  },
  getSolutionContents: async (
    params: AdminListSolutionContentParams
  ): Promise<SolutionContentsResponse> => {
    return http.get(`${BASE_URL}/contents`, {
      params
    });
  },
  createSolutionType: async (
    params: AdminCreateSolutionParams
  ): Promise<string> => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    return http.post(`${BASE_URL}/types`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateSolutionType: async (
    id: number,
    params: AdminCreateSolutionParams
  ): Promise<string> => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    return http.put(`${BASE_URL}/types/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deleteSolutionType: async (id: number): Promise<string> => {
    return http.delete(`${BASE_URL}/types/${id}`);
  },
  deleteSolutionContent: async (id: number): Promise<string> => {
    return http.delete(`${BASE_URL}/contents/${id}`);
  },
  createSolutionContent: async (
    params: AdminCreateSolutionContentParams
  ): Promise<SolutionContent> => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    return http.post(`${BASE_URL}/contents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateSolutionContent: async (
    id: number,
    params: AdminCreateSolutionContentParams
  ): Promise<SolutionContent> => {
    const formData = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as any);
      }
    });

    return http.put(`${BASE_URL}/contents/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateSolutionContentDesc: async (
    id: number,
    description: any
  ): Promise<string> => {
    return http.put(
      `${BASE_URL}/contents/${id}/update-description`,
      description
    );
  }
};
