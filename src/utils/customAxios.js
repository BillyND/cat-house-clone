import axios from "axios";

const instance = axios.create({
  baseURL: "https://luxuriant-massive-denim.glitch.me/",
  // baseURL: "https://3nqjur-8000.csb.app/",
  // baseURL: "https://json-server-frs-manager-user.vercel.app/",
  // baseURL: "https://petshop-api-thoe.onrender.com/",
  // baseURL: "http://localhost:8000",
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
