'use client';

import Link from 'next/link';
import {
  CLIENT_ROUTES,
  DIET_MANAGEMENT_URL,
  DIET_MANAGEMENT_URL_ALT
} from '@/constants/routes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { usePrevious } from '@/hooks/use-auth';
import { LOCAL_STORAGE } from '@/constants';

export function ClientNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const path = usePathname();
  const { setPrevAsPath } = usePrevious();

  const handleSetPrePage = (url: string) => {
    if (url === DIET_MANAGEMENT_URL) {
      localStorage.setItem(LOCAL_STORAGE.LAST_PAGE, DIET_MANAGEMENT_URL_ALT);
    }
    if (url === DIET_MANAGEMENT_URL && !Cookies.get('accessToken')) {
      setPrevAsPath(DIET_MANAGEMENT_URL);
    }
  };

  return (
    <nav
      className={cn(
        'flex items-center bg-white',
        'overflow-x-auto whitespace-nowrap',
        className
      )}
      aria-label="Primary"
      {...props}
    >
      {CLIENT_ROUTES.map((route, idx) => {
        const isActive =
          route.href === '/' ? path === '/' : path.startsWith(route.href);

        const itemClass =
          'px-1 text-base transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm';

        const colorClass = isActive
          ? 'text-primary font-semibold'
          : 'text-default-700';

        const separator =
          idx > 0 ? (
            <span
              key={`sep-${route.href}`}
              aria-hidden="true"
              className="text-default-300 mx-2 opacity-30"
            >
              |
            </span>
          ) : null;

        if (route.isService) {
          return (
            <div key={route.href} className="flex items-center">
              {separator}
              <button
                type="button"
                className={cn(itemClass, colorClass, 'bg-transparent')}
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_CD_SERVICE) {
                    window.location.href = process.env.NEXT_PUBLIC_CD_SERVICE!;
                  }
                }}
                role="link"
                aria-label={route.title}
              >
                {route.title}
              </button>
            </div>
          );
        }

        return (
          <div key={route.href} className="flex items-center">
            {separator}
            <Link
              href={route.href}
              className={cn(itemClass, colorClass)}
              onClick={() => handleSetPrePage(route.href)}
              aria-current={isActive ? 'page' : undefined}
            >
              {route.title}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
