import { PaginationQuery, PaginationResponse } from './pagination.type';

export enum QAStatus {
  OPEN = 'O',
  CLOSED = 'C'
}

export interface QA {
  index: number;
  queId: string;
  queSttCd: string;
  queSttNm: string;
  queUsrId: string;
  queUsrNm: string;
  queUsrEml: string;
  queTit: string;
  queCtnt: string;
  ansUsrId: string;
  ansUsrNm: string;
  ansUsrEml: string;
  ansCtnt: string;
  queAtchUrls: string[];
  creUsrId: string;
  creDt: string;
  updUsrId: string;
  updDt: string;
  no: number;
}

export interface QASearchParams {
  title?: string;
  queUsrId?: string;
}

export interface Answer {
  queId: string;
  ansCtnt: string;
}
export type QAQueryParams = QASearchParams & PaginationQuery;

export type QAResponse = {
  userQuestions: QA[];
} & PaginationResponse;

export interface QACreate {
  queId?: string;
  queTit: string;
  queCtnt: string;
  files?: File[];
  deletedFilePaths?: string[];
}
