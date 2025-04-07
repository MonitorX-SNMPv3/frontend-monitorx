/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { UptimeBar } from "../../component/uptimebar";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { getLatestPing, handleSelectedClear, handleSelectedDelete, handleSelectedPause, handleSelectedStart, handleSelectedTrigger } from "@/services/monitorServices";

export default function TableSection({ onRefresh }) {
  const [ selectedMonitors, setSelectedMonitors ] = useState([]);
  const [ filteredData, setFilteredData] = useState([]);
  const [ data, setData ] = useState([]); 
  const [ selectAll, setSelectAll ] = useState(false);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ actionPop, setActionPop ] = useState(false);
  const [ sortPop, setSortPop ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  const router = useRouter();
  const dropdownRef = useRef(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/get_monitor_with_logs/");
      console.log("Fetched data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (uuid) => {
    setSelectedMonitors((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid) // Uncheck
        : [...prev, uuid] // Check
    );
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

  const onTriggerClick = () => {
    handleSelectedTrigger(
      selectedMonitors,
      data,
      getData,
      setSelectedMonitors,
      setActionPop,
      onRefresh,
    );
  };
  
  const onStartClick = () => {
    handleSelectedStart(
      selectedMonitors,
      data,
      getData,
      setSelectedMonitors,
      setActionPop,
      onRefresh,
    );
  };
  
  const onPauseClick = () => {
    handleSelectedPause(
      selectedMonitors,
      data,
      getData,
      setSelectedMonitors,
      setActionPop,
      onRefresh,
    );
  };
  
  const onClearClick = () => {
    handleSelectedClear(
      selectedMonitors,
      data,
      getData,
      setSelectedMonitors,
      setActionPop,
      onRefresh,
    );
  };

  const onDeleteClick = () => {
    handleSelectedDelete(
      selectedMonitors,
      data,
      getData,
      setSelectedMonitors,
      setActionPop,
      onRefresh,
    );
  };


  const handleSortHostnameASC = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return (a.hostname || "")
        .toLowerCase()
        .localeCompare((b.hostname || "").toLowerCase());
    });
    setFilteredData(sorted);
  };

  const handleSortHostnameDESC = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return (b.hostname || "")
        .toLowerCase()
        .localeCompare((a.hostname || "").toLowerCase());
    });
    setFilteredData(sorted);
  };

  const handleSortPingLowest = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return getLatestPing(a) - getLatestPing(b);
    });
    setFilteredData(sorted);
  };

  const handleSortPingHighest = () => {
    const sorted = [...filteredData].sort((a, b) => {
      return getLatestPing(b) - getLatestPing(a);
    });
    setFilteredData(sorted);
  };


  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(
        data.filter((item) =>
          (item.hostname?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
          (item.ipaddress?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
          (item.status?.toLowerCase() || "").includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [data, searchQuery]);
  

  useEffect(()=> {
    getData();
  }, []);



  return (
    <main className="flex flex-col relative">
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

                {/* Action Button */}
                <div className="relative inline-block">
                  {/* Toggle Button */}
                  <button
                    onClick={() => {setActionPop(!actionPop); setSortPop(false)}}
                    className="flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91] cursor-pointer"
                  >
                    <span className="text-sm font-medium">Action</span>
                    <span className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></span>
                  </button>

                  {/* Dropdown Menu */}
                  {actionPop && (
                    <div className="absolute top-full mt-2 text-sm w-[145px] bg-[#535C91] text-start flex flex-col rounded-sm divide-y divide-gray-400">
                      <button
                        onClick={onTriggerClick}
                        className="font-medium px-3 py-1 rounded-t-sm hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-radar2.svg" alt="Trigger Log" className="h-[15px]" />
                        <span>Trigger Log</span>
                      </button>
                      <button
                        onClick={onStartClick}
                        className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-start.svg" alt="Start" className="h-[15px]" />
                        <span>Start</span>
                      </button>
                      <button
                        onClick={onPauseClick}
                        className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-paused.svg" alt="Pause" className="h-[15px] ml-[2px]" />
                        <span>Pause</span>
                      </button> 
                      <button
                        onClick={onClearClick}
                        className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-reset.svg" alt="Reset Logs" className="h-[15px]" />
                        <span>Clear Logs</span>
                      </button>
                      <button
                        onClick={onDeleteClick}
                        className="font-medium bg-red-400 px-3 py-1 rounded-b-sm hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-trash.svg" alt="Delete" className="h-[15px] mb-[2px]" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Sort Button */}
                <div className="relative inline-block">
                  {/* Toggle Button */}
                  <button
                    onClick={() => {
                      setSortPop(!sortPop);
                      setActionPop(false);
                    }}
                    className="flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91] cursor-pointer"
                  >
                    <span className="text-sm font-medium">Sort</span>
                    <span className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></span>
                  </button>

                  {/* Dropdown Menu */}
                  {sortPop && (
                    <div className="absolute top-full mt-2 text-sm w-[175px] bg-[#535C91] text-start flex flex-col rounded-sm divide-y divide-gray-400">
                      <button
                        onClick={handleSortHostnameASC}
                        className="font-medium px-3 py-1 rounded-t-sm hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-radar2.svg" alt="Hostname (A - Z)" className="h-[15px]" />
                        <span>Hostname (A - Z)</span>
                      </button>
                      <button
                        onClick={handleSortHostnameDESC}
                        className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-radar2.svg" alt="Hostname (Z - A)" className="h-[15px]" />
                        <span>Hostname (Z - A)</span>
                      </button>
                      <button
                        onClick={handleSortPingLowest}
                        className="font-medium px-3 py-1 hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-radar2.svg" alt="Ping (Lowest)" className="h-[15px]" />
                        <span>Ping (Lowest)</span>
                      </button>
                      <button
                        onClick={handleSortPingHighest}
                        className="font-medium px-3 py-1 rounded-b-sm hover:bg-white/20 flex items-center gap-3"
                      >
                        <img src="/icon-radar2.svg" alt="Ping (Highest)" className="h-[15px]" />
                        <span>Ping (Highest)</span>
                      </button>
                    </div>
                  )}
                </div>

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

                        {/* Uptime Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm place-items-center font-medium text-white">
                          <UptimeBar data={item.logs}/>
                          <p className="text-xs text-gray-400">{item.logs[item.logs?.length - 1]?.uptime}</p>
                        </td>

                        {/* Actions Column */}
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


