"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const DashboardChart = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [chartSeries, setChartSeries] = useState(null);

  useEffect(() => {
    setChartSeries([
      {
        name: 'Orders',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
      },
    ]);

    setChartOptions({
      chart: {
        id: 'orders-chart',
        toolbar: { show: false },
        sparkline: { enabled: false },
        fontFamily: 'inherit',
        background: 'transparent',
      },
      colors: ['#bd8b31'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          shadeIntensity: 0.3,
          opacityFrom: 0.6,
          opacityTo: 0.05,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2.5,
      },
      grid: {
        borderColor: '#f1f5f9',
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } },
        padding: { left: 0, right: 0, top: 0, bottom: 0 },
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        labels: {
          style: { colors: '#94a3b8', fontSize: '11px', fontWeight: 600 },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8', fontSize: '11px', fontWeight: 600 },
        },
      },
      dataLabels: { enabled: false },
      markers: {
        size: 0,
        hover: { size: 5 },
      },
      tooltip: {
        theme: 'light',
        x: { show: true },
        y: {
          formatter: (val) => `${val} orders`,
        },
        marker: { show: true },
      },
    });
  }, []);

  return (
    <div className="-mx-2">
      {chartOptions && chartSeries && (
        <DynamicReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={260}
          width="100%"
        />
      )}
    </div>
  );
};

export default DashboardChart;
