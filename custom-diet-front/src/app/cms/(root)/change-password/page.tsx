'use client';

import { IUserData } from '@/api-client/auth.api';
import { CDInput } from '@/components/cd-input';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import NotFoundData from '@/components/ui/not-found-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { REGEX_PASSWORD } from '@/constants';
import { CMS_MEMBERSHIPS_URL } from '@/constants/routes';
import { useMembership, useUpdateMembership } from '@/hooks/membership.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: '현재 비밀번호를 입력해주세요.'
    }),
    password: z
      .string()
      .min(1, { message: '새 비밀번호를 입력해주세요.' })
      .refine(
        (value) => REGEX_PASSWORD.test(value ?? ''),
        '비밀번호는 최소 8자리 이상이며, 대문자, 소문자, 숫자, 특수문자 각각 하나 이상 포함해야 합니다'
      ),
    rePassword: z.string().min(1, {
      message: '새 비밀번호 확인을 입력해주세요.'
    })
  })
  .strict()
  .refine((data) => data.password === data.rePassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['rePassword']
  })
  .refine((data) => data.currentPassword !== data.password, {
    message: '새 비밀번호는 이전 비밀번호와 달라야 합니다.',
    path: ['password']
  });

type UserFormValue = z.infer<typeof formSchema>;

const CMSChangePassword = () => {
  const formUser = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: ''
    }
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const userData: IUserData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;

  const { data: user, isPending } = useMembership(userData?.usrId);
  const { mutateAsync, isPending: isPendingUpdate } = useUpdateMembership(
    userData?.usrId
  );

  const router = useRouter();

  const onSubmit = async (dataForm: UserFormValue) => {
    await mutateAsync({
      name: userData?.usrNm,
      newPassword: dataForm.password,
      phoneNo: userData?.usrPhnNo,
      currentPassword: dataForm.currentPassword
    });
    router.push(CMS_MEMBERSHIPS_URL);
  };

  if (isPending || isPendingUpdate) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!user)
    return <NotFoundData backUrl={CMS_MEMBERSHIPS_URL} label="사용자 정보" />;

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-[80rem] space-y-4">
        <div className="flex flex-col md:px-4">
          <div className="change-password-form flex h-full w-full flex-col items-center justify-center">
            <h3 className="my-5 text-xl font-bold text-primary">
              비밀번호 변경
            </h3>
            <Form {...formUser}>
              <ScrollArea className="h-fit w-full rounded-xl shadow-md lg:w-1/2">
                <form
                  onSubmit={formUser.handleSubmit(onSubmit)}
                  className="h-full w-full overflow-y-auto bg-secondary p-8"
                >
                  <FormField
                    control={formUser.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem className="mx-1 mt-2">
                        <FormLabel required>현재 비밀번호</FormLabel>
                        <FormControl>
                          <CDInput
                            placeholder="현재 비밀번호"
                            type={showCurrentPassword ? 'text' : 'password'}
                            endIcon={showCurrentPassword ? EyeIcon : EyeOffIcon}
                            onClickIcon={() =>
                              setShowCurrentPassword((prev) => !prev)
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formUser.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mx-1 mt-2">
                        <FormLabel required>새 비밀번호</FormLabel>
                        <FormControl>
                          <CDInput
                            placeholder="새 비밀번호"
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
                    control={formUser.control}
                    name="rePassword"
                    render={({ field }) => (
                      <FormItem className="mx-1 mt-2">
                        <FormLabel required>새 비밀번호 확인</FormLabel>
                        <FormControl>
                          <CDInput
                            placeholder="새 비밀번호 확인"
                            type={showRePassword ? 'text' : 'password'}
                            endIcon={showRePassword ? EyeIcon : EyeOffIcon}
                            onClickIcon={() =>
                              setShowRePassword((prev) => !prev)
                            }
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4 flex justify-around">
                    <Button className="w-1/2 rounded-lg md:w-1/3" type="submit">
                      비밀번호 변경
                    </Button>
                  </div>
                </form>
              </ScrollArea>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMSChangePassword;
