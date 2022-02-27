<template>
  <header>
    <div class="navbar navbar-secondary" :class="{ fixed: scrolling }">
      <div class="container">
        <router-link class="navbar-brand" to="/" exact-active-class="" active-class="" exact>
          <img src="@/assets/images/logo.png" alt="حلول الخليج" />
        </router-link>
        <button
          type="button"
          class="navbar-toggle"
          :class="{ active: navbarToggle }"
          @click="navbarToggle = !navbarToggle"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div
          tabindex="-1"
          class="navbar-nav collapse"
          :class="{ show: navbarToggle }"
          @click="navbar_click"
          @blur="navbar_blur"
          @keyup.esc="navbarToggle = false"
          v-focus="navbarToggle"
        >
          <a class="nav-link active lang" href="#">English <i class="fas fa-language"></i></a>
          <RouterLinks />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import RouterLinks from "./MenuApp.vue";

export default {
  name: "HeaderApp",

  components: {
    RouterLinks,
  },

  props: ["scrolling"],

  data() {
    return {
      navbarToggle: false,
    };
  },

  methods: {
    navbar_blur($event) {
      // let focued = document.activeElement;
      if (
        $event.relatedTarget?.className.includes("navbar-toggle") ||
        $event.relatedTarget?.className.includes("nav-link")
      )
        return false;
      else this.navbarToggle = !this.navbarToggle;
    },
    navbar_click($event) {
      if ($event.target.className.includes("nav-link")) this.navbarToggle = !this.navbarToggle;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/scss/tools" as *;

.navbar-nav {
  flex-direction: column;
  .lang {
    margin-right: auto;
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    @include media-down("sm") {
      flex-direction: column;
    }
  }
}
</style>
