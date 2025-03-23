import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token"); // Ambil token dari cookies
    const { pathname } = req.nextUrl;

    // console.log("📌 Middleware Debugging:");
    // console.log(`🔹 Pathname: ${pathname}`);
    // console.log(`🔹 Token: ${token ? "✅ Ada Token" : "❌ Tidak Ada Token"}`);

    // Jangan ganggu akses ke public assets dan Next.js API
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/_next/") || 
        pathname.startsWith("/favicon.ico") ||
        pathname.endsWith(".svg")
    ) {
        // console.log("🔹 Public asset detected, skipping middleware...");
        return NextResponse.next();
    }    

    // if (!token) {
    //     console.log("🚫 Tidak ada token, redirect ke /login");
    //     return NextResponse.redirect(new URL("/login", req.url));
    // }

    // console.log("✅ Token valid, lanjutkan request...");
    return NextResponse.next();
}

// Terapkan middleware pada semua halaman kecuali static files
export const config = {
    matcher: ["/((?!_next|favicon.ico|public).*)"], 
};
