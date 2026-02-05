import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { clearSession, getToken } from "@/lib/auth/session";

type ApiError = {
	status?: number;
	message: string;
	data?: unknown;
};

type RequestConfig = AxiosRequestConfig & {
	withAuth?: boolean;
};

const apiBaseUrl =
	process.env.NEXT_PUBLIC_API_BASE_URL || "https://staging.networkx.ai/api/v1";

const api: AxiosInstance = axios.create({
	baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
	const nextConfig = config as RequestConfig;
	config.headers = config.headers ?? {};
	config.headers.Accept = "application/json";

	const apiKey = process.env.NEXT_PUBLIC_API_KEY;
	if (apiKey && apiKey.trim().length > 0) {
		config.headers["x-api-key"] = apiKey;
	}

	if (nextConfig.withAuth) {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	return config;
});

api.interceptors.response.use(
	(response) => {
		if (typeof response.data === "string") {
			const start = response.data.indexOf("{");
			const end = response.data.lastIndexOf("}");
			if (start !== -1 && end !== -1 && end > start) {
				const maybeJson = response.data.slice(start, end + 1);
				try {
					response.data = JSON.parse(maybeJson);
				} catch {
					// Keep original string if parsing fails.
				}
			}
		}
		return response;
	},
	(error: AxiosError) => {
		const status = error.response?.status;
		const data = error.response?.data;
		const message =
			(data as { message?: string })?.message ||
			error.message ||
			"Request failed";

		if (status === 401 && typeof window !== "undefined") {
			clearSession();
			window.location.href = "/auth/sign-in";
		}

		const normalized: ApiError = { status, message, data };
		return Promise.reject(normalized);
	},
);

export default api;
export type { ApiError, RequestConfig };
