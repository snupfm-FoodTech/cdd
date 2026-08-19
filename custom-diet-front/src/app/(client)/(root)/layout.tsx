'use client';

import ClientFooter from '@/components/layout/client/client-footer';
import ClientHeader from '@/components/layout/client/client-header';
import Loading from '@/components/ui/loading';
import { DIET_MANAGEMENT_URL } from '@/constants/routes';
import { usePathname } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const urlsExclude = [DIET_MANAGEMENT_URL];

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [shouldRenderFooter, setShouldRenderFooter] = useState<boolean>(false);

  useEffect(() => {
    for (const url of urlsExclude) {
      if (!pathname.includes(url)) {
        setShouldRenderFooter(true);
        break;
      }
    }

    return () => {
      setShouldRenderFooter(false);
    };
  }, [pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex h-screen flex-col">
        <ClientHeader />
        <main className="mt-12 flex-1 bg-background">{children}</main>
        {shouldRenderFooter && <ClientFooter />}
      </div>
    </Suspense>
  );
}
