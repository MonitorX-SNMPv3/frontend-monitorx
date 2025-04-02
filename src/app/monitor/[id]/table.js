/* eslint-disable @next/next/no-img-element */
const IncidentsTableDetail = () => {
  return (
    <div className="w-full rounded-lg mt-2 bg-[#535C91]">
      <div className="flex justify-between text-xs px-6 py-3">
        <button>Incidents Logs</button>
        <button className="bg-[#1B1A55] px-3 py-1 rounded-sm cursor-pointer flex items-center">
          <p>Export Logs</p>
          <img src="/icon-download.svg" alt="" className="ml-1 h-5"/>
        </button>
      </div>
      {/* Table */}
      <section className="overflow-hidden">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-300 uppercase ">Status</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-300 uppercase">Incidents Cause</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-300 uppercase">Started</th>
                      <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-300 uppercase">Duration</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-300 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-3 whitespace-nowrap text-xs font-medium text-white flex items-center gap-1">
                        <img src="/icon-solved.svg" alt="" className="h-5"/>
                        <p>Solved</p>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-white">Connection Timeout</td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-white">Saturday, 24 February 2025 20:24</td>
                      <td className="px-6 py-3 whitespace-nowrap text-xs text-white">2d 24h 55m</td>
                      <td className="px-6 py-3 whitespace-nowrap text-end text-xs font-medium justify-end flex">
                        <button type="button" className="cursor-pointer bg-[#1B1A55] px-3 py-1 rounded-sm flex items-center">
                          <p>Detail</p>
                          <img src="/icon-info.svg" alt="" className="ml-1 h-[12px]"/>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IncidentsTableDetail;