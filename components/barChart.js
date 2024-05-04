import React from 'react';

const BarChart = ({ data }) => (
  <div className="flex justify-between items-end h-64">
    {Object.entries(data).map(([label, value]) => (
      <div key={label} className="flex flex-col items-center" style={{height: `${value * 10}px`}}>
        <div className="w-2 bg-blue-500 h-full"></div>
        <div className="text-xs mt-2">{label}</div>
        <div className="text-xs">{value}</div>
      </div>
    ))}
  </div>
);

export default BarChart;