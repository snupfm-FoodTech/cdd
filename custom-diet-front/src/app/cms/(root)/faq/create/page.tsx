'use client';

import { CDTextArea } from '@/components/cd-text-area';
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
import { CMS_FAQ_URL } from '@/constants/routes';
import { useCreateFAQ } from '@/hooks/faq.hook';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const createFaqFormSchema = z.object({
  question: z.string().min(1, { message: '제목은 필수 항목입니다.' }),
  answer: z.string().min(1, { message: '콘텐츠가 필요합니다' })
});

type CreateFaqFormValue = z.infer<typeof createFaqFormSchema>;

const CreateFAQ = () => {
  const router = useRouter();
  const form = useForm<CreateFaqFormValue>({
    resolver: zodResolver(createFaqFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      answer: ''
    }
  });

  const createMutation = useCreateFAQ()

  const handleCreate = (value: CreateFaqFormValue) => {
    createMutation.mutateAsync({ faqAnsCtnt: value.answer, faqQueCtnt: value.question }).then(() => {
      router.push(CMS_FAQ_URL);
    })
  };

  return (
    <div className="px-8">
      <div className="text-xl font-medium">만들다 FAQ</div>
      <div className="mt-4">
        <Form {...form}>
          <form
            className="w-full"
            onSubmit={form.handleSubmit(handleCreate)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-4 pt-2 text-xl font-semibold text-muted-foreground">
                    Q
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="질문이 뭐예요?"
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
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-4 pt-2 text-xl font-semibold text-muted-foreground">
                    A
                  </FormLabel>
                  <FormControl>
                    <CDTextArea
                      {...field}
                      minHeight={200}
                      maxLength={2000}
                      className="border-gray-500"
                      placeholder="답이 뭐예요?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-4 mt-4">
              <Button type="submit" className="w-24">
                만들다
              </Button>
              <Button
                className="w-24"
                variant="secondary"
                onClick={() => history.back()}
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

export default CreateFAQ;
