import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: '음식 A', value: 400, month: '1월' },
    { name: '음식 B', value: 300, month: '1월' },
    { name: '음식 C', value: 200, month: '1월' },
    { name: '음식 D', value: 278, month: '1월' },
    { name: '음식 E', value: 189, month: '1월' },
    { name: '음식 A', value: 300, month: '2월' },
    { name: '음식 B', value: 400, month: '2월' },
    { name: '음식 C', value: 100, month: '2월' },
    { name: '음식 D', value: 500, month: '2월' },
    { name: '음식 E', value: 200, month: '2월' },
];

const TopFoodsChart = () => {
    return (
        <div className="rounded-xl shadow-lg bg-white p-8 relative">
            <div className="text-gray-400 text-2xl">매달 상위 5개 음식</div>
            <div className="w-full max-w-4xl mx-auto mt-10">
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopFoodsChart;
