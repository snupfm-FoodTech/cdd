'use client';

import { IUserData } from '@/api-client/auth.api';
import { ROLE } from '@/constants';
import { HOME_URL, LOGIN_USER_URL } from '@/constants/routes';
import { usePrevious } from '@/hooks/use-auth';
import { toast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ClientNav } from './client-nav';
import { ClientUserMenu } from './client-user-menu';
import { clearAllCookies } from '@/utils';
import { MobileMenu } from './mobile-menu';
import { ChevronLeft } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';

const ClientHeader = () => {
  const router = useRouter();
  const { setPrevAsPath } = usePrevious();

  const userData: IUserData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') || '')
    : false;

  const isUser = userData ? userData.usrRoles === ROLE.USER : false;
  const isAccessToken = !!Cookies.get('accessToken');

  const [canGoBack, setCanGoBack] = useState(false);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // history.length > 1 means you can go back
    if (typeof window !== 'undefined' && window.history.length > 1) {
      setCanGoBack(true);
    } else {
      setCanGoBack(false);
    }

    setIsClient(true);
  }, []);

  const handleLogout = () => {
    clearAllCookies(router, false);
    setPrevAsPath('');
    toast({ title: '로그아웃 성공.', variant: 'success' });
    router.replace(HOME_URL);
    router.refresh();
  };

  return (
    <div className="section-padding fixed left-0 right-0 top-0 z-20 flex h-16 items-center justify-between border-b bg-white">
      <div className="flex items-center gap-4 py-4 sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-1">
          {canGoBack && (
            <div className="w-8 md:hidden">
              <ChevronLeft
                className="h-8 w-8 cursor-pointer text-gray-500"
                onClick={() => router.back()}
              />
            </div>
          )}
          <div className="w-[104px] sm:w-[116px]">
            <AppLogo href={HOME_URL} priority />
          </div>
        </div>
        <div className="hidden lg:block">
          <ClientNav />
        </div>
      </div>
      {/* Desktop User Menu */}
      {isClient && userData && isAccessToken && (
        <div className="hidden lg:block">
          <ClientUserMenu
            user={userData}
            onLogout={handleLogout}
            isUser={isUser}
          />
        </div>
      )}

      {/* Desktop Login Link */}
      {isClient && !isAccessToken && (
        <Link
          href={LOGIN_USER_URL}
          className="hidden text-base font-medium text-muted-foreground transition-colors lg:block"
        >
          로그인
        </Link>
      )}

      {/* Mobile / Tablet Menu */}
      {isClient && (
        <div className="lg:hidden">
          <MobileMenu
            user={userData}
            isLoggedIn={isAccessToken}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default ClientHeader;
