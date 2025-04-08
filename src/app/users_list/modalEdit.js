'use client'
import React from "react";

export default function EditUserModal({
  uuid,
  username,
  setUsername,
  email,
  setEmail,
  type,
  setType,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleButtonEdit,
  onClose,
}) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#1B1A55] text-white p-6 rounded-lg shadow-lg w-[600px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm font-bold mb-1">Edit Users Data</h2>
        <hr className="w-full mb-3" />
        <div className="flex gap-5 w-full">
          <div className="flex flex-col w-full">
            <div>
              <p className="text-xs font-medium">Name</p>
              <input
                id="name"
                type="text"
                placeholder="Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"
              />
            </div>
            <div>
              <p className="text-xs font-medium">Email</p>
              <input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs font-medium">Type</p>
            <select
              onChange={(e) => setType(e.target.value)}
              value={type}
              className="w-full bg-white text-black text-[13px] py-1 px-5 outline-none rounded-sm mb-4"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
            <div className="relative">
              <p className="text-xs font-medium">Password</p>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white text-[13px] text-black py-1 px-5 pr-10 rounded-sm outline-none mb-4 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3C5 3 1.73 7.11.46 10c1.27 2.89 4.54 7 9.54 7s8.27-4.11 9.54-7c-1.27-2.89-4.54-7-9.54-7zm0 12a5 5 0 110-10 5 5 0 010 10z" />
                    <path d="M10 8a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <button
          className="w-full cursor-pointer"
          onClick={() =>
            handleButtonEdit({ uuid, username, type, password, email })
          }
        >
          <span className="bg-[#535C91] px-16 py-2 text-sm rounded-sm">
            Save Edit
          </span>
        </button>
      </div>
    </div>
  );
}
