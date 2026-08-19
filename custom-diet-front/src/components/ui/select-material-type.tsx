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
import { MaterialType } from '@/types/food.type';

interface ResponsiveSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  templates: MaterialType[];
  placeholder?: string;
}

export function SelectMaterialType({
  value,
  onChange,
  templates,
  placeholder = '전체'
}: ResponsiveSelectProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    // Desktop (Select dropdown)
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templates.map((type) => (
              <SelectItem key={type.code} value={type.code}>
                {type.name}
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
        <span>{selected?.name || placeholder}</span>
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
                    'flex w-full items-center justify-between rounded-md border px-2 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent text-accent-foreground'
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-xs">{template.name}</span>
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
