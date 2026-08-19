'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { CMS_BUSINESS_SOLUTION_URL } from '@/constants/routes';
import {
  useDeleteSolutionContent,
  useSolutionContent,
  useUpdateDescriptionSolutionContent,
  useUpdateSolutionContent
} from '@/hooks/solution.hook';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import SolutionContentForm, {
  SolutionContentFormValues
} from '../../../components/solution-content-form';
import { Spinner } from '@/components/spinner';
import { base64Url } from '@/utils';
import { toast } from '@/hooks/use-toast';
import useWait from '@/hooks/use-wait';

const ContentPage = () => {
  const router = useRouter();
  const { businessSolutionId, contentId } = useParams();

  const [showAlert, setShowAlert] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { startWait, cancelWait } = useWait(500);

  const { mutateAsync: mutateAsyncDelete } = useDeleteSolutionContent();

  const { data: content, isLoading: isLoadingContent } = useSolutionContent(
    contentId ? Number(contentId) : 0
  );

  const { mutateAsync: mutateAsyncUpdateSolutionContent } =
    useUpdateSolutionContent();
  const { mutateAsync: mutateAsyncUpdateDesc } =
    useUpdateDescriptionSolutionContent();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await mutateAsyncDelete(contentId ? Number(contentId) : 0);
        setShowAlert(false);
        router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
      } catch (error) {
        return;
      }
    });
  };

  const handleUpdate = async (values: SolutionContentFormValues) => {
    startTransition(async () => {
      try {
        const solutionContent = await mutateAsyncUpdateSolutionContent({
          id: Number(contentId),
          props: {
            typeId: Number(businessSolutionId),
            title: values.title,
            subTitle: values.subTitle,
            tag: values.tag,
            ...(values.iconFile instanceof File
              ? { iconFile: values.iconFile }
              : {})
          }
        });

        await startWait();

        if (!solutionContent) return;

        await mutateAsyncUpdateDesc({
          id: Number(solutionContent.id),
          desc: values.description ?? null
        });

        toast({
          title: '성공',
          description: '작업이 성공적으로 완료되었습니다.',
          variant: 'success'
        });

        router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
      } catch (error) {
        return;
      }
    });
  };

  const handleCancel = () => {
    router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
  };

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingContent) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <>
      <AlertModal
        title="삭제 하시겠습니까?"
        description="삭제 시 복구할 수 없습니다."
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleDelete}
        loading={isPending}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <BackButton
            label="상세로 돌아가기"
            url={`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`}
          />
          <Button
            size="sm"
            className="w-32 gap-2"
            variant="destructive"
            onClick={() => setShowAlert(true)}
          >
            <Icons.trash2 size={16} />
            삭제
          </Button>
        </div>
        <div className="w-full">
          <SolutionContentForm
            mode="update"
            onSubmit={handleUpdate}
            onCancel={handleCancel}
            loading={isLoadingContent || isPending}
            initialData={{
              title: content.title,
              description: content.description,
              subTitle: content.subTitle,
              tag: content.tag,
              iconFile: base64Url(content.iconUrl)
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ContentPage;
