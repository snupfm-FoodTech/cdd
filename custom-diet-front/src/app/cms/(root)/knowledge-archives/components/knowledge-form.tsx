'use client';

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  ACCEPTED_DOCUMENT_FILE_TYPES,
  ACCEPTED_IMAGE_FILE_TYPES,
  MAX_UPLOAD_SIZE
} from '@/constants';
import { useDietTypes, useFunctionTypes } from '@/hooks/knowledge.hook';
import { ModeType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const knowledgeFormSchema = z
  .object({
    funcTypeCode: z.string().trim().min(1, {
      message: '문서 유형(기능성)이 필요합니다.'
    }),
    dietTypeCode: z.string().trim().min(1, {
      message: '문서 유형(식이)이 필요합니다.'
    }),
    title: z.string().trim().min(1, {
      message: '제목 필드는 필수입니다'
    }),

    author: z.string().min(1, {
      message: '작성자 필드는 필수입니다.'
    }),

    linkUrl: z.string().url({
      message: '유효한 URL을 입력해주세요.'
    }),
    newFileUrls: z.array(z.object({ name: z.string(), url: z.string() })),
    currentFilePaths: z.array(z.string()).default([]),
    newFiles: z.array(z.custom<File>((file) => file instanceof File)),
    deleteFilePaths: z.array(z.string()).default([]) // File paths to delete
  })
  .refine(
    (data) => {
      return data.newFiles.length > 0 || data.currentFilePaths.length > 0;
    },
    {
      message: '파일이 하나 이상 필요합니다.',
      path: ['newFiles']
    }
  );

export type KnowledgeFormValues = z.infer<typeof knowledgeFormSchema>;

interface KnowledgeFormProps {
  initialData?: KnowledgeFormValues;
  knowledgeId?: string;
  mode: ModeType;
  loading?: boolean;
  onSubmit: SubmitHandler<KnowledgeFormValues>;
  onCancel?: () => void;
}

const DEFAULT_FORM_VALUES: KnowledgeFormValues = {
  funcTypeCode: '',
  dietTypeCode: '',
  title: '',
  author: '',
  linkUrl: '',
  currentFilePaths: [],
  newFiles: [],
  deleteFilePaths: [],
  newFileUrls: []
};

const KnowledgeForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  loading = false
}: KnowledgeFormProps) => {
  const form = useForm({
    resolver: zodResolver(knowledgeFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      ...initialData
    }
  });

  const { data: functionTypes = [] } = useFunctionTypes();
  const { data: dietTypes = [] } = useDietTypes();

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  useEffect(() => {
    if (!functionTypes?.length || !dietTypes?.length) {
      return;
    }

    if (mode === ModeType.CREATE) {
      form.setValue('funcTypeCode', functionTypes[0].code);
      form.setValue('dietTypeCode', dietTypes[0].code);

      return;
    }
  }, [mode, form, functionTypes, dietTypes]);

  const isViewMode = useMemo(() => mode === 'view', [mode]);

  const handleCancel = () => {
    form.reset();
    if (onCancel) onCancel();
  };

  if (!functionTypes || !dietTypes) {
    return null;
  }

  const handleFuncTypeChange = (value: string) => {
    if (!value) return;

    form.setValue('funcTypeCode', value);
  };

  const handleDietTypeChange = (value: string) => {
    if (!value) return;

    form.setValue('dietTypeCode', value);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="funcTypeCode"
            render={({ field }) => (
              <FormItem className="min-w-[10rem]">
                <FormLabel required>문헌 종류 (기능성)</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={
                      isViewMode ? undefined : handleFuncTypeChange
                    }
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="문서 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {functionTypes.map((type) => (
                          <SelectItem key={type.code} value={type.code}>
                            {type.content}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietTypeCode"
            render={({ field }) => (
              <FormItem className="min-w-[10rem]">
                <FormLabel required>문헌 종류 (기능성)</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={
                      isViewMode ? undefined : handleDietTypeChange
                    }
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="문서 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {dietTypes.map((type) => (
                          <SelectItem key={type.code} value={type.code}>
                            {type.content}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>문헌 제목</FormLabel>
              <FormControl>
                <Input {...field} readOnly={isViewMode} maxLength={250} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>작가</FormLabel>
              <FormControl>
                <Input readOnly={isViewMode} {...field} maxLength={250} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>문헌 링크</FormLabel>
              <FormControl>
                <Input readOnly={isViewMode} {...field} maxLength={2084} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FileUploadForm
          label="문헌 데이터"
          required={true}
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

export default KnowledgeForm;
