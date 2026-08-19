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
import { useState } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // helper for className merging
import { useIsMobile } from '@/hooks/use-is-mobile';

interface SelectSearchBy {
  value: string;
  label: string;
}

interface ResponsiveSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  templates: SelectSearchBy[];
  placeholder?: string;
}

export function SelectCompanyNameBy({
  value,
  onChange,
  templates,
  placeholder = '전체'
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    // Desktop (Select dropdown)
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templates.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  // Mobile (Dialog)
  const selected = templates.find((tpl) => tpl.value === value);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-left text-sm"
      >
        <span>{selected?.label || placeholder}</span>
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
            {templates.map((template) => {
              const isSelected = value === template.value;
              return (
                <button
                  key={template.value}
                  type="button"
                  onClick={() => {
                    onChange(template.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent text-accent-foreground'
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-xs">{template.label}</span>
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
