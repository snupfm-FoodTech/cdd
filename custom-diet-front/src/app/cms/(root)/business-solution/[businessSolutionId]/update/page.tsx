'use client';

import BackButton from '@/components/back-button';
import { CMS_BUSINESS_SOLUTION_URL } from '@/constants/routes';
import React, { useTransition } from 'react';

import { useParams, useRouter } from 'next/navigation';
import {
  useCreateSolutionType,
  useSolutionType,
  useUpdateSolutionType
} from '@/hooks/solution.hook';
import SolutionTypeForm, {
  SolutionTypeFormValues
} from '../../components/solution-type-form';
import { fakeFileFromName } from '@/utils';

type Props = {};

const UpdateBusinessSolutionPage = (props: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const { businessSolutionId } = useParams();
  const { data: detail, isLoading } = useSolutionType(
    businessSolutionId ? Number(businessSolutionId) : 0
  );

  const { mutateAsync: mutateAsyncUpdateSolutionType } = useUpdateSolutionType(
    businessSolutionId ? Number(businessSolutionId) : 0
  );

  const handleCancel = () => {
    router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
  };

  const handleUpdate = async (values: SolutionTypeFormValues) => {
    startTransition(async () => {
      try {
        await mutateAsyncUpdateSolutionType({
          title: values.title,
          description: values.description,
          tag: values.tag,
          iconFile: values.iconFile
        });

        router.push(`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`);
      } catch (error) {
        return;
      }
    });
  };

  if (!detail) return;

  return (
    <div className="px-8 pt-4">
      <BackButton
        label="상세로 돌아가기"
        url={`${CMS_BUSINESS_SOLUTION_URL}/${businessSolutionId}`}
      />
      <div className="mt-10 w-3/4">
        <SolutionTypeForm
          mode="update"
          onSubmit={handleUpdate}
          onCancel={handleCancel}
          loading={isLoading || isPending}
          initialData={{
            title: detail.title,
            description: detail.description,
            tag: detail.tag,
            iconFile: fakeFileFromName('test.png')
          }}
        />
      </div>
    </div>
  );
};

export default UpdateBusinessSolutionPage;
