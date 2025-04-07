'use client'

import api from "@/utils/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function DetailIncidents({ params }) {
  const [ data, setData ] = useState(null);

  const router = useRouter();
  const parameter = React.use(params);
  const id = parameter?.id;
  
  useEffect(()=> {
    async function fetchData() {
      const result = await getData(id);
      setData(result);
    }
    fetchData();
    
  }, [id]);

  return(
    <div className="min-h-[100vh] flex p-[21px]">
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
                <Link className="flex items-center text-xs font-medium text-[#535C91] hover:text-blue-600 focus:outline-hidden focus:text-blue-600" href="/incidents">
                  Incidents
                </Link>
                <svg className="shrink-0 mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                Detail Incidents
              </li>
            </ol>
          </div> 

          {/* Header */}
          <div className="flex border-1 px-5 py-2 justify-between rounded-sm border-[#535C91] mb-2">
              <div className="flex flex-col">
                <h1 className="text-[24px] font-bold capitalize">
                  {data ? `${data.status} Incidents for ${data.monitor[0]?.hostname}` : `N/A` }
                </h1>
                <p className="text-xs font-regular text-white/50 mb-2">
                  IP: { data ? data.monitor[0]?.ipaddress : `N/A` }, Type: <span className="uppercase italic">{ data ? data.type : `N/A` }</span>
                </p>
              </div>
            </div>

          {/* Part 1: Card Status and Duration */}
          <div className="flex items-center gap-2">
            <div className="flex items-center w-full bg-[#1B1A55] px-5 py-[18px] rounded-sm gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Root Cause</p>
                <p className={`text-red-400 font-bold text-xl leading-3 mb-4`}>
                  {data ? data?.rootcause : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center w-full bg-[#1B1A55] px-5 py-3 rounded-sm gap-5">
              <div className={`h-8 w-8 rounded-full ${ data?.status === "Ongoing" ? 'bg-red-400 animate-pulse-red' : 'bg-green-400 animate-pulse-green' }`}></div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Status</p>
                <p className={`${data?.status === "Ongoing" ? 'text-red-400' : 'text-green-400' } font-bold text-xl leading-3 mb-1`}>
                  {data ? data?.status : 'N/A'}
                </p>
                <p className="text-xs font-semibold text-gray-400">
                  Started: { data ? data?.started : 'N/A' }
                </p>
              </div>
            </div>
            <div className="flex items-center w-full bg-[#1B1A55] px-5 py-3 rounded-sm gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Duration</p>
                <p className={`${data?.status === "Ongoing" ? 'text-red-400' : 'text-green-400' } font-bold text-xl leading-3 mb-1`}>
                  {data ? data?.duration : 'N/A'}
                </p>
                <p className="text-xs font-semibold text-gray-400">
                  Started: { data ? data?.resolved : 'N/A' }
                </p>
              </div>
            </div>
          </div>

          <div className="relative bg-[#1B1A55] px-5 py-5 w-full rounded-sm mt-2 h-[400px]">
            <h1 className="text-xl mb-3 font-bold pl-2">Activity Logs</h1>
            <hr className="w-full border-gray-600"/>

            {data?.activity?.map((item, index) => (
              <div 
              key={item.uuidActivity || index} 
              className="relative pl-10 py-3 flex items-center"
              >
                {/* Lingkaran penanda di garis vertikal */}
                <div className="absolute left-1 w-4 h-4">
                  <div className="relative">
                    <div className="absolute left-1 -top-1 w-6 h-6 bg-[#535C91] rounded-full text-white font-bold flex justify-center">{index + 1}</div>
                    {index < data.activity.length - 1 && (
                      <div className="absolute left-[15px] top-6 bottom-0 bg-[#535C91] w-[3px] h-4 rounded-full"></div>
                    )}
                  </div>
                </div>
                
                {/* Bagian teks (description) */}
                <div className="text-white">
                  {item.description}
                </div>
                
                {/* Bagian waktu (date) di sisi kanan */}
                <div className="ml-auto text-white">
                  {new Date(new Date(item.createdAt).getTime() + (7 * 60 * 60 * 1000)).toUTCString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


async function getData(id) {
  const res = await api.get("/get_all_incidents");
  
  const items = res.data;
  return items.find(item => item.uuidIncidents === id);
}