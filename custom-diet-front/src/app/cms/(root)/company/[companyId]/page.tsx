'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { CMS_COMPANY_URL } from '@/constants/routes';

import NotFoundData from '@/components/ui/not-found-data';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import {
  useCompany,
  useDeleteCompany,
  useUpdateCompany
} from '@/hooks/corporate.hook';
import { formatBusinessNumber, formatCompanyNumber } from '@/utils/format.util';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import CompanyForm, { CompanyFormValues } from '../components/company-form';

interface CompanyViewProps {
  params: {
    companyId: string;
  };
}

const CompanyView = ({ params }: CompanyViewProps) => {
  const [mode, setMode] = useState<'view' | 'update'>('view');
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const { data, isLoading } = useCompany(params.companyId);

  const deleteMutation = useDeleteCompany();
  const updateMutation = useUpdateCompany(params.companyId);

  const initialCompany = useMemo((): CompanyFormValues => {
    const companyForm = {} as CompanyFormValues;

    if (!data) return companyForm;

    return {
      ...data,
      coTpId: data.coTpId.toString(),
      coBizNo: formatBusinessNumber(data.coBizNo),
      coNo: formatCompanyNumber(data.coNo),
      newFiles: [],
      deleteFilePaths: [],
      newFileUrls: [],
      currentFilePaths: data.coImgUrls
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!data)
    return (
      <NotFoundData
        className="w-full px-8 pt-4"
        labelSize="medium"
        backUrl={CMS_COMPANY_URL}
        label={CMS_BACK_TO_LIST_TITLE}
      />
    );

  const handleUpdateCompany = async (values: CompanyFormValues) => {
    try {
      await updateMutation.mutateAsync({
        companyId: params.companyId,
        input: {
          ...values,
          coTpId: Number(values.coTpId),
          files: values.newFiles,
          deletedFilePaths: values.deleteFilePaths
        }
      });
      setMode('view');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCompany = async () => {
    try {
      await deleteMutation.mutateAsync(params.companyId);
      router.push(CMS_COMPANY_URL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-8 pt-4">
      <AlertModal
        title="회사를 삭제하시겠습니까?"
        description="삭제 시 복구할 수 없습니다."
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleDeleteCompany}
        loading={deleteMutation.isPending}
      />
      <div className="flex justify-between">
        <BackButton label={CMS_BACK_TO_LIST_TITLE} url={CMS_COMPANY_URL} />
        <div className="flex gap-4">
          <Button
            size="sm"
            className="w-32 gap-2"
            variant="secondary"
            onClick={() => setMode('update')}
          >
            <Icons.edit size={16} />
            편집
          </Button>
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
      </div>
      <div className="mt-10 w-3/4">
        {initialCompany ? (
          <CompanyForm
            mode={mode}
            initialData={initialCompany}
            companyId={params.companyId}
            onCancel={() => setMode('view')}
            onSubmit={handleUpdateCompany}
            loading={updateMutation.isPending}
          />
        ) : (
          <div>회사를 찾을 수 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default CompanyView;
