import { http } from './http-wrapper';

export interface ILoginDataInput {
  email: string;
  password: string;
  remembered?: boolean;
}

interface IUserDataResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}

export interface IUserData {
  creDt: string;
  creUsrId: string;
  updDt: string;
  updUsrId: string;
  usrAcctSttCd: string;
  usrEml: string;
  usrId: string;
  usrLstLoginDt: string;
  usrNm: string;
  usrPhnNo: string;
  usrRoles: string;
}

export interface IVerifyMailInput {
  usrEml: string;
}
export interface IVerifyCodeInput extends IVerifyMailInput {
  authNo: string;
}
export interface IRegisterAccount extends IVerifyMailInput {
  usrPwd: string;
  usrNm: string;
  usrPhnNo: string;
}
export interface IRessponseRegister extends IRegisterAccount {
  usrId: string;
  usrLstLoginDt: string;
  usrRoles: string;
  updDt: string;
}
export interface IForgetPassword extends IVerifyMailInput {
  usrNewPwd: string;
}

export const loginApi = {
  signIn: async (params: ILoginDataInput): Promise<IUserDataResponse> => {
    return await http.post('auth/login', params);
  },
  forgetPassword: async (
    params: IForgetPassword
  ): Promise<IUserDataResponse> => {
    return await http.post('auth/forgot-password', params);
  }
};

export const registerApi = {
  verifyMail: async (params: IVerifyMailInput): Promise<string> => {
    return await http.post('auth/verify-email', params);
  },
  sendRegisterCode: async (params: IVerifyMailInput): Promise<string> => {
    return await http.post('auth/register/send-auth-no', params);
  },
  sendForgetCode: async (params: IVerifyMailInput): Promise<string> => {
    return await http.post('auth/forgot-password/send-auth-no', params);
  },
  verifyCode: async (params: IVerifyCodeInput): Promise<string> => {
    return await http.post('auth/verify-auth-no', params);
  },
  registration: async (
    params: IRegisterAccount
  ): Promise<IRessponseRegister> => {
    return await http.post('auth/register', params);
  }
};
