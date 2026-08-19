'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { IUserData } from '@/api-client/auth.api';
import { CMS_LOGIN_URL } from '@/constants/routes';
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { clearAllCookies } from '@/utils';
import { AppLogo } from '@/components/app-logo';
import { UserNav } from './user-nav';

const CMSHeader = () => {
  const router = useRouter();
  const userData: IUserData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;
  const isAccessToken = Cookies.get('accessToken') ? true : false;

  // fix react-hydration-error
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    clearAllCookies(router, true);
    toast({
      title: '로그아웃 성공.',
      variant: 'success'
    });

    router.replace(CMS_LOGIN_URL);
    router.refresh();
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4">
      {isClient && (
        <div className="flex items-center gap-4">
          <AppLogo className="w-20" />
          <p className="text-sm font-medium">맞춤형 식이 설계</p>
        </div>
      )}
      {isClient && userData.usrNm && isAccessToken && (
        <UserNav user={userData} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default CMSHeader;
