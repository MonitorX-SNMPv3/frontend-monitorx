/* eslint-disable @next/next/no-img-element */
'use client'

import NavigationSidebar from "@/component/sidebar";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TableIncidents from "./table";
// import TableSection from "./table";

export default function IncidentsPage() {
  const pathname = usePathname();
  // const [ loading, setLoading ] = useState(true);
  // const [ data, setData ] = useState(null);

  // const GetData = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:5000/api/get_monitor_with_logs/");
  //     console.log("Fetched data:", response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   GetData();
  // }, []);
  
  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full">
        <div className="w-full h-full px-[50px] py-[30px] text-white">
          <h1 className="text-[24px] font-bold mb-2">Monitor Page</h1>
          <div className="flex gap-3">
            <div className="flex flex-col gap-2 w-fit bg-[#535C91] px-5 py-3 rounded-sm">
              <p className="font-medium">Incidents Total</p>
              <div className="flex gap-10">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">5</p>
                  <p className="ml-1 text-[12px] font-normal italic">24hrs</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">3</p>
                  <p className="ml-1 text-[12px] font-normal italic">7days</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">10</p>
                  <p className="ml-1 text-[12px] font-normal italic">1mon</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-fit bg-[#535C91] px-5 py-3 rounded-sm">
              <div className="font-medium flex items-start">
                MTTR
                <span className="relative ml-1 text-xs text-gray-400 cursor-pointer">
                  <div className="relative group inline-block">
                    <img src="/icon-info.svg" alt="Info" className="w-2.5 cursor-pointer" />
                    <p className="absolute left-1/2 -translate-x-1/2 mt-2 w-max px-2 py-1 text-white text-xs bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Mean Time to Resolve (MTTR) will be <br /> calculated using the total resolution time <br />
                      and the total number of incidents, <br /> and it will be stored in the HH:MM format.
                    </p>
                  </div>
                </span>
              </div>
              <div className="flex gap-10">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">02:10</p>
                  <p className="ml-1 text-[12px] font-normal italic">1days</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">33:10</p>
                  <p className="ml-1 text-[12px] font-normal italic">7days</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <TableIncidents/>
          </div>
        </div>
      </section>
    </div>
  )
}