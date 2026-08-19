'use client';

import BackButton from '@/components/back-button';
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
import { REGEX_NUMBER } from '@/constants';
import { CLIENT_INFO } from '@/constants/routes';
import { useMembership, useUpdateMembership } from '@/hooks/membership.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, {
    message: '필수 입력사항입니다'
  }),
  phoneNo: z
    .string()
    .refine((value) => REGEX_NUMBER.test(value ?? ''), '숫자를 입력해야 합니다')
});

type UserFormValue = z.infer<typeof formSchema>;

const ClientInfoUpdate = () => {
  const formUser = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phoneNo: ''
    }
  });

  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;

  const { data: user, isPending, isSuccess } = useMembership(userData?.usrId);
  const { mutateAsync, isPending: isPendingUpdate } = useUpdateMembership(
    userData?.usrId
  );

  const router = useRouter();

  useEffect(() => {
    if (isSuccess && user) {
      formUser.reset({
        name: user.usrNm,
        phoneNo: user.usrPhnNo
      });
    }
  }, [isSuccess, user, formUser]);

  const onSubmit = async (dataForm: UserFormValue) => {
    await mutateAsync(dataForm);
    Cookies.set(
      'userData',
      JSON.stringify({
        ...userData,
        usrNm: dataForm.name,
        usrPhnNo: dataForm.phoneNo
      }),
      { expires: 10 }
    ); // 30m
    router.push(CLIENT_INFO);
  };

  if (isPending || isPendingUpdate) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!user) {
    return <NotFoundData backUrl={CLIENT_INFO} label="사용자 정보" />;
  }

  return (
    <div className="section-padding flex justify-center py-10">
      <div className="w-full max-w-[80rem] space-y-4">
        <div className="flex justify-between">
          <BackButton
            url={CLIENT_INFO}
            label="목록으로 돌아가기"
            size="large"
          />
        </div>
        <div className="flex flex-col md:px-4">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <h3 className="my-5 text-xl font-bold text-primary">
              사용자 정보 양식
            </h3>
            <Form {...formUser}>
              <ScrollArea className="h-fit w-full rounded-xl shadow-md lg:w-1/2">
                <form
                  onSubmit={formUser.handleSubmit(onSubmit)}
                  className="h-full w-full overflow-y-auto bg-secondary p-8"
                >
                  <FormField
                    control={formUser.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mx-1 mt-2">
                        <FormLabel required>담당자 이름</FormLabel>
                        <FormControl>
                          <CDInput
                            {...field}
                            placeholder="담당자 이름"
                            maxLength={50}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={formUser.control}
                    name="phoneNo"
                    render={({ field }) => (
                      <FormItem className="mx-1 mt-2">
                        <FormLabel>담당자 연락처</FormLabel>
                        <FormControl>
                          <CDInput
                            {...field}
                            placeholder="담당자 연락처"
                            maxLength={15}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mt-4 flex justify-around">
                    <Button className="w-1/2 rounded-lg md:w-1/3" type="submit">
                      정보 저장
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

export default ClientInfoUpdate;
