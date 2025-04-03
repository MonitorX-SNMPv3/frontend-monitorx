/* eslint-disable @next/next/no-img-element */
'use client'

import NavigationSidebar from "@/component/sidebar";
import { UptimeBar } from "@/component/uptimebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SummaryChart from "./SummaryChart";
import IncidentsTableDetail from "./table";


export default function Page({ params }) {
  const [ data, setData ] = useState(null);
  const [ length, setLength ] = useState(0);
  const pathname = usePathname();
  
  const parameter = React.use(params);
  const id = parameter?.id;
  

  useEffect(()=> {
    async function fetchData() {
      const result = await getData(id);
      setData(result);
    }
    fetchData();
  }, [id]);

  // if (!data) return <h1>Item Not Found</h1>;
  
  return(
      <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px] ">
        <NavigationSidebar path={pathname}/>
        <section className="w-full flex justify-center">
          <div className="w-[1200px] h-full px-[20px] text-white">

            {/* Breadcrumb */}
            <div className="bg-[#1B1A55]/80 px-3 py-2 rounded-sm mb-2">
              <ol className="flex items-center whitespace-nowrap">
                <li className="inline-flex items-center">
                  <Link className="flex items-center text-xs font-medium text-[#535C91] hover:text-blue-600 focus:outline-hidden focus:text-blue-600" href="/">
                    Dashboard
                  </Link>
                  <svg className="shrink-0 mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </li>
                <li className="inline-flex items-center">
                  <Link className="flex items-center text-xs font-medium text-[#535C91] hover:text-blue-600 focus:outline-hidden focus:text-blue-600" href="/monitor">
                    Monitor 
                  </Link>
                  <svg className="shrink-0 mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </li>
                <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                  Detail Monitor
                </li>
              </ol>
            </div> 

            {/* Header */}
            <div className="flex border-1 px-5 py-2 justify-between rounded-sm border-[#535C91] mb-2">
              <div className="flex flex-col">
                <h1 className="text-[24px] font-bold capitalize">
                  {data ? data.hostname : `N/A` }
                </h1>
                <p className="text-xs font-regular text-white/50 mb-2">
                  IP: { data ? data.ipaddress : `N/A` }, Type: <span className="uppercase italic">{ data ? data.type : `N/A` }</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button className="rounded-full h-8 w-8 cursor-pointer bg-[#9290C3] flex items-center justify-center">
                    <img src="/icon-plus.svg" alt="" className="h-5"/>
                  </button>
                  <span className="w-[120px] text-center absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add logs manually
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <button className="bg-green-400 cursor-pointer h-fit text-xs py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10">
                    <div>Test Alert</div>
                    <img src="/icons-notification.svg" alt="" className="h-3 mt-0.5"/>
                  </button>
                  <div className="flex gap-1">
                    <button className="bg-red-400 cursor-pointer h-fit text-xs px-5  py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10">
                      <div>Pause</div>
                      <img src="/icon-paused.svg" alt="" className="h-[10px] mt-0.5"/>
                    </button>
                    <button className="bg-gray-400 cursor-pointer h-fit text-xs px-4  py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10">
                      <div>Edit</div>
                      <img src="/icon-edit.svg" alt="" className="h-[10px] mt-0.5"/>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 1: Current Status, Last Check, Last 24 Hours */}
            <div className="flex gap-2 mb-2">
              <div className="bg-[#535C91] w-[300px] rounded-sm px-5 py-4 flex justify-between place-items-center">
                <div className="flex flex-col">
                  <p className="font-regular text-sm">Status</p>
                  <p className="font-bold text-xl mr-2 text-green-400">
                    {data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? `UP` : `DOWN`}
                  </p>
                  <p className="text-sm text-gray-400 font-bold text">Uptime: {data?.logs[data.logs?.length - 1].uptime}</p>
                </div>
                <div className="pr-5">
                  <div className={`w-9 h-9 ${data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-center items-center animate-pulse`}>
                    {data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? 
                      <div className="w-0 h-0 border-l-5 border-r-5 border-b-8 border-transparent border-b-white"></div>
                      : <div className="w-0 h-0 border-l-5 border-r-5 border-t-8 border-transparent border-t-white"></div>
                    }
                  </div>
                </div>
              </div>

              <div className="bg-[#535C91] w-[300px] rounded-sm px-5 py-4 flex justify-between place-items-center">
                <div className="flex flex-col">
                  <p className="text-sm">Incidents</p>
                  <p className="font-bold text-xl text-red-400">0</p>
                  <p className="text-sm text-gray-400 font-bold text">30 Days Ago</p>
                </div>
              </div>

              <div className="bg-[#535C91] w-[300px] rounded-sm px-5 py-4 flex flex-col justify-between">
                <p className="text-sm">Lastest Uptime</p>
                { data?.logs ? <UptimeBar data={ data.logs } length={35}/> : <UptimeBar data={[]}/> }
                <p className="text-sm text-gray-400 font-bold text">0m Down</p>
              </div>
            </div>

            {/* Part 2: SLA, Last 7 Days, Last 30 Days, Last 365 Days,  */}
            { data?.type === "server" && 
              <div className="flex w-full bg-[#535C91] divide-x first:divide-none divide-gray-500 justify-around px-10 py-5 rounded-sm mb-2">
                <div className="flex flex-col w-[200px] justify-center">
                  <p className="text-xs">Response Time</p>
                  <p className="font-bold text-3xl">{data?.logs?.[data?.logs?.length-1]?.responseTime}<span className="text-xs text-gray-400 font-medium">ms</span></p>
                  <p className="font-bold text-xs text-gray-400">Average: {data?.summary?.avgping} ms<span></span></p>
                </div>
                <div className="flex flex-col w-[200px] justify-center">
                  <p className="text-xs">CPU Usage</p>
                  <p className="font-bold text-3xl">{data?.logs?.[data?.logs?.length-1]?.cpuUsage.replace('%', '')}<span className="text-xs text-gray-400 font-medium">%</span></p>
                  <p className="font-bold text-xs text-gray-400">Average: {data?.summary?.avgcpu}%</p>
                </div>
                <div className="flex flex-col w-[200px] justify-center">
                  <p className="text-xs">Disk Usage</p>
                  <p className="font-bold text-3xl">{data?.logs?.[data?.logs?.length-1]?.diskUsage.replace('%', '')}<span className="text-xs text-gray-400 font-medium">%</span></p>
                  <p className="font-bold text-xs text-gray-400">Average: {data?.summary?.avgdisk}%</p>
                </div>
                <div className="flex flex-col w-[200px] justify-center">
                  <p className="text-xs">RAM Usage</p>
                  <p className="font-bold text-3xl">{data?.logs?.[data?.logs?.length-1]?.ramUsage.replace('%', '')}<span className="text-xs text-gray-400 font-medium">%</span></p>
                  <p className="font-bold text-xs text-gray-400">Average: {data?.summary?.avgram}%</p>
                </div>
              </div>
            }

            {/* Part 3: Graph,  */}
            <SummaryChart type={data?.type}/>

            {/* Part 4: Insident Table */}
            <IncidentsTableDetail data = {data}/>
          </div>
        </section>
      </div>
  );
}

async function getData(id) {
  const res = await fetch(`http://127.0.0.1:5000/api/get_monitor_with_logs/`);
  
  const items = await res.json();
  return items.find(item => item.uuidMonitors === id);
}
