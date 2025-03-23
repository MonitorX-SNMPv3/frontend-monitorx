import api from "@/utils/api";
import axios from "axios";

export const checkAuth = async (ctx) => {
    try {
        const { data } = await api.get(`/me`, {
            headers: ctx.req ? { cookie: ctx.req.headers.cookie || "" } : {},
            withCredentials: true,
        });

        return { isLoggedIn: data.isLoggedIn, user: data.user };
    } catch (error) {
        return { isLoggedIn: false, user: null };
    }
};
