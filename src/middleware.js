import { NextResponse } from "next/server";

export function middleware(req) {
    const session = req.cookies.get("connect.sid"); // Sesuaikan dengan nama session cookie Anda
    const { pathname } = req.nextUrl;

    // Jangan ganggu akses ke public assets dan Next.js API
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/_next/") || 
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/public/")
    ) {
        return NextResponse.next();
    }

    // Redirect ke login jika user tidak memiliki sesi
    if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// Terapkan middleware pada semua halaman kecuali static files
export const config = {
    matcher: ["/((?!_next|favicon.ico|public).*)"], 
};
