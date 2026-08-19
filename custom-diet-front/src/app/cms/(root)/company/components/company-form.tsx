'use client';

import { useCompanySizes, useCompanyTypes } from '@/hooks/corporate.hook';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { CDDatePicker } from '@/components/cd-date-picker';
import FileUploadForm from '@/components/file-upload-form';
import NumberInput from '@/components/number-input';
import { Button } from '@/components/ui/button';
import { ACCEPTED_IMAGE_FILE_TYPES, MAX_UPLOAD_SIZE } from '@/constants';
import { CompanySize } from '@/types/corporate.type';
import { formatDate } from '@/utils/date.util';
import { formatBusinessNumber, formatCompanyNumber } from '@/utils/format.util';
import { ChangeEvent, useEffect, useMemo } from 'react';

const companyForm = z.object({
  coTpId: z.string().min(1, { message: '유형은 필수 항목입니다.' }),
  coNm: z.string().min(1, { message: '이름은 필수입니다' }),
  coEngNm: z
    .string({ message: '영어 이름이 필요합니다' })
    .regex(/^[A-Za-z\s'.-]*$/, '')
    .optional(),
  coNo: z
    .string()
    .min(1, { message: '법인번호가 필요합니다' })
    .refine((value) => {
      const stripValue = value.replace(/-/g, '');
      return stripValue.length === 13;
    }, '부디 13자리 충분히 입력해 주세요'),
  coBizNo: z
    .string()
    .min(1, { message: '사업자번호가 필요합니다' })
    .refine((value) => {
      const stripValue = value.replace(/-/g, '');
      return stripValue.length === 10;
    }, '부디 10자리 충분히 입력해 주세요'),
  coRepNm: z.string().min(1, { message: '대표자 이름이 필요합니다' }),
  coTtlEmpNo: z.number().optional(),
  coEstFom: z.string({ message: '설립 양식이 필요합니다' }).optional(),
  coEstDt: z.string().min(1, { message: '설립일은 필수 항목입니다.' }),

  coFom: z.string().optional(),
  coSzCd: z.string().min(1, { message: '사이즈 코드가 필요합니다' }),
  coPhnNo: z.string().min(1, { message: '전화번호가 필요합니다' }),
  coPalsNo: z.string().optional(),
  coAddr: z.string().min(1, { message: '주소가 필요합니다' }),
  coEml: z
    .string()
    .min(1, { message: '이메일은 필수입니다' })
    .email({ message: '잘못된 이메일 주소' }),
  coHpgUrl: z
    .union([z.string().url({ message: '잘못된 URL' }), z.string().min(0)])
    .optional(),
  coIndus: z.string({ message: '업종은 필수 항목입니다.' }).optional(),

  newFileUrls: z.array(z.object({ name: z.string(), url: z.string() })),
  currentFilePaths: z.array(z.string()).default([]),
  newFiles: z.array(z.custom<File>((file) => file instanceof File)),
  deleteFilePaths: z.array(z.string()).default([]) // File paths to delete
});

const DEFAULT_FORM_VALUES = {
  coTpId: '',
  coNm: '',
  coEngNm: '',
  coBizNo: '',
  coNo: '',
  coRepNm: '',
  coTtlEmpNo: 0,
  coEstFom: '',
  coEstDt: '',
  coFom: '',
  coPhnNo: '',
  coSzCd: '',
  coPalsNo: '',
  coAddr: '',
  coEml: '',
  coHpgUrl: '',
  coIndus: '',
  currentFilePaths: [],
  newFiles: [],
  deleteFilePaths: [],
  newFileUrls: []
};

export type CompanyFormValues = z.infer<typeof companyForm>;

interface CompanyFormProps {
  initialData?: CompanyFormValues;
  companyId?: string;
  mode: ModeType;
  loading?: boolean;
  onSubmit: SubmitHandler<CompanyFormValues>;
  onCancel?: () => void;
}

const CompanyForm = ({
  initialData,
  mode,
  loading,
  onSubmit,
  onCancel
}: CompanyFormProps) => {
  const { data: companySizes = [] } = useCompanySizes();
  const { data: companyTypes = [] } = useCompanyTypes();

  const form = useForm({
    resolver: zodResolver(companyForm),
    mode: 'onSubmit',
    defaultValues: {
      ...DEFAULT_FORM_VALUES,
      ...initialData
    }
  });

  const isViewMode = useMemo(() => mode === 'view', [mode]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  useEffect(() => {
    if (mode === ModeType.CREATE && companyTypes.length > 0) {
      const FIRST_COMPANY_TYPE = 0;
      form.setValue(
        'coTpId',
        companyTypes[FIRST_COMPANY_TYPE]?.coTpId.toString()
      );
    }
  }, [companyTypes, mode, form]);

  const handleCancel = () => {
    form.reset();
    if (onCancel) onCancel();
  };

  const handleEstablishDateChange = (date: Date | undefined) => {
    if (!date) {
      form.setValue('coEstDt', '');
      return;
    }
    form.setValue('coEstDt', formatDate(date));
  };

  const handleCoTpIdChange = (value: string) => {
    if (!value) {
      return;
    }

    form.setValue('coTpId', value);
  };

  const handleCoBizNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBusinessNumber(e.target.value);

    form.setValue('coBizNo', formattedValue);
  };

  const handleCoNoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCompanyNumber(e.target.value);

    form.setValue('coNo', formattedValue);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="coTpId"
              render={({ field }) => (
                <FormItem className="w-1/5">
                  <FormLabel required>기업 유형</FormLabel>
                  <Select
                    onValueChange={isViewMode ? undefined : handleCoTpIdChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {companyTypes?.map((type) => (
                        <SelectItem
                          key={type.coTpId}
                          value={type.coTpId.toString()}
                        >
                          {type.coTpNm}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="coNm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>기업명</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coEngNm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>영문기업명</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={50}
                    readOnly={isViewMode}
                    onChange={(e) => {
                      if (
                        /^[A-Za-z0-9\s'.-]*$/.test(e.target.value) ||
                        e.target.value === ''
                      ) {
                        field.onChange(e);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coBizNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>사업자번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={12} // allows for the formatted length including dashes
                    readOnly={isViewMode}
                    onChange={handleCoBizNoChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>법인번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={14} // allows for the formatted length including dashes
                    readOnly={isViewMode}
                    onChange={handleCoNoChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coRepNm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>대표자명</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coTtlEmpNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>직원수</FormLabel>
                <FormControl>
                  <NumberInput
                    value={field.value}
                    onChange={field.onChange}
                    min={0}
                    maxLength={5}
                    readonly={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coEstFom"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>설립 형태</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coEstDt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>설립 일자</FormLabel>
                <FormControl>
                  <CDDatePicker
                    onDateSelected={handleEstablishDateChange}
                    initialDate={
                      field.value ? new Date(field.value) : undefined
                    }
                    disabled={isViewMode}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coFom"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>기업 형태</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coSzCd"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>기업 규모</FormLabel>
                <Select
                  onValueChange={isViewMode ? undefined : field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="회사 규모를 선택하세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizes.map((size: CompanySize) => (
                      <SelectItem key={size.code} value={size.code}>
                        {size.content}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coPhnNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>전화번호</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={50}
                    readOnly={isViewMode}
                    onChange={(e) => {
                      // Allow only numbers and hyphen
                      const value = e.target.value;
                      if (/^[0-9-]*$/.test(value) || value === '') {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coPalsNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>팩스번호</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coAddr"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>주소</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coEml"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel required>이메일</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coHpgUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>홈페이지 링크</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coIndus"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>업종(KSIC 10C차)</FormLabel>
                <FormControl>
                  <Input {...field} maxLength={50} readOnly={isViewMode} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUploadForm
            label="기업 상품 및 서비스 상세 이미지"
            acceptedFileTypes={ACCEPTED_IMAGE_FILE_TYPES}
            maxUploadSize={MAX_UPLOAD_SIZE}
            readOnly={isViewMode}
          />

          <div className="mt-28 flex items-center justify-end gap-4">
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

export default CompanyForm;
