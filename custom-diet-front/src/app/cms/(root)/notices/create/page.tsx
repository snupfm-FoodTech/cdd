'use client';

import BackButton from '@/components/back-button';
import { CMS_NOTICES_URL } from '@/constants/routes';
import { useAddNotice } from '@/hooks/notice.hook';
import { useRouter } from 'next/navigation';
import NoticeForm, { NoticeFormValues } from '../components/notice-form';

const CreateNotice = () => {
  const router = useRouter();
  const addNotice = useAddNotice();

  const handleCreateNotice = async (values: NoticeFormValues) => {
    const files: File[] = values.newFiles || [];

    addNotice
      .mutateAsync({
        ntcTit: values.ntcTit,
        ntcCtnt: values.ntcCtnt,
        files: files
      })
      .then(() => {
        router.push(CMS_NOTICES_URL);
      });
  };

  const handleCancel = () => {
    router.push(CMS_NOTICES_URL);
  };

  return (
    <div className="create-notice-page">
      <BackButton label="목록으로 돌아가기" url={CMS_NOTICES_URL} />
      <div className="mt-10 max-w-[40rem]">
        <NoticeForm
          mode="create"
          onSubmit={handleCreateNotice}
          onCancel={handleCancel}
          loading={addNotice.isPending}
        />
      </div>
    </div>
  );
};

export default CreateNotice;
