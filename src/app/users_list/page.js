'use client'

import api from "@/utils/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TableUsers from "./table";

export default function UserList() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Panggil endpoint /me untuk verifikasi user
        const response = await api.get('/me');
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        router.push('/login');
      }
    };

    checkUser();
  }, [router]);

  return(
    <div className="min-h-[100vh] w-full flex p-[21px]">
      <section className="w-full flex justify-center">
        <div className="w-[1200px] h-full px-[20px] text-white">

          {/* Breadcrumb */}
          <div className=" bg-[#1B1A55]/80 px-3 py-2 rounded-sm mb-2">
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link className="flex items-center text-xs font-medium text-[#535C91] hover:text-blue-600 focus:outline-hidden focus:text-blue-600" href="/">
                  Dashboard
                </Link>
                <svg className="shrink-0 mx-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li className="inline-flex items-center text-xs font-bold text-white/70 truncate" aria-current="page">
                Users List
              </li>
            </ol>
          </div> 

          <div className="border-1 px-5 py-2 rounded-sm mb-2 border-[#535C91]">
            <h1 className="text-[24px] font-bold">Users List Page</h1>
          </div>

          <div>
            <TableUsers/>
          </div>
        </div>
      </section>
    </div>
  )
}