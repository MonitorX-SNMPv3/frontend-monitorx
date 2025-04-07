'use client'
import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UptimeChart = ({ data }) => {
  const hasData = data && data.length > 0;

  const categories = hasData
    ? data.map(item => item.day.charAt(0).toUpperCase() + item.day.slice(1))
    : [];
  const uptimeData = hasData ? data.map(item => item.uptimePercent.toFixed(2)) : [];
  const downtimeData = hasData ? data.map(item => item.downtimePercent.toFixed(2)) : [];

  const series = [
    { name: "Uptime (%)", data: uptimeData },
    { name: "Downtime (%)", data: downtimeData },
  ];

  const options = {
    chart: {
      height: 150,
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: [4, 4],
      dashArray: [0, 4],
    },
    grid: {
      strokeDashArray: 0,
      borderColor: "#e5e7eb",
      padding: { top: -20, right: 0 },
    },
    xaxis: {
      type: "category",
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        offsetY: 5,
        style: {
          colors: "#ffffff",
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      min: -10,
      max: 110,
      tickAmount: 4,
      labels: {
        align: "left",
        minWidth: 0,
        maxWidth: 140,
        style: {
          colors: "#ffffff",
          fontSize: "12px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
        formatter: value => `${value}%`,
      },
    },
    tooltip: { theme: "dark" },
    legend: {
      labels: {
        colors: ["#FFFFFF", "#FFFFFF"],
        useSeriesColors: false,
      },
    },
    colors: ["#10B981", "#EF4444"],
  };

  return (
    <div className="w-full p-4 bg-[#535C91] shadow-md rounded-lg relative">
      <div className="flex justify-between pl-4 pr-5 mb-4 mt-2">
        <div className="flex place-items-center">
          <h2 className="text-lg font-semibold">Uptime/Downtime Trend (Weekly)</h2>
        </div>
      </div>
      <div>
        <Chart options={options} series={series} type="line" height={225} />
      </div>
    </div>
  );
};

export default UptimeChart;
