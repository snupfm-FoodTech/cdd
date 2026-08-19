import { PaginationQuery, PaginationResponse } from './pagination.type';

export interface Company {
  coTpId: number;
  coTpNm: string;
  coTpDtlId: number;
  coTpDtlNm: string;
  coId: number;
  coNm: string;
  coEngNm: string;
  coBizNo: string;
  coNo: string;
  coRepNm: string;
  coTtlEmpNo: number;
  coEstFom: string;
  coEstDt: string;
  coFom: string;
  coPhnNo: string;
  coSzCd: string;
  coSzNm: string;
  coPalsNo: string;
  coAddr: string;
  coEml: string;
  coHpgUrl: string;
  coIndus: string;
  coImgUrls: string[];
  coViewQtt: number;
  creUsrId: number;
  creDt: string;
  updUsrId: number;
  updDt: string;
  no: number;
}

export interface CompanySearchParams {
  coSzCd?: string;
  coEstYrFm?: string;
  coEstYrTo?: string;
  coNm?: string;
  coRepNm?: string;
  coTpId?: number;
}

export type CompanyQueryParams = CompanySearchParams &
  CMSCompanySearchParams &
  CompanyFilter &
  PaginationQuery;

export type CompanyResponse = {
  companies: Company[];
} & PaginationResponse;

export interface CompanyType {
  coTpId: number;
  coTpNm: string;
}

export interface CompanySize {
  code: string;
  content: string;
  description: string;
}

export type CompanyOrderField = keyof Company;

export interface CompanyFilter {
  isDesc?: boolean;
  orderByField?: CompanyOrderField;
}

export interface CMSCompanySearchParams {
  coNm?: string;
  coTpNm?: string;
}

export interface CreateCompanyInput {
  coTpId: number;
  coNm: string;
  coEngNm?: string;
  coBizNo: string;
  coNo: string;
  coRepNm: string;
  coTtlEmpNo?: number;
  coEstFom?: string;
  coEstDt: string;
  coFom?: string;
  coPhnNo: string;
  coSzCd: string;
  coPalsNo?: string;
  coAddr: string;
  coEml: string;
  coHpgUrl?: string;
  coIndus?: string;
  files: File[];
}

export interface UpdateCompanyInput extends Omit<CreateCompanyInput, 'files'> {
  deletedFilePaths: string[];
  files?: File[];
}
