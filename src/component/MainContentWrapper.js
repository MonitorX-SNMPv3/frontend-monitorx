"use client";
import { usePathname } from "next/navigation";

export default function MainContentWrapper({ children }) {
  const pathname = usePathname();

  // When on the '/login' page, center the children
  if (pathname === "/login") {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        {children}
      </div>
    );
  }

  // Default layout when sidebar is visible
  return <div className="ml-64 w-full">{children}</div>;
}
