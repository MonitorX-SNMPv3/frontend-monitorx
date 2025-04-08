'use client'

import { SendAddData } from "@/services/monitorServices";
import api from "@/utils/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddMonitor() {
  const router = useRouter();
  const [ uuidUsers, setUuidUsers ] = useState(null);

  const [ selectedMonitor, setSelectedMonitor ] = useState("HTTP");
  const [ protocol, setProtocol ] = useState("TCP");
  const [ checkTime, setCheckTime ] = useState(3); 
  const [ hostname, setHostname ] = useState(null);
  const [ ipaddress, setIpaddress ] = useState(null);
  const [ ports, setPorts ] = useState(null);
  const [ username, setUsername ] = useState(null);
  const [ authkey, setAuthKey ] = useState(null);
  const [ privkey, setPrivKey ] = useState(null);
  const [ emailChecked, setEmailChecked ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  
  const [ modalOpen, setModalOpen ] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.get('/me');
        setUuidUsers(response.data.user.uuidUsers);
      } catch (error) {
        console.log(error);
        
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  const monitorTypes = [
    {
      name: "HTTP",
      detail: "Use HTTP/S Monitoring to track website uptime, response time, and availability.",
    },
    {
      name: "Ports",
      detail: "Use Port Monitoring to track the availability and response of specific ports on servers.",
    },
    {
      name: "Devices",
      detail: "Use Device Monitoring to track performance metrics of AWS EC2 instances, Linux devices, and more using SNMPv3.",
    },
  ];
  
  const timeOptions = ["15S", "30S", "1M", "5M", "15M", "30M", "1H"];
  
  const handleSliderChange = (e) => {
    setCheckTime(e.target.value);
  };

  const handleSaveButton = async (attribute) => {
    try {
      setLoading(true);
      const result = await SendAddData(attribute);
  
      if (result === true) {
        router.push('/monitor');
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-[100vh] w-full flex p-[21px]">
      <section className="w-full flex justify-center">
        <div className="w-[1200px] h-full px-[20px] text-white">
          {/* Breadcrumb */}
          <div className="bg-[#1B1A55]/80 px-3 py-2 rounded-sm mb-2">
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link className="text-xs font-medium text-[#535C91] hover:text-blue-600" href="/">
                  Dashboard
                </Link>
                <svg className="mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center">
                <Link className="text-xs font-medium text-[#535C91] hover:text-blue-600" href="/">
                  Monitor
                </Link>
                <svg className="mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                Add Monitor
              </li>
            </ol>
          </div>

          <div className="border-1 px-5 py-2 rounded-sm mb-2 border-[#535C91]">
            <h1 className="text-[24px] font-bold">Add Monitor</h1>
          </div>

          {/* Select Monitor Type */}
          <div className="bg-[#1B1A55] rounded-sm px-10 py-5 flex flex-col mb-2">
            <h1 className="font-bold mb-2">Monitor Type</h1>
            <select
              className="bg-[#0D1B42] text-white py-2 rounded-sm flex justify-between"
              value={selectedMonitor}
              onChange={(e) => {setSelectedMonitor(e.target.value)}}
            >
              {monitorTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name} Monitoring
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm text-[#A0A7D1]">
              {monitorTypes.find((type) => type.name === selectedMonitor)?.detail}
            </p>
          </div>

          {/* Slider for Status Check Timeframe */}
          <div className="bg-[#1B1A55] rounded-sm px-10 py-5 flex flex-col mb-2">
            <h1 className="font-bold mb-2">Status Check Frequency: {timeOptions[checkTime]}</h1>
            
            {/* Slider */}
            <input
              type="range"
              min="0"
              max={timeOptions.length - 1}
              value={checkTime}
              onChange={handleSliderChange}
              className="slider"
              style={{ width: "100%", cursor: "pointer" }}
            />
            
            {/* Labels */}
            <div className="flex justify-between text-sm text-[#A0A7D1] mt-2">
              {timeOptions.map((value, i) => (
                <span key={value} className="font-bold">{value}</span>
              ))}
            </div>
          </div>

          <div className="bg-[#1B1A55] rounded-sm px-10 py-5 flex flex-col mb-2">
            <h1 className="font-bold mb-2">Monitors Details</h1>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <div>
                  <p className="text-xs font-medium">Hostname</p>
                  <input id="hostname" type="text" placeholder="Hostname" onChange={(e) => setHostname(e.target.value)} required className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"/>
                </div>
                <div className={`${selectedMonitor !== "HTTP" ? '' : 'hidden'}`}>
                  <p className="text-xs font-medium">IP Address</p>
                  <input id="ipaddress" type="text" placeholder="IP Address" onChange={(e) => setIpaddress(e.target.value)} required className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"/>
                </div>
                

                {selectedMonitor === "Devices" &&
                  <div>
                    <p className="text-xs font-medium">SNMP Username</p>
                    <input id="username" type="text" placeholder="SNMP Username" onChange={(e) => setUsername(e.target.value)} required className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"/>
                  </div>
                }
              </div>
              <div className="flex flex-col w-full">
                {selectedMonitor === "HTTP" && 
                  <div>
                    <p className="text-xs font-medium">IP Address</p>
                    <input id="ipaddress" type="text" placeholder="IP Address" onChange={(e) => setIpaddress(e.target.value)} required className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"/>
                  </div> }
                { selectedMonitor !== "HTTP" && <div>
                  <p className="text-xs font-medium">Port</p>
                  <input id="ports" type="text" placeholder="80 (SNMP Default Port is 161)" onChange={(e) => setPorts(e.target.value)} required className="w-full bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4"/>
                </div> }

                {selectedMonitor === "Ports" && <div>
                  <p className="text-xs font-medium">Protocol</p>
                  <select onChange={(e) => {setProtocol(e.target.value);}} className="w-full bg-white text-black text-[13px] py-1 px-5 outline-none rounded-sm mb-4">
                    <option value={`TCP`}>TCP</option>
                    <option value={`UDP`}>UDP</option>
                  </select>
                </div>}

                { selectedMonitor === "Devices" && <div>
                  <p className="text-xs font-medium">SNMP Auth Key</p>
                  <input id="snmp_auth" type="text" placeholder="Auth Key" onChange={(e) => setAuthKey(e.target.value)} required className="w-full bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4"/>
                </div> }

                { selectedMonitor === "Devices" && <div className="">
                  <p className="text-xs font-medium">SNMP Priv Key</p>
                  <input id="snmp_priv" type="text" placeholder="Priv Key" onChange={(e) => setPrivKey(e.target.value)} required className="w-full bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4"/>
                </div> }
              </div>
            </div>
            <div className={`flex w-full justify-center`}>
              <button className="bg-[#535C91] w-[200px] text-sm px-7 py-2 rounded-sm cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>Add Monitor</button>              
            </div>
          </div>

        </div>
      </section>

      {/* Modal Background (Dimmed) */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          {/* Modal Box */}
          <div 
            className="bg-[#1B1A55] text-white p-6 rounded-lg shadow-lg w-[400px] relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-bold">Confirm Monitor Data</h2>
            <div className="flex mt-4 gap-20">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-xs font-semibold text-gray-400">Type</p>
                  <p className="text-white text-sm font-bold">{selectedMonitor}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">Frequency Logs</p>
                  <p className="text-white text-sm font-bold">{timeOptions[checkTime]}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">Hostname</p>
                  <p className="text-white text-sm font-bold">{hostname ? hostname : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400">IP Address</p>
                  <p className="text-white text-sm font-bold">{ipaddress ? ipaddress : 'N/A'}</p>
                </div>
              </div>
              
              { selectedMonitor !== "HTTP" && 
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      Ports
                    </p>
                    <p className="text-white text-sm font-bold">
                      {ports ? ports : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400">
                      {selectedMonitor === 'Ports' && `Protocol`}
                      {selectedMonitor === 'Devices' && `Username`}
                    </p>
                    <p className="text-white text-sm font-bold">
                      {selectedMonitor === 'Ports' ? protocol : username ? username : 'N/A'}
                    </p>
                  </div>
                  <div className={`${selectedMonitor === "Devices" ? '' : 'hidden'}`}>
                    <p className="text-xs font-semibold text-gray-400">Auth Key</p>
                    <p className="text-white text-sm font-bold">{authkey ? authkey : 'N/A'}</p>
                  </div>
                  <div className={`${selectedMonitor === "Devices" ? '' : 'hidden'}`}>
                    <p className="text-xs font-semibold text-gray-400">Priv Key</p>
                    <p className="text-white text-sm font-bold">{privkey ? privkey : 'N/A'}</p>
                  </div>
                </div>
              }
            </div>

            {/* Close Button */}
            <button 
              className="absolute top-3 right-3 text-gray-300 hover:text-white cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>

            {/* Open Modal Button */}
            <button 
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full cursor-pointer"
              onClick={() => {handleSaveButton({uuidUsers, selectedMonitor, checkTime, hostname, ipaddress, ports, protocol, username, authkey, privkey})}}
            >
              { loading ? 
              <div className="animate-spin inline-block size-3 border-3 border-current border-t-transparent text-gray-800 rounded-full dark:text-white" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div> : 'Save Data'
              }
            </button>

            {/* Close Modal Button */}
            <button 
              className="mt-2 bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500 transition w-full cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}