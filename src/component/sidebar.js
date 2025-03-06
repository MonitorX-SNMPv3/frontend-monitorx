/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function NavigationSidebar({ path }) {
    return(
        <div className="flex flex-col place-items-start w-[290px] bg-[#1B1A55] rounded-xl px-3 py-10 justify-between">
            <div className="w-full">
                <Link href="/" className="flex flex-col p-3">
                    <p className="text-[#5A618E] font-bold text-4xl font-spartan p-0 leading-[0.75]">
                        Monitor<span className="text-[#B1D3E3]">X</span>
                    </p>
                    <p className="text-[12px] text-white font-quicksand">
                        Integrated SNMPv3 Server Monitor
                    </p>
                </Link>
                <div className="flex flex-col gap-2 mt-10">
                    <Link href='/' className={`flex ${path === "/" && "bg-white/20"} place-items-center px-[12px] py-[10px] gap-2 rounded-sm`}>
                    <img src="/icon-home.svg" alt=""/>
                    <p className="font-bold text-[12px] text-white">Dashboard</p> 
                    </Link>
                    <Link href='/monitor' className={`flex ${path === "/monitor" && "bg-white/20"} place-items-center px-[12px] py-[10px] gap-2 rounded-sm`}>
                    <img src="/icon-radar.svg" alt=""/>
                    <p className="font-bold text-[12px] text-white">Monitoring</p> 
                    </Link>
                    <Link href='/incidents' className={`flex ${path === "/incidents" && "bg-white/20"} place-items-center px-[12px] py-[10px] gap-2 rounded-sm`}>
                    <img src="/icon-incidents.svg" alt=""/>
                    <p className="font-bold text-[12px] text-white">Incidents</p> 
                    </Link>
                    <Link href='/users_list' className={`flex ${path === "/users_list" && "bg-white/20"} place-items-center px-[12px] py-[10px] gap-2 rounded-sm`}>
                    <img src="/icon-userlist.svg" alt=""/>
                    <p className="font-bold text-[12px] text-white">User List</p> 
                    </Link>
                </div>
                </div>
                <div className="w-full">
                <div className="flex place-items-center px-[12px] py-[10px] justify-between">
                    <div className="flex items-center gap-2">
                    <img src="/icon-user.svg" alt=""/>
                    <p className="font-bold text-[12px] text-white">Pengguna 1</p> 
                    </div>
                    <img src="/icon-3dot.svg" alt=""/>
                </div>
                <button className="flex font-bold justify-center gap-2 text-white bg-[#9290C3] w-full rounded-sm text-[12px] py-[10px]">
                    <img src="/logout.svg" alt=""/>
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}