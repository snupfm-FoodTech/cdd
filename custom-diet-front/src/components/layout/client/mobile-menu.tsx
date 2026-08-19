'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { IUserData } from '@/api-client/auth.api';
import {
  CLIENT_INFO,
  CLIENT_ROUTES,
  HOME_URL,
  LOGIN_USER_URL
} from '@/constants/routes';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose
} from '@/components/ui/drawer';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AppLogo } from '@/components/app-logo';

export const MobileMenu = ({
  user,
  isLoggedIn,
  onLogout
}: {
  user: IUserData | false;
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  const path = usePathname();

  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Menu className="h-6 w-6 cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-4 p-6 text-left text-base">
        <div className="flex items-center gap-3">
          <div className="w-[104px]">
            <DrawerClose asChild>
              <AppLogo href={HOME_URL} />
            </DrawerClose>
          </div>
          {user ? <div>{user.usrNm}</div> : <div>Customized Dietary</div>}
        </div>
        <Separator />

        {CLIENT_ROUTES.map((item) => {
          const isSubPath = path.includes(item.href);
          const isService = item.isService;

          if (isService) {
            return (
              <DrawerClose asChild key={item.href}>
                <div
                  className={cn(
                    'text-base transition-colors',
                    isSubPath ? 'font-semibold text-primary' : 'text-base'
                  )}
                  onClick={() => {
                    if (process.env.NEXT_PUBLIC_CD_SERVICE) {
                      window.location.href = process.env.NEXT_PUBLIC_CD_SERVICE;
                    }
                  }}
                >
                  {item.title}
                </div>
              </DrawerClose>
            );
          }

          return (
            <DrawerClose asChild key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-base transition-colors',
                  isSubPath ? 'font-semibold text-primary' : 'text-base'
                )}
              >
                {item.title}
              </Link>
            </DrawerClose>
          );
        })}

        <div className="mt-4 border-t pt-4">
          {isLoggedIn ? (
            <div className="flex flex-col gap-4">
              <DrawerClose asChild>
                <Link href={CLIENT_INFO}>계정 정보</Link>
              </DrawerClose>
              <DrawerClose asChild>
                <div className="cursor-pointer" onClick={onLogout}>
                  로그아웃
                </div>
              </DrawerClose>
            </div>
          ) : (
            <DrawerClose asChild>
              <Link href={LOGIN_USER_URL}>로그인</Link>
            </DrawerClose>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
