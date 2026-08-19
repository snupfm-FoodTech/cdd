'use client';

import BackButton from '@/components/back-button';
import { CDTextArea } from '@/components/cd-text-area';
import FileUploadForm from '@/components/file-upload-form';
import { Icons } from '@/components/icons';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ACCEPTED_DOCUMENT_FILE_TYPES,
  ACCEPTED_IMAGE_FILE_TYPES,
  BASE_PATH,
  MAX_UPLOAD_SIZE
} from '@/constants';
import { USER_QA_URL } from '@/constants/routes';
import { useAddQA, useDeleteQA, useQAByID } from '@/hooks/qa.hook';
import { toast } from '@/hooks/use-toast';
import { QACreate } from '@/types/qa.type';
import { checkTokenExisted } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface QADetailProps {
  params: { qaId: string };
}

export default function QADetailPage({ params }: QADetailProps) {
  const router = useRouter();

  const { qaId } = params;
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClose = () => setShowAlert(false);
  const [isViewMode, setIsViewMode] = useState(true);

  const { mutateAsync: mutateDelete, isPending: deletePending } = useDeleteQA();
  const { data, isLoading } = useQAByID(qaId);
  const { mutateAsync: updateQA, isPending: updatePending } = useAddQA();

  const formSchema = z.object({
    queId: z.string(),
    queUsrNm: z.string(),
    queUsrEml: z.string(),
    creDt: z.string(),
    queTit: z.string().trim().min(1, { message: '제목이 필요합니다.' }),
    queCtnt: z.string().trim().min(1, { message: '콘텐츠가 필요합니다.' }),
    newFiles: z.array(z.custom<File>((file) => file instanceof File)), // Local files to upload
    newFileUrls: z.array(z.object({ name: z.string(), url: z.string() })), // Local file urls to display
    currentFilePaths: z.array(z.string()).default([]), // File paths from the server
    deleteFilePaths: z.array(z.string()).default([]) // File paths to delete
  });

  type QaFormValues = z.infer<typeof formSchema>;

  const form = useForm<QaFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    values: {
      queId: '',
      queUsrNm: data?.queUsrNm || '',
      queUsrEml: data?.queUsrEml || '',
      creDt: data?.creDt || '',
      queTit: data?.queTit || '',
      queCtnt: data?.queCtnt || '',
      newFiles: [],
      newFileUrls: [],
      currentFilePaths: data?.queAtchUrls || [],
      deleteFilePaths: []
    }
  });

  useEffect(() => {
    checkTokenExisted(router);
  }, [router]);

  const onSubmit = (qaData: QaFormValues) => {
    const updateData: QACreate = {
      queId: qaId,
      files: qaData.newFiles || [],
      queTit: qaData.queTit,
      queCtnt: qaData.queCtnt,
      deletedFilePaths: qaData.deleteFilePaths
    };

    updateQA(updateData).then(() => {
      toast({
        title: '성공',
        description: '수정 완료',
        variant: 'success'
      });

      router.push(USER_QA_URL);
    });
  };

  const handleAlertConfirm = () => {
    mutateDelete(qaId).then(() => {
      handleAlertClose();
      router.push(USER_QA_URL);
    });
  };

  const renderAlertModal = () => {
    let title = '삭제 하시겠습니까?';
    let description = '삭제 시 복구할 수 없습니다.';

    return (
      <AlertModal
        title={title}
        description={description}
        isOpen={showAlert}
        onClose={handleAlertClose}
        loading={deletePending}
        onConfirm={handleAlertConfirm}
      />
    );
  };

  const handleCancel = () => {
    form.reset();
    setIsViewMode(true);
  };

  if (isLoading || updatePending) {
    return (
      <div className="mt-10 flex h-52 items-center justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-qa.png`}
        title={`질의응답 - ${qaId}`}
        breadcrumbs={[
          { label: '질의응답', url: USER_QA_URL },
          { label: `질의응답 - ${qaId}` }
        ]}
      />
      <div className="qa-detail section-padding section-padding-y flex flex-col gap-4">
        <div className="flex items-center text-xl font-bold">
          <BackButton url={USER_QA_URL} label="질의응답" size="large" />
        </div>

        <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
          <Form {...form}>
            <form
              className="w-full space-y-4 rounded-xl bg-secondary p-8 md:w-3/5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <h2 className="text-xl font-bold tracking-tight">
                  질의응답 - {qaId}
                </h2>
                <div className="flex gap-4">
                  {!data?.ansCtnt && (
                    <Button
                      className="w-28"
                      variant="blue"
                      type="button"
                      onClick={() => setIsViewMode(false)}
                      disabled={!isViewMode}
                    >
                      <Icons.edit size={16} />
                      <span className="ml-2">편집</span>
                    </Button>
                  )}

                  <Button
                    variant="destructive"
                    type="button"
                    className="w-24"
                    onClick={() => setShowAlert(true)}
                  >
                    <Icons.trash2 className="mr-2" />
                    삭제
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="queUsrNm"
                render={({ field }) => (
                  <FormItem className="w-11/12">
                    <FormLabel>등록자</FormLabel>
                    <FormControl>
                      <Input {...field} className="ml-2" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="queUsrEml"
                render={({ field }) => (
                  <FormItem className="w-11/12">
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input {...field} className="ml-2" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creDt"
                render={({ field }) => (
                  <FormItem className="w-11/12">
                    <FormLabel>등록일</FormLabel>
                    <FormControl>
                      <Input {...field} className="ml-2" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="queTit"
                render={({ field }) => (
                  <FormItem className="w-11/12">
                    <FormLabel required>제목</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="제목을 입력하세요."
                        maxLength={50}
                        className="ml-2"
                        readOnly={isViewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="queCtnt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>내용</FormLabel>
                    <FormControl>
                      <ScrollArea>
                        <CDTextArea
                          {...field}
                          placeholder="내용을 입력하세요."
                          className="mb-4 ml-2 w-11/12"
                          readOnly={isViewMode}
                          maxLength={2000}
                        />
                      </ScrollArea>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FileUploadForm
                type="multiple"
                label="파일업로드"
                max={3}
                acceptedFileTypes={[
                  ...ACCEPTED_IMAGE_FILE_TYPES,
                  ...ACCEPTED_DOCUMENT_FILE_TYPES
                ]}
                maxUploadSize={MAX_UPLOAD_SIZE}
                readOnly={isViewMode}
              />

              {!data?.ansCtnt && (
                <div className="flex items-center justify-end gap-4">
                  <Button type="submit" className="w-24" disabled={isViewMode}>
                    저장
                  </Button>
                  <Button
                    type="button"
                    variant="blue"
                    className="w-24"
                    disabled={isViewMode}
                    onClick={handleCancel}
                  >
                    취소
                  </Button>
                </div>
              )}
            </form>
          </Form>

          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold tracking-tight">질의응답</h2>
            <div className="mt-4 h-fit whitespace-break-spaces break-all rounded-lg border-2 bg-secondary p-4 md:min-h-80">
              {data?.ansCtnt}
            </div>
          </div>
        </div>
        {renderAlertModal()}
      </div>
    </div>
  );
}
