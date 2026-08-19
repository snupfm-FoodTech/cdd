'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { checkTokenNotExisted } from '@/utils';

import { BASE_PATH } from '@/constants';

import VerifyForm from './_components/verify-form';
import ChangePasswordForm from './_components/change-password-form';

const ChangePasswordPage = () => {
  const [isVerified, setIsVerified] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkTokenNotExisted(router);
  }, [router]);

  return (
    // Responsive layout: single column on mobile/tablet, two columns on desktop
    <div className="h-screen flex-1 overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-h-screen-fit w-full max-w-[700px] flex-col xl:grid xl:grid-cols-1 xl:gap-12">
        {/* Left Side: Login Form */}
        <div className="flex w-full items-center justify-center py-10">
          {!isVerified ? (
            <VerifyForm setIsVeriFied={setIsVerified} />
          ) : (
            <ChangePasswordForm />
          )}
        </div>

        {/* Right Side: Background Image — hidden on mobile/tablet */}
        {/* <div className="relative hidden h-full w-full xl:block">
          <Image
            src={`${BASE_PATH}/img/bg-right.png`}
            alt="Customized Dietary"
            fill
            priority
            className="object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
