import { withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { E as ElText } from "../main.mjs";
import "axios";
import "pinia";
import "pinia-plugin-persistedstate";
import "vite-ssg";
import "lodash-unified";
import "@vue/shared";
import "@vueuse/core";
import "@element-plus/icons-vue";
import "@popperjs/core";
import "@ctrl/tinycolor";
import "dayjs";
import "dayjs/plugin/localeData.js";
import "dayjs/plugin/customParseFormat.js";
import "dayjs/plugin/advancedFormat.js";
import "dayjs/plugin/weekOfYear.js";
import "dayjs/plugin/weekYear.js";
import "dayjs/plugin/dayOfYear.js";
import "dayjs/plugin/isSameOrAfter.js";
import "dayjs/plugin/isSameOrBefore.js";
import "async-validator";
import "memoize-one";
import "normalize-wheel-es";
import "@floating-ui/dom";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_text = ElText;
  _push(ssrRenderComponent(_component_el_text, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`我是Index组件`);
      } else {
        return [
          createTextVNode("我是Index组件")
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/Index/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Index as default
};
