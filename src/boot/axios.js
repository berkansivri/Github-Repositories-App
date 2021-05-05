import Vue from "vue";
import { Notify } from "quasar";
import axios from "axios";

let axiosInstance = axios.create({
  baseURL: process.env.GITHUB_API,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  }
});

Vue.prototype.$axios = axiosInstance;

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    Notify.create({
      caption: error.response.status,
      message: error.response.data.message,
      color: "red",
      icon: "warning",
      position: "top-right",
      timeout: 3000
    });
  }
);

export default axiosInstance;
