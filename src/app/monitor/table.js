/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { UptimeBar } from "./uptimebar";
import axios from "axios";

export default function TableSection() {
  const [ selectedMonitors, setSelectedMonitors ] = useState([]);
  const [ filteredData, setFilteredData] = useState([]);
  const [ data, setData ] = useState([]); 
  const [ selectAll, setSelectAll ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ actionPop, setActionPop ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const dropdownRef = useRef(null);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:5000/api/get_monitor_with_logs/");
  //     console.log("Fetched data:", response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setData([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getDataDummy = () => {
    setData(DummyData);
    setLoading(false);
  }

  // Handle individual checkbox change
  const handleCheckboxChange = (uuid) => {
    setSelectedMonitors((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid) // Uncheck
        : [...prev, uuid] // Check
    );
    console.log(selectedMonitors);
    
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMonitors([]); // Unselect all
    } else {
      setSelectedMonitors(data.map((item) => item.uuidMonitors)); // Select all
    }
    setSelectAll(!selectAll);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on searchQuery (case-insensitive)
  // const filteredData = data.filter((item) =>
  //   item.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   item.ipaddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   item.status.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleSelectedTrigger = () => {
    console.log(`Trigger: ${selectedMonitors} ${JSON.stringify(filteredData[0])}`);
  }
  const handleSelectedStart = () => {
    console.log(`Start: ${selectedMonitors}`);
  }
  const handleSelectedPause = () => {
    console.log(`Pause: ${selectedMonitors}`);
  }
  const handleSelectedReset = () => {
    console.log(`Reset: ${selectedMonitors}`);
  }
  const handleSelectedDelete = () => {
    console.log(`Delete: ${selectedMonitors}`);
  }

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data.filter((item) =>
        item.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ipaddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    
  }, [data, searchQuery]);

  useEffect(()=> {
    getDataDummy();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActionPop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);



  return (
    <main className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="rounded-lg divide-gray-200">
            {/* Action Bar */}
            <section className="pt-5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {/* Selected Checkbox */}
                <div className="px-3 py-1 flex items-center gap-2 bg-[#535C91] rounded-sm">
                  <div className="flex items-center h-5">
                    <label className="relative flex items-center cursor-pointer">
                      <input type="checkbox" className="peer hidden" checked={selectAll} onChange={handleSelectAll}/>
                      <div className="w-4 h-4 border-2 border-[#9290C3] rounded-sm flex items-center justify-center peer-checked:bg-[#9290C3]">
                        {selectAll && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="text-xs font-medium">{selectedMonitors.length} / {data.length}</div>
                </div>
                <button ref={dropdownRef} onClick={() => setActionPop(!actionPop)} className="relative flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91] cursor-pointer">
                  <div className="text-sm font-medium">Action</div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                  {actionPop && (
                    <div className="absolute top-8 text-sm w-[145px] bg-[#535C91] -translate-x-3 text-start flex flex-col rounded-sm divide-y divide-gray-400">
                      <a onClick={handleSelectedTrigger} className="font-medium px-3 py-1 rounded-t-sm hover:bg-white/20 flex items-center gap-3">
                        <img src="/icon-radar2.svg" alt="" className="h-[15px]" />
                        <p>Trigger Log</p>
                      </a>
                      <a onClick={handleSelectedStart} className="font-medium px-3 py-1 rounded-t-sm hover:bg-white/20 flex items-center gap-3">
                        <img src="/icon-start.svg" alt="" className="h-[15px]" />
                        <p>Start</p>
                      </a>
                      <a onClick={handleSelectedPause} className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3">
                        <img src="/icon-paused.svg" alt="" className="h-[15px] ml-[2px]" />
                        <p>Pause</p>
                      </a>
                      <a onClick={handleSelectedReset} className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3">
                        <img src="/icon-reset.svg" alt="" className="h-[15px]" />
                        <p>Reset Logs</p>
                      </a>
                      <a onClick={handleSelectedDelete} className="font-medium bg-red-400 px-3 py-1 rounded-b-sm hover:bg-white/20 flex items-center gap-3">
                        <img src="/icon-trash.svg" alt="" className="h-[15px] mb-[2px]" />
                        <p>Delete</p>
                      </a>
                    </div>
                  )}
                </button>
                <button className="flex relative px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91] cursor-pointer">
                  <div className="text-sm font-medium">Type</div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                </button>
              </div>
              {/* Search bar & Filter Button */}
              <div className="flex gap-1">
                <div className="flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91]">
                  <div className="text-sm font-medium">Filter</div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                </div>
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">Search</label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="py-1.5 sm:py-2 px-4 block w-[300px] bg-white text-black shadow-2xs rounded-sm text-xs"
                    placeholder="Search by hostname or address..."
                    value={searchQuery} // 🔍 Bind input to state
                    onChange={handleSearchChange} // 🔍 Handle change
                  />
                </div>
              </div>
            </section>

            {/* Table */}
            <section className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead className="bg-[#1B1A55]">
                  <tr>
                    <th className="py-5 px-4 pe-0 rounded-l-sm">
                      <div className="flex items-center h-5">
                        <label className="relative flex items-center cursor-pointer">
                          <input type="checkbox" className="peer hidden" checked={selectAll} onChange={handleSelectAll}/>
                          <div className="w-4 h-4 border-2 border-[#9290C3] rounded-sm flex items-center justify-center peer-checked:bg-[#9290C3]">
                            {selectAll && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        </label>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Monitor Address</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Hostname</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-white uppercase">History</th>
                    <th className="pr-12 py-3 text-end text-xs font-medium text-white uppercase rounded-r-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? [...Array(5)].map((_, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-[#9290C3]/50' : 'bg-[#535C91]/50'} hover:bg-white/10`}>
                      <td colSpan={6} className="px-6 py-4 rounded-sm h-[55px] items-center"><div className="loader h-1.5 rounded-full"></div></td>
                    </tr>
                    )) : 
                    filteredData.length > 0 ? (filteredData.map((item, index) => (
                      <tr key={item.uuidMonitors} className={`${index % 2 === 0 ? 'bg-[#9290C3]/50' : 'bg-[#535C91]/50'} hover:bg-white/10`}>
                        {/* Checkbox Column */}
                        <td className="py-3 ps-4 rounded-l-sm">
                          <label className="relative flex items-center cursor-pointer">
                            <input type="checkbox" className="peer hidden" checked={selectedMonitors.includes(item.uuidMonitors)} onChange={() => handleCheckboxChange(item.uuidMonitors)}/>
                            <div className="w-4 h-4 border-2 border-[#9290C3] rounded-sm flex items-center justify-center peer-checked:bg-[#1B1A55] peer-checked:border-[#1B1A55]">
                              {selectedMonitors.includes(item.uuidMonitors) && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </div>
                          </label>
                        </td>

                        {/* IP Address and Type Column */}
                        <td className="px-6 whitespace-nowrap font-medium text-white">
                          <div className="flex flex-col">
                            <p className="text-sm">{item.ipaddress}</p>
                            <p className="text-xs text-gray-400">Type: {item.type}</p>
                          </div>
                        </td>

                        {/* Hostname Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{item.hostname}</td>

                        {/* Status Column */}
                        
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-white place-items-center">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 ${item.logs[0]?.status === 'UP' || item.logs.length === 0 ? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-center items-center animate-pulse`}>
                              {item.logs[0]?.status === 'UP' || item.logs.length === 0 ? 
                                <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
                                : <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                              }
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm">{item.logs[0]?.status}</p>
                              <p className="text-xs text-gray-400">Ping: {item.logs[0]?.responseTime ? `${item.logs[0].responseTime}ms`  : `0ms`}</p>
                            </div>
                          </div>
                        </td>

                        {/* Uptime Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm place-items-center font-medium text-white">
                          <UptimeBar data={item.logs}/>
                          <p className="text-xs text-gray-400">{item.logs[0]?.uptime}</p>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                          <button className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm cursor-pointer">
                            <img src="/icon-info.svg" alt="" className="h-[14px]"/>
                            <p>Detail</p>
                          </button>
                          <button className="bg-[#F65D60] p-1.5 rounded-sm ml-[3px] cursor-pointer">
                            <img src="/icon-trash.svg" alt="" className="h-[15px]"/>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="bg-[#9290C3]/50 rounded-sm text-center text-white py-5">No results found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}


const DummyData = [
  {
      "uuidServers": "fd5c859c-1451-4972-b9a5-cc08860f21cc",
      "uuidUsers": "5e4fb137-b6f1-44a3-b1b5-01231c1f14bb",
      "hostname": "Ragnarok Server",
      "ipaddress": "54.79.45.224",
      "statusCheck": "5M",
      "snmp_username": "admin123",
      "snmp_authkey": "eci108091",
      "snmp_privkey": "108091eci",
      "snmp_port": 161,
      "createdAt": "2025-03-20T06:12:22.577Z",
      "updatedAt": "2025-03-20T06:12:22.577Z",
      "uuidMonitors": "fd5c859c-1451-4972-b9a5-cc08860f21cc",
      "type": "server",
      "logs": [
          {
              "status": "UP",
              "responseTime": 153,
              "date": "Saturday 22 March 25",
              "timeRange": "22:18 - 22:22",
              "uptime": "22d 1h 51m 22s"
          },
          {
              "status": "UP",
              "responseTime": 180,
              "date": "Saturday 22 March 25",
              "timeRange": "22:22 - 22:27",
              "uptime": "22d 1h 56m 9s"
          },
          {
              "status": "DOWN",
              "responseTime": 0,
              "date": "Saturday 22 March 25",
              "timeRange": "22:27 - 22:33",
              "uptime": "N/A"
          },
          {
              "status": "UP",
              "responseTime": 148,
              "date": "Saturday 22 March 25",
              "timeRange": "22:33 - 22:37",
              "uptime": "22d 2h 6m 9s"
          },
          {
            "status": "UP",
            "responseTime": 158,
            "date": "Saturday 22 March 25",
            "timeRange": "22:37 - 22:42",
            "uptime": "22d 2h 11m 6s"
          },
          {
              "status": "UP",
              "responseTime": 167,
              "date": "Saturday 22 March 25",
              "timeRange": "22:42 - 22:48",
              "uptime": "22d 2h 16m 6s"
          },
          {
              "status": "UP",
              "responseTime": 148,
              "date": "Saturday 22 March 25",
              "timeRange": "22:48 - 22:53",
              "uptime": "22d 2h 21m 11s"
          },
          {
              "status": "UP",
              "responseTime": 149,
              "date": "Saturday 22 March 25",
              "timeRange": "22:53 - 22:58",
              "uptime": "22d 2h 26m 6s"
          },
      ]
  }
]