'use client';

import { Skeleton } from '@/components/ui/skeleton';

const DietItemSkeleton = ({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Skeleton className="h-10 w-full bg-white" />
        </div>
      ))}
    </>
  );
};

export default DietItemSkeleton;
