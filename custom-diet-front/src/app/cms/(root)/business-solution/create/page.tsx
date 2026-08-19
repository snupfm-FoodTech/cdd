'use client';

import BackButton from '@/components/back-button';
import { CMS_BUSINESS_SOLUTION_URL } from '@/constants/routes';
import React from 'react';
import SolutionTypeForm, {
  SolutionTypeFormValues
} from '../components/solution-type-form';
import { useParams, useRouter } from 'next/navigation';
import { useCreateSolutionType } from '@/hooks/solution.hook';

type Props = {};

const CreateBusinessSolutionPage = (props: Props) => {
  const router = useRouter();

  const { businessSolutionId } = useParams();

  const { mutateAsync: mutateAsyncCreateSolutionType, isPending } =
    useCreateSolutionType();

  const handleCancel = () => {
    router.push(CMS_BUSINESS_SOLUTION_URL);
  };

  const handleCreate = async (values: SolutionTypeFormValues) => {
    try {
      await mutateAsyncCreateSolutionType({
        title: values.title,
        description: values.description,
        tag: values.tag,
        iconFile: values.iconFile
      });

      router.push(CMS_BUSINESS_SOLUTION_URL);
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="px-8 pt-4">
      <BackButton label="상세로 돌아가기" url={CMS_BUSINESS_SOLUTION_URL} />
      <div className="mt-10 w-3/4">
        <SolutionTypeForm
          mode="create"
          onSubmit={handleCreate}
          onCancel={handleCancel}
          loading={isPending}
        />
      </div>
    </div>
  );
};

export default CreateBusinessSolutionPage;
