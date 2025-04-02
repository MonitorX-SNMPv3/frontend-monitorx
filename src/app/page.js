/* eslint-disable @next/next/no-img-element */
'use client'

import LineChart from "@/app/dashboard/uptimeChart";
import NavigationSidebar from "@/component/sidebar";
import { checkAuth, fetchUser } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UptimeChart from "@/app/dashboard/uptimeChart";
import TableLoading from "@/component/tableload";
import TableDashboard from "./dashboard/tableDashboard";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full flex justify-center">
        <div className="w-[1200px] h-full px-[20px] text-white">
          {/* Breadcrumb */}
          <div className="bg-[#1B1A55]/80 px-3 py-2 rounded-sm mb-2">
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                Dashboard
              </li>
            </ol>
          </div> 

          <div className="border-1 px-5 py-2 rounded-sm mb-2 border-[#535C91]">
            <h1 className="text-[24px] font-bold">Dashboard</h1>
          </div>
          {/* 
            - Grafik Line untuk perbandingan uptime/downtime
            - Grafik Average Disk, Ram, dan CPU Usage
            - Grafik Average Ping Uptime
          */}

          {/* Summary Card */}
          <div className="flex gap-3">
            {/* Monitors Card */}
            <div className="w-[265px] bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Monitors</p>
              </div>
              <div className="flex justify-evenly">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic">up</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic">down</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold">5</p>
                  <p className="ml-1 text-[12px] font-normal italic">paused</p>
                </div>
              </div>
            </div>

            {/* Incidents Card */}
            <div className="w-[265px] bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Incidents</p>
              </div>
              <div className="flex justify-evenly">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">24h</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">72h</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">168h</p>
                </div>
              </div>
            </div>
            
            {/* Average Response Time */}
            <div className="w-[265px] bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Average Response</p>
              </div>
              <div className="flex gap-5">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">25<span className="text-sm">ms</span></p>
                  <img src="/icon-rocket.svg" alt="" className="w-3 invert ml-1"/>
                </div>
                <div className="flex place-items-center">
                  <p className="text-[28px] font-bold text-red-400">155<span className="text-sm">ms</span></p>
                  <div className="brightness-125"><img src="/icon-turtle.svg" alt="" className="w-4 mt-2.5 invert ml-1"/></div>
                </div>
              </div>
            </div>

            {/* Average Uptime */}
            <div className="w-[265px] bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Average Uptime</p>
              </div>
              <div className="flex gap-5">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">99.55%</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">in 7days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graph, it can be changed by clicking the button*/}
          <div className="mt-4 w-[1100px]">
            <UptimeChart/>
          </div>

          {/* Table */}
          <div className="mt-4">
            <TableDashboard/>
          </div>

        </div>
      </section>
    </div>
  );
};