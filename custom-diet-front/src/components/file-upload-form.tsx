'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  extractFileName,
  getAttachment,
  translateFileType
} from '@/utils/file.util';
import Link from 'next/link';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface FileUploadFormProps {
  label?: string;
  required?: boolean;
  max?: number;
  type?: 'single' | 'multiple';
  readOnly?: boolean;
  acceptedFileTypes?: string[];
  maxUploadSize?: number;
}

interface DisplayFile {
  name: string;
  url: string;
}

const FileUploadForm = ({
  acceptedFileTypes,
  maxUploadSize,
  max,
  label,
  required = false,
  type = 'single',
  readOnly = false
}: FileUploadFormProps) => {
  const { watch, control, getValues, setValue } = useFormContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetInputFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateFiles = (files: File[]) => {
    if (acceptedFileTypes && acceptedFileTypes.length) {
      const validFileTypes = files.every((file) => {
        return acceptedFileTypes.includes(file.type);
      });

      if (!validFileTypes) {
        // image/png, image/jpeg, image/jpg => PNG, JPEG, JPG
        const acceptedFileTypeMsg = acceptedFileTypes
          .map((type) => translateFileType(type).toUpperCase())
          .join(', ');

        toast({
          title: `${acceptedFileTypeMsg} 파일 형식만 업로드 가능합니다`,
          variant: 'destructive'
        });
        return false;
      }
    }

    if (maxUploadSize) {
      const validFileSize = files.every((file) => {
        return file.size <= maxUploadSize;
      });

      if (!validFileSize) {
        toast({
          title: `최대 파일 크기는 ${maxUploadSize / 1024 / 1024}MB 입니다`,
          variant: 'destructive'
        });
        return false;
      }
    }

    const maxFiles = type === 'single' ? 1 : max;

    if (maxFiles) {
      const numberOfFiles =
        getValues('newFiles').length +
        getValues('currentFilePaths').length +
        files.length;

      if (numberOfFiles > maxFiles) {
        toast({
          title: `최대 ${maxFiles}개의 파일을 업로드할 수 있습니다`,
          variant: 'destructive'
        });
        return false;
      }
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!validateFiles(files)) {
      resetInputFile();
      return;
    }

    let newFiles: File[] = [];
    let newFileUrls: DisplayFile[] = [];

    if (type === 'single') {
      newFiles = files;
      const fileToDisplay = {
        name: files[0].name,
        url: URL.createObjectURL(files[0])
      };
      newFileUrls = [fileToDisplay];
    } else if (type === 'multiple') {
      newFiles = [...getValues('newFiles'), ...files];

      const tempFiles = files.map((file) => {
        return {
          name: file.name,
          url: URL.createObjectURL(file)
        };
      });
      newFileUrls = [...getValues('newFileUrls'), ...tempFiles];
    }

    setValue('newFiles', newFiles, { shouldValidate: true });
    setValue('newFileUrls', newFileUrls);

    // Reset file input to allow re-adding the same file
    resetInputFile();
  };

  const removeServerFile = (file: string) => {
    if (readOnly) return;

    const updatedDeleteFilePaths = [...getValues('deleteFilePaths'), file];
    setValue('deleteFilePaths', updatedDeleteFilePaths);

    const updatedCurrentFilePaths = getValues('currentFilePaths').filter(
      (f: string) => f !== file
    );
    setValue('currentFilePaths', updatedCurrentFilePaths);
  };

  const removeDisplayFile = (file: DisplayFile) => {
    if (readOnly) return;

    const updatedNewFileUrls = getValues('newFileUrls').filter(
      (f: DisplayFile) => f.url !== file.url
    );
    setValue('newFileUrls', updatedNewFileUrls);

    const updatedNewFiles = getValues('newFiles').filter(
      (f: File) => f.name !== file.name
    );
    setValue('newFiles', updatedNewFiles, { shouldValidate: true });

    // Reset file input to allow re-adding the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <FormField
        name="newFiles"
        control={control}
        render={() => (
          <FormItem>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            <FormControl>
              <input
                type="file"
                multiple={type === 'multiple'}
                accept={acceptedFileTypes?.join(',')}
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </FormControl>
            <div>
              <Button
                type="button"
                onClick={triggerFileInput}
                disabled={readOnly}
              >
                <Icons.media className="mr-2 h-6 w-6" />
                파일 업로드
              </Button>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <div className="">
        {watch('newFileUrls').map((file: DisplayFile, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Link
              href={file.url}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
              className="block max-w-full overflow-hidden"
            >
              <Button
                variant="link"
                className="max-w-full truncate px-0 text-left"
                type="button"
                title={file.name}
              >
                {file.name}
              </Button>
            </Link>

            <Icons.close
              onClick={() => removeDisplayFile(file)}
              size={16}
              className="cursor-pointer text-red-500"
            ></Icons.close>
          </div>
        ))}
        {watch('currentFilePaths').map((filePath: string, index: number) => (
          <div key={index} className="flex max-w-full items-center gap-2">
            <Link
              className="min-w-0 flex-1"
              href={getAttachment(filePath)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                variant="link"
                className="w-full truncate px-0 text-left"
                type="button"
                title={extractFileName(filePath)}
              >
                {extractFileName(filePath)}
              </Button>
            </Link>

            <Icons.close
              onClick={() => removeServerFile(filePath)}
              size={16}
              className={cn(
                'shrink-0 text-red-500',
                readOnly ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadForm;
