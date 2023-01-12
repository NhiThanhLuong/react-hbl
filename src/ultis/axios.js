import axios from "axios";
import queryString from "query-string";
// import { storage } from "_constants";

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

function createAxiosResponseInterceptor() {
  const interceptor = axiosClient.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }

      return response;
    },
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }
      // if (
      //   error.response.data.message === "Invalid tokenForbiddenError: Forbidden"
      // ) {
      //   localStorage.removeItem(storage.token);
      //   localStorage.removeItem(storage.user_sent);
      //   window.location.reload();
      // }
      axios.interceptors.response.eject(interceptor);

      return axios
        .patch(
          "https://api-dev.estuary.solutions/hbl-social-auth-dev/v1/auth/refresh-token",
          {
            refresh_token: localStorage.getItem("refresh_token"),
          }
        )
        .then((response) => {
          // saveToken();
          console.log(response);
          localStorage.setItem("access_token", response.data.data.access_token);
          localStorage.setItem(
            "refresh_token",
            response.data.data.refresh_token
          );
          error.response.config.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          // window.location.reload();
          // Retry the initial call, but with the updated token in the headers.
          // Resolves the promise if successful
          return axios(error.response.config);
        })
        .catch((error2) => {
          // Retry failed, clean up and reject the promise
          // destroyToken();
          // this.router.push("/login");
          // window.location.reload();
          return Promise.reject(error2);
        });
      // .finally(createAxiosResponseInterceptor());
      // throw error;
    }
  );
}
createAxiosResponseInterceptor();
// axios.interceptors.response.use(createAxiosResponseInterceptor);

export default axiosClient;
