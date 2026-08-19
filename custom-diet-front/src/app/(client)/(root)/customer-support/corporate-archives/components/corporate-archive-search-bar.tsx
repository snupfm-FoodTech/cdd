'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { SelectBusinessType } from '@/components/ui/select-business-type';
import { SelectCompanyNameBy } from '@/components/ui/select-company-name-by';
import { SelectCompanySize } from '@/components/ui/select-company-size';
import { SelectFromYear } from '@/components/ui/select-from-year';
import { SelectToYear } from '@/components/ui/select-to-year';
import { YEAR, YYYY_OR_EMPTY_DATE_REGEX } from '@/constants';
import { useCompanySizes, useCompanyTypes } from '@/hooks/corporate.hook';
import { cn } from '@/lib/utils';
import { CompanySearchParams } from '@/types/corporate.type';
import { createListYears } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'usehooks-ts';
import { z } from 'zod';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { Filter } from 'lucide-react';

export type CorporateSearchFormValue = z.infer<typeof formSchema>;

export type SearchBy = 'companyName' | 'representativeName';

interface SelectSearchBy {
  value: SearchBy;
  label: string;
}

const formSchema = z
  .object({
    companyTypeId: z.string().optional(),
    companySize: z.string().optional(),
    searchBy: z.string().optional(),
    fromYear: z
      .string()
      .regex(YYYY_OR_EMPTY_DATE_REGEX, 'Invalid year format')
      .optional(),
    toYear: z
      .string()
      .regex(YYYY_OR_EMPTY_DATE_REGEX, 'Invalid year format')
      .optional(),
    query: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.fromYear && data.toYear) {
        return parseInt(data.toYear) >= parseInt(data.fromYear);
      }
      return true;
    },
    {
      message: 'toYear must be greater than or equal to fromYear',
      path: ['toYear']
    }
  );

const SEARCH_BY: SelectSearchBy[] = [
  {
    value: 'companyName',
    label: '기업명'
  },
  {
    value: 'representativeName',
    label: '대표자명'
  }
];

interface CorporateArchiveSearchBarProps {
  onSearch: (values: CorporateSearchFormValue) => void;
  initialSearchParams?: CompanySearchParams;
}

const YEAR_NOW = new Date().getFullYear();

const CorporateArchiveSearchBar = ({
  onSearch,
  initialSearchParams
}: CorporateArchiveSearchBarProps) => {
  const isMobile = useIsMobile();

  const form = useForm({
    defaultValues: {
      companyTypeId: initialSearchParams?.coTpId
        ? initialSearchParams?.coTpId.toString()
        : undefined,
      companySize: initialSearchParams?.coSzCd,
      searchBy: initialSearchParams?.coRepNm
        ? 'representativeName'
        : 'companyName',
      fromYear: initialSearchParams?.coEstYrFm,
      toYear: initialSearchParams?.coEstYrTo,
      query: initialSearchParams?.coNm || initialSearchParams?.coRepNm || ''
    },
    resolver: zodResolver(formSchema)
  });

  const { data: companySizes } = useCompanySizes();
  const { data: companyTypes } = useCompanyTypes();

  const handleSearch = (values: CorporateSearchFormValue) => {
    onSearch(values);
  };

  // set data list years
  const listFromYears = createListYears(YEAR.MIN, YEAR_NOW);
  const [listToYears, setListToYears] = useState(
    createListYears(YEAR_NOW, YEAR_NOW)
  );

  let isFromDateChange = form.watch('fromYear');

  useEffect(() => {
    if (isFromDateChange) {
      setListToYears(
        createListYears(Number(form.getValues('fromYear')), YEAR_NOW)
      );
    }

    if (Number(form.getValues('fromYear')) > Number(form.getValues('toYear'))) {
      form.setValue('toYear', form.getValues('fromYear'));
    }
  }, [form, isFromDateChange]);

  const formContent = (
    <Form {...form}>
      <div>
        <form
          className="flex flex-wrap justify-start gap-4 md:justify-center"
          onSubmit={form.handleSubmit(handleSearch)}
        >
          <FormField
            control={form.control}
            name="companyTypeId"
            render={({ field }) => (
              <FormItem className="min-w-[12rem]">
                <FormLabel>기업 유형</FormLabel>
                <FormControl>
                  {companyTypes && (
                    <SelectBusinessType
                      value={field.value || 'all'}
                      onChange={field.onChange}
                      templates={companyTypes}
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem className="min-w-[8rem]">
                <FormLabel>기업 규모</FormLabel>
                <FormControl>
                  {companySizes && (
                    <SelectCompanySize
                      value={field.value || 'all'}
                      onChange={field.onChange}
                      templates={companySizes}
                    />
                  )}
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="fromYear"
              render={({ field }) => (
                <FormItem className="w-fit md:w-32">
                  <FormLabel
                    className={cn(
                      form.formState.errors?.toYear ? 'text-destructive' : ''
                    )}
                  >
                    설립년도
                  </FormLabel>
                  <FormControl>
                    <SelectFromYear
                      value={field.value}
                      onChange={field.onChange}
                      templates={listFromYears}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="toYear"
              render={({ field }) => (
                <FormItem className="ml-2">
                  <FormLabel>&nbsp;</FormLabel>
                  <FormControl>
                    <SelectToYear
                      value={field.value}
                      onChange={field.onChange}
                      templates={listToYears}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="searchBy"
              render={({ field }) => (
                <FormItem className="min-w-fit md:min-w-[8rem]">
                  <FormLabel>기업 검색</FormLabel>
                  <FormControl>
                    <SelectCompanyNameBy
                      value={field.value}
                      onChange={field.onChange}
                      templates={SEARCH_BY}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="max-w-[20rem] flex-1">
                  <FormLabel>&nbsp;</FormLabel>
                  <FormControl>
                    {isMobile ? (
                      <Input
                        className="flex-1"
                        placeholder="검색"
                        defaultValue={field.value}
                        onBlur={(e) => field.onChange(e.target.value)}
                      />
                    ) : (
                      <Input className="flex-1" placeholder="검색" {...field} />
                    )}
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button className="hidden self-end lg:flex" type="submit" size="icon">
            <Icons.search className="h-4 w-4" />
          </Button>
          <div className="flex w-full justify-center lg:hidden">
            <Button type="submit" className="flex items-center gap-2">
              <Icons.search className="h-4 w-4" />
              <span className="block text-sm lg:hidden">검색</span>
            </Button>
          </div>
        </form>
      </div>
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

export default CorporateArchiveSearchBar;
