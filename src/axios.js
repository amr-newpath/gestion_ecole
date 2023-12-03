import axios from "axios";
import store from "./store";


const axiosClient = axios.create({
  // baseURL: "http://localhost:8000/api",
   baseURL: "http://154.38.170.231:8080/api",
});


// axiosClient.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${store.state.user.token}`;
//   return config;
// });

axiosClient.interceptors.request.use((config) => {

  config.headers["X-CSRF-TOKEN"] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  if (store.state.user.token) {
    config.headers["Authorization"] = `Bearer ${store.state.user.token}`;
  }
  return config;
});


export default axiosClient;
