'use client';

import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import DietSidebar from '../components/diet-sidebar';
import FloatingActionList from '@/components/ui/fab-list';

interface DietManagementSidebarLayoutProps {
  children: React.ReactNode;
}

const DietManagementSidebarLayout = ({
  children
}: DietManagementSidebarLayoutProps) => {
  const isDesktopQuery = useMediaQuery('(min-width: 1285px)');
  const [isClient, setIsClient] = useState(false); // avoid SSR hydration mismatch
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const isDesktop = isDesktopQuery;

  return (
    <div className="flex h-full overflow-hidden">
      {isDesktop ? (
        <>
          <div className="w-[25rem] shrink-0">
            <DietSidebar />
          </div>
          <div className="flex-1">{children}</div>
        </>
      ) : (
        <>
          <Drawer
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            direction="left"
          >
            <DrawerContent
              className="p-0"
              style={{
                width: isDesktop ? '25rem' : '80vw'
              }}
            >
              <DietSidebar onClose={() => setIsDrawerOpen(false)} />
            </DrawerContent>
          </Drawer>

          <div className="w-full flex-1">{children}</div>
          <FloatingActionList
            onListClick={() => {
              setIsDrawerOpen(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default DietManagementSidebarLayout;
