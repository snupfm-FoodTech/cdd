'use client';

import BackButton from '@/components/back-button';
import { CMS_BUSINESS_SOLUTION_URL } from '@/constants/routes';
import React, { useEffect, useTransition } from 'react';
// import SolutionTypeForm, {
//   SolutionTypeFormValues
// } from '../components/solution-type-form';
import { useParams, useRouter } from 'next/navigation';
import {
  useCreateSolutionContent,
  useUpdateDescriptionSolutionContent
} from '@/hooks/solution.hook';
import SolutionContentForm, {
  SolutionContentFormValues
} from '../../../components/solution-content-form';
import useWait from '@/hooks/use-wait';
import { toast } from '@/hooks/use-toast';

type Props = {};

const CreateSolutionContentPage = (props: Props) => {
  const router = useRouter();

  const { businessSolutionId } = useParams();

  const [isPending, startTransition] = useTransition();
  const { startWait, cancelWait } = useWait(500);

  const { mutateAsync: mutateAsyncCreateSolutionContent } =
    useCreateSolutionContent();

  const { mutateAsync: mutateAsyncUpdateDesc } =
    useUpdateDescriptionSolutionContent();

  const handleCancel = () => {
    router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
  };

  const handleCreate = async (values: SolutionContentFormValues) => {
    if (!businessSolutionId) return;
    startTransition(async () => {
      try {
        const solutionContent = await mutateAsyncCreateSolutionContent({
          typeId: Number(businessSolutionId),
          title: values.title,
          subTitle: values.subTitle,
          description: '',
          tag: values.tag,
          iconFile: values.iconFile
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

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-8 pt-4">
      <BackButton
        label="상세로 돌아가기"
        url={`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`}
      />
      <div className="mt-10 w-full">
        <SolutionContentForm
          mode="create"
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={isPending}
        />
      </div>
    </div>
  );
};

export default CreateSolutionContentPage;
