import { SolutionContent } from '@/api-client/open.api';
import { Badge } from '@/components/ui/badge';
import { Base64Image } from '@/components/ui/base64-image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ClientHeaderBusinessSolutionProps {
  image?: string;
  content: SolutionContent;
}

const ClientHeaderContentSolution = ({
  image,
  content
}: ClientHeaderBusinessSolutionProps) => {
  const router = useRouter();

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
        {/* Left */}
        <div className="flex min-w-0 flex-col">
          <h1 className="mb-1 text-lg font-bold text-white sm:text-xl md:mb-2 md:text-2xl">
            {content.title}
          </h1>
          <h2 className="hidden pb-1 text-base font-bold text-white sm:text-lg md:mb-2 md:block md:text-xl">
            {content.subTitle}
          </h2>
          <div className="w-fit">
            <Badge className="mb-1 text-sm font-bold text-white sm:text-base md:mb-2 md:text-lg">
              {content.tag}
            </Badge>
          </div>
        </div>

        {/* Right: CTA button */}
        <div className="hidden md:block md:self-center">
          <div>
            <Base64Image
              src={content.iconUrl}
              alt={content.title}
              className="h-14 w-14 rounded-lg object-contain md:h-20 md:w-20"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeaderContentSolution;
