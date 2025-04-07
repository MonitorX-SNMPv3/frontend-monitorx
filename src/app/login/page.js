/* eslint-disable @next/next/no-img-element */
'use client'

import api from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [code, setCode] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  
  const handleButtonSignIn = async () => {
    try {
      const send = { email: email, password: password, rememberMe: rememberMe };
      const response = await api.post("/login_user", send);
      if (response.status === 200) {
        toast.success("Login Success, Tunggu sebentar anda akan di-direct ke home page.", {
          onClose: () => { router.push('/'); },
          autoClose: 1000,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.error);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="h-[100vh] flex py-[53px] px-[125px]">
      <div className="flex flex-col bg-[#1B1A55] w-[600px] rounded-3xl items-center pb-28 drop-shadow-xl justify-center">
        <div className="flex flex-col items-center">
          <p className="text-6xl text-[#5A618E] font-bold font-spartan leading-9">
            Monitor<span className="text-[#B1D3E3]">X</span>
          </p>
          <p className="text-white font-quicksand text-xs tracking-widest">
            Integrated SNMPv3 Server Monitor
          </p>
          <p className="text-white font-bold mt-[20px] text-xl">
            Sign in to your account
          </p>
        </div>
        <div className="flex flex-col mt-7 w-[326px]">
          <input
            id="email"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-[13px] py-2 px-5 rounded-full outline-none mb-4"
          />
          <div className="relative mb-3">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-[13px] py-2 px-5 rounded-full outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3C5 3 1.73 7.11.46 10c1.27 2.89 4.54 7 9.54 7s8.27-4.11 9.54-7c-1.27-2.89-4.54-7-9.54-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                  <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex justify-between px-0.5 leading-0">
            <div className="flex">
              <label className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div className="w-4 h-4 border-2 border-white rounded-full peer-checked:bg-white"></div>
                <p className="text-sm ml-2 font-regular text-[#9290C3]">Remember Me?</p>
              </label>
            </div>
            <button className="text-sm font-semibold underline text-[#9290C3] cursor-pointer">
              Forgot Password?
            </button>
          </div>
          <button
            onClick={handleButtonSignIn}
            className="text-sm bg-[#535C91] mt-10 rounded-full py-2 text-white font-bold cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
      <div className="hidden w-full lg:flex items-center justify-center">
        <img src="/vector-login.svg" alt="" className="h-full w-full" />
      </div>
    </div>
  );
}
