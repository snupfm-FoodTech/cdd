'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import NotFoundData from '@/components/ui/not-found-data';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_NOTICES_URL } from '@/constants/routes';
import {
  useDeleteNotice,
  useNoticeByID,
  useUpdateNotice
} from '@/hooks/notice.hook';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import NoticeForm, { NoticeFormValues } from '../components/notice-form';

interface NoticeDetailProps {
  params: { noticeId: string };
}

const NoticeDetail = ({ params }: NoticeDetailProps) => {
  const router = useRouter();
  const { data, isLoading } = useNoticeByID(params.noticeId);

  const [mode, setMode] = useState<'view' | 'update'>('view');
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertClose = () => setShowAlert(false);

  const deleteMutation = useDeleteNotice();
  const updateMutation = useUpdateNotice(params.noticeId);
  const handleAlertConfirm = async () => {
    await deleteMutation.mutateAsync(params.noticeId);
    router.push(CMS_NOTICES_URL);
    handleAlertClose();
  };

  const initialNotice = useMemo((): NoticeFormValues => {
    if (!data) return {} as NoticeFormValues;

    return {
      ntcTit: data.ntcTit,
      ntcCtnt: data.ntcCtnt,
      ntcAtchUrls: data.ntcAtchUrls,
      currentFilePaths: data.ntcAtchUrls,
      newFiles: [],
      deleteFilePaths: [],
      newFileUrls: []
    };
  }, [data]);

  const handleUpdateNotice = async (values: NoticeFormValues) => {
    await updateMutation.mutateAsync({
      noticeId: params.noticeId,
      input: {
        ntcCtnt: values.ntcCtnt,
        ntcTit: values.ntcTit,
        deletedFilePaths: values.deleteFilePaths,
        files: values.newFiles
      }
    });

    setMode('view');
  };

  const renderAlertModal = () => {
    let loading = deleteMutation.isPending;
    let title = '삭제 하시겠습니까?';
    let description = '삭제 시 복구할 수 없습니다.';

    return (
      <AlertModal
        title={title}
        description={description}
        isOpen={showAlert}
        onClose={handleAlertClose}
        loading={loading}
        onConfirm={handleAlertConfirm}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!data)
    return (
      <NotFoundData backUrl={CMS_NOTICES_URL} label={CMS_BACK_TO_LIST_TITLE} />
    );

  return (
    <div className="notices-details">
      {renderAlertModal()}
      <div className="flex justify-between">
        <BackButton label={CMS_BACK_TO_LIST_TITLE} url={CMS_NOTICES_URL} />
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
            공지 삭제
          </Button>
        </div>
      </div>

      <div className="mt-10 max-w-[40rem]">
        {initialNotice ? (
          <NoticeForm
            mode={mode}
            initialData={initialNotice}
            noticeId={params.noticeId}
            onCancel={() => setMode('view')}
            onSubmit={handleUpdateNotice}
            loading={updateMutation.isPending}
          />
        ) : (
          <div>찾을 수 없는 문헌</div>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
