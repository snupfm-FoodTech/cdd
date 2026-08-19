import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Icons } from './icons';
import { LOCAL_STORAGE } from '@/constants';
import { HOME_URL } from '@/constants/routes';

interface BackButtonProps {
  url?: string;
  label: string;
  size?: 'medium' | 'large';
  onClick?: () => void;
}

const BackButton = ({
  url,
  label,
  size = 'medium',
  onClick
}: BackButtonProps) => {
  const headingClassName =
    size === 'medium' ? 'text-lg font-semibold' : 'text-xl font-bold ';

  // Retrieve and parse the last page URLs array from localStorage
  const lastPageUrls =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.URLS_HISTORY) || '[]')
      : [];

  // Determine the link URL based on the logic
  const matchedUrl = lastPageUrls.find((storedUrl: string) =>
    storedUrl.includes(url || '')
  );

  const linkUrl =
    url === HOME_URL || url === '/'
      ? HOME_URL
      : matchedUrl // Use the matched URL from lastPageUrls if found
        ? matchedUrl
        : url
          ? url
          : lastPageUrls.length > 0
            ? lastPageUrls[0] // Fallback to the first URL in lastPageUrls
            : '#';

  return (
    <div className="flex items-center gap-4">
      {onClick ? (
        <button onClick={onClick} className="flex items-center gap-4">
          <div>
            <Icons.arrowLeft />
          </div>
          <span className={cn('tracking-tight', headingClassName)}>
            {label}
          </span>
        </button>
      ) : (
        <Link href={linkUrl || '#'} className="flex items-center gap-4">
          <div>
            <Icons.arrowLeft />
          </div>
          <span className={cn('tracking-tight', headingClassName)}>
            {label}
          </span>
        </Link>
      )}
    </div>
  );
};

export default BackButton;
