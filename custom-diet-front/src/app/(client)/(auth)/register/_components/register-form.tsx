'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import {
  useRegistration,
  useSendRegisterCode,
  useVerifyCode,
  useVerifyMail
} from '@/hooks/auth.hook';
import { CDInput } from '@/components/cd-input';
import RenderTime from '@/components/layout/client/time-countdown';
import { useRouter } from 'next/navigation';
import { IValueField } from '@/types/form.type';
import { HOME_URL, LOGIN_USER_URL } from '@/constants/routes';
import { REGEX_NUMBER, REGEX_PASSWORD } from '@/constants';
import { AppLogo } from '@/components/app-logo';

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: '이메일 아이디를 입력해주세요.' })
      .email({ message: '올바른 이메일 주소를 입력해주세요' }),
    password: z
      .string()
      .refine(
        (value) => REGEX_PASSWORD.test(value ?? ''),
        '비밀번호는 최소 8자리 이상이며, 대문자, 소문자, 숫자, 특수문자 각각 하나 이상 포함해야 합니다'
      ),
    rePassword: z.string().min(1, {
      message: '비밀번호를 입력해주세요.'
    }),
    code: z
      .string()
      .min(8, {
        message: '문자열은 8자 이상이어야 합니다'
      })
      .max(8, {
        message: '문자열은 최대 8자를 포함해야 합니다'
      }),
    contactName: z.string().min(1, {
      message: '연락처 이름을 입력하십시오'
    }),
    personInCharge: z
      .string()
      .refine(
        (value) => REGEX_NUMBER.test(value ?? ''),
        '숫자를 입력해야 합니다'
      )
  })
  .strict()
  .refine((data) => data.password === data.rePassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['rePassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isVerified, setIsVeriFied] = useState(false);
  const [mailFieldValue, setMailFieldValue] = useState('');
  const [isStartTime, setIsStartTime] = useState(false);
  const [isResetTime, setIsResetTime] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDisableEmail, setDisableEmail] = useState(false);
  const [isDisableEmailBtn, setDisableEmailBtn] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      password: '',
      rePassword: '',
      contactName: '',
      personInCharge: ''
    }
  });

  const verifyMailMutate = useVerifyMail();
  const sendCodeMutate = useSendRegisterCode();
  const verifyCodeMutate = useVerifyCode();
  const registerAccount = useRegistration();

  const onSubmit = (dataForm: UserFormValue) => {
    registerAccount
      .mutateAsync({
        usrEml: dataForm.email,
        usrNm: dataForm.contactName,
        usrPwd: dataForm.password,
        usrPhnNo: dataForm.personInCharge
      })
      .then(() => {
        router.push(LOGIN_USER_URL);
      });
  };

  const handleSendVerifyCode = (fieldEmail: IValueField) => {
    verifyMailMutate.mutateAsync({ usrEml: fieldEmail.value }).then(() => {
      if (!isStartTime) {
        setIsStartTime(true);
      } else {
        setIsResetTime(!isResetTime);
      }
      sendCodeMutate.mutateAsync({ usrEml: fieldEmail.value });
      setMailFieldValue(fieldEmail.value);
      setDisableEmail(true);
      setDisableEmailBtn(true);
    });
  };

  // enable btn send code after 5s
  useEffect(() => {
    setTimeout(() => setDisableEmailBtn(false), 5000);
  }, [isDisableEmailBtn]);

  const handleVerifyCode = (fieldCode: IValueField) => {
    verifyCodeMutate
      .mutateAsync({ usrEml: mailFieldValue, authNo: fieldCode.value })
      .then(() => {
        setIsVeriFied(true);
        setIsComplete(true);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Form {...form}>
        <div className="w-full rounded-xl shadow-2xl md:w-2/3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
            {/* Logo */}
            <div className="justify-left mb-4 flex items-center gap-3">
              <AppLogo href={HOME_URL} className="w-28 md:w-32" />
              <div className="flex flex-col text-left">
                <p className="text-default-800 text-lg font-semibold">
                  Customized Dietary
                </p>
                <p className="text-default-500 text-sm">맞춤형 식이 설계</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mx-1">
                  <FormLabel required>이메일 주소</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <input
                        className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-2 pr-32 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={isDisableEmail}
                        maxLength={50}
                        {...field}
                      />
                      <Button
                        type="button"
                        className="absolute right-1 top-1/2 h-8 -translate-y-1/2 transform"
                        disabled={
                          form.getFieldState('email').invalid ||
                          !form.getValues('email') ||
                          isVerified ||
                          isDisableEmailBtn
                        }
                        onClick={() => handleSendVerifyCode(field)}
                      >
                        {!isDisableEmail
                          ? '인증 코드 요청'
                          : '인증 코드 재요청'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="mx-1 mt-4">
                  <FormLabel className="flex justify-between">
                    <div className="flex">
                      <span>인증 코드</span>
                      <span className="text-red-500">*</span>
                    </div>
                    <RenderTime
                      isStart={isStartTime}
                      isComplete={isComplete}
                      isReset={isResetTime}
                    />
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <input
                        disabled={isVerified || !mailFieldValue}
                        className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-2 pr-32 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        maxLength={8}
                        {...field}
                      />
                      <Button
                        type="button"
                        disabled={
                          form.getFieldState('code').invalid ||
                          !form.getValues('code') ||
                          isVerified
                        }
                        onClick={() => handleVerifyCode(field)}
                        className="absolute right-1 top-1/2 h-8 -translate-y-1/2 transform"
                      >
                        인증 확인
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel required>비밀번호</FormLabel>
                  <FormControl>
                    <CDInput
                      disabled={!isVerified}
                      type={showPassword ? 'text' : 'password'}
                      endIcon={showPassword ? EyeIcon : EyeOffIcon}
                      onClickIcon={() => setShowPassword((prev) => !prev)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="rePassword"
              name="rePassword"
              disabled={!isVerified}
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel required>비밀번호 확인</FormLabel>
                  <FormControl>
                    <CDInput
                      disabled={!isVerified}
                      type={showRePassword ? 'text' : 'password'}
                      endIcon={showRePassword ? EyeIcon : EyeOffIcon}
                      onClickIcon={() => setShowRePassword((prev) => !prev)}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="contactName"
              name="contactName"
              disabled={!isVerified}
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel required>담당자 이름</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              key="personInCharge"
              name="personInCharge"
              disabled={!isVerified}
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel>담당자 연락처</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={15} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full items-center justify-center gap-5 pt-4 md:gap-10">
              <Button
                className="w-1/2 rounded-lg md:w-1/3"
                type="button"
                disabled={!isVerified}
                onClick={form.handleSubmit((form) => onSubmit(form))}
              >
                회원가입
              </Button>
              <Button
                className="w-1/2 rounded-lg md:w-1/3"
                type="button"
                variant="blue"
                onClick={() => router.push('/login')}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
