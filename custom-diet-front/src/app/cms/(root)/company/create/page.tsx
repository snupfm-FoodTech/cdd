'use client';

import BackButton from '@/components/back-button';
import { CMS_COMPANY_URL } from '@/constants/routes';
import { useCreateCompany } from '@/hooks/corporate.hook';
import { useRouter } from 'next/navigation';
import CompanyForm, { CompanyFormValues } from '../components/company-form';

const CreateCompany = () => {
  const router = useRouter();
  const createCompanyMutation = useCreateCompany();

  const handleCancel = () => {
    router.push(CMS_COMPANY_URL);
  };

  const handleCompanyCreate = async (values: CompanyFormValues) => {
    try {
      await createCompanyMutation.mutateAsync({
        ...values,
        coTpId: Number(values.coTpId),
        files: values.newFiles || []
      });

      router.push(CMS_COMPANY_URL);
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="px-8 pt-4">
      <BackButton label="기업 등록" url={CMS_COMPANY_URL} />
      <div className="mt-10 w-3/4">
        <CompanyForm
          mode="create"
          onSubmit={handleCompanyCreate}
          onCancel={handleCancel}
          loading={createCompanyMutation.isPending}
        />
      </div>
    </div>
  );
};

export default CreateCompany;
