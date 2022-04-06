import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // keyName: "metaInfo",
  // attribute: "data-vue-meta",
  // ssrAttribute: "data-vue-meta-server-rendered",
  // tagIDKeyName: "vmid",
  refreshOnceOnNavigation: true,
});

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import VueNumber from "vue-number-animation";
Vue.use(VueNumber);

// JS Files
import "./filters";
import "./directives";

// CSS Files
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/scss/app.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
