'use client'

import { UptimeBar } from "@/component/uptimebar";
import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
const TableDashboard = () => {
  const [ data, setData ] = useState([]); 
  const [ loading, setLoading ] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get("/get_monitor_with_logs");
      setData(response.data.slice(-2));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=> {
      getData();
  }, []);

  return (
    <div className="w-full rounded-lg">
      {/* Table */}
      <section className="overflow-hidden">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead className="bg-[#1B1A55]">
            <tr>
              <th className="px-6 py-6 text-start text-xs font-medium text-white uppercase rounded-l-sm">Hostname</th>
              <th className="px-6 py-6 text-center text-xs font-medium text-white uppercase">Status</th>
              <th className="px-6 py-6 text-center text-xs font-medium text-white uppercase">Uptime</th>
              <th className="px-6 py-6 text-end text-xs font-medium text-white uppercase rounded-r-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            { loading ? [...Array(2)].map((_, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#9290C3]/50' : 'bg-[#535C91]/50'} hover:bg-white/10`}>
                <td colSpan={6} className="px-6 py-4 rounded-sm h-[55px] items-center"><div className="loader h-1.5 rounded-full"></div></td>
              </tr>
              )) :
              data.length > 0 ? (data.map((item, index) => (
                <tr key={item.uuidMonitors} className={`${index % 2 === 0 ? 'bg-[#9290C3]/50' : 'bg-[#535C91]/50'} hover:bg-white/10`}>
                  <td className="px-6 py-4 text-start text-xs font-medium text-white rounded-l-sm">
                    <p className="text-sm capitalize">{item.hostname}</p>
                    <p className="text-xs text-gray-400">{item.ipaddress}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-white place-items-center">
                    <div className={`flex items-center gap-2 ${item.running === "PAUSED" ? 'pl-3' : ''}`}>
                      <div className={
                        `${item.running === 'PAUSED' 
                            ? 'bg-gray-400 animate-pulse-gray' 
                            : item.logs[item.logs?.length - 1]?.status === 'UP' || item.logs.length === 0 
                              ? 'bg-green-400 animate-pulse-green' 
                              : 'bg-red-400 animate-pulse-red'
                        } w-6 h-6 rounded-full flex justify-center items-center`
                      }>
                        {item.running === 'PAUSED' ? (
                          <div className="w-2 h-2 bg-white mx-[1px] rounded-sm flex gap-1">
                            <div className="w-[2px] h-full bg-white" />
                            <div className="w-[2px] h-full bg-white" />
                          </div>
                        ) : item.logs[item.logs?.length - 1]?.status === 'UP' || item.logs.length === 0 ? (
                          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
                        ) : (
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">{item.running === "PAUSED" ? 'PAUSED' : item.logs[item.logs?.length - 1]?.status }</p>
                        <p className="text-xs text-gray-400">
                          {item.running === "PAUSED" ? 'Last Ping' : 'Ping'}: {item.logs[item.logs?.length - 1]?.responseTime ? `${item.logs[item.logs?.length - 1].responseTime}ms`  : `N/A`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 place-items-center text-center text-xs font-medium text-white uppercase">
                    <UptimeBar data={item.logs}/>
                    <p>{item.logs[item.logs?.length - 1]?.uptime ? item.logs?.[item.logs?.length - 1].uptime : 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                    <Link key={item.uuidMonitors} href={`/monitor/${item.uuidMonitors}`} className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm cursor-pointer">
                      <img src="/icon-info.svg" alt="" className="h-[14px]"/>
                      <p>Detail</p>
                    </Link>
                    <button className="bg-[#F65D60] p-1.5 rounded-sm ml-[3px] cursor-pointer">
                      <img src="/icon-trash.svg" alt="" className="h-[15px]"/>
                    </button>
                  </td>
                </tr>
              )))              
              : 
              <tr>
                <td colSpan="4" className="bg-[#9290C3]/50 rounded-sm text-center text-white py-5">No results found</td>
              </tr>
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default TableDashboard;