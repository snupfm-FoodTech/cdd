import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const InputPasswordLandingPage = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({ className, icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="group flex h-[48px] items-center gap-2 rounded-md border-b-2 border-white bg-white/10 px-4 text-white transition-all duration-500 ease-in-out focus-within:border-blue-400 focus-within:bg-white/20">
      {icon && <span className="h-7 w-7 text-white">{icon}</span>}

      <input
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'w-full border-none bg-transparent py-2 text-base text-white placeholder-white/70 outline-none',
          className
        )}
        {...props}
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="ml-2 text-white/70 hover:text-white"
      >
        {showPassword ? <EyeOffIcon size={22} /> : <EyeIcon size={22} />}
      </button>
    </div>
  );
});
InputPasswordLandingPage.displayName = 'InputPasswordLandingPage';

export { InputPasswordLandingPage };
