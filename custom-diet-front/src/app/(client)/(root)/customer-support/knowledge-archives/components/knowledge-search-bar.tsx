'use client';

import { CDInput } from '@/components/cd-input';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useDietTypes, useFunctionTypes } from '@/hooks/knowledge.hook';
import { KnowledgeSearchParams } from '@/types/knowledge.type';
import { formatDate } from '@/utils/date.util';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMediaQuery } from 'usehooks-ts';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { SelectDocument } from '@/components/ui/select-document';
import { SelectDietary } from '@/components/ui/select-dietary';
import { useIsMobile } from '@/hooks/use-is-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const formSchema = z.object({
  funcTypeCode: z.string().optional(),
  dietTypeCode: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  query: z.string().optional()
});

export type KnowledgeSearchFormValue = z.infer<typeof formSchema>;

interface KnowledgeSearchBarProps {
  onSearch: (values: KnowledgeSearchFormValue) => void;
  initialSearchParams?: KnowledgeSearchParams;
}

const KnowledgeSearchBar = ({
  onSearch,
  initialSearchParams = {}
}: KnowledgeSearchBarProps) => {
  const isMobile = useIsMobile();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      funcTypeCode: initialSearchParams.kwlgFuncTpCd,
      dietTypeCode: initialSearchParams.kwlgDietTpCd,
      fromDate: initialSearchParams.creDtFm,
      toDate: initialSearchParams.creDtTo,
      query: initialSearchParams.kwlgTit || ''
    }
  });

  const { data: functionTypes = [] } = useFunctionTypes();
  const { data: dietTypes = [] } = useDietTypes();

  const handleSelectDateRange = (range: DateRange) => {
    // set date range to form
    if (range.from) {
      form.setValue('fromDate', formatDate(range.from));
    } else {
      form.setValue('fromDate', '');
    }

    if (range.to) {
      form.setValue('toDate', formatDate(range.to));
    } else {
      form.setValue('toDate', '');
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSearch)}>
        <div className="flex flex-wrap gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
          <FormField
            control={form.control}
            name="funcTypeCode"
            render={({ field }) => (
              <FormItem className="min-w-[8rem]">
                <FormLabel>문헌 종류 (기능성)</FormLabel>
                <FormControl>
                  <SelectDocument
                    value={field.value || 'all'}
                    onChange={field.onChange}
                    templates={functionTypes}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietTypeCode"
            render={({ field }) => (
              <FormItem className="w-[8rem]">
                <FormLabel>문헌 종류 (식이)</FormLabel>
                <FormControl>
                  <SelectDietary
                    value={field.value || 'all'}
                    onChange={field.onChange}
                    templates={dietTypes}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="username"
            render={() => (
              <FormItem className="w-[15rem]">
                <FormLabel>문헌 등록일</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    onSelected={handleSelectDateRange}
                    initialValue={{
                      from: initialSearchParams.creDtFm
                        ? new Date(initialSearchParams.creDtFm)
                        : undefined,
                      to: initialSearchParams.creDtTo
                        ? new Date(initialSearchParams.creDtTo)
                        : undefined
                    }}
                  ></DatePickerWithRange>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="min-w-fit max-w-[20rem] flex-1">
                <FormLabel>문헌 검색</FormLabel>
                <FormControl>
                  <CDInput
                    startIcon={Icons.search}
                    className="flex-1"
                    placeholder="검색"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="hidden self-end lg:block">
            <Button type="submit" size="icon">
              <Icons.search className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex w-full justify-center lg:hidden">
          <Button type="submit" className="flex items-center gap-2">
            <Icons.search className="h-4 w-4" />
            <span className="block text-sm lg:hidden">검색</span>
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <Card className="bg-secondary p-4">
      {isMobile ? (
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-md border"
        >
          <AccordionItem value="filters">
            <AccordionTrigger className="px-2 py-0 text-sm">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div>검색 필터 열기</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="mt-6">{formContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        formContent
      )}
    </Card>
  );
};

export default KnowledgeSearchBar;
