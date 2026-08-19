import { PaginationQuery, PaginationResponse } from "./pagination.type";

export interface FAQ {
  faqId: string;
  faqQueCtnt: string;
  faqAnsCtnt: string;
  creUsrId: string;
  creDt: string;
  updUsrId: string;
  updDt: string;
  no: number;
}

export interface IFAQInput {
  faqQueCtnt?: string;
  faqAnsCtnt?: string;
}

export interface IFAQUpdateInput extends IFAQInput {
  faqId: string
} 

export type FAQQueryParams = FAQSearchParam & PaginationQuery;

export interface FAQSearchParam {
  faqQueCtnt?: string;
}

export interface IFAQResponse extends PaginationResponse {
  faqs: FAQ[]
};