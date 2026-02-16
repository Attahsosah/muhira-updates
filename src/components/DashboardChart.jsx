"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // This ensures the component is only rendered on the client-side
});

const DashboardChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [chartSeries, setChartSeries] = useState(null);

  useEffect(() => {
    // Define the data for the bar chart
    const data = {
      series: [
        {
          name: 'Sales',
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
        },
      ],
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
      },
    };

    setChartOptions(data.options);
    setChartSeries(data.series);
  }, []);

  return (
    <div>
      {chartOptions && chartSeries && (
        <DynamicReactApexChart
        className="w-[600px]"
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
};

export default DashboardChart;
