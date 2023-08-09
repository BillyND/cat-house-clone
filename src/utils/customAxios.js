import axios from "axios";

const instance = axios.create({
  baseURL: "https://enshrined-various-smelt.glitch.me/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response ? response.data : response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
