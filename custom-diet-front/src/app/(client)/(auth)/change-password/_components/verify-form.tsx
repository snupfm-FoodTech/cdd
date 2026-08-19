'use client';

import { CDInput } from '@/components/cd-input';
import RenderTime from '@/components/layout/client/time-countdown';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HOME_URL, LOGIN_USER_URL } from '@/constants/routes';
import { useSendForgetCode, useVerifyCode } from '@/hooks/auth.hook';
import { useGetEmailValue } from '@/hooks/use-auth';
import { IValueField } from '@/types/form.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { AppLogo } from '@/components/app-logo';

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: '이메일 아이디를 입력해주세요.'
    })
    .email({ message: '올바른 이메일 주소를 입력해주세요' }),
  code: z
    .string()
    .min(8, {
      message: '문자열은 8자 이상이어야 합니다'
    })
    .max(8, {
      message: '문자열은 최대 8자를 포함해야 합니다'
    })
});

type UserFormValue = z.infer<typeof formSchema>;

interface VerifyFormProps {
  isVerified?: boolean;
  setIsVeriFied: React.Dispatch<React.SetStateAction<boolean>>;
}

const VerifyForm = ({ isVerified, setIsVeriFied }: VerifyFormProps) => {
  const [mailFieldValue, setMailFieldValue] = useState('');
  const [isStartTime, setIsStartTime] = useState(false);
  const [isResetTime, setIsResetTime] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDisableEmail, setDisableEmail] = useState(false);
  const [isDisableEmailBtn, setDisableEmailBtn] = useState(false);

  const router = useRouter();

  const { setEmail } = useGetEmailValue();

  const formConfirmMail = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: ''
    }
  });

  const sendCodeMutate = useSendForgetCode();
  const verifyCodeMutate = useVerifyCode();

  const onSubmit = async (dataForm: UserFormValue) => {
    verifyCodeMutate
      .mutateAsync({ usrEml: mailFieldValue, authNo: dataForm.code })
      .then(() => {
        setIsVeriFied(true);
        setIsComplete(true);
      });
  };

  const handleSendVerifyCode = (fieldEmail: IValueField) => {
    sendCodeMutate.mutateAsync({ usrEml: fieldEmail.value }).then(() => {
      if (!isStartTime) {
        setIsStartTime(true);
      } else {
        setIsResetTime(!isResetTime);
      }
      setMailFieldValue(fieldEmail.value);
      setEmail(fieldEmail.value);
      setDisableEmail(true);
      setDisableEmailBtn(true);
    });
  };

  // enable btn send code after 5s
  useEffect(() => {
    setTimeout(() => setDisableEmailBtn(false), 5000);
  }, [isDisableEmailBtn]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center md:px-12">
      <Form {...formConfirmMail}>
        <div className="h-fit w-full rounded-xl shadow-2xl">
          <form
            onSubmit={formConfirmMail.handleSubmit(onSubmit)}
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
              control={formConfirmMail.control}
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
                          formConfirmMail.getFieldState('email').invalid ||
                          !formConfirmMail.getValues('email') ||
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
              control={formConfirmMail.control}
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
                    <CDInput
                      disabled={!mailFieldValue}
                      {...field}
                      maxLength={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex w-full items-center justify-center gap-5 md:gap-10">
              <Button className="w-1/2 rounded-lg md:w-1/3" type="submit">
                확인
              </Button>
              <Button
                type="button"
                className="w-1/2 rounded-lg md:w-1/3"
                variant="blue"
                onClick={() => router.push(LOGIN_USER_URL)}
              >
                로그인으로 돌아가기
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default VerifyForm;
