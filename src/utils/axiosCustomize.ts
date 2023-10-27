import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  timeout: 1000,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("first", config);
    return config;
  },
  function (error) {
    console.log("error", error);
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("check res", response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("check err", error);

    return Promise.reject(error);
  }
);

export default instance;
