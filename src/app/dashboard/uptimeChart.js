'use client'

import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UptimeChart = () => {
  const series = [
    {
      name: "Uptime (%)",
      data: [97.8, 94.8, 98.5, 97.0, 95.9, 100, 92.8], // Dummy data uptime
    },
    {
      name: "Downtime (%)",
      data: [2.2, 5.2, 1.5, 3.0, 4.1, 0.0, 7.2], // Dummy data downtime
    },
  ];

  const options = {
    chart: {
      height: 150,
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [4, 4],
      dashArray: [0, 4],
    },
    grid: {
      strokeDashArray: 0,
      borderColor: "#e5e7eb",
      padding: {
        top: -20,
        right: 0,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
        formatter: (value) => `${value}%`,
      },
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      labels: {
        colors: ["#FFFFFF", "#FFFFFF"],
        useSeriesColors: false,
      }
    },
    colors: ["#10B981", "#EF4444"], // Hijau untuk uptime, merah untuk downtime
  };

  return (
    <div className="w-full p-4 bg-[#535C91] shadow-md rounded-lg">
      <div className="flex justify-between pl-4 pr-5 mb-4 mt-2">
        <div className="flex place-items-center">
          <h2 className="text-lg font-semibold">Uptime/Downtime Trend (Weekly)</h2>
        </div>
        <div className="flex place-items-center">
          <button className="px-4 py-1.5 bg-[#1B1A55] flex place-items-center gap-2">
            <div className="text-sm">Uptime</div>
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white mt-1"></div>
          </button>
        </div>
      </div>
      <Chart options={options} series={series} type="line" height={225}/>
    </div>
  );
};

export default UptimeChart;
