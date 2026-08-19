import CMSHeader from '@/components/layout/cms/cms-header';
import CMSSidebar from '@/components/layout/cms/cms-sidebar';
import Loading from '@/components/ui/loading';
import type { Metadata } from 'next';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customized Diet Design Admin',
  description: 'Customized Diet Design Admin Application'
};

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <CMSHeader />
        <div className="flex h-screen overflow-hidden">
          <CMSSidebar />
          <main className="flex-1 overflow-y-auto px-8 pb-4 pt-[6rem]">
            {children}
          </main>
        </div>
      </Suspense>
    </>
  );
}
