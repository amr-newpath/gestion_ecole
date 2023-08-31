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

import App from "./App.vue";

createApp(App)
  .use(store)
  .use(ToastPlugin)
  .use(router)
  // .component('PrinterIcon', PrinterIcon)
  .mount("#app");
