import { http } from './http-wrapper';
import { FAQ, FAQQueryParams, IFAQInput, IFAQResponse, IFAQUpdateInput } from '@/types/faq.type';

const FAQ_URL = '/faqs';

export const faqApi = {
    getListFAQs: async (
        params: FAQQueryParams
    ): Promise<IFAQResponse> => {
        return http.get(FAQ_URL, {
            params
        });
    },
    getDetailFAQ: async (faqId: string): Promise<FAQ> => {
        return http.get(`${FAQ_URL}/${faqId}`);
    },
    deleteFAQ: async (faqId: string): Promise<FAQ> => {
        return http.delete(`${FAQ_URL}/${faqId}`);
    },
    createFAQ: async (params: IFAQInput): Promise<string> => {
        return http.post(FAQ_URL, params);
    },
    updateFAQ: async ({ faqAnsCtnt, faqQueCtnt, faqId }: IFAQUpdateInput): Promise<string> => {
        return http.put(`${FAQ_URL}/${faqId}`, { faqAnsCtnt, faqQueCtnt });
    }
};
