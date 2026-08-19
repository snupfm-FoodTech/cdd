import Image from 'next/image';
import React from 'react';
import { cn } from '@/lib/utils';

interface CardLargeDashboardProps {
    title: string;
    count?: number;
    subCount?: string;
    type?: 'one' | 'two';
    img?: string;
}

const CardLargeDashboard = ({ title, count, subCount, type = 'one', img }: CardLargeDashboardProps) => {
    const renderCount = () => {
        return <div className='flex flex-col gap-2 justify-center h-36'>
            <div className="text-gray-400 text-xl">{title}</div>
            <div className={cn(
                "text-gray-400 text-3xl font-bold",
                type === 'two' && 'text-right',
            )}>{`${count}${subCount ? `${subCount}` : ''}`}</div>
        </div>
    };

    const renderImage = () => {
        if (img) {
            return <Image
                width={0}
                height={0}
                sizes="100%"
                alt='diet'
                priority
                src={img}
                style={{ width: "auto", height: "120px" }}
            />;
        } else return null;
    };

    return (
        <div className="rounded-xl shadow-lg bg-white py-6 px-8 relative">
            <div className='flex justify-between items-center'>
                {type === 'one' ? renderCount() : renderImage()}
                {type === 'one' ? renderImage() : renderCount()}
            </div>
        </div>
    );
};

export default CardLargeDashboard;
