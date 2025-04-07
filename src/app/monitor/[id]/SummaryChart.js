'use client'

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import api from "@/utils/api";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GetData = async (type, uuid) => {
  let send = { uuidMonitors: uuid, type: type };
  const response = await api.post('/calculate_24h_summary', send);
  const data = response.data;
  if (type === "server") {
    return data.map(item => ({
      cpuUsage: parseFloat(item.AvgCpu.replace('%', '')) || 0,
      ramUsage: parseFloat(item.AvgRam.replace('%', '')) || 0,
      diskUsage: parseFloat(item.AvgDisk.replace('%', '')) || 0,
      responseTime: parseFloat(item.AvgPing.replace('ms', '')) || 0,
    }));
  }
  return data.map(item => ({
    responseTime: parseFloat(item.AvgPing.replace('ms', '')) || 0
  }));
};

const UsageChart = ({ type, uuid }) => {
  const [selectedChart, setSelectedChart] = useState("responseTime");
  const [series, setSeries] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!uuid) return;
      const data = await GetData(type, uuid);
      if (selectedChart === "usage") {
        setSeries([
          { name: "CPU Usage (%)", data: data.map(d => d.cpuUsage) },
          { name: "RAM Usage (%)", data: data.map(d => d.ramUsage) },
          { name: "Disk Usage (%)", data: data.map(d => d.diskUsage) },
        ]);
      } else {
        setSeries([{ name: "Response Time (ms)", data: data.map(d => d.responseTime) }]);
      }
    };
    fetchData();
  }, [uuid, type, selectedChart]);

  let yMin = 0, yMax = 200;
  if (selectedChart !== "usage" && series.length > 0 && series[0].data.length > 0) {
    const responseTimes = series[0].data;
    yMax = Math.ceil((Math.max(...responseTimes) + 20) / 10) * 10;
    yMin = Math.floor((Math.min(...responseTimes) - 20) / 10) * 10;
  }

  const options = {
    chart: {
      height: 150,
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: selectedChart === "usage" ? [4, 4, 4] : [4],
    },
    grid: {
      borderColor: "#e5e7eb",
      padding: { top: -20, right: 0 },
    },
    xaxis: {
      categories: [
        "00:00", "02:00", "04:00", "06:00", "08:00", "10:00",
        "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"
      ],
      labels: { style: { colors: "#ffffff", fontSize: "10px" } },
    },
    yaxis: {
      min: selectedChart === "usage" ? 0 : yMin,
      max: selectedChart === "usage" ? 100 : yMax,
      tickAmount: 5,
      labels: {
        style: { colors: "#ffffff", fontSize: "10px" },
        formatter: value => (selectedChart === "usage" ? `${value}%` : `${value}ms`),
      },
    },
    tooltip: { theme: "dark" },
    legend: { labels: { colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"] } },
    colors: selectedChart === "usage" ? ["#3B82F6", "#F59E0B", "#10B981"] : ["#F59E0B"],
  };

  return (
    <div className="w-full p-4 bg-[#535C91] shadow-md rounded-lg">
      <div className="flex justify-between pl-4 pr-5 mb-4 mt-2">
        <h2 className="text-xs font-semibold">
          {selectedChart === "usage"
            ? "CPU, RAM, and Disk Usage Trend (24 Hours)"
            : "Response Time Trend (24 Hours)"}
        </h2>
        {type === "server" && (
          <button
            onClick={() =>
              setSelectedChart(selectedChart === "usage" ? "responseTime" : "usage")
            }
            className="px-4 py-1.5 bg-[#1B1A55] text-white rounded-md text-xs"
          >
            {selectedChart === "usage" ? "Show Response Time" : "Show Usage"}
          </button>
        )}
      </div>
      <Chart options={options} series={series} type="line" height={225} />
    </div>
  );
};

export default UsageChart;
