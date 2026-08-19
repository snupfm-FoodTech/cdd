import { getFileUrl } from '@/api-client/api-url';

export const loadImage = (path: string) => getFileUrl(path);

export const getAttachment = (path: string) => getFileUrl(path);

/**
 * Extracts the file name from a given file path.
 *
 * @param filePath - The full path of the file.
 * @returns The extracted file name from the path.
 *
 * @example
 * // Returns "file-name.png"
 * const fileName = extractFileName('file/sample-url/id_file-name.png');
 */
export const extractFileName = (filePath: string): string => {
  const segments = filePath.split('/');
  const rawFileName = segments[segments.length - 1];

  const fileName = rawFileName.substring(
    rawFileName.indexOf('_') + 1,
    rawFileName.length
  );

  return fileName;
};

const FILE_TYPE_DICTIONARY: { [key: string]: string } = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
} as const;

export const translateFileType = (fileType: string) => {
  return FILE_TYPE_DICTIONARY[fileType] || '';
};
