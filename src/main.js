import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/base.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, {
  position: "bottom-right",
  timeout: 3000,
  transition: "Vue-Toastification__fade",
  theme: "dark",
});

app.mount("#app");
