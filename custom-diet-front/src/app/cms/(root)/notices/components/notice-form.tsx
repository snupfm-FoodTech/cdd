'use client';

import { CDTextArea } from '@/components/cd-text-area';
import FileUploadForm from '@/components/file-upload-form';
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
import {
  ACCEPTED_DOCUMENT_FILE_TYPES,
  ACCEPTED_IMAGE_FILE_TYPES,
  MAX_UPLOAD_SIZE
} from '@/constants';
import { ModeType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const noticeFormSchema = z.object({
  ntcTit: z.string().min(1, { message: '제목은 필수 항목입니다.' }),
  ntcCtnt: z.string().min(1, { message: '콘텐츠가 필요합니다' }),
  ntcAtchUrls: z.array(z.any()),
  newFileUrls: z.array(z.object({ name: z.string(), url: z.string() })),
  currentFilePaths: z.array(z.string()).default([]),
  newFiles: z.array(z.custom<File>((file) => file instanceof File)),
  deleteFilePaths: z.array(z.string()).default([]) // F
});

export type NoticeFormValues = z.infer<typeof noticeFormSchema>;

interface noticeFormProps {
  initialData?: NoticeFormValues;
  noticeId?: string;
  mode: ModeType;
  loading?: boolean;
  onSubmit: SubmitHandler<NoticeFormValues>;
  onCancel?: () => void;
}

const NoticeForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  loading = false
}: noticeFormProps) => {
  const form = useForm({
    resolver: zodResolver(noticeFormSchema),
    mode: 'onSubmit',
    defaultValues: initialData || {
      ntcTit: '',
      ntcCtnt: '',
      ntcAtchUrls: [],
      currentFilePaths: [], // get image url from BE
      newFiles: [], // file choose from local
      newFileUrls: [], // url to show local file
      deleteFilePaths: [] // url to delete
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const handleCancel = () => {
    form.reset();

    if (onCancel) {
      onCancel();
    }
  };

  const isViewMode = useMemo(() => mode === 'view', [mode]);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="ntcTit"
          render={({ field }) => (
            <FormItem className="min-w-[10rem]">
              <FormLabel required>공지 제목</FormLabel>
              <FormControl>
                <Input
                  className="flex-1 border-gray-500"
                  type="text"
                  placeholder="제목을 입력하세요"
                  readOnly={isViewMode}
                  maxLength={50}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ntcCtnt"
          render={({ field }) => (
            <FormItem className="min-w-[10rem]">
              <FormLabel required>공지 내용</FormLabel>
              <FormControl>
                <CDTextArea
                  {...field}
                  minHeight={200}
                  className="flex-1 border-gray-500"
                  placeholder="내용을 입력하세요"
                  readOnly={isViewMode}
                  maxLength={5000}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUploadForm
          label="공지 데이터"
          acceptedFileTypes={[
            ...ACCEPTED_IMAGE_FILE_TYPES,
            ...ACCEPTED_DOCUMENT_FILE_TYPES
          ]}
          maxUploadSize={MAX_UPLOAD_SIZE}
          readOnly={isViewMode}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            className="w-24"
            disabled={isViewMode}
            loading={loading}
          >
            {mode === ModeType.CREATE ? '등록' : '저장'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-24"
            disabled={isViewMode || loading}
            onClick={handleCancel}
          >
            취소
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NoticeForm;
