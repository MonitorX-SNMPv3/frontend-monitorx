'use client'

import NavigationSidebar from "@/component/sidebar";
import { usePathname } from "next/navigation";
import ServerMonitorTable from "./table";
import TableSection from "./table";
import { useEffect, useState } from "react";

export default function MonitorPage() {
  const pathname = usePathname();
  const [ loading, setLoading ] = useState(false);

  const uptimeData = [
    { responseTime: "21ms", timeRange: "08:30 - 08:35", status: "UP" },
    { responseTime: "12ms", timeRange: "08:35 - 08:40", status: "UP" },
    { responseTime: "5ms", timeRange: "08:40 - 08:45", status: "DOWN" },
    { responseTime: "7ms", timeRange: "08:45 - 08:50", status: "UP" },
    { responseTime: "88ms", timeRange: "08:50 - 08:55", status: "UP" },
    { responseTime: "N/A", timeRange: "08:55 - 09:00", status: "DOWN" },
    { responseTime: "1003ms", timeRange: "09:00 - 09:05", status: "UP" },
    { responseTime: "1002ms", timeRange: "09:05 - 09:10", status: "UP" },
    { responseTime: "2012ms", timeRange: "09:10 - 09:15", status: "UP" },
    { responseTime: "25ms", timeRange: "09:15 - 09:20", status: "UP" },
    { responseTime: "N/A", timeRange: "09:20 - 09:25", status: "DOWN" },
    { responseTime: "35ms", timeRange: "09:25 - 09:30", status: "UP" },
    { responseTime: "5ms", timeRange: "09:30 - 09:35", status: "UP" },
    { responseTime: "10ms", timeRange: "09:35 - 09:40", status: "UP" },
    { responseTime: "2ms", timeRange: "09:40 - 09:45", status: "UP" },
    { responseTime: "N/A", timeRange: "09:45 - 09:50", status: "DOWN" },
    { responseTime: "N/A", timeRange: "09:50 - 09:55", status: "DOWN" },
    { responseTime: "N/A", timeRange: "09:55 - 10:00", status: "DOWN" },
  ];

  const testData = [
    { uuidMonitors: "123", hostname: "Test Server 1", ipaddress: "http://www.google.com/", type: "HTTP", responseTime: "22ms", status: "UP", uptime: uptimeData },
    { uuidMonitors: "124", hostname: "Test Server 2", ipaddress: "54.22.7.243", type: "Server", responseTime: "25ms", status: "UP", uptime: uptimeData },
    { uuidMonitors: "125", hostname: "Test Server 2", ipaddress: "192.168.0.1", type: "Port", responseTime: "24ms", status: "UP", uptime: uptimeData },
  ];

  useEffect(() => {
    console.log(`Test Data: ${testData[0]}`);
  }, [])

  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full">
        <div className="w-full h-full px-[50px] py-[30px] text-white">
          <h1 className="text-[24px] font-bold mb-2">Monitor Page</h1>
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
          <div>
            <TableSection/>
          </div>
        </div>
      </section>
    </div>
  )
}