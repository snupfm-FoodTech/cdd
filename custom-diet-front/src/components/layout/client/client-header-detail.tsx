'use client';

import { HOME_URL } from '@/constants/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface ClientDetailHeaderProps {
  image?: string; // Optional background image
  title: string; // Page title
  breadcrumbs: Breadcrumb[]; // Breadcrumb trail
}

const ClientHeaderDetail = ({
  image,
  title,
  breadcrumbs
}: ClientDetailHeaderProps) => {
  const router = useRouter();

  const handleClickHome = () => router.push(HOME_URL);
  const handleClickItem = (b: Breadcrumb) => b?.url && router.push(b.url);

  const renderBreadcrumbs = () =>
    breadcrumbs.map((breadcrumb, index) =>
      breadcrumb.url ? (
        <span key={index} className="text-white">
          <span className="mx-1">/</span>
          <span
            className="cursor-pointer underline underline-offset-4"
            onClick={() => handleClickItem(breadcrumb)}
          >
            {breadcrumb.label}
          </span>
        </span>
      ) : (
        <span key={index} className="text-white">
          <span className="mx-1">/</span>
          <span className="ml-1">{breadcrumb.label}</span>
        </span>
      )
    );

  return (
    /**
     * Mobile: fluid height with safe min-heights so content never gets too thin.
     * ≥ md: strict aspect ratio 1882/386 (same as DietDetailHeader).
     */
    <header
      aria-label="Page detail header"
      className="relative h-[12rem] w-full overflow-hidden 2xl:aspect-[1882/386] 2xl:h-auto"
    >
      {/* Background image or gradient fallback */}
      {image ? (
        <Image
          src={image}
          alt="Header background"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
          style={{ objectPosition: 'center' }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
          }}
        />
      )}

      {/* Overlay for readability (slightly stronger on mobile, uniform on md+) */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55 md:bg-black/45" /> */}

      {/* Content */}
      <div className="section-padding absolute inset-0 z-10 flex flex-col items-start justify-center py-4 text-left md:py-0">
        <h1
          className="mb-2 text-[clamp(20px,3vw,32px)] font-bold leading-tight text-white md:mb-3"
          title={title}
        >
          <span className="line-clamp-1">{title}</span>
        </h1>

        <p className="mt-1 text-[clamp(13px,2.1vw,16px)] font-semibold text-white">
          <span
            className="cursor-pointer underline underline-offset-4"
            onClick={handleClickHome}
          >
            홈
          </span>
          {renderBreadcrumbs()}
        </p>
      </div>
    </header>
  );
};

export default ClientHeaderDetail;
