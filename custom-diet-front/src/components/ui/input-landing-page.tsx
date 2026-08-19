import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputLandingPage = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', icon, ...props }, ref) => {
    return (
      <div className="group flex h-[48px] items-center gap-2 rounded-md border-b-2 border-white bg-white/10 px-4 text-white transition-all duration-500 ease-in-out focus-within:border-blue-400 focus-within:bg-white/20">
        {icon && <span className="h-6 w-6 text-white">{icon}</span>}
        <input
          type={type}
          className={cn(
            'w-full border-none bg-transparent text-base text-white placeholder-white/70 outline-none focus:ring-0',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
InputLandingPage.displayName = 'InputLandingPage';

export { InputLandingPage };
