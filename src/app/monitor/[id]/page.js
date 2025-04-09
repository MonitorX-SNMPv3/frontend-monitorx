/* eslint-disable @next/next/no-img-element */
'use client'

import { UptimeBar } from "@/component/uptimebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SummaryChart from "./SummaryChart";
import IncidentsTableDetail from "./table";
import api from "@/utils/api";
import { toast } from "react-toastify";


export default function Page({ params }) {
  const [ data, setData ] = useState(null);
  const [ length, setLength ] = useState(0);
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const parameter = React.use(params);
  const id = parameter?.id;
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/me');
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  useEffect(()=> {
    async function fetchData() {
      const result = await getData(id);
      setData(result);
    }
    fetchData();
  }, [id]);

  const handleButtonStart = async () => {
    try {
      const attribute = {
        uuid: data.uuidMonitors,
        type: data.type,
      };

      const res = await api.patch('/start_monitor', attribute);

      if (res.status === 200){
        toast.success(res.data.msg);
        setData(prev => ({
          ...prev,
          running: "STARTED"
        }));
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Network error or server not responding.");
        console.log('Start', error);
        
      }
    }
  }

  const handleButtonPause = async () => {
    try {
      const attribute = {
        uuid: data.uuidMonitors,
        type: data.type,
      };

      const res = await api.patch('/pause_monitor', attribute);
      if (res.status === 200){
        toast.success(res.data.msg);
        setData(prev => ({
          ...prev,
          running: "PAUSED"
        }));
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Network error or server not responding.");
        console.log('Pause', error);
        
      }
    } 
  }

  const handleButtonExport = async () => {
    const toastprop = toast.loading("Loading...");
  
    try {
      const attribute = {
        uuid: data.uuidMonitors,
      };
  
      let res = null;
  
      switch (data?.type) {
        case "devices":
          res = await api.post('/monitor_devices_pdf', attribute, { responseType: 'blob' });
          break;
        case "https":
          res = await api.post('/monitor_https_pdf', attribute, { responseType: 'blob' });
          break;
        case "ports":
          res = await api.post('/monitor_ports_pdf', attribute, { responseType: 'blob' });
          break;
        default:
          throw new Error("Unknown monitor type.");
      }
  
      if (!res) throw new Error("No response from export endpoint.");
  
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
  
      const contentDisposition = res.headers['content-disposition'];
      const filename = contentDisposition?.split('filename=')[1] || 'monitor-summary.pdf';
  
      link.setAttribute('download', filename.replace(/['"]/g, ''));
      document.body.appendChild(link);
      link.click();
      link.remove();
  
      toast.update(toastprop, {
        render: "Export summary success.",
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });
    } catch (error) {
      toast.update(toastprop, {
        render: error?.response?.data?.msg || error.message || "Failed to export summary.",
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  };
  
  

  const handdleButtonTestAlert = async () => {
    try {
      const attribute = {
        uuidUsers: user.uuidUsers,
        uuidMonitors: data.uuidMonitors,
        type: data.type
      };

      setLoading(true);

      const res = await api.post('/test_alert', attribute);
      
      if ( res.data ) {
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (error) {
      if ( error.response ){
        toast.error(error.response.data.msg)
        setLoading(false);
      }
    }
  }

  const handleTriggerButton = async () => {
    const toastprop = toast.loading("Loading...");
    try {
      if ( data?.type === "devices" ) {
        const attribute = {
          uuidDevices: data.uuidMonitors
        };
        const res = await api.post('/add_logs_devices', attribute);
        toast.update(toastprop, {
          render: "Triggering Logs Devices Success.",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      } else if ( data?.type === "ports" ){
        const attribute = {
          uuidPorts: data.uuidMonitors
        };
        const res = await api.post('/add_logs_ports', attribute);
        toast.update(toastprop, {
          render: "Triggering Logs Ports Success.",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      } else if ( data?.type === "https" ){
        const attribute = {
          uuidHTTPs: data.uuidMonitors
        };
        const res = await api.post('/add_logs_http', attribute);
        toast.update(toastprop, {
          render: "Triggering Logs HTTPs Success.",
          type: "success",
          isLoading: false,
          autoClose: 2500,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.update(toastprop, {
          render: error.response.data.msg ,
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        toast.update(toastprop, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
        
      }
    } 
  }

  return(
      <div className="min-h-[100vh] w-full flex p-[21px]">
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
                  <button onClick={() => handleTriggerButton()} className="rounded-full h-8 w-8 cursor-pointer bg-[#9290C3] flex items-center justify-center">
                    <img src="/icon-plus.svg" alt="" className="h-5" />
                  </button>
                  <span className="w-[140px] text-center absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Trigger Logs Manually
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-1">
                    <Link href={`/monitor/edit_monitor/${data?.uuidMonitors}`} className="bg-blue-400 cursor-pointer h-fit text-xs px-5 py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10">
                      <div>Edit</div>
                      <img src="/icon-edit.svg" alt="" className="h-[10px] mt-0.5"/>
                    </Link>
                    <button 
                      onClick={handleButtonExport}
                      className="bg-[#1B1ABB] cursor-pointer h-fit text-xs px-4  py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10"
                    >
                      <div>Export Summary</div>
                      <img src="/icon-download.svg" alt="" className="h-[13px] mt-0.5"/>
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={data?.running === "PAUSED" ? handleButtonStart : handleButtonPause}
                      className="bg-red-400 cursor-pointer h-fit text-xs px-8  py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10"
                    >
                      <div>{data?.running === "PAUSED" ? 'Start' : 'Pause'}</div>
                      <img
                        src={data?.running === "PAUSED" ? "/icon-start.svg" : "/icon-paused.svg"}
                        alt=""
                        className={`${data?.running === "PAUSED" ? 'h-[13px]' : 'h-[10px]'} mt-0.5`}
                      />
                    </button>
                    <button 
                      onClick={handdleButtonTestAlert} 
                      className={`${ loading ? 'px-[46px]' : 'px-5'} bg-green-400 cursor-pointer h-fit text-xs py-1.5 rounded-sm flex justify-center place-items-center gap-1 hover:bg-white/10`}
                    >
                      <div>
                        { loading ? 
                        <div className="animate-spin inline-block size-3 border-3 border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                          <span className="sr-only">Loading...</span>
                        </div> : 'Test Alert'
                        }
                      </div>
                      { !loading && <img src="/icons-notification.svg" alt="" className="h-3 mt-0.5"/> }
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
                  <p className={`font-bold text-xl mr-2 ${data?.running === "PAUSED" ? 'text-white' : data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? 'text-green-400' : 'text-red-400'}`}>
                    { data?.running === "PAUSED" ? 'PAUSED' : data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? `UP` : `DOWN`}
                  </p>
                  <p className="text-sm text-gray-400 font-bold text">Uptime: {data?.logs[data.logs?.length - 1]?.uptime}</p>
                </div>
                <div className="pr-5">
                  <div className={`w-9 h-9 ${data?.logs?.[data.logs?.length - 1]?.status === 'UP' || data?.logs?.length === 0 ? 'bg-green-400 animate-pulse-green' : 'bg-red-400 animate-pulse-red'} rounded-full flex justify-center items-center`}>
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
            { data?.type === "devices" && 
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
            <SummaryChart type={data?.type} uuid={data?.uuidMonitors}/>

            {/* Part 4: Insident Table */}
            <IncidentsTableDetail uuid={data?.uuidMonitors} type={data?.type}/>
          </div>
        </section>
      </div>
  );
}

async function getData(id) {
  const res = await api.get("/get_monitor_with_logs/");
  
  const items = res.data;
  return items.find(item => item.uuidMonitors === id);
}

