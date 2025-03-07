'use client'

import NavigationSidebar from "@/component/sidebar";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function IncidentsPage() {
  const pathname = usePathname();
  const [ loading, setLoading ] = useState(true);
  const [ data, setData ] = useState(null);

  const GetData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/get_monitor_with_logs/");
      console.log("Fetched data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetData();
  }, []);
  
  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full">
        <div className="w-full h-full p-20 text-white">
          <h1 className="text-5xl">incidents</h1>
          {loading ? <div>Loading</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      </section>
    </div>
  )
}