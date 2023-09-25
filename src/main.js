import { createApp } from "vue";
// import './style.css'
// import './index.css'
import "./assets/css/main.css";
import store from "./store";
import router from "./router";
// import Toast from 'vue-toastification'
// import { PrinterIcon } from '@heroicons/vue/outline'
import ToastPlugin from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-bootstrap.css";
import "font-awesome/css/font-awesome.css";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import App from "./App.vue";

import Pusher from "pusher-js";

window.Pusher = Pusher;

import Echo from "laravel-echo";
// import { useStore } from "vuex";

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: 'eu',
  // encrypted: true,
  // forceTLS: true,
  // wsHost: 'ws-eu-.pusher.com',
  // wsPort: 443,
  authEndpoint: "http://localhost:8000/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("api_token")}`, // Include the token in the headers
    },
  },
});

console.log("echo, ", window.Echo);


createApp(App)
  .use(store)
  .use(ToastPlugin)
  .use(router)
  .component("QuillEditor", QuillEditor)
  // .component('PrinterIcon', PrinterIcon)
  .mount("#app");
