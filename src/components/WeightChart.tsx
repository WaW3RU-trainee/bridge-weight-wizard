
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '08:00', weight: 25.2 },
  { time: '09:00', weight: 32.1 },
  { time: '10:00', weight: 28.5 },
  { time: '11:00', weight: 45.3 },
  { time: '12:00', weight: 38.7 },
  { time: '13:00', weight: 42.1 },
  { time: '14:00', weight: 35.6 },
  { time: '15:00', weight: 29.3 },
];

export const WeightChart = () => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: 'Weight (tons)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => [`${value} tons`, 'Weight']} />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
