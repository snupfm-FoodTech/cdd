import { PaginationQuery, PaginationResponse } from './pagination.type';

export interface Membership {
  usrId: string;
  usrNm: string;
  usrEml: string;
  usrPhnNo: string;
  usrLstLoginDt: string;
  creDt: string;
  no: string;
}

export interface MembershipSearchParams {
  email?: string;
  name?: string;
}

export type MembershipQueryParams = MembershipSearchParams & PaginationQuery;

export type MembershipResponse = {
  users: Membership[];
} & PaginationResponse;

export interface IClientMembershipUpdate {
  name: string;
  newPassword?: string;
  phoneNo: string;
  currentPassword?: string;
}