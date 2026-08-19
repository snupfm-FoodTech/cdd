// components/ui/error-message.tsx
'use client';

import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

export const ErrorMessage = ({
  message = '데이터를 불러오는 중 오류가 발생했습니다.',
  className
}: ErrorMessageProps) => {
  return (
    <div
      className={cn(
        'rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive',
        className
      )}
    >
      {message}
    </div>
  );
};
