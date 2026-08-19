'use client';

import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/date.util';
import { CircleX, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useMediaQuery } from 'usehooks-ts';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './dialog';
import { ScrollArea } from './scroll-area';

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSelected?: (range: DateRange) => void;
  initialValue?: DateRange;
}

export function DatePickerWithRange({
  className,
  onSelected,
  initialValue
}: DatePickerWithRangeProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');

  const [fromDate, setFromDate] = React.useState<Date | undefined>(
    initialValue?.from
  );
  const [toDate, setToDate] = React.useState<Date | undefined>(
    initialValue?.to
  );

  const renderDate = (fromDate: Date | undefined, toDate: Date | undefined) => {
    const EMPTY_DATE_DISPLAY = '----/--/--';
    const DATE_FORMAT = 'yyyy/MM/dd';

    if (fromDate && toDate) {
      return `${formatDate(fromDate, DATE_FORMAT)} - ${formatDate(toDate, DATE_FORMAT)}`;
    }

    if (fromDate) {
      return `${formatDate(fromDate, DATE_FORMAT)} - ${EMPTY_DATE_DISPLAY}`;
    }

    if (toDate) {
      return `${EMPTY_DATE_DISPLAY} - ${formatDate(toDate, DATE_FORMAT)}`;
    }

    return `${EMPTY_DATE_DISPLAY} - ${EMPTY_DATE_DISPLAY}`;
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onSelected?.({ from: fromDate, to: toDate });
    }
  };

  const handleResetDateRangeClick = (
    event: React.MouseEvent<SVGSVGElement>
  ) => {
    event.stopPropagation();
    setFromDate(undefined);
    setToDate(undefined);
    onSelected?.({ from: undefined, to: undefined });
  };

  // The trigger button for the date picker (shows current selection or placeholder)
  const triggerButton = (
    <Button
      id="date"
      variant="outline"
      className={cn(
        'w-full',
        !fromDate && !toDate && 'text-muted-foreground', // dim text if no date selected
        className
      )}
    >
      <div className="flex w-full items-center justify-start gap-2 text-left font-normal">
        <CalendarIcon className="h-4 w-4" />
        <span>{renderDate(fromDate, toDate)}</span>
        <div className="ml-auto w-4">
          <CircleX className="h-4 w-4" onClick={handleResetDateRangeClick} />
        </div>
      </div>
    </Button>
  );

  if (isMobile) {
    return (
      <div className={cn('grid gap-2', className)}>
        <Dialog onOpenChange={handleOpenChange}>
          <DialogTrigger asChild className="block sm:hidden">
            {triggerButton}
          </DialogTrigger>
          <DialogContent>
            <ScrollArea className="h-[80vh]">
              <div className="mt-4 flex flex-col sm:flex-row">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={fromDate}
                  selected={fromDate}
                  onSelect={setFromDate}
                  captionLayout="dropdown-buttons"
                  fromYear={1960}
                  toYear={2030}
                  disabled={{ after: toDate! }}
                />
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={toDate}
                  selected={toDate}
                  onSelect={setToDate}
                  captionLayout="dropdown-buttons"
                  fromYear={1960}
                  toYear={2030}
                  disabled={{ before: fromDate! }}
                  formatters={{
                    formatCaption: (date) => format(date, 'dd/MM/yyyy')
                  }}
                />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full items-center justify-start gap-2 text-left font-normal',
              !fromDate && !toDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {<span>{renderDate(fromDate, toDate)}</span>}
            <CircleX
              className="ml-auto h-4 w-4"
              onClick={handleResetDateRangeClick}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={fromDate}
            selected={fromDate}
            onSelect={setFromDate}
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
            disabled={{ after: toDate! }}
          />
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={toDate}
            selected={toDate}
            onSelect={setToDate}
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
            disabled={{ before: fromDate! }}
            formatters={{
              formatCaption: (date) => format(date, 'dd/MM/yyyy')
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
