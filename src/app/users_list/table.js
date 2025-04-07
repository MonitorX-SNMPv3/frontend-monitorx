/* eslint-disable @next/next/no-img-element */
import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TableUsers() {
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState([]);

  const getData = async () => {
    try {
      const response = await api.get("/get_all_user");
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

  const handleDelete = async (uuid) => {
    const toastprop = toast.loading("Loading...");
    
    try {
      const payload = {
        uuid: uuid
      };

      console.log(payload);
      

      const response = await api.delete('/delete_user', { data: payload });

      getData();

      toast.update(toastprop, {
        render: response.data.msg,
        type: "success",
        isLoading: false,
        autoClose: 2500,
      });

    } catch (error) {
      if (error.response) {
        toast.update(toastprop, {
          render: error.response.data.msg || "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      } else {
        toast.update(toastprop, {
          render: "An error occurred while deleting monitor.",
          type: "error",
          isLoading: false,
          autoClose: 2500,
        });
      }
    }
  }

  return(
    <main className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="rounded-lg divide-gray-200">
            <section className="overflow-hidden">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead className="bg-[#1B1A55]">
                  <tr>
                    <th className="px-6 py-4 text-start text-xs font-medium text-white uppercase rounded-l-sm">Name</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Email</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Type</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase">Date Created</th>
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
                    ) : data.length > 0 ? (
                      data.map((item, index) => (
                        <tr key={item?.uuidUsers} className="bg-[#9290C3]/50">
                          <td className="px-6 py-4 text-start text-xs font-medium text-white capitalize rounded-l-sm">{item ? item?.name : 'N/A'}</td>
                          <td className="px-6 py-4 text-center text-xs font-medium text-white">{item ? item?.email : 'N/A'}</td>
                          <td className="px-6 py-4 text-center text-xs font-medium text-white uppercase">{item ? item?.type : 'N/A'}</td>
                          <td className="px-6 py-4 text-center text-xs font-medium text-white capitalize">
                            {data ? new Date(new Date(item.createdAt).getTime() + (7 * 60 * 60 * 1000)).toUTCString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                            <Link href={'/'} className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm cursor-pointer">
                              <img src="/icon-info.svg" alt="" className="h-[14px]"/>
                              <p>Edit</p>
                            </Link>
                            <button onClick={() => {handleDelete(item.uuidUsers)}} className="bg-[#F65D60] p-1.5 rounded-sm ml-[3px] cursor-pointer">
                              <img src="/icon-trash.svg" alt="" className="h-[15px]"/>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="bg-[#9290C3]/50 text-center text-white py-4">
                          No results found
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}