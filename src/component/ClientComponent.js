"use client"; // Pastikan ini adalah Client Component

import { usePathname } from "next/navigation";

export default function ClientComponent({ children }) {
    const pathname = usePathname();

    return children(pathname);
}
