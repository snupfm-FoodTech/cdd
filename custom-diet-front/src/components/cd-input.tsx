import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface CDInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onClickIcon?: () => void;
}

const CDInput = React.forwardRef<HTMLInputElement, CDInputProps>(
  ({ className, type, startIcon, endIcon, onClickIcon, ...props }, ref) => {
    const StartIcon = startIcon;
    const EndIcon = endIcon;

    return (
      <div className="relative w-full">
        {StartIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 transform">
            <StartIcon size={16} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            startIcon ? 'pl-10' : '',
            endIcon ? 'pr-10' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && onClickIcon && !props.disabled && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
            <EndIcon
              className="cursor-pointer text-muted-foreground"
              size={16}
              onClick={onClickIcon}
            />
          </div>
        )}
        {EndIcon && onClickIcon && props.disabled && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
            <EndIcon
              className="cursor-not-allowed text-muted-foreground"
              size={16}
            />
          </div>
        )}
        {EndIcon && !onClickIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
            <EndIcon className="text-muted-foreground" size={16} />
          </div>
        )}
      </div>
    );
  }
);
CDInput.displayName = 'CDInput';

export { CDInput };
