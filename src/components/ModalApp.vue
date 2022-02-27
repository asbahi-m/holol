<template>
  <transition name="fade">
    <div
      class="modal"
      tabindex="-1"
      v-show="modal.show"
      v-focus="modal.show"
      @click.self="$emit('modal_close_event')"
      @keyup.esc="$emit('modal_close_event')"
    >
      <transition name="side-slide">
        <div class="modal-body container" v-show="modal.show">
          <div class="modal-header">
            <button type="button" class="modal-close btn btn-primary" @click="$emit('modal_close_event')">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-content">
            <div class="post-img">
              <img v-if="modal.image" :src="`${$store.getters.uploadPath(modal.image)}`" :alt="modal.title" />
            </div>
            <h2 class="post-title">{{ modal.title }}</h2>
            <p class="post-content">{{ modal.brief | htmlString | truncate }}</p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: ["modal"],
  mounted() {
    // if (this.modal.show) {
    //   console.log("Modal");
    //   window.onkeyup = function () {
    //     console.log("dddd");
    //   };
    // }
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.side-slide-enter-active {
  animation: slide-in 0.5s;
}
.side-slide-leave-active {
  animation: slide-in 0.5s reverse;
}
.modal-header {
  position: static !important;
}
.modal-content {
  display: block !important;
  // height: auto !important;
  overflow-y: auto;
  padding: 30px;
  color: #000;
  background-color: #fff;
  .post-img {
    text-align: center;
  }
}
</style>
