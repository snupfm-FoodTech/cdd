import {
  IClientMembershipUpdate,
  Membership,
  MembershipQueryParams,
  MembershipResponse
} from '@/types/membership.type';
import { http } from './http-wrapper';

const MEMBERSHIP_BASE_URL = '/users';
const CLIENT_BASE_URL = '/auth';

export const membershipApi = {
  getMemberships: async (
    params: MembershipQueryParams
  ): Promise<MembershipResponse> => {
    return http.get(MEMBERSHIP_BASE_URL, {
      params
    });
  },

  getMembership: async (membershipId: string): Promise<Membership> => {
    return http.get(`${MEMBERSHIP_BASE_URL}/${membershipId}`);
  },

  deleteMembership: async (membershipId: string): Promise<void> => {
    return http.delete(`${MEMBERSHIP_BASE_URL}/${membershipId}`);
  },

  resetPassword: async (membershipId: string): Promise<void> => {
    return http.post(`${MEMBERSHIP_BASE_URL}/reset-password/${membershipId}`);
  },

  updateMembership: async (input: IClientMembershipUpdate): Promise<void> => {
    return http.post(`${CLIENT_BASE_URL}/self-update`, input);
  }
};
