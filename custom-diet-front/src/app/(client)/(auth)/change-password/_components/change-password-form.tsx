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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as z from 'zod';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { CDInput } from '@/components/cd-input';
import { useForgetPassword } from '@/hooks/auth.hook';
import { useGetEmailValue } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { REGEX_PASSWORD } from '@/constants';
import { HOME_URL, LOGIN_USER_URL } from '@/constants/routes';
import { AppLogo } from '@/components/app-logo';

const formSchema = z
  .object({
    password: z
      .string()
      .refine(
        (value) => REGEX_PASSWORD.test(value ?? ''),
        '비밀번호는 최소 8자리 이상이며, 대문자, 소문자, 숫자, 특수문자 각각 하나 이상 포함해야 합니다'
      ),
    rePassword: z.string().min(1, {
      message: '비밀번호를 입력해주세요.'
    })
  })
  .strict()
  .refine((data) => data.password === data.rePassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['rePassword']
  });

type UserFormValue = z.infer<typeof formSchema>;

const ChangePasswordForm = () => {
  const router = useRouter();

  const formChangePassword = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      rePassword: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const forgetPassword = useForgetPassword();
  const { email } = useGetEmailValue();

  const onSubmit = async (dataForm: UserFormValue) => {
    forgetPassword
      .mutateAsync({ usrEml: email, usrNewPwd: dataForm.password })
      .then(() => {
        router.push(LOGIN_USER_URL);
      });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center md:px-12">
      <Form {...formChangePassword}>
        <div className="w-full rounded-xl shadow-2xl">
          <form
            onSubmit={formChangePassword.handleSubmit(onSubmit)}
            className="h-full w-full overflow-y-auto bg-white p-8"
          >
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
              control={formChangePassword.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel required>비밀번호</FormLabel>
                  <FormControl>
                    <CDInput
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
              control={formChangePassword.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="mx-1 mt-2">
                  <FormLabel required>비밀번호 확인</FormLabel>
                  <FormControl>
                    <CDInput
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

            <div className="mt-4 flex justify-around">
              <Button className="w-1/2 rounded-lg md:w-1/3" type="submit">
                확인
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
