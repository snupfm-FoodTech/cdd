import { Answer, QA, QACreate, QAQueryParams, QAResponse } from '@/types/qa.type';
import { http } from './http-wrapper';

const QA_URL = '/user-questions';

export const customerQAApi = {
  getQA: async (
    params: QAQueryParams
  ): Promise<QAResponse> => {
    return http.get(QA_URL,{
      params
    });
  },

  getQAById: async (qaId: string): Promise<QA> => {
    
    return http.get(`/user-questions/${qaId}`);
  },

  deleteQA: async (qaId: string) => {
    return http.delete(`/user-questions/${qaId}`);
  },

  createQA: async (params: QACreate) => {
    const formData = new FormData();

    Object.keys(params).forEach((key) => {
      const value = (params as any)[key];
      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        formData.append(key, value);
      }
    });

    const url = "/user-questions/create-question";
    return await http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  answerQA: async (
    params: Answer
  ): Promise<QAResponse> => {
    const formData = new FormData();

    Object.keys(params).forEach((key) => {
      const value = (params as any)[key];
      if (Array.isArray(value)) {
        value.forEach((file, index) => {
          formData.append(`${key}[${index}]`, file);
        });
      } else {
        formData.append(key, value);
      }
    });

    const url = `/user-questions/answer-question`;
    return await http.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
};