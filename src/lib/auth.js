import { cookies } from "next/headers";
import api from "../utils/api"; // Helper API untuk backend Express.js

export async function getUserSession() {
    const sessionCookie = cookies().get("connect.sid")?.value;
    if (!sessionCookie) return null;

    try {
        const res = await api.get("/me", {
            headers: { Cookie: `connect.sid=${sessionCookie}` },
        });
        return res.data;
    } catch (error) {
        return null;
    }
}
