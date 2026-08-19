'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '@/hooks/auth.hook';
import { usePrevious } from '@/hooks/use-auth';
import { checkTokenNotExisted } from '@/utils';
import { setAccessToken } from '@/api-client/http-wrapper';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CDInput } from '@/components/cd-input';
import { Spinner } from '@/components/spinner';

import { CHANGE_PASSWORD_URL, HOME_URL, POLICY_URL } from '@/constants/routes';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useMediaQuery } from 'usehooks-ts';
import { AppLogo } from '@/components/app-logo';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일 아이디를 입력해주세요.' })
    .email({ message: '올바른 이메일 주소를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' })
});

type UserFormValue = z.infer<typeof formSchema>;

const LoginPage = () => {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const router = useRouter();
  const { prevAsPath } = usePrevious();

  const isRemembered = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { mutateAsync: loginMutate, isPending } = useLogin();

  useEffect(() => {
    checkTokenNotExisted(router);
  }, [router]);

  useEffect(() => {
    if (prevAsPath) {
      router.refresh();
    }

    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      form.setValue('email', savedEmail);
    }
  }, [prevAsPath, router, form]);

  // Submit form
  const onSubmit = async (dataForm: UserFormValue) => {
    const res = await loginMutate({
      email: dataForm.email,
      password: dataForm.password
    });

    // Save email to localStorage if checkbox is checked
    if (isRemembered.current) {
      localStorage.setItem('email', dataForm.email);
    } else {
      localStorage.removeItem('email');
    }

    // Save tokens and user data
    setAccessToken(res.accessToken);
    Cookies.set('refreshToken', res.refreshToken, { expires: 10 });
    Cookies.set('userData', JSON.stringify(res.user), { expires: 10 });

    // Redirect to previous path or home
    if (isMobile) {
      window.location.replace(prevAsPath || HOME_URL);
    } else {
      router.replace(prevAsPath || HOME_URL);
    }
  };

  const handleRemember = (value: boolean) => {
    isRemembered.current = value;
  };

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    // Responsive layout: single column on mobile/tablet, two columns on desktop
    <div className="h-screen flex-1 overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-h-screen-fit w-full max-w-screen-2xl flex-col xl:grid xl:grid-cols-1 xl:gap-12">
        {/* Left Side: Login Form */}
        <div className="flex w-full items-center justify-center py-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[500px] rounded-lg bg-white p-8 shadow-xl"
            >
              {/* Logo */}
              <div className="justify-left mb-8 flex items-center gap-3">
                <AppLogo href={HOME_URL} className="w-28 md:w-32" />
                <div className="flex flex-col text-left">
                  <p className="text-default-800 text-lg font-semibold">
                    Customized Dietary
                  </p>
                  <p className="text-default-500 text-sm">
                    당신만을 위한 식단 플랜
                  </p>
                </div>
              </div>

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        className="text-black"
                        {...field}
                        placeholder="아이디"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <CDInput
                        className="text-black"
                        type={showPassword ? 'text' : 'password'}
                        endIcon={showPassword ? EyeIcon : EyeOffIcon}
                        onClickIcon={() => setShowPassword((prev) => !prev)}
                        placeholder="비밀번호"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Checkbox */}
              <div className="mt-4 flex items-center gap-2">
                <Label className="flex cursor-pointer items-center gap-2">
                  <Checkbox onCheckedChange={handleRemember} />
                  <span>아이디 저장</span>
                </Label>
              </div>

              {/* Login & Register Buttons */}
              <div className="flex w-full items-center justify-center gap-5 md:gap-10">
                <Button
                  className="mt-4 w-1/2 rounded-lg md:w-1/3"
                  type="submit"
                >
                  로그인
                </Button>
                <Button
                  className="mt-4 w-1/2 rounded-lg md:w-1/3"
                  type="button"
                  variant="blue"
                  onClick={() => router.push(POLICY_URL)}
                >
                  회원가입
                </Button>
              </div>

              {/* Forgot Password & Back Home Links */}
              <div className="flex justify-center gap-4">
                <Link
                  className="mt-4 text-sm underline underline-offset-4"
                  href={CHANGE_PASSWORD_URL}
                >
                  비밀번호를 잊으셨나요?
                </Link>
                <Link
                  className="mt-4 text-sm text-primary underline underline-offset-4"
                  href={HOME_URL}
                >
                  홈페이지로 돌아가기
                </Link>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Side: Background Image — hidden on mobile/tablet */}
        {/* <div className="relative hidden h-full w-full xl:block">
          <Image
            src={`${BASE_PATH}/img/bg-right.png`}
            alt="Customized Dietary"
            fill
            priority
            className="object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
