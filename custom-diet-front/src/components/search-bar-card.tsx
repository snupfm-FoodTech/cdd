import { cn } from '@/lib/utils';
import React from 'react';

const SearchBarCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded border bg-secondary p-4 shadow', className)}
    {...props}
  />
));
SearchBarCard.displayName = 'SearchBarCard';

export { SearchBarCard };
