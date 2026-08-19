'use client';

import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ACCEPTED_IMAGE_FILE_TYPES, MAX_UPLOAD_SIZE } from '@/constants';

type ImageValue = string | File | null;

type Props = {
  /** Korean label for UI */
  label?: string;
  /** Show asterisk in UI */
  required?: boolean;
  /** Current value from RHF (string URL/base64 for edit OR File for new upload) */
  value?: ImageValue;
  /** Notify RHF when value changes (string | File | null) */
  onChange?: (value: ImageValue) => void;
  /** Read-only disables interaction but still shows preview */
  readOnly?: boolean;
  /** Korean helper text */
  hint?: string;
  /** Extra class for container */
  className?: string;
  /** Disabled UI state */
  disabled?: boolean;
};

/**
 * ImageUploadDropzone (Controlled; supports string or File)
 * - If value is a string (URL/base64), we preview that directly (edit mode).
 * - If value is a File, we create an object URL for preview.
 * - onChange(File) for new uploads; onChange('') when clearing (to trigger required in zod union).
 * - Validates type/size before accepting.
 * - 1:1 square preview for icons.
 */
export const ImageUpload = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      label = '아이콘 이미지',
      required,
      value,
      onChange,
      readOnly,
      hint,
      className,
      disabled
    },
    ref
  ) => {
    const [error, setError] = React.useState<string>();
    const [previewUrl, setPreviewUrl] = React.useState<string | undefined>(
      undefined
    );

    // Derive preview URL from `value`
    React.useEffect(() => {
      // Clean previous object URL if any
      let revoke: string | undefined;

      if (!value) {
        setPreviewUrl(undefined);
      } else if (typeof value === 'string') {
        // string URL or base64
        setPreviewUrl(value);
      } else if (value instanceof File) {
        // File -> object URL
        const url = URL.createObjectURL(value);
        setPreviewUrl(url);
        revoke = url;
      }

      return () => {
        if (revoke) URL.revokeObjectURL(revoke);
      };
    }, [value]);

    // Convert File -> validate before accepting
    const validateFile = (file: File): string | null => {
      if (!ACCEPTED_IMAGE_FILE_TYPES.includes(file.type)) {
        return '지원하지 않는 파일 형식입니다. (png, jpg, jpeg)';
      }
      if (file.size > MAX_UPLOAD_SIZE) {
        return '파일 용량이 15MB를 초과했습니다.';
      }
      return null;
    };

    const handleDrop = React.useCallback(
      async (accepted: File[]) => {
        if (readOnly || disabled) return;
        const file = accepted?.[0];
        if (!file) return;

        const err = validateFile(file);
        if (err) {
          setError(err);
          return;
        }
        setError(undefined);
        // Hand File directly to RHF (keep original file for FormData)
        onChange?.(file);
      },
      [readOnly, disabled, onChange]
    );

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      noClick: true,
      noKeyboard: true,
      multiple: false,
      accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
      onDrop: handleDrop,
      disabled: readOnly || !!disabled
    });

    const openPicker = () => {
      if (!readOnly && !disabled) open();
    };

    const clearImage = () => {
      if (readOnly || disabled) return;
      setError(undefined);
      // Use empty string to trigger required on zod union (string|File)
      onChange?.('');
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Label (Korean) */}
        {/* <div className="mb-1 flex items-center gap-1">
          <span className="text-sm font-medium">{label}</span>
          {required && <span className="text-destructive">*</span>}
        </div> */}

        {/* Drop area / Preview */}
        <div
          {...getRootProps()}
          className={cn(
            'relative rounded-lg border border-dashed bg-muted/20 p-3',
            (readOnly || disabled) && 'bg-muted/40',
            isDragActive && 'ring-2 ring-primary/40'
          )}
        >
          <input {...getInputProps()} />

          {/* Overlay Button */}

          <div className="flex items-center gap-4">
            <div className="mx-0 w-32 shrink-0">
              <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="미리보기"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-center text-xs text-muted-foreground">
                    {isDragActive
                      ? '여기에 이미지를 놓으세요.'
                      : '이미지를 드래그 앤 드롭 하세요.'}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                size="sm"
                onClick={openPicker}
                disabled={readOnly || disabled}
              >
                이미지 선택
              </Button>
              {previewUrl && !readOnly && !disabled && (
                <Button type="button" variant="ghost" onClick={clearImage}>
                  제거
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Error (Korean) */}
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
