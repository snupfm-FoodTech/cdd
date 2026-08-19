'use client';

import BackButton from '@/components/back-button';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import NotFoundData from '@/components/ui/not-found-data';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_KNOWLEDGE_URL } from '@/constants/routes';
import {
  useDeleteKnowledge,
  useKnowledge,
  useUpdateKnowledge
} from '@/hooks/knowledge.hook';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import KnowledgeForm, {
  KnowledgeFormValues
} from '../components/knowledge-form';

interface KnowledgeViewProps {
  params: {
    knowledgeId: string;
  };
}

const KnowledgeView = ({ params }: KnowledgeViewProps) => {
  const [mode, setMode] = useState<'view' | 'update'>('view');
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const { data, isPending } = useKnowledge(params.knowledgeId);

  const deleteMutation = useDeleteKnowledge();
  const updateMutation = useUpdateKnowledge(params.knowledgeId);

  const initialKnowledge = useMemo((): KnowledgeFormValues => {
    if (!data) return {} as KnowledgeFormValues;

    return {
      funcTypeCode: data.kwlgFuncTpCd,
      dietTypeCode: data.kwlgDietTpCd,
      title: data.kwlgTit,
      linkUrl: data.kwlgLinkUrl,
      author: data.kwlgAut,
      currentFilePaths: data.kwlgAtchUrls,
      newFiles: [],
      deleteFilePaths: [],
      newFileUrls: []
    };
  }, [data]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  if (!data)
    return (
      <NotFoundData
        backUrl={CMS_KNOWLEDGE_URL}
        label={CMS_BACK_TO_LIST_TITLE}
        className="w-full px-8 pt-4"
      />
    );

  const handleUpdateKnowledge = async (values: KnowledgeFormValues) => {
    try {
      await updateMutation.mutateAsync({
        knowledgeId: params.knowledgeId,
        input: {
          kwlgFuncTpCd: values.funcTypeCode,
          kwlgDietTpCd: values.dietTypeCode,
          kwlgTit: values.title,
          kwlgAut: values.author,
          kwlgLinkUrl: values.linkUrl,
          files: values.newFiles,
          deletedFilePaths: values.deleteFilePaths
        }
      });

      setMode('view');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteKnowledge = async () => {
    try {
      await deleteMutation.mutateAsync(params.knowledgeId);

      router.push(CMS_KNOWLEDGE_URL);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-8 pt-4">
      <AlertModal
        title="문헌을 삭제하시겠습니까?"
        description="삭제 시 복구할 수 없습니다."
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onConfirm={handleDeleteKnowledge}
        loading={deleteMutation.isPending}
      />
      <div className="flex justify-between">
        <BackButton label={CMS_BACK_TO_LIST_TITLE} url={CMS_KNOWLEDGE_URL} />
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
      <div className="mt-10 max-w-[40rem]">
        {initialKnowledge ? (
          <KnowledgeForm
            mode={mode}
            initialData={initialKnowledge}
            knowledgeId={params.knowledgeId}
            onCancel={() => setMode('view')}
            onSubmit={handleUpdateKnowledge}
            loading={updateMutation.isPending}
          />
        ) : (
          <div>찾을 수 없는 문헌</div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeView;
