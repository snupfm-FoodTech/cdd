import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { month: '1월', total: 4000 },
    { month: '2월', total: 3000 },
    { month: '3월', total: 5000 },
    { month: '4월', total: 7000 },
    { month: '5월', total: 2000 },
    { month: '6월', total: 4000 },
    { month: '7월', total: 6000 },
    { month: '8월', total: 3000 },
    { month: '9월', total: 5000 },
    { month: '10월', total: 7000 },
    { month: '11월', total: 2000 },
    { month: '12월', total: 4000 },
];

const ChartCalculator = () => {
    return (
        <div className="rounded-xl shadow-lg bg-white p-8 relative">
            <div className="text-gray-400 text-2xl">월별 다이어트 생성 가격 통계</div>
            <div className="w-full max-w-4xl mx-auto mt-10">
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCalculator;
