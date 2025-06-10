import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 150000000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const get = async (url, params) => {
    return await Axios.get(url, {params});
}

export const post = async (url, params) => {
    return await Axios.post(url, params);
}

export const put = async (url, params) => {
    return await Axios.put(url, params);
}

export const del = async (url) => {
    return await Axios.delete(url);
}
