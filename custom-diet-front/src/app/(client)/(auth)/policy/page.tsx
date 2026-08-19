'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { checkTokenNotExisted } from '@/utils';

import { BASE_PATH } from '@/constants';

import PolicyForm from './_components/policy-form';

const PolicyPage = () => {
  const router = useRouter();

  useEffect(() => {
    checkTokenNotExisted(router);
  }, [router]);

  return (
    // Responsive layout: single column on mobile/tablet, two columns on desktop
    <div className="mx-auto flex w-full max-w-[1000px] flex-col xl:grid xl:grid-cols-1 xl:gap-12 xl:px-12">
      {/* Left Side: Background Image — hidden on mobile/tablet */}
      {/* <div className="relative hidden h-full w-full xl:col-span-1 xl:block">
        <Image
          src={`${BASE_PATH}/img/bg-left.png`}
          alt="Customized Dietary"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full max-w-[320px]"
        />
      </div> */}
      {/* Right Side: Policy Form */}
      <div className="flex w-full items-center justify-center py-5 md:py-10 xl:col-span-1">
        <PolicyForm />
      </div>
    </div>
  );
};

export default PolicyPage;
