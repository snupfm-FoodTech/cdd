/* eslint-disable @next/next/no-img-element */
'use client';

import { getFileUrl } from '@/api-client/api-url';
import { isBase64 } from '@/utils';

interface Base64ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string; // optional fallback nếu không có ảnh
}

export function Base64Image({
  src,
  alt,
  fallbackSrc,
  ...props
}: Base64ImageProps) {
  const safeSrc =
    src && isBase64(src)
      ? src
      : src
        ? getFileUrl(src)
        : fallbackSrc || '/default.png';

  return <img src={safeSrc} alt={alt || ''} {...props} />;
}
