import {
  Notice,
  NoticeCreateParams,
  NoticeQueryParams,
  NoticeResponse,
  UpdateNoticeInput
} from '@/types/notice.type';import { http } from './http-wrapper';
import { convertToFormData } from '@/utils/query.util';

const NOTICE_BASE_URL = '/notices';

export const noticeApi = {
  getNotices: async (
    params: NoticeQueryParams
  ): Promise<NoticeResponse> => {
    return http.get(NOTICE_BASE_URL, {
      params
    });
  },

  getNoticeById: async (noticeId: string): Promise<Notice> => {
    return http.get(`${NOTICE_BASE_URL}/${noticeId}`);
  },

  deleteNotice: async (noticeId: string): Promise<void> => {
    return http.delete(`${NOTICE_BASE_URL}/${noticeId}`);
  },

  saveNotices: async (params: NoticeCreateParams) => {
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

    return await http.post(NOTICE_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateNotice: async (noticeId: string, input: UpdateNoticeInput) => {
    const form = convertToFormData(input);
    return http.put(`${NOTICE_BASE_URL}/${noticeId}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
};
