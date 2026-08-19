'use client';

import { CDTextArea } from '@/components/cd-text-area';
import FileUploadForm from '@/components/file-upload-form';
import ClientHeaderPage from '@/components/layout/client/client-header-page';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  ACCEPTED_DOCUMENT_FILE_TYPES,
  ACCEPTED_IMAGE_FILE_TYPES,
  BASE_PATH,
  MAX_UPLOAD_SIZE
} from '@/constants';
import { USER_QA_URL } from '@/constants/routes';
import { useAddQA } from '@/hooks/qa.hook';
import { toast } from '@/hooks/use-toast';
import { QACreate } from '@/types/qa.type';
import { checkTokenExisted } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function AnswerPage() {
  const router = useRouter();
  const { mutateAsync: addQA, isPending } = useAddQA();

  const formSchema = z.object({
    queTit: z.string().trim().min(1, { message: '제목이 필요합니다.' }),
    queCtnt: z.string().trim().min(1, { message: '콘텐츠가 필요합니다.' }),
    newFiles: z.array(z.any()), // Local files to upload
    newFileUrls: z.array(z.object({ name: z.string(), url: z.string() })), // Local file urls to display
    currentFilePaths: z.array(z.string()).default([]) // File paths from the server
  });

  type QaFormValues = z.infer<typeof formSchema>;

  const form = useForm<QaFormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    defaultValues: {
      queTit: '',
      queCtnt: '',
      newFiles: [],
      newFileUrls: [],
      currentFilePaths: []
    }
  });

  useEffect(() => {
    checkTokenExisted(router);
  }, [router]);

  const onSubmit = (data: QaFormValues) => {
    const qaData: QACreate = {
      queTit: data.queTit,
      queCtnt: data.queCtnt,
      files: data.newFiles || []
    };

    addQA(qaData).then(() => {
      toast({
        title: '성공',
        description: '성공적으로 생성',
        variant: 'success'
      });

      router.push(USER_QA_URL);
    });
  };

  const cancelClick = () => {
    router.push(USER_QA_URL);
  };

  return (
    <div className="mt-10">
      <ClientHeaderPage
        image={`${BASE_PATH}/img/bg-qa.png`}
        title={'질의응답'}
        breadcrumbs={[
          { label: '질의응답', url: USER_QA_URL },
          { label: '문의하기' }
        ]}
      />
      <div className="section-padding section-padding-y">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col"
          >
            <h2 className="mb-4 text-xl font-bold tracking-tight">
              질의응답
            </h2>
            <div className="flex border-2">
              <div className="flex h-20 w-1/5 items-center justify-center border-r-2 text-center">
                제목
              </div>
              <div className="flex h-20 w-4/5 items-center px-4">
                <FormField
                  control={form.control}
                  name="queTit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="제목을 입력하세요."
                          maxLength={50}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex h-28 border-x-2 border-b-2">
              <div className="flex w-1/5 items-center justify-center border-r-2 text-center">
                내용
              </div>
              <div className="flex w-4/5 px-4">
                <FormField
                  control={form.control}
                  name="queCtnt"
                  render={({ field }) => (
                    <FormItem className="mt-5 w-full">
                      <FormControl>
                        <CDTextArea
                          {...field}
                          placeholder="내용을 입력하세요."
                          className="mr-3 w-full"
                          maxHeight={10}
                          maxLength={2000}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex border-x-2 border-b-2">
              <div className="flex h-52 w-1/5 items-center justify-center border-b-2 border-r-2 text-center">
                첨부파일
              </div>
              <div className="flex h-52 w-4/5 flex-col justify-center px-8">
                <FileUploadForm
                  type="multiple"
                  max={3}
                  acceptedFileTypes={[
                    ...ACCEPTED_IMAGE_FILE_TYPES,
                    ...ACCEPTED_DOCUMENT_FILE_TYPES
                  ]}
                  maxUploadSize={MAX_UPLOAD_SIZE}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-4">
              <Button type="submit" className="w-24" loading={isPending}>
                등록
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="w-24"
                onClick={cancelClick}
              >
                취소
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
