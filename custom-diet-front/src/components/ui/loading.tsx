'use client';

import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-primary">
      <Loader2 className="mb-4 h-8 w-8 animate-spin" />
      <span className="text-sm font-medium">잠시만 기다려 주세요...</span>
    </div>
  );
}
