<template>
  <div id="app">
    <HeaderApp :scrolling="scrolling" />

    <ModalApp :modal="modal" @modal_close_event="modalClose" />

    <transition name="fade" mode="in-out">
      <router-view @modal_open_event="modalOpen" />
    </transition>

    <router-link :to="{ hash: 'top' }" v-slot="{ navigate }" custom>
      <transition name="fade">
        <button
          type="button"
          class="icon icon-primary"
          id="to-up"
          @click="navigate"
          v-show="scrolling"
          v-scroll="toUpScroll"
        >
          <i class="fas fa-chevron-up"></i>
        </button>
      </transition>
    </router-link>

    <FooterApp />
  </div>
</template>

<script>
import HeaderApp from "./components/HeaderApp.vue";
import FooterApp from "./components/FooterApp.vue";
import ModalApp from "./components/ModalApp.vue";

export default {
  components: {
    HeaderApp,
    FooterApp,
    ModalApp,
  },

  data() {
    return {
      scrolling: false,
      modal: {
        show: false,
        title: "",
        brief: "",
        image: "",
      },
    };
  },

  mounted() {
    // Change language if localStorage found or browser locale is ar
    const locale = localStorage.getItem("locale_site");
    if (locale) {
      this.$i18n.locale = locale;
    } else if (navigator.language === "ar") {
      this.$i18n.locale = navigator.language.substring(0, 2);
    }
    // Add RTL style file:
    if (this.$i18n.locale === "ar") {
      require("@/assets/scss/app-extend.rtl.scss");
    }

    if (this.modal.show) {
      window.onkeyup = function (x) {
        if (x.keyCode == 27 || x.which == 27) {
          return (this.modal.show = false);
        }
      };
    }
  },

  methods: {
    toUpScroll() {
      if (window.scrollY > 300) {
        this.scrolling = true;
        document.body.setAttribute("style", "margin-top: 150px");
      } else {
        this.scrolling = false;
        document.body.removeAttribute("style");
      }
      // return window.scrollY > 300;
    },
    modalOpen(title, brief, image) {
      this.modal.show = !this.modal.show;
      this.modal.title = title;
      this.modal.brief = brief;
      this.modal.image = image;
    },
    modalClose() {
      this.modal.show = !this.modal.show;
      setTimeout(() => {
        this.modal.title = "";
        this.modal.brief = "";
        this.modal.image = "";
      }, 500);
    },
  },

  // metaInfo: {
  //   title: "Gulf Solutions",
  //   // titleTemplate: "%s - Yay!",
  //   meta: [{ vmid: "description", name: "description", content: "Description Gulf Solutions" }],
  // },
  // eslint-disable-next-line no-dupe-keys
  metaInfo() {
    const locale = this.$i18n.locale;
    return {
      title: this.$t("site_name"),
      meta: [
        { vmid: "description", name: "description", content: this.$t("site_brief") },
        { vmid: "thumbnail", name: "thumbnail", content: require("@/assets/images/logo.png") },
        { name: "twitter:card", content: "summary" },
        { property: "og:url", content: this.$route.path },
        { vmid: "og:title", property: "og:title", content: this.$t("site_name") },
        { vmid: "og:description", property: "og:description", content: this.$t("site_brief") },
        { vmid: "og:image", property: "og:image", content: require("@/assets/images/logo.png") },
        { property: "og:type", content: "Article" },
        { property: "og:locale", content: locale },
      ],
      htmlAttrs: {
        lang: locale,
        dir: locale === "ar" ? "rtl" : null,
      },
      // titleTemplate: "%s - Home",)
    };
  },
  // metaInfo() {
  //   // const locale = this.$i18n.locale;
  //   return {
  //     title: this.$t("site_name"),
  //     // titleTemplate: (chunk) => (locale === "en" ? `${chunk} - Welcome` : `${chunk} - مرحباً`),
  //   };
  // },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

html {
  height: 100%;
  body {
    height: 100%;
  }
  p {
    line-height: 2;
  }
}

#app {
  display: flex;
  flex-direction: column;
  // height: 100%;
  .title {
    font-size: 30px;
    a {
      color: #343434;
      transition: color 0.3s ease-out;
      &:hover {
        color: #a9ce39;
      }
    }
  }
  > header {
    position: relative;
    top: 60px;
    background-color: #fff;
    z-index: 1;
  }
  #main-slider .img-fill .carousel-item {
    padding-top: 60px;
  }
  > footer {
    margin-top: auto;
  }
}
</style>
