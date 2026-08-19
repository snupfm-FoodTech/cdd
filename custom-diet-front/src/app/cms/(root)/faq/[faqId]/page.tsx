'use client';

import BackButton from '@/components/back-button';
import { CDTextArea } from '@/components/cd-text-area';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_FAQ_URL } from '@/constants/routes';
import { useDeleteFAQ, useDetailFAQ, useUpdateFAQ } from '@/hooks/faq.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type CreateFaqFormValue = z.infer<typeof createFaqFormSchema>;

const createFaqFormSchema = z.object({
  question: z.string().min(1, {
    message: '필수의!'
  }),
  answer: z.string().min(1, {
    message: '필수의!'
  })
});

const DetailFAQ = () => {
  const router = useRouter();
  const paramsUrl = useParams();
  const faqId = paramsUrl.faqId;

  const { data: dataFAQ, isLoading } = useDetailFAQ(faqId.toString());

  const form = useForm<CreateFaqFormValue>({
    resolver: zodResolver(createFaqFormSchema),
    mode: 'onSubmit',
    values: {
      answer: dataFAQ?.faqAnsCtnt || '',
      question: dataFAQ?.faqQueCtnt || ''
    }
  });

  const updateFAQMutate = useUpdateFAQ(faqId.toString());
  const handleUpdate = (value: CreateFaqFormValue) => {
    updateFAQMutate
      .mutateAsync({
        faqAnsCtnt: value.answer,
        faqQueCtnt: value.question,
        faqId: faqId.toString()
      })
      .then(() => {
        setIsEditMode(false);
      });
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClose = () => setShowAlert(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChangedData, setIsChangedData] = useState(false);

  const deleteMutation = useDeleteFAQ();

  const handleAlertConfirm = () => {
    deleteMutation.mutateAsync(faqId.toString()).then(() => {
      handleAlertClose();
      router.push(CMS_FAQ_URL);
    });
  };

  const handleCancel = () => {
    if (isEditMode) {
      setIsEditMode(false);
      form.reset();
    }
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

  const handleChangeAnswer = (fieldText: string) => {
    setIsChangedData(true);
    form.setValue('answer', fieldText);
  };

  return (
    <div className="detail-faq-page mx-8">
      {renderAlertModal()}
      <div className="flex justify-between">
        <BackButton label={CMS_BACK_TO_LIST_TITLE} url={CMS_FAQ_URL} />
        <div className="flex gap-4">
          {isEditMode ? (
            <Button
              disabled={!isChangedData}
              type="button"
              size="sm"
              className="w-32"
              onClick={form.handleSubmit((form) => {
                handleUpdate(form);
              })}
            >
              저장
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              className="w-32 rounded-lg"
              onClick={() => setIsEditMode(true)}
            >
              편집
            </Button>
          )}
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
      <div className="mt-4">
        <Form {...form}>
          <form className="w-full">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-4 text-xl font-semibold text-muted-foreground">
                    Q
                  </FormLabel>
                  <FormControl onChange={() => setIsChangedData(true)}>
                    <Input disabled={!isEditMode} {...field} maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="w-4 text-xl font-semibold text-muted-foreground">
                      A
                    </FormLabel>
                    <FormControl>
                      <CDTextArea
                        {...field}
                        minHeight={200}
                        disabled={!isEditMode}
                        onChange={(e) => handleChangeAnswer(e.target.value)}
                        maxLength={1000}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-4 flex items-center justify-end gap-4">
              <Button
                className="w-24"
                variant="secondary"
                type="button"
                disabled={!isEditMode}
                onClick={handleCancel}
              >
                취소
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DetailFAQ;
