'use client';

import { IUserData } from '@/api-client/auth.api';
import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import NotFoundData from '@/components/ui/not-found-data';
import {
  CLIENT_INFO_CHANGE_PASSWORD,
  CLIENT_INFO_UPDATE,
  HOME_URL
} from '@/constants/routes';
import { useMembership } from '@/hooks/membership.hook';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { EyeIcon } from 'lucide-react';

const ClientInfo = () => {
  const userData: IUserData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;

  const { data: user, isPending } = useMembership(userData?.usrId);

  const router = useRouter();

  const handleGotoEditInfo = () => {
    router.push(CLIENT_INFO_UPDATE);
  };

  const handleGotoChangePassword = () => {
    router.push(CLIENT_INFO_CHANGE_PASSWORD);
  };

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center py-20">
        <Spinner size="large" />
      </div>
    );
  }

  if (!user) return <NotFoundData backUrl={'/'} label="사용자 정보" />;

  return (
    <div className="section-padding flex justify-center py-10">
      <div className="w-full max-w-[80rem] space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <BackButton url={HOME_URL} label={'목록으로 돌아가기'} size="large" />
          <div className="flex">
            <Button size="sm" className="mr-3" onClick={handleGotoEditInfo}>
              <Icons.edit className="mr-1 h-4 w-4" />
              정보 수정
            </Button>
            <Button size="sm" onClick={handleGotoChangePassword}>
              <EyeIcon className="mr-1 h-4 w-4" />
              비밀번호 변경
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-4 text-xl font-bold">{user.usrNm}</div>
          <div className="flex flex-col space-y-2 text-gray-600">
            <div className="flex flex-col md:flex-row">
              <span className="w-32 font-semibold">이메일</span>
              <span>{user.usrEml}</span>
            </div>
            <div className="flex flex-col md:flex-row">
              <span className="w-32 font-semibold">담당자 연락처</span>
              <span>{user.usrPhnNo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
