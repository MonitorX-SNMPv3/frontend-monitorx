/* eslint-disable @next/next/no-img-element */
'use client'

import NavigationSidebar from "@/component/sidebar";
import { usePathname } from "next/navigation";
import ServerMonitorTable from "./table";
import TableSection from "./table";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function MonitorPage() {
  const pathname = usePathname();
  const [ loading, setLoading ] = useState(false);

  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
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
              <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                Monitor
              </li>
            </ol>
          </div> 

          <div className="border-1 px-5 py-2 rounded-sm mb-2 border-[#535C91] flex justify-between items-center">
            <h1 className="text-[24px] font-bold">Monitor Page</h1>
            <Link href={'/monitor/add_monitor'} className="bg-[#535C91] text-sm px-5 py-1 rounded-sm font-bold flex items-center gap-1">
              <img src="/icon-plus.svg" alt="" className="h-4"/>
              <p>Add Monitor</p>
            </Link>
          </div>
          
          {/* Card */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-fit bg-[#535C91] px-5 py-3 rounded-sm">
              <p className="font-medium">Monitor status</p>
              <div className="flex gap-10">
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
            <div className="flex flex-col gap-2 w-fit bg-[#535C91] px-5 py-3 rounded-sm">
              <p className="font-medium">24 Hours status</p>
              <div className="flex gap-10">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">90%</p>
                  <p className="ml-1 text-[12px] font-normal italic">uptime</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">2</p>
                  <p className="ml-1 text-[12px] font-normal italic">Incidents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div>
            <TableSection/>
          </div>
        </div>
      </section>
    </div>
  )
}