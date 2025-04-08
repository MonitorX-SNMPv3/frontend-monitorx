/* eslint-disable @next/next/no-img-element */
'use client'

import LineChart from "@/app/dashboard/uptimeChart";
import { checkAuth, fetchUser } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UptimeChart from "@/app/dashboard/uptimeChart";
import TableLoading from "@/component/tableload";
import TableDashboard from "./dashboard/tableDashboard";
import Link from "next/link";
import jwt from "jsonwebtoken";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ statusCount, setStatusCount ] = useState(null);
  const [ incidentsCount, setIncidentsCount ] = useState(null);
  const [ responseTimeAvg, setResponseTimeAvg ] = useState(null);
  const [ slaPercent, setSlaPercent ] = useState(null);
  const [ percentWeek, setPercentWeek ] = useState(null);

  useEffect(() => {
    const GetStatusCount = async () => {
      try {
        const response = await api.get('/get_monitor_status_count');
        setStatusCount(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      }
    }
    GetStatusCount();
  }, [])
  
  useEffect(() => {
    const GetIncidentsCount = async () => {
      try {
        const response = await api.get('/get_incidents_count');
        setIncidentsCount(response.data);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      }
    }
    GetIncidentsCount();
  }, []);
  
  useEffect(() => {
    const GetAvgResponseTime = async () => {
      try {
        const response = await api.get('/avg_response_time');
        setResponseTimeAvg(response.data);        
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      }
    }
    GetAvgResponseTime();
  }, []);
  
  useEffect(() => {
    const GetGlobalCalculate = async () => {
      try {
        const response = await api.get('/calculate_global_sla_24h');
        setSlaPercent(response.data);        
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      }
    }
    GetGlobalCalculate();
  }, []);
  
  useEffect(() => {
    const GetWeeklyPercent = async () => {
      try {
        const response = await api.get('/calculate_weekly_sla');
        setPercentWeek(response.data);        
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      }
    }
    GetWeeklyPercent();
  }, []);


  useEffect(() => {
    const checkUser = async () => {
      try {
        // Panggil endpoint /me untuk verifikasi user
        const response = await api.get('/me');
        setUser(response.data.user);
      } catch (error) {
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);


  return (
    <div className="min-h-[100vh] w-full flex p-[21px]">
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

          <div className="border-1 px-5 py-2 rounded-sm mb-2 border-[#535C91] flex justify-between items-center">
            <h1 className="text-[24px] font-bold">Dashboard</h1>
            <Link href={'/monitor/add_monitor'} className="bg-[#535C91] text-sm px-5 py-1 rounded-sm font-bold flex items-center gap-1">
              <img src="/icon-plus.svg" alt="" className="h-4"/>
              <p>Add Monitor</p>
            </Link>
          </div>
          {/* 
            - Grafik Line untuk perbandingan uptime/downtime
            - Grafik Average Disk, Ram, dan CPU Usage
            - Grafik Average Ping Uptime
          */}

          {/* Summary Card */}
          <div className="flex gap-3">
            {/* Monitors Card */}
            <div className="w-full   bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Monitors</p>
              </div>
              <div className="flex justify-evenly">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">{statusCount ? statusCount[0].total : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic">up</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">{statusCount ? statusCount[1].total : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic">down</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold">{statusCount ? statusCount[2].total : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic">paused</p>
                </div>
              </div>
            </div>

            {/* Incidents Card */}
            <div className="w-full   bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Incidents</p>
              </div>
              <div className="flex justify-evenly">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">{incidentsCount ? incidentsCount.h24 : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">24h</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">{incidentsCount ? incidentsCount.h72 : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">72h</p>
                </div>
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-red-400">{incidentsCount ? incidentsCount.h128 : '0'}</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">168h</p>
                </div>
              </div>
            </div>
            
            {/* Average Response Time */}
            <div className="w-full   bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">Average Response</p>
              </div>
              <div className="flex gap-5">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">{responseTimeAvg ? responseTimeAvg.lowestResponseTime : 'N/A'}<span className={ responseTimeAvg ? 'text-xs' : 'hidden'}>ms</span></p>
                  <img src="/icon-rocket.svg" alt="" className="w-3 invert ml-1"/>
                </div>
                <div className="flex place-items-center">
                  <p className="text-[28px] font-bold text-red-400">{responseTimeAvg ? responseTimeAvg.highestResponseTime : 'N/A'}<span className={ responseTimeAvg ? 'text-xs' : 'hidden'}>ms</span></p>
                  <div className="brightness-125"><img src="/icon-turtle.svg" alt="" className="w-4 mt-2.5 invert ml-1"/></div>
                </div>
              </div>
            </div>

            {/* Average Uptime */}
            <div className="w-full   bg-[#535C91] flex flex-col gap-4 px-5 py-4 rounded-sm">
              <div className="flex place-items-center gap-2">
                <div className="bg-[#1B1A55] p-1.5 rounded-lg">
                  <img src="/icon-dashboard1.svg" alt="" className="w-5"/>
                </div>
                <p className="text-sm">SLA Percentage</p>
              </div>
              <div className="flex gap-5">
                <div className="flex items-baseline">
                  <p className="text-[28px] font-bold text-green-400">{ slaPercent ? slaPercent.globalSLA.toFixed(2) : 'N/A'}%</p>
                  <p className="ml-1 text-[12px] font-normal italic text-gray-300">24hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Graph, it can be changed by clicking the button*/}
          <div className="mt-4 w-full">
            <UptimeChart data={percentWeek}/>
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