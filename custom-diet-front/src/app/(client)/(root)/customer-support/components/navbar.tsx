'use client';

import {
  CUSTOMER_SUPPORT_ROUTES,
  CUSTOMER_SUPPORT_SUB_ROUTES,
  USER_QA_URL
} from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { usePrevious } from '@/hooks/use-auth';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function CustomerSupportNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  const { setPrevAsPath } = usePrevious();

  const handleSetPrePage = (url: string) => {
    if (url === USER_QA_URL && !Cookies.get('accessToken')) {
      setPrevAsPath(USER_QA_URL);
    }
  };

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-16 z-[15] h-10 bg-slate-100 shadow-sm',
        className
      )}
    >
      <div className="section-padding">
        <ScrollArea className="w-full overflow-auto">
          <div className="flex h-10 items-center justify-center gap-4 whitespace-nowrap md:justify-end">
            {[...CUSTOMER_SUPPORT_ROUTES, ...CUSTOMER_SUPPORT_SUB_ROUTES].map(
              (route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    'shrink-0 text-base transition-colors',
                    path.includes(route.href)
                      ? 'font-semibold text-primary'
                      : 'text-base text-muted-foreground'
                  )}
                  onClick={() => handleSetPrePage(route.href)}
                >
                  {route.title}
                </Link>
              )
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </nav>
  );
}
