import { useMutation } from '@tanstack/react-query';
import {
  loginApi,
  ILoginDataInput,
  registerApi,
  IVerifyMailInput,
  IVerifyCodeInput,
  IRegisterAccount,
  IForgetPassword
} from '@/api-client/auth.api';
import { toast } from '@/hooks/use-toast';

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: ILoginDataInput) =>
      loginApi.signIn({
        email: params.email,
        password: params.password,
        remembered: params.remembered
      }),
    onError: () => {
      toast({
        title: '이메일 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요',
        variant: 'destructive'
      });
    }
  });
};

export const useVerifyMail = () => {
  return useMutation({
    mutationFn: (params: IVerifyMailInput) =>
      registerApi.verifyMail({ usrEml: params.usrEml }),
    onError: () => {
      toast({
        title: '이미 존재하는 이메일 입니다',
        variant: 'destructive'
      });
    }
  });
};

export const useSendRegisterCode = () => {
  return useMutation({
    mutationFn: (params: IVerifyMailInput) =>
      registerApi.sendRegisterCode({ usrEml: params.usrEml }),
    onSuccess: (successContent: string) => {
      toast({
        description: successContent,
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    }
  });
};

export const useSendForgetCode = () => {
  return useMutation({
    mutationFn: (params: IVerifyMailInput) =>
      registerApi.sendForgetCode({ usrEml: params.usrEml }),
    onSuccess: (successContent: string) => {
      toast({
        description: successContent,
        variant: 'success'
      });
    },
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    }
  });
};

export const useVerifyCode = () => {
  return useMutation({
    mutationFn: (params: IVerifyCodeInput) =>
      registerApi.verifyCode({ usrEml: params.usrEml, authNo: params.authNo }),
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    },
    onSuccess: (successContent: string) => {
      toast({
        title: successContent,
        variant: 'success'
      });
    }
  });
};

export const useRegistration = () => {
  return useMutation({
    mutationFn: (params: IRegisterAccount) =>
      registerApi.registration({
        usrEml: params.usrEml,
        usrNm: params.usrNm,
        usrPhnNo: params.usrPhnNo,
        usrPwd: params.usrPwd
      }),
    onError: (error: IError) => {
      toast({
        title: error.errors[0],
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      toast({
        title: '성공적으로 등록되었습니다!',
        variant: 'success'
      });
    }
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (params: IForgetPassword) =>
      loginApi.forgetPassword({
        usrEml: params.usrEml,
        usrNewPwd: params.usrNewPwd
      }),
    onSuccess: () => {
      toast({
        title: '성공적으로 변경되었습니다!',
        variant: 'success'
      });
    }
  });
};
