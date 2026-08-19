'use client';

import { CMS_MEMBERSHIPS_URL } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CMSPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(CMS_MEMBERSHIPS_URL);
  }, [router]);
  return <div />;
};

export default CMSPage;
