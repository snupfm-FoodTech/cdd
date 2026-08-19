import { businessSolutionApi } from "@/api-client/business-solution";
import { QueryKeys } from "@/constants/query-keys.constant";
import { BusinessSolutionQuery } from "@/types/business-solution.type";
import { useQuery } from "@tanstack/react-query";


export const useBusinessSolution = (
    params: BusinessSolutionQuery
) => {
    return useQuery({
        queryKey: [QueryKeys.CMS_BUSINESS_SOLUTION_MANAGE, params],
        queryFn: () => businessSolutionApi.getBusinessSolution(params)
    });
};

export const useBusinessSolutionById = (
    id: string
) => {
    return useQuery({
        queryKey: [QueryKeys.CMS_BUSINESS_SOLUTION_BY_ID, id],
        queryFn: () => businessSolutionApi.getBusinessSolutionById(id)
    });
};