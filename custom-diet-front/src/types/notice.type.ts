import { PaginationQuery, PaginationResponse } from './pagination.type';

export interface Notice {
  ntcId: string;
  ntcTit: string;
  ntcCtnt: string;
  creDt: string;
  ntcAtchUrls: string[];
  creUsrId: string;
  no: number;
  updDt: string;
  updUsrId: string;
}

export interface NoticeSearchParams {
  ntcTit?: string;
}

export type NoticeQueryParams = NoticeSearchParams &
  NoticeFilter &
  PaginationQuery;

export type NoticeResponse = {
  notices: Notice[];
} & PaginationResponse;

export type NoticeOrderField = keyof Notice;

export interface NoticeFilter {
  isDesc?: boolean;
  orderByField?: NoticeOrderField;
}

export interface NoticeCreateParams {
  ntcTit: string;
  ntcCtnt: string;
  files?: File[];
}

export interface UpdateNoticeInput extends NoticeCreateParams {
  deletedFilePaths?: string[];
}