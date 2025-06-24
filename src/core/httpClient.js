import axios from "axios";
import {toast} from "react-toastify";

export const Axios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 150000000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const get = async (url, params) => {
    try {
        return await Axios.get(url, {params});
    } catch {
        return toast.error('Something went wrong!');
    }
}

export const post = async (url, params) => {
    try {
        return await Axios.post(url, params);
    } catch {
        return toast.error('Unsuccessfull!');
    }
}

export const put = async (url, params) => {
    try {
        return await Axios.put(url, params);
    } catch {
        return toast.error('Unsuccessfully updated!');
    }
}

export const del = async (url) => {
    try {
        return await Axios.delete(url);
    } catch {
        return toast.error('Unsuccessfully deleted!');
    }
}
