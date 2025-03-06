'use client'

import NavigationSidebar from "@/component/sidebar";
import { usePathname } from "next/navigation";

export default function IncidentsPage() {
  const pathname = usePathname();
  
  return(
    <div className="min-h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] p-[21px]">
      <NavigationSidebar path={pathname}/>
      <section className="w-full">
        <div className="w-full h-full p-20 text-white">
          <h1 className="text-5xl">incidents</h1>
        </div>
      </section>
    </div>
  )
}