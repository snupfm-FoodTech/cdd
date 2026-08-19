'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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

interface Template {
  code: string;
  name: string;
  typeName?: string;
}

interface ResponsiveSelectProps {
  value: string;
  onChange: (value: string) => void;
  templates: Template[];
  selectedTemplate?: Template;
  placeholder?: string;
}

export function SelectNutrientStandard({
  value,
  onChange,
  templates,
  selectedTemplate,
  placeholder = 'Select...'
}: ResponsiveSelectProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [open, setOpen] = useState(false);

  if (!isMobile) {
    // Desktop (Select dropdown)
    return (
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full bg-white md:w-1/2">
          <SelectValue placeholder="영양소 표준 템플릿 선택">
            {selectedTemplate?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {templates.map((template) => (
              <SelectItem
                key={template.code}
                value={template.code}
                showIndicator={false}
                className="px-4"
              >
                {template.typeName ? (
                  <Badge className="max-w-22 mr-4">{template.typeName}</Badge>
                ) : (
                  <span className="mr-1 inline-block w-24"></span>
                )}
                <span>{template.name}</span>
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

          <div className="space-y-2">
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
                    {template.typeName ? (
                      <Badge className="max-w-22 mr-4 text-xs">
                        {template.typeName}
                      </Badge>
                    ) : (
                      <span className="mr-1 inline-block w-24" />
                    )}
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
