'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { useMediaQuery } from 'usehooks-ts';

interface AlertModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  type?: 'alert' | 'confirm';
  confirmText?: string;
  closeText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
  type = 'alert',
  confirmText = '삭제',
  closeText = '취소'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className={`flex w-full pt-6 ${
          isMobile
            ? 'flex-row items-center justify-center gap-4'
            : 'flex-row items-center justify-end space-x-2'
        }`}
      >
        <Button
          className={isMobile ? 'w-24' : 'w-24'}
          disabled={loading}
          variant={type === 'alert' ? 'destructive' : 'default'}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
        <Button
          className={isMobile ? 'w-24' : 'w-24'}
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          {closeText}
        </Button>
      </div>
    </Modal>
  );
};

export { AlertModal };
