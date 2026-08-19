'use client';

import { BASE_PATH } from '@/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type AppLogoProps = {
  alt?: string;
  className?: string;
  href?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export const AppLogo = ({
  alt = 'Customized Dietary',
  className,
  href,
  imageClassName,
  priority = false,
  sizes = '(max-width: 768px) 112px, 144px'
}: AppLogoProps) => {
  const logo = (
    <Image
      src={`${BASE_PATH}/img/logo.png`}
      alt={alt}
      width={1541}
      height={620}
      priority={priority}
      sizes={sizes}
      className={cn('h-auto w-full object-contain', imageClassName)}
    />
  );

  if (href) {
    return (
      <Link href={href} className={cn('block', className)}>
        {logo}
      </Link>
    );
  }

  return <div className={className}>{logo}</div>;
};
