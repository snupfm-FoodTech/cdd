export interface BusinessSolutionParams {
    keyword?: string;
}

export interface BusinessSolutionQuery {
    query?: string;
    page: number;
    limit: number;
}

export interface BusinessSolution {
    id: number;
    categoryTitle: string;
    categoryContents: string;
    creDt: string;
    changeDate: string;
}

export interface Meta {
    totalItems: number;
    totalPages: number;
}

export interface BusinessSolutionContent {
    data: BusinessSolution[];
    meta: Meta;
}