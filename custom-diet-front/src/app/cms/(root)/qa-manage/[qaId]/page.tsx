'use client';

import BackButton from '@/components/back-button';
import { CDTextArea } from '@/components/cd-text-area';
import { Icons } from '@/components/icons';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { CMS_BACK_TO_LIST_TITLE } from '@/constants';
import { CMS_QA_URL } from '@/constants/routes';
import { useAnswer, useDeleteQA, useQAByID } from '@/hooks/qa.hook';
import { getAttachment } from '@/utils/file.util';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface QADetailProps {
  params: { qaId: string };
}

export default function CMSQADetailtPage({ params }: QADetailProps) {
  const router = useRouter();
  const { qaId } = params;
  const { data } = useQAByID(qaId);

  const { mutateAsync: mutateAnswer, isPending: answerPending } = useAnswer();
  const [showAlert, setShowAlert] = useState(false);
  const handleAlertClose = () => setShowAlert(false);
  const { mutateAsync: mutateDelete, isPending: deletePending } = useDeleteQA();

  const handleAlertConfirm = () => {
    mutateDelete(qaId).then(() => {
      handleAlertClose();
      router.push(CMS_QA_URL);
    });
  };

  const formSchema = z.object({
    queId: z.string().min(1, { message: '질문은 필수입니다' }),
    ansCtnt: z.string().min(1, { message: '세부정보 유형이 필요합니다.' })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      queId: qaId,
      ansCtnt: data?.ansCtnt || ''
    }
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    mutateAnswer(formData).then(() => router.push(CMS_QA_URL));
  };

  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (data?.ansCtnt) {
      setCharCount(data.ansCtnt.length);
      form.setValue('ansCtnt', data.ansCtnt);
    }
  }, [data, form]);

  const handleTextareaChange = (value: string) => {
    setCharCount(value.length);
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

  return (
    <div className="cms-qa-detail">
      {renderAlertModal()}
      <div className="flex items-center gap-4">
        <BackButton
          url={CMS_QA_URL}
          label={CMS_BACK_TO_LIST_TITLE}
          size="large"
        />
      </div>
      <div className="mt-8 flex w-full justify-between gap-4">
        <div className="flex w-4/5 flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">
              질의응답 - {qaId}
            </h2>
            <Button
              className="w-24"
              variant="destructive"
              onClick={() => setShowAlert(true)}
            >
              <Icons.trash2 />
              <span className="ml-2">삭제</span>
            </Button>
          </div>
          <div className="flex h-28 rounded-lg border-2 bg-secondary p-4">
            <div className="w-36">
              <p>등록자</p>
              <p>이메일</p>
              <p>등록일</p>
            </div>
            <div className="w-full">
              <p>{data?.queUsrNm}</p>
              <p>{data?.queUsrEml}</p>
              <p>{data?.creDt}</p>
            </div>
            <div className="w-24">
              <p>처리상태</p>
            </div>
            <div className="w-32">
              <p>{data?.queSttNm}</p>
            </div>
          </div>

          <div className="flex h-fit items-center overflow-y-auto break-all rounded-lg border-2 bg-secondary p-4">
            {data?.queTit}
          </div>

          <div className="flex h-fit items-center break-all rounded-lg border-2 bg-secondary p-4">
            {data?.queCtnt}
          </div>
          <div className="mt-2 flex flex-col px-[20px] pt-[20px]">
            {data?.queAtchUrls.map((url, index) => (
              <div key={index} className="mb-2">
                <Link
                  href={`${getAttachment(url)}`}
                  target="_blank"
                  className="border-b-2 underline"
                >
                  첨부파일 {index + 1}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit w-auto">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold tracking-tight">답변내용</h2>
            <p>{charCount} / 500 자</p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-7 h-full w-full rounded-lg border-2 bg-secondary"
            >
              <FormField
                control={form.control}
                name="ansCtnt"
                render={({ field }) => (
                  <FormItem className="w-fit px-4">
                    <FormControl>
                      <CDTextArea
                        {...field}
                        placeholder="내용을 입력하세요."
                        className="w-60"
                        maxLength={500}
                        minHeight={400}
                        onChange={(e) => {
                          field.onChange(e);
                          handleTextareaChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex h-16 items-center justify-center">
                <Button type="submit" loading={answerPending}>
                  답변 등록
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
