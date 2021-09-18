import { auth, onAuthStateChanged } from "@/firebase/config";
import { App as Application, createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

let app: Application;
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.mount("#app");
  }
});
