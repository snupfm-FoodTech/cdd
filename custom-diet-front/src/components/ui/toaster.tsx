'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();
  const BR_CONSTANT = '<br/>';

  const formatContentToast = (content: any) => {
    if (typeof content === 'string') {
      if (content.includes(BR_CONSTANT)) {
        let newContent = content.split(BR_CONSTANT);

        return (
          <p className="text-center text-sm">
            {newContent[0]}
            <br />
            {newContent[1]}
          </p>
        );
      }
    }

    return content;
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} duration={3000} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>
                  {formatContentToast(description)}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
