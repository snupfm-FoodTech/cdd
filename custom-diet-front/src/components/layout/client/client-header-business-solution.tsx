import { HOME_URL } from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // shadcn Button

interface Breadcrumb {
  label: string;
  url?: string;
}

interface ClientHeaderBusinessSolutionProps {
  image?: string;
  title: string;
  breadcrumbs: Breadcrumb[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
}

const ClientHeaderBusinessSolution = ({
  image,
  title,
  breadcrumbs,
  ctaLabel = '기업 솔루션 상담신청',
  ctaHref = '#'
}: ClientHeaderBusinessSolutionProps) => {
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
      className="relative min-h-[160px] w-full overflow-hidden pt-[40%] sm:min-h-[180px] sm:pt-[30%] md:min-h-[200px] md:pt-[20%] lg:pt-[15.3846%]"
      aria-label="Page header"
    >
      {image ? (
        <Image
          src={image}
          alt="Header"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
            opacity: 0.9
          }}
        />
      )}

      {/* Content */}
      <div className="section-padding absolute inset-0 z-10 flex flex-col justify-center gap-4 text-left md:flex-row md:items-center md:justify-between md:gap-6">
        {/* Left: title + breadcrumbs */}
        <div className="flex min-w-0 flex-col">
          <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl md:mb-2 md:text-3xl">
            {title}
          </h1>
          <p className="mt-0.5 text-xs font-semibold text-white sm:text-sm md:text-base">
            <span
              className="cursor-pointer underline underline-offset-4"
              onClick={handleClickHome}
            >
              홈
            </span>
            {renderBreadcrumbs()}
          </p>
        </div>

        {/* Right: CTA button */}
        <div className="md:self-center">
          <Button
            asChild
            size="lg"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:px-6 sm:py-3.5 sm:text-base md:px-7 md:py-4 md:text-lg xl:px-10 xl:py-6"
          >
            <Link href={ctaHref} className="inline-flex items-center gap-2">
              <span aria-hidden className="text-lg sm:text-xl">
                🚀
              </span>
              <span>{ctaLabel}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeaderBusinessSolution;
