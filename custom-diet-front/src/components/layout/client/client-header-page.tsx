import { HOME_URL } from '@/constants/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface ClientHeaderPageProps {
  image?: string; // Optional background image
  title: string; // Page title
  breadcrumbs: Breadcrumb[]; // Breadcrumb trail
  /** 제목 옆에 붙는 상태 표시 (예: 영양평가 결과) */
  titleSuffix?: ReactNode;
  /** 배너 오른쪽 위 슬롯. 이 화면이 아니라 화면 전체에 대한 안내·도움말 자리다. */
  topRight?: ReactNode;
}

const ClientHeaderPage = ({
  image,
  title,
  breadcrumbs,
  titleSuffix,
  topRight
}: ClientHeaderPageProps) => {
  const router = useRouter();

  const handleClickHome = () => router.push(HOME_URL);
  const handleClickItem = (b: Breadcrumb) => b?.url && router.push(b.url);

  const renderBreadcrumbs = () =>
    breadcrumbs.map((breadcrumb, index) =>
      breadcrumb.url ? (
        <span key={index} className="text-white">
          <span className="mx-1">/</span>
          <span
            className="cursor-pointer text-white underline underline-offset-4"
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
    <header
      className="/* Responsive aspect ratio: - mobile: 40% - sm: 30% - md: 20% - lg+: 15.3846% (1300x200) */ /* Safety min-heights to prevent 'too thin' banner */ relative min-h-[160px] w-full overflow-hidden pt-[40%] sm:min-h-[180px] sm:pt-[30%] md:min-h-[200px] md:pt-[20%] lg:pt-[15.3846%]"
      aria-label="Page header"
    >
      {image ? (
        <>
          <Image
            src={image}
            alt="Header"
            fill
            sizes="100vw"
            // keep image covering container responsively
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority={false}
          />
          {/* Overlay to keep text readable on any image */}
          {/* <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/25 to-black/10" /> */}
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            opacity: 0.9
          }}
        />
      )}

      {topRight && (
        <div className="section-padding absolute inset-x-0 top-0 z-20 flex justify-end pt-6 md:pt-8 lg:pt-10">
          {topRight}
        </div>
      )}

      {/* Content */}
      <div className="section-padding absolute inset-0 z-10 flex flex-col items-start justify-center text-left">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2 md:mb-3">
          <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            {title}
          </h1>
          {titleSuffix}
        </div>
        <p className="mt-1 text-sm font-semibold text-white sm:text-base">
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

export default ClientHeaderPage;
