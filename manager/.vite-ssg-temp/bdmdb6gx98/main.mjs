import { defineComponent, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import axios from "axios";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ViteSSG } from "vite-ssg";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HelloWorld",
  __ssrInlineRender: true,
  props: {
    msg: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h1${ssrRenderAttrs(_attrs)}>${ssrInterpolate(_ctx.msg)}</h1>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/HelloWorld.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useFetch = (url, timeout, fetchCfg) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("请求超时"));
    }, timeout);
    fetch(url, fetchCfg == null ? void 0 : fetchCfg.options).then((res) => res.json()).then((res) => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    }).finally(() => {
      clearTimeout(timeoutId);
    });
  });
};
const useAxios = axios.create({
  baseURL: "",
  timeout: 5e3
});
useAxios.interceptors.request.use(
  (config) => {
    let userToken = localStorage.getItem("userToken") || "";
    if (userToken) {
      config.headers["Authorization"] = userToken;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
useAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const getHotWord = async () => {
      let fres = await useFetch("https://pilipili-server.icu/hotword", 5e3);
      console.log(fres);
      let ares = await useAxios({
        url: "https://pilipili-server.icu/hotword",
        timeout: 5e3
      });
      console.log(ares);
    };
    getHotWord();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterView = resolveComponent("RouterView");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { msg: "我是HelloWorld组件" }, null, _parent));
      _push(ssrRenderComponent(_component_RouterView, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: () => import("./assets/Index-CxaQYWTs.js")
  }
];
const createApp = ViteSSG(
  _sfc_main,
  { routes },
  ({ app, router, isClient, initialState, onSSRAppRendered }) => {
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);
    app.use(pinia);
    app.use(router);
    app.use(ElementPlus);
    if (isClient) {
      pinia.state.value = initialState.pinia || {};
    } else {
      onSSRAppRendered(() => {
        initialState.pinia = pinia.state.value;
      });
    }
  }
);
export {
  createApp
};
