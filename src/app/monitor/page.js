'use client'

import NavigationSidebar from "@/component/sidebar";
import { usePathname } from "next/navigation";
import ServerMonitorTable from "./table";
import TableSection from "./table";

export default function MonitorPage() {
  const pathname = usePathname();
  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full">
        <div className="w-full h-full px-[50px] py-[30px] text-white">
          <h1 className="text-[24px]">Monitor Page</h1>
          <div className="flex gap-5">
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