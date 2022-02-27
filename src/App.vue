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
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap");
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
