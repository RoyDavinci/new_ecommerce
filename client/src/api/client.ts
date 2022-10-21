import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://localhost:8090/api/v1/";

const TOKEN = localStorage.getItem("token");

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const privateRequest = axios.create({
	baseURL: BASE_URL,
});

privateRequest.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		config.headers = config.headers ?? {};
		if (TOKEN) {
			config.headers.Authorization = `Bearer ${TOKEN}`;
			config.headers["Content-Type"] = "multipart/form-data";
		}
		return config;
	},
	(error) => Promise.reject(error)
);
