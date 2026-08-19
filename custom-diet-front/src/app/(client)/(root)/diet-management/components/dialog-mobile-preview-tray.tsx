import { FC, useEffect } from 'react';
import { cn } from '@/lib/utils'; // hoặc classnames

interface DialogMobilePreviewTrayProps {
  isOpen: boolean;
  handleChange: (isOpen: boolean) => void;
  message?: string;
}

const DialogMobilePreviewTray: FC<DialogMobilePreviewTrayProps> = ({
  isOpen,
  handleChange,
  message = 'hello world'
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        handleChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, handleChange]);

  if (!isOpen) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[150]">
      <div
        className={cn(
          'pointer-events-auto w-fit rounded-md border bg-white px-4 py-2 text-sm shadow-md',
          'duration-300 animate-in fade-in slide-in-from-top-5',
          'transition-all'
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default DialogMobilePreviewTray;
