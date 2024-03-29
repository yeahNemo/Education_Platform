import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./style.scss";
import http from "@/utils/http";
import VCharts from "v-charts";
// V-Chart 图表
Vue.use(VCharts);

Vue.prototype.$http = http;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
