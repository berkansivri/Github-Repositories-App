import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = process.env.GITHUB_API;

axios.defaults.headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;

Vue.prototype.$axios = axios;
