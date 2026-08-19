'use client';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date.util';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface DatePickerProps {
  onDateSelected: (date: Date | undefined) => void;
  initialDate?: Date;
  disabled?: boolean;
}

export function CDDatePicker({
  onDateSelected,
  initialDate,
  disabled
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onDateSelected?.(date);
    }
  };

  return (
    <Popover onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          type="button"
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-100'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date, 'yyyy/MM/dd') : <span>----/--/--</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ after: new Date() }}
          captionLayout="dropdown-buttons"
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
}
