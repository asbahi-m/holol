import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    publicPath: process.env.BASE_URL,
    uploadDir: "uploads/",
  },

  getters: {
    uploadPath: (state) => (path) => {
      return state.publicPath + state.uploadDir + path;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
