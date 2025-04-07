import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function TableIncidents() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getData = async () => {
    try {
      const response = await api.get("/get_all_incidents");
      console.log("Fetched data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="rounded-lg divide-gray-200">
            {/* Table */}
            <section className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead className="bg-[#1B1A55]">
                  <tr>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase rounded-l-sm">Status</th>
                    <th className="px-6 py-4 text-start text-xs font-medium text-white uppercase">Hostname</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Root Cause</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Started</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Resolved</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Duration</th>
                    <th className="pr-12 py-4 text-end text-xs font-medium text-white uppercase rounded-r-sm">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-[#9290C3]/50" : "bg-[#535C91]/50"
                        } hover:bg-white/10`}
                      >
                        <td colSpan={7} className="px-6 py-4 rounded-sm h-[55px] items-center">
                          <div className="loader h-1.5 rounded-full"></div>
                        </td>
                      </tr>
                    ))
                  ) : currentData.length > 0 ? (
                    currentData.map((item, index) => (
                      <tr
                        key={item.uuidIncidents}
                        className={`${
                          index % 2 === 0 ? "bg-[#9290C3]/50" : "bg-[#535C91]/50"
                        } hover:bg-white/10`}
                      >
                        {/* Status Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center rounded-l-sm">{item.status}</td>

                        {/* Hostname Column */}
                        <td className="px-6 whitespace-nowrap text-sm text-start text-white">{item?.monitor?.[0].hostname}</td>

                        {/* Root Cause Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{item.rootcause}</td>

                        {/* Started Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{item.started}</td>

                        {/* Resolved Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">
                          {item.resolved ? <p>{item.resolved}</p> : <p>-</p>}
                        </td>

                        {/* Duration Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">{item.duration}</td>

                        {/* Actions Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                          <Link
                            href={`/incidents/${item.uuidIncidents}`}
                            className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm cursor-pointer"
                          >
                            <img src="/icon-info.svg" alt="" className="h-[14px]" />
                            <p>Detail</p>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="bg-[#9290C3]/50 text-center text-white py-4">
                        No results found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            {/* Pagination */}
            {!loading && data.length > 0 && (
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="px-5 py-1.5 bg-[#9290C3] rounded disabled:bg-white/20 disabled:text-gray-400 font-bold text-xs"
                >
                  Previous
                </button>
                <span className="text-white text-xs">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-5 py-1.5 bg-[#9290C3] rounded disabled:bg-white/20 disabled:text-gray-400 font-bold text-xs"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
