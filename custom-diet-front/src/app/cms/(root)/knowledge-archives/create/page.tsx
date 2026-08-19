'use client';

import BackButton from '@/components/back-button';
import { CMS_KNOWLEDGE_URL } from '@/constants/routes';
import { useAddKnowledge } from '@/hooks/knowledge.hook';
import { useRouter } from 'next/navigation';
import KnowledgeForm, {
  KnowledgeFormValues
} from '../components/knowledge-form';

const CreateKnowledge = () => {
  const router = useRouter();

  const addKnowledgeMutation = useAddKnowledge();

  const handleCreateKnowledge = async (values: KnowledgeFormValues) => {
    try {
      const files: File[] = values.newFiles || [];

      await addKnowledgeMutation.mutateAsync({
        kwlgDietTpCd: values.dietTypeCode,
        kwlgFuncTpCd: values.funcTypeCode,
        kwlgTit: values.title,
        kwlgAut: values.author,
        kwlgLinkUrl: values.linkUrl,
        files: files
      });

      router.push(CMS_KNOWLEDGE_URL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push(CMS_KNOWLEDGE_URL);
  };

  return (
    <div className="px-8 pt-4">
      <BackButton label="문헌 등록" url={CMS_KNOWLEDGE_URL} />
      <div className="mt-10 max-w-[40rem]">
        <KnowledgeForm
          mode="create"
          onSubmit={handleCreateKnowledge}
          onCancel={handleCancel}
          loading={addKnowledgeMutation.isPending}
        />
      </div>
    </div>
  );
};

export default CreateKnowledge;
