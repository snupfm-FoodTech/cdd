import { consultationApi } from "@/api-client/consultation.api";
import { QueryKeys } from "@/constants/query-keys.constant";
import { ConsultationQuery } from "@/types/consultation.type";
import { useQuery } from "@tanstack/react-query";


export const useConsultation = (
    params: ConsultationQuery
) => {
    return useQuery({
        queryKey: [QueryKeys.CMS_CONSULTATION_MANAGE, params],
        queryFn: () => consultationApi.getConsultations(params)
    });
};

export const useConsultationById = (
    id: string
) => {
    return useQuery({
        queryKey: [QueryKeys.CMS_CONSULTATION_BY_ID, id],
        queryFn: () => consultationApi.getConsultationsById(id)
    });
};