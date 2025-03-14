/* eslint-disable @next/next/no-img-element */
export default function LoginPage() {
    return(
        <div className="h-[100vh] flex bg-gradient-to-br from-[#070F2B] to-[#1B1A55] py-[53px] px-[125px]">
            <div className="flex flex-col bg-[#1B1A55] w-[40%] rounded-3xl items-center pb-28 drop-shadow-xl justify-center">
                <div className="flex flex-col items-center">
                    <p className="text-6xl text-[#5A618E] font-bold font-spartan leading-9">Monitor<span className="text-[#B1D3E3]">X</span></p>
                    <p className="text-white font-quicksand text-xs tracking-widest">Integrated SNMPv3 Server Monitor</p>
                    <p className="text-white font-bold mt-[20px] text-xl">Sign in to your account</p>
                </div>
                <div className="flex flex-col mt-7 w-[326px]">
                    <input type="text" placeholder="Email" className="bg-white text-[13px] py-2 px-5 rounded-full outline-none mb-4"/>
                    <input type="text" placeholder="Password" className="bg-white text-[13px] py-2 px-5 rounded-full outline-none mb-3"/>
                    <div className="flex justify-between px-0.5 leading-0">
                        <div className="flex">
                            <label className="relative flex items-center cursor-pointer">
                                <input type="checkbox" className="peer hidden" />
                                <div className="w-4 h-4 border-2 border-white rounded-full peer-checked:bg-white"></div>
                                <p className="text-sm ml-2 font-regular text-[#9290C3]">Remember Me?</p>
                            </label>
                        </div>
                        <button className="text-sm font-semibold underline text-[#9290C3] cursor-pointer">Forgot Password?</button>
                    </div>
                    <button className="text-sm bg-[#535C91] mt-10 rounded-full py-2 text-white font-bold">Login</button>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <img src="/vector-login.svg" alt="" className="h-full w-full"/>
            </div>
        </div>
    )
}