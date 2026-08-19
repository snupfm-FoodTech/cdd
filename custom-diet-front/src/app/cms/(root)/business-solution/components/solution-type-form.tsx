'use client';

import { ModeType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { useEffect, useMemo } from 'react';
import { ImageUpload } from '@/components/image-upload';
import { fakeFileFromName } from '@/utils';

const requiredMessage = '필수 항목입니다.';

const solutionTypeFormSchema = z.object({
  title: z.string().min(1, { message: requiredMessage }),
  description: z.string(),
  tag: z.string().optional(),
  iconFile: z.union([
    z.string().min(1, { message: requiredMessage }),
    z.instanceof(File)
  ])
});

const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  tag: '',
  iconFile: fakeFileFromName('test.png')
};

export type SolutionTypeFormValues = z.infer<typeof solutionTypeFormSchema>;

interface SolutionTypeFormProps {
  initialData?: SolutionTypeFormValues;
  mode: ModeType;
  loading?: boolean;
  onSubmit: SubmitHandler<SolutionTypeFormValues>;
  onCancel?: () => void;
}

const SolutionTypeForm = ({
  initialData,
  mode,
  loading,
  onSubmit,
  onCancel
}: SolutionTypeFormProps) => {
  const form = useForm({
    resolver: zodResolver(solutionTypeFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      ...initialData,
      description: initialData?.description ?? '',
      tag: initialData?.tag ?? ''
    }
  });

  const isViewMode = useMemo(() => mode === 'view', [mode]);

  useEffect(() => {
    if (initialData) {
      form.reset({ ...initialData, description: initialData.description ?? '', tag: initialData.tag ?? '' });
    }
  }, [initialData, form]);

  const handleCancel = () => {
    form.reset();
    if (onCancel) onCancel();
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>제목</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={100} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>내용</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={255} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>태그</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={100} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="iconFile"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>아이콘 이미지</FormLabel>
                <FormControl>
                  <ImageUpload
                    ref={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    readOnly={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <div className="mt-12 flex items-center justify-end gap-4">
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
        </div>
      </form>
    </Form>
  );
};

export default SolutionTypeForm;
