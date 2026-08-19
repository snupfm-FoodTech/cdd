import { Consultation, ConsultationContent, ConsultationQuery } from '@/types/consultation.type';
import { http } from './http-wrapper';

export const consultationApi = {
  getConsultations: async (params: ConsultationQuery
  ): Promise<ConsultationContent> => {

    return http.get('/consult-requests', {
      params
    });
  },

  getConsultationsById: async (id: string
  ): Promise<Consultation> => {

    return http.get(`/consult-requests/${id}`);
  }
};
