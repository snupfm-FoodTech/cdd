import { Skeleton } from '@/components/ui/skeleton';
import { useDietReportsMonthlyPrice } from '@/hooks/diet.hook';
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DietReportsMonthlyPriceChart = () => {
    const { data, isPending } = useDietReportsMonthlyPrice();

    const sortedData = useMemo(() => {
        if (!data) {
            return [];
        }

        return [...data].sort((a, b) => {
            if (typeof a.yearMonth !== 'string' || typeof b.yearMonth !== 'string') {
                return 0;
            }

            const [yearA, monthA] = a.yearMonth.split('-').map(Number);
            const [yearB, monthB] = b.yearMonth.split('-').map(Number);

            if (!yearA || !monthA || !yearB || !monthB) {
                return 0;
            }

            if (yearA !== yearB) {
                return yearA - yearB;
            } else {
                return monthA - monthB;
            }
        });
    }, [data]);

    if (isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Skeleton className='w-full rounded-xl h-44 bg-white' />
            </div>
        );
    }

    if (!sortedData) return null;

    return (
        <div className="rounded-xl shadow-lg bg-white py-8 px-4 relative">
            <div className="text-gray-400 text-2xl">다이어트 리포트 월별 가격 차트</div>
            <div className="w-full max-w-4xl mx-auto mt-10">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={Array.isArray(sortedData) ? sortedData : []}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="yearMonth" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalPrice" fill="#8884d8" name="총 가격" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DietReportsMonthlyPriceChart;