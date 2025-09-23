import { createSSRApp } from "vue";
import App from "./App.vue";
import { setupStore } from "@/stores";

export function createApp() {
  const app = createSSRApp(App);

  // 全局注册 store
  setupStore(app);
  return {
    app,
  };
}
