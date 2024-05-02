import { createApp } from "vue";
// import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 1000,
  theme: "colored",
});

app.mount("#app");
