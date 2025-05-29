import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


export const Axios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 150000000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const get = async (url, params) => await Axios.get(url, {params})