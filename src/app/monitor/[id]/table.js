import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable @next/next/no-img-element */
const IncidentsTableDetail = ({ uuid, type }) => {
  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        if ( uuid && type ) {
          const payload = {
            uuid: uuid,
            type: type
          };
          const response = await api.post('/get_specific_incidents', payload);
          
          setData(response.data);        
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.msg);
        } else {
          toast.error("An Uncaught Error!");
        }
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [type, uuid])
  return (
    <div className="w-full rounded-lg mt-2 bg-[#535C91]">
      <div className="flex justify-between text-xs font-bold px-6 pt-5 mb-2">
        <button>Incidents Logs</button>
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
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">Incidents Cause</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">centered</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">Resolved</th>
                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase">Duration</th>
                      <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-300 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    { loading ? [...Array(1)].map((_, index) => (
                    <tr key={index}>
                      <td colSpan={5} className="px-6 py-4 rounded-sm h-[55px] items-center">Loading...</td>
                    </tr> 
                    )) : 
                    data.length > 0 ? (data.map((item, index) => (
                      <tr key={item.uuidIncidents}>
                        <td className="px-6 py-3 whitespace-nowrap text-xs font-medium text-white flex items-center gap-1">
                          <p>{item ? item?.status : 'N/A'}</p>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-white text-center">{item ? item?.rootcause : 'N/A'}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-white text-center">{item ? item?.started : 'N/A'}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-white text-center">{item ? item?.resolved : 'N/A'}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-xs text-white text-center">{item ? item?.duration : 'N/A'}</td>
                        <td className="px-6 py-3 whitespace-nowrap text-end text-xs font-medium justify-end flex">
                          <Link href={`/incidents/${item.uuidIncidents}`} type="button" className="cursor-pointer bg-[#1B1A55] px-3 py-1 rounded-sm flex items-center">
                            <p>Detail</p>
                            <img src="/icon-info.svg" alt="" className="ml-1 h-[12px]"/>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-xs text-white text-center">No results found</td>
                      </tr>
                    )}
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