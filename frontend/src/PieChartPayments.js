import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const data = [
  { name: 'Paid', value: 10 },
  { name: 'Not Paid', value: 3 },

];

const COLORS = ['#0088FE', '#e42b2b'];

function MyPieChart() {
  return (
    <PieChart width={400} height={100} style={{ marginTop: '0px' }}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={50}
        dataKey="value"
        nameKey="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
        <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
            paddingTop: '20px',
            paddingRight: '20px',
            fontSize: '12px',
            color: '#000',
            }}/>
    </PieChart>
  );
}

export default MyPieChart;
