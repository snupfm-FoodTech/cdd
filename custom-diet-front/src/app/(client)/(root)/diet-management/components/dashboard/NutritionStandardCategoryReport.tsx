import { Skeleton } from '@/components/ui/skeleton';
import { useNutritionStandardCategoryReport } from '@/hooks/diet.hook';
import React, { useMemo } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';

const NutritionStandardCategoryReport = () => {
    const { data = [], isPending } = useNutritionStandardCategoryReport();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colors = useMemo(() => {
        if (!data) {
            return [];
        }

        return data.map(() => getRandomColor());
    }, [data]);

    if (isPending) {
        return (
            <div className="flex h-full items-center justify-center">
                <Skeleton className='w-full rounded-xl h-44 bg-white' />
            </div>
        );
    }

    return (
        <div className="rounded-xl shadow-lg bg-white p-8 relative">
            <div className="text-gray-400 text-2xl">영양 표준 범주 보고서</div>
            <div className="w-full max-w-4xl mx-auto mt-10">
                <ResponsiveContainer width="100%" height={450}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="totalDiet"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {
                                data.map((entry, index) => <Cell name={entry.standardName} key={`cell-${index}`} fill={colors[index % colors.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default NutritionStandardCategoryReport;
