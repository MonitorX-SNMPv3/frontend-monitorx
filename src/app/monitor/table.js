/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { UptimeBar } from "./uptimebar";

export default function TableSection() {
  const [selectedMonitors, setSelectedMonitors] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    { responseTime: "88ms", timeRange: "09:50 - 09:55", status: "UP" },
    { responseTime: "45ms", timeRange: "09:55 - 10:00", status: "UP" },
  ];

  const testData = [
    { uuidMonitors: "123", hostname: "Test Server 1", ipaddress: "http://www.google.com/", type: "HTTP", responseTime: "22ms", status: "UP", uptime: uptimeData },
    { uuidMonitors: "124", hostname: "Test Server 2", ipaddress: "54.22.7.243", type: "Server", responseTime: "25ms", status: "UP", uptime: uptimeData },
  ];

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
      setSelectedMonitors(testData.map((item) => item.uuidMonitors)); // Select all
    }
    setSelectAll(!selectAll);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter testData based on searchQuery (case-insensitive)
  const filteredData = testData.filter((item) =>
    item.hostname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ipaddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    <input 
                      type="checkbox"
                      className="border-gray-200 rounded-sm text-red-500 focus:ring-red-500"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </div>
                  <div className="text-xs font-medium">{selectedMonitors.length} / {testData.length}</div>
                </div>
                <div className="flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91]">
                  <div className="text-sm font-medium">Action</div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                </div>
                <div className="flex px-3 py-1 items-center gap-2 rounded-sm bg-[#535C91]">
                  <div className="text-sm font-medium">Type</div>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-white"></div>
                </div>
              </div>
              {/* Search bar */}
              <div className="relative max-w-xs">
                <label htmlFor="hs-table-search" className="sr-only">Search</label>
                <input
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="py-1.5 sm:py-2 px-4 block w-[300px] bg-white text-black shadow-2xs rounded-lg text-xs"
                  placeholder="Search by hostname or address..."
                  value={searchQuery} // 🔍 Bind input to state
                  onChange={handleSearchChange} // 🔍 Handle change
                />
              </div>
            </section>

            {/* Table */}
            <section className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead className="bg-[#1B1A55]">
                  <tr>
                    <th className="py-5 px-4 pe-0 rounded-l-sm">
                      <div className="flex items-center h-5">
                        <input 
                          type="checkbox"
                          className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
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
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.uuidMonitors} className={`${index % 2 === 0 ? 'bg-[#9290C3]/50' : 'bg-[#535C91]/50'} hover:bg-white/10`}>
                        {/* Checkbox Column */}
                        <td className="py-3 ps-4 rounded-l-sm">
                          <div className="flex items-center h-5">
                            <input 
                              type="checkbox"
                              className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500"
                              checked={selectedMonitors.includes(item.uuidMonitors)}
                              onChange={() => handleCheckboxChange(item.uuidMonitors)}
                            />
                          </div>
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
                            <div className={`w-6 h-6 ${item.status === 'UP' ? 'bg-green-400' : 'bg-red-400'} rounded-full flex justify-center items-center animate-pulse`}>
                              <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
                            </div>
                            <div className="flex flex-col">
                              <p className="text-sm">{item.status}</p>
                              <p className="text-xs text-gray-400">Ping: {item.responseTime}</p>
                            </div>
                          </div>
                        </td>

                        {/* Uptime Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm place-items-center font-medium text-white">
                          <UptimeBar data={item.uptime}/>
                          <p className="text-xs text-gray-400">Uptime: 24d, 4h, 10m</p>
                        </td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                          <button className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm">
                            <img src="/icon-info.svg" alt="" className="h-[14px]"/>
                            <p>Detail</p>
                          </button>
                          <button className="bg-[#F65D60] p-1.5 rounded-sm ml-[3px]">
                            <img src="/icon-trash.svg" alt="" className="h-[15px]"/>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-white py-4">No results found</td>
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
