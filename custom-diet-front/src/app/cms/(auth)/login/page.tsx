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
import { useLogin } from '@/hooks/auth.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Cookies from 'js-cookie';
import { CMS_MEMBERSHIPS_URL } from '@/constants/routes';
import { setAccessToken } from '@/api-client/http-wrapper';
import { CDInput } from '@/components/cd-input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { AppLogo } from '@/components/app-logo';

const formSchema = z.object({
  email: z.string().min(1, {
    message: '사용자 이름이 필요합니다'
  }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' })
});

type UserFormValue = z.infer<typeof formSchema>;

const LoginPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const loginMutate = useLogin();

  const onSubmit = (dataForm: UserFormValue) => {
    loginMutate
      .mutateAsync({ email: dataForm.email, password: dataForm.password })
      .then((res) => {
        setAccessToken(res.accessToken);
        Cookies.set('refreshToken', res.refreshToken, { expires: 10 });
        Cookies.set('userData', JSON.stringify(res.user), { expires: 10 }); // 30m

        router.push(CMS_MEMBERSHIPS_URL);
      });
  };

  return (
    <div>
      <div className="login-admin-page relative z-10 flex h-screen w-full items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-fit w-1/3 rounded-xl bg-secondary p-8 shadow-2xl"
          >
            <div className="mb-2 flex flex-col items-center gap-2">
              <AppLogo className="w-28" />
              <span>맞춤형 식이 설계 Admin</span>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>사용자 이름</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>비밀번호</FormLabel>
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

            <div className="flex justify-around">
              <Button className="mx-4 mt-4 w-1/3 rounded-lg" type="submit">
                로그인
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
