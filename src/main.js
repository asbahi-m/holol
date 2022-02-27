import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

import VueNumber from "vue-number-animation";
Vue.use(VueNumber);

// JS Files
import "./filters";
import "./directives";

// CSS Files
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/scss/main.rtl.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
