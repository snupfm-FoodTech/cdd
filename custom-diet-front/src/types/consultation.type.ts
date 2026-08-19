

export interface ConsultationSearchParams {
    keyword?: string;
}

export interface ConsultationQuery {
    query?: string;
    page: number;
    limit: number;
}

export interface Welcome {
    content: ConsultationContent;
    hasErrors: boolean;
    errors: null;
    timeStamp: Date;
    statusCode: number;
}

export interface ConsultationContent {
    data: Consultation[];
    meta: Meta;
}

export interface Consultation {
    id: number;
    foodTech: CommonCode;
    companyName: string;
    companyBizNo: string;
    companyAddress: CommonCode;
    senderName: string;
    senderPhoneNo: string;
    senderEmail: string;
    solutionTypes: CommonCode[];
    solutionTargets: CommonCode[];
    solutionTitle: string;
    solutionDetail: string;
    creDt: string;
}

export interface CommonCode {
    code: string;
    content: string;
    description: string;
    seq: string;
}

export interface Meta {
    totalItems: number;
    totalPages: number;
}