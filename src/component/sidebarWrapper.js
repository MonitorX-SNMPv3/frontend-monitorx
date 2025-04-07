"use client";

import { usePathname } from "next/navigation";
import NavigationSidebar from "@/component/sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  // Hide the sidebar on the '/login' page
  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-68 text-white p-4">
      <NavigationSidebar />
    </div>
  );
}
