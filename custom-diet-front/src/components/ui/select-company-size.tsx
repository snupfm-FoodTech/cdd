'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompanySize } from '@/types/corporate.type';

interface ResponsiveSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  templates: CompanySize[];
  placeholder?: string;
}

export function SelectCompanySize({
  value,
  onChange,
  templates,
  placeholder = '전체'
}: ResponsiveSelectProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [open, setOpen] = useState(false);

  const options = useMemo<CompanySize[]>(
    () => [
      {
        code: 'all',
        content: '전체',
        description: '전체 항목 포함'
      },
      ...templates
    ],
    [templates]
  );

  const selected = options.find((tpl) => tpl.code === value);

  if (!isMobile) {
    // ✅ Desktop (Select dropdown)
    return (
      <Select onValueChange={onChange} value={value || 'all'}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((size) => (
              <SelectItem key={size.code} value={size.code}>
                {size.content}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  // ✅ Mobile (Dialog)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-left text-sm"
      >
        <span>{selected?.content || placeholder}</span>
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
            {options.map((template) => {
              const isSelected = value === template.code;
              return (
                <button
                  key={template.code}
                  type="button"
                  onClick={() => {
                    onChange(template.code);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent text-accent-foreground'
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-xs">{template.content}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
