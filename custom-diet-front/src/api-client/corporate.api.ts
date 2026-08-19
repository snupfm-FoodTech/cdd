import {
  Company,
  CompanyQueryParams,
  CompanyResponse,
  CompanySize,
  CompanyType,
  CreateCompanyInput
} from '@/types/corporate.type';
import { convertToFormData } from '@/utils/query.util';
import { UpdateCompanyInput } from './../types/corporate.type';
import { http } from './http-wrapper';

const CORPORATE_BASE_URL = '/companies';

export const corporateApi = {
  getCompanies: async (
    params: CompanyQueryParams
  ): Promise<CompanyResponse> => {
    return http.get(CORPORATE_BASE_URL, {
      params
    });
  },

  getCompany: async (membershipId: string): Promise<Company> => {
    return http.get(`${CORPORATE_BASE_URL}/${membershipId}`);
  },

  getCompanySizes: async (): Promise<CompanySize[]> => {
    return http.get(`${CORPORATE_BASE_URL}/size`);
  },

  getCompanyTypes: async (): Promise<CompanyType[]> => {
    return http.get(`${CORPORATE_BASE_URL}/type`);
  },

  createCompany: async (params: CreateCompanyInput): Promise<void> => {
    const formData = convertToFormData(params);

    return http.post(CORPORATE_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  updateCompany: async (
    companyId: string,
    params: UpdateCompanyInput
  ): Promise<void> => {
    const formData = convertToFormData(params);

    return http.put(`${CORPORATE_BASE_URL}/${companyId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  deleteCompany: async (companyId: string): Promise<void> => {
    return http.delete(`${CORPORATE_BASE_URL}/${companyId}`);
  },

  increaseViewCount: async (companyId: string): Promise<void> => {
    return http.post(`${CORPORATE_BASE_URL}/view/${companyId}`);
  }
};
