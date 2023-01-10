import axios from "axios";
import queryString from "query-string";
import { storage } from "_constants";

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  // baseURL: "https://lubrytics.com:8443/nadh-api-crm",
  baseURL: "https://api-dev.estuary.solutions",
});

axiosClient.interceptors.request.use(async (config) => {
  config.paramsSerializer = (params) => queryString.stringify(params);
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (
      error.response.data.message === "Invalid tokenForbiddenError: Forbidden"
    ) {
      localStorage.removeItem(storage.token);
      localStorage.removeItem(storage.user_sent);
      window.location.reload();
    }
    throw error;
  }
);

export default axiosClient;
