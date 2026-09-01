'use client';

import { CDTextArea } from '@/components/cd-text-area';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

const DietInfo = () => {
  const form = useFormContext();

  return (
    <div>
      <FormField
        control={form.control}
        name="dietName"
        render={({ field }) => (
          <FormItem>
            <FormLabel required>식단명</FormLabel>
            <FormControl>
              <Input
                className="w-full bg-white md:w-1/2"
                maxLength={50}
                {...field}
              />
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dietDescription"
        render={({ field }) => (
          <FormItem className="mt-4">
            <FormLabel>식단 설명</FormLabel>
            <FormControl>
              <CDTextArea
                className="h-16 w-full border bg-white"
                placeholder="선택 입력"
                {...field}
                maxLength={255}
              />
            </FormControl>
            <FormMessage></FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DietInfo;
