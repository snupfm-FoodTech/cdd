import { Input, InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import React from 'react';

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', className)}>
        <MagnifyingGlassIcon className="absolute left-4 h-4 w-4" />
        <Input
          className="px-10"
          placeholder="찾다..."
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
