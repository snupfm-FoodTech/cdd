import {
  CreateKnowledgeInput,
  Knowledge,
  KnowledgeDietType,
  KnowledgeFunctionType,
  KnowledgeQueryParams,
  KnowledgeResponse,
  UpdateKnowledgeInput
} from '@/types/knowledge.type';
import { convertToFormData } from '@/utils/query.util';
import { http } from './http-wrapper';

const KNOWLEDGE_URL = '/knowledges';

export const knowledgeApi = {
  getListKnowledge: async (
    params: KnowledgeQueryParams
  ): Promise<KnowledgeResponse> => {
    return http.get(KNOWLEDGE_URL, {
      params
    });
  },

  getKnowledge: async (knowledgeId: string): Promise<Knowledge> => {
    return http.get(`${KNOWLEDGE_URL}/${knowledgeId}`);
  },

  getFunctionTypes: async (): Promise<KnowledgeFunctionType[]> => {
    return http.get(`${KNOWLEDGE_URL}/func-type`);
  },

  getDietTypes: async (): Promise<KnowledgeDietType[]> => {
    return http.get(`${KNOWLEDGE_URL}/diet-type`);
  },

  createKnowledge: async (input: CreateKnowledgeInput) => {
    const form = convertToFormData(input);
    return http.post(KNOWLEDGE_URL, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateKnowledge: async (knowledgeId: string, input: UpdateKnowledgeInput) => {
    const form = convertToFormData(input);
    return http.put(`${KNOWLEDGE_URL}/${knowledgeId}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteKnowledge: async (knowledgeId: string) => {
    return http.delete(`${KNOWLEDGE_URL}/${knowledgeId}`);
  },

  increaseViewCount: async (knowledgeId: string) => {
    return http.post(`${KNOWLEDGE_URL}/view/${knowledgeId}`);
  }
};
