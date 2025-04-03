'use client'

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const GetData = async () => {
  // Simulasi data untuk 24 jam, diambil setiap 2 jam
  let data = [
    { cpuUsage: "50%", ramUsage: "70%", diskUsage: "N/A", responseTime: "120ms" },
    { cpuUsage: "65%", ramUsage: "80%", diskUsage: "40%", responseTime: "140ms" },
    { cpuUsage: "N/A", ramUsage: "60%", diskUsage: "35%", responseTime: "110ms" },
    { cpuUsage: "80%", ramUsage: "N/A", diskUsage: "50%", responseTime: "130ms" },
    { cpuUsage: "55%", ramUsage: "75%", diskUsage: "N/A", responseTime: "125ms" },
    { cpuUsage: "70%", ramUsage: "65%", diskUsage: "45%", responseTime: "135ms" },
    { cpuUsage: "90%", ramUsage: "85%", diskUsage: "55%", responseTime: "145ms" },
    { cpuUsage: "60%", ramUsage: "78%", diskUsage: "42%", responseTime: "100ms" },
    { cpuUsage: "72%", ramUsage: "67%", diskUsage: "48%", responseTime: "95ms" },
    { cpuUsage: "85%", ramUsage: "88%", diskUsage: "52%", responseTime: "110ms" },
    { cpuUsage: "78%", ramUsage: "79%", diskUsage: "49%", responseTime: "105ms" },
    { cpuUsage: "66%", ramUsage: "72%", diskUsage: "51%", responseTime: "98ms" },
  ];

  // Membersihkan data (mengubah "N/A" menjadi 0 dan mengonversi ke angka)
  return data.map((item) => ({
    cpuUsage: parseFloat(item.cpuUsage.replace('%', '')) || 0,
    ramUsage: parseFloat(item.ramUsage.replace('%', '')) || 0,
    diskUsage: parseFloat(item.diskUsage.replace('%', '')) || 0,
    responseTime: parseFloat(item.responseTime.replace('ms', '')) || 0,
  }));
};

const UsageChart = ({ type }) => {
  const [selectedChart, setSelectedChart] = useState("responseTime");
  const [series, setSeries] = useState([]);
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetData();
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
  }, [selectedChart]);

  const options = {
    chart: {
      height: 150,
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: [4, 4, 4],
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
      labels: {
        style: { colors: "#ffffff", fontSize: "10px" },
      },
    },
    yaxis: {
      min: 0,
      max: selectedChart === "usage" ? 100 : 200,
      tickAmount: 5,
      labels: {
        style: { colors: "#ffffff", fontSize: "10px" },
        formatter: (value) => (selectedChart === "usage" ? `${value}%` : `${value}ms`),
      },
    },
    tooltip: { theme: "dark" },
    legend: { labels: { colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"] } },
    colors: selectedChart === "usage" ? ["#3B82F6", "#F59E0B", "#10B981"] : ["#F59E0B"],
  };

  return (
    <div className="w-full p-4 bg-[#535C91] shadow-md rounded-lg">
      <div className="flex justify-between pl-4 pr-5 mb-4 mt-2">
        <h2 className="text-xs font-semibold ">{selectedChart === "usage" ? "CPU, RAM, and Disk Usage Trend (24 Hours)" : "Response Time Trend (24 Hours)"}</h2>
        { type === "server" &&
          <button 
          onClick={() => setSelectedChart(selectedChart === "usage" ? "responseTime" : "usage")}
          className="px-4 py-1.5 bg-[#1B1A55] text-white rounded-md text-xs"
          >
            {selectedChart === "usage" ? "Show Response Time" : "Show Usage"}
          </button>
        }
      </div>
      <Chart options={options} series={series} type="line" height={225} />
    </div>
  );
};

export default UsageChart;
