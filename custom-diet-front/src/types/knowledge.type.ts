import { PaginationQuery, PaginationResponse } from './pagination.type';

export interface Knowledge {
  kwlgId: string;
  kwlgTit: string;
  kwlgFuncTpCd: string;
  kwlgFuncTpNm: string;
  kwlgDietTpCd: string;
  kwlgDietTpNm: any;
  kwlgViewQtt: string;
  kwlgLinkUrl: string;
  kwlgAtchUrls: string[];
  kwlgAut: string;
  creUsrId: string;
  creDt: string;
  updUsrId: string;
  updDt: string;
  no: number;
}

export interface KnowledgeSearchParams {
  kwlgFuncTpCd?: string;
  kwlgDietTpCd?: string;
  kwlgTit?: string;
  creDtFm?: string;
  creDtTo?: string;
}

export type KnowledgeQueryParams = KnowledgeSearchParams &
  PaginationQuery &
  KnowledgeFilter;

export type KnowledgeResponse = {
  knowledges: Knowledge[];
} & PaginationResponse;

export interface KnowledgeFunctionType {
  code: string;
  content: string;
  description: string;
}

export interface KnowledgeDietType {
  code: string;
  content: string;
  description: string;
}

type KnowledgeOrderField = keyof Knowledge;

export interface KnowledgeFilter {
  isDesc?: boolean;
  orderByField?: KnowledgeOrderField;
}

export interface CreateKnowledgeInput {
  kwlgFuncTpCd: string;
  kwlgDietTpCd: string;
  kwlgTit: string;
  kwlgAut: string;
  kwlgLinkUrl: string;
  files?: File[];
}

export interface UpdateKnowledgeInput extends CreateKnowledgeInput {
  deletedFilePaths?: string[];
}
