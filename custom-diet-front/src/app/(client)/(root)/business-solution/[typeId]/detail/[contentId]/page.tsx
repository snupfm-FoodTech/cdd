'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import ClientHeaderContentSolution from '@/components/layout/client/client-header-content-solution';
import { RichTextViewer } from '@/components/rich-text-viewer';
import { Spinner } from '@/components/spinner';
import { BASE_PATH } from '@/constants';
import { BUSINESS_SOLUTION_URL } from '@/constants/routes';
import { useOpenSolutionContent } from '@/hooks/open.hook';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const BusinessSolutionContentPage = () => {
  const { contentId, typeId } = useParams();

  const { data: content, isLoading: isLoadingContent } = useOpenSolutionContent(
    contentId ? Number(contentId) : 0
  );

  if (isLoadingContent) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div>
      <ClientHeaderContentSolution
        image={`${BASE_PATH}/img/bg-knowledge.png`}
        content={content}
      />
      <div className="section-padding my-4 flex flex-col gap-6">
        <div className="w-fit">
          <Link
            href={`${BUSINESS_SOLUTION_URL}?typeId=${typeId}` || '#'}
            className="flex items-center gap-4 text-xl font-bold"
          >
            <div>
              <Icons.arrowLeft />
            </div>
            <span className={cn('tracking-tight')}>이전 페이지</span>
          </Link>
        </div>

        {content.description ? (
          <RichTextViewer
            value={content.description}
            className="prose max-w-none"
          />
        ) : (
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
            <div className="mb-2 text-base font-semibold text-primary">
              내용이 없습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessSolutionContentPage;
