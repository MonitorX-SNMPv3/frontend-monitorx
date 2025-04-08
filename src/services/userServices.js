import api from "@/utils/api";
import { toast } from "react-toastify";

export const SendEditUser = async (attribute) => {
    let payload = {};
    try {
        payload = {
            "uuid": attribute.uuid,
            "type": attribute.type,
            "name": attribute.username,
            "email": attribute.email,
            "password": attribute.password
        }
        let response = await api.patch('/edit_user', payload);
        toast.success(response.data.msg);
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.msg || "Something went wrong!");
        } else {
            toast.error("Network error or server not responding.");
        }
    }
}

export const SendAddUser = async (attribute) => {
    let payload = {};
    try {
        payload = {
            "type": attribute.type,
            "name": attribute.username,
            "email": attribute.email,
            "password": attribute.password,
            "confirmPass": attribute.confPassword
        }
        console.log(payload);
        
        let response = await api.post('/add_user', payload);
        toast.success(response.data.msg);
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.msg);
        } else {
            toast.error("Network error or server not responding.");
        }
    }
}