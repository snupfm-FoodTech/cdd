import { BusinessSolution, BusinessSolutionContent, BusinessSolutionQuery } from '@/types/business-solution.type';
import { http } from './http-wrapper';

export const businessSolutionApi = {
  getBusinessSolution: async (params: BusinessSolutionQuery
  ): Promise<BusinessSolutionContent> => {

    return http.get('/business-solution', {
      params
    });
  },

  getBusinessSolutionById: async (id: string
  ): Promise<BusinessSolution> => {

    return http.get(`/business-solution/${id}`);
  }
};
