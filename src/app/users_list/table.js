/* eslint-disable @next/next/no-img-element */
import { SendAddUser, SendEditUser } from "@/services/userServices";
import api from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TableUsers() {
  const [loading, setLoading] = useState(true);
  const [ editPop, setEditPop ] = useState(false);
  const [ addPop, setAddPop ] = useState(false);
  const [showPassword, setShowPassword ] = useState(false);
  const [ showConfPassword, setShowConfPassword ] = useState(false);
  const [ buttonLoad, setButtonLoad ] = useState(false);

  const [data, setData] = useState([]);

  const [uuid, setUUIDUser ] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ confPassword, setConfPassword ] = useState("");
  const [type, setType] = useState("ADMIN");

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

  const handleDelete = async (uuid) => {
    const toastprop = toast.loading("Loading...");
    
    try {
      const payload = { uuid: uuid };
      const response = await api.delete("/delete_user", { data: payload });
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
          render: error.response.data.msg ,
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
  };

  // This handler receives a user item from the table and sets the state for editing
  const handleEdit = (item) => {
    setUUIDUser(item.uuidUsers || "");
    setUsername(item.name || "");
    setEmail(item.email || "");
    setType(item.type || "ADMIN");
    // If password is not available, you can leave it empty or handle it accordingly.
    setPassword("");
    setEditPop(true);
  };

  const handleButtonEdit = async (attribute) => {
    try {
      setButtonLoad(true);
      const result = await SendEditUser(attribute);
      getData();
      setEditPop(false);
      setButtonLoad(false);
    } catch (error) {
      setLoading(false);
    }
    setUUIDUser("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setType("ADMIN");
  }
  
  const handleButtonAdd = async (attribute) => {
    try {
      setButtonLoad(true);
      const result = await SendAddUser(attribute);
      getData();
      setAddPop(false);
      setButtonLoad(false);
    } catch (error) {
      setLoading(false);
    }
    setUsername("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setType("ADMIN");
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="relative flex flex-col">
      <button onClick={() => setAddPop(!addPop)} className="text-sm self-end font-semibold w-fit px-5 py-1 bg-[#535C91] rounded-sm">Add Users</button>
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
                        className={`${index % 2 === 0 ? "bg-[#9290C3]/50" : "bg-[#535C91]/50"} hover:bg-white/10`}
                      >
                        <td colSpan={7} className="px-6 py-4 rounded-sm h-[55px] items-center">
                          <div className="loader h-1.5 rounded-full"></div>
                        </td>
                      </tr>
                    ))
                  ) : data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item?.uuidUsers} className="bg-[#9290C3]/50">
                        <td className="px-6 py-4 text-start text-xs font-medium text-white capitalize rounded-l-sm">
                          {item?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center text-xs font-medium text-white">
                          {item?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center text-xs font-medium text-white uppercase">
                          {item?.type || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-center text-xs font-medium text-white capitalize">
                          {data ? new Date(new Date(item.createdAt).getTime() + 7 * 60 * 60 * 1000).toUTCString() : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium rounded-r-sm">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex bg-[#1B1A55] px-3 py-1 items-center gap-1 rounded-sm cursor-pointer"
                          >
                            <img src="/icon-info.svg" alt="" className="h-[14px]" />
                            <p>Edit</p>
                          </button>
                          <button
                            onClick={() => handleDelete(item.uuidUsers)}
                            className="bg-[#F65D60] p-1.5 rounded-sm ml-[3px] cursor-pointer"
                          >
                            <img src="/icon-trash.svg" alt="" className="h-[15px]" />
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
                  )}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
      {editPop && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setEditPop(false)}
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
            <button className="w-full cursor-pointer" onClick={() => {handleButtonEdit({ uuid, username, type, password, email })}}>
              <span className="bg-[#535C91] px-16 py-2 text-sm rounded-sm">Save Edit</span>
            </button>
          </div>
        </div>
      )}
      {addPop && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setAddPop(false)}
        >
          <div
            className="bg-[#1B1A55] text-white p-6 rounded-lg shadow-lg w-[600px] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-sm font-bold mb-1">Add User</h2>
            <hr className="w-full mb-3" />
            <div className="flex gap-5 w-full">
              <div className="flex flex-col w-full">
                <div>
                  <p className="text-xs font-medium">Name</p>
                  <input
                    id="name"
                    type="text"
                    placeholder="Name"
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white text-[13px] text-black py-1 px-5 rounded-sm outline-none mb-4 w-full"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Type</p>
                  <select
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-white text-black text-[13px] py-1 px-5 outline-none rounded-sm mb-4"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="USER">USER</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="relative">
                  <p className="text-xs font-medium">Password</p>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
                <div className="relative">
                  <p className="text-xs font-medium">Confirm Password</p>
                  <input
                    id="password"
                    type={showConfPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                    className="bg-white text-[13px] text-black py-1 px-5 pr-10 rounded-sm outline-none mb-4 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfPassword(!showConfPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfPassword ? (
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
            <button className="w-full cursor-pointer" onClick={() => {handleButtonAdd({ username, type, password, confPassword, email })}}>
              <span className="bg-[#535C91] px-16 py-2 text-sm rounded-sm">Confirm Add</span>
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
