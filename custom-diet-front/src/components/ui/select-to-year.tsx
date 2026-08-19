'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // helper for className merging
import { Button } from './button';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface FromYear {
  id: number;
  value: string;
}

interface ResponsiveSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  templates: FromYear[];
  placeholder?: string;
}

export function SelectToYear({
  value,
  onChange,
  templates,
  placeholder = '년까지'
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    // Desktop (Select dropdown)
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-fit md:w-32">
          <SelectValue placeholder="년까지" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templates?.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <Button
            className="w-full px-2"
            variant="secondary"
            size="sm"
            value=""
            onClick={() => {
              onChange('');
            }}
          >
            초기화
          </Button>
        </SelectContent>
      </Select>
    );
  }

  // Mobile (Dialog)
  const selectedItem = templates.find((item) => item.value === value);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-left text-sm"
      >
        <span>{selectedItem?.value || placeholder}</span>
        <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              옵션 선택
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            {templates.map((item) => {
              const isSelected = value === item.value;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent text-accent-foreground'
                  )}
                >
                  <span className="text-xs">{item.value}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                onChange('');
                setOpen(false);
              }}
              className={cn(
                'flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                !value && 'bg-accent text-accent-foreground'
              )}
            >
              <span className="text-xs">초기화</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
