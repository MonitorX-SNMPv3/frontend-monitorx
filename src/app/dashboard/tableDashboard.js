/* eslint-disable @next/next/no-img-element */
const TableDashboard = () => {
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
            <tr className="bg-[#9290C3]/50">
              <td className="px-6 py-4 text-start text-xs font-medium text-white uppercase rounded-l-sm">
                <p className="text-sm">Test Server 1</p>
                <p className="text-xs text-gray-400">192.168.1.1</p>
              </td>
              <td className="px-6 py-4 text-start text-xs font-medium text-white uppercase flex justify-center gap-1 place-items-center">
                <div className={`w-6 h-6 bg-green-400 rounded-full flex justify-center items-center animate-pulse`}>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
                </div>
                <div className="flex flex-col">
                  <p>UP</p>
                  <p>Ping: 20ms</p>
                </div>
              </td>
              <td className="px-6 py-4 text-center text-xs font-medium text-white uppercase">20d 55h 20m</td>
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
            <tr className="bg-[#535C91]/50">
              <td className="px-6 py-4 text-start text-xs font-medium text-white uppercase">
                <p className="text-sm">Test Server 2</p>
                <p className="text-xs text-gray-400">192.168.1.2</p>
              </td>
              <td className="px-6 py-4 text-start text-xs font-medium text-white uppercase flex justify-center gap-1 place-items-center">
                <div className={`w-6 h-6 bg-green-400 rounded-full flex justify-center items-center animate-pulse`}>
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-white"></div>
                </div>
                <div className="flex flex-col">
                  <p>UP</p>
                  <p>Ping: 22ms</p>
                </div>
              </td>
              <td className="px-6 py-4 text-center text-xs font-medium text-white uppercase">20d 55h 20m</td>
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
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default TableDashboard;