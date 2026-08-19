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
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // helper for className merging
import { RepresentativeTemplate } from '@/types/diet.type';

interface ResponsiveSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  templates: RepresentativeTemplate[];
  placeholder?: string;
}

export function SelectTemplate({
  value,
  onChange,
  templates,
  placeholder = '대표 식단 트레이 불러오기'
}: ResponsiveSelectProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    // Desktop (Select dropdown)
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={placeholder}
            className="text-sm md:text-base"
            asChild
          >
            <span className="text-sm font-semibold md:text-base">
              {templates.find((t) => t.code === value)?.content}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templates.map((item) => (
              <SelectItem key={item.seq} value={item.code}>
                <p className="text-sm font-semibold md:text-lg">
                  {item.content}
                </p>
                <p className="text-xs">{item.description}</p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  // Mobile (Dialog)
  const selected = templates.find((tpl) => tpl.code === value);

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

          <div className="h-[70vh] space-y-2">
            {templates.map((template) => {
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
                    'group flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground', // add 'group'
                    isSelected && 'bg-accent text-accent-foreground'
                  )}
                >
                  <div className="flex flex-col text-left">
                    <p className="text-sm font-semibold md:text-base">
                      {template.content}
                    </p>
                    <p
                      className={cn(
                        'text-xs transition-colors group-hover:text-white', // add group-hover:text-white
                        isSelected
                          ? 'text-accent-foreground'
                          : 'text-muted-foreground'
                      )}
                    >
                      {template.description}
                    </p>
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
