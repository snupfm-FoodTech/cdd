'use client';

import { Skeleton } from '@/components/ui/skeleton';

const NutrientSkeleton = ({ count }: { count: number }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-full bg-gray-100" />
                </div>
            ))}
        </>
    );
};

export default NutrientSkeleton;
