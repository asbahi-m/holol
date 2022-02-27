<template>
  <div class="carousel img-fill container-fluid">
    <transition-group class="carousel-inner" :name="transitionName" tag="div">
      <div
        class="carousel-item"
        v-for="(item, index) in items"
        v-show="index == currentIndex"
        :class="{ active: index == currentIndex }"
        :key="item.id"
      >
        <div class="item-caption container text-center">
          <!-- <div class="text-bold text-larger">حلول الخليج{{ index }}</div>
          <div class="text-large">Gulf Solutions</div> -->
          <div class="sub-title uppercase">Gulf Solutions</div>
          <h1 class="item-title uppercase">{{ item.title }}</h1>
          <p class="item-desc text-center">{{ item.brief ? item.brief : item.content | truncate(260) | htmlString }}</p>
          <div class="buttons">
            <router-link
              type="button"
              :to="{ name: 'Post', params: { id: item.id } }"
              class="btn btn-primary read-more"
            >
              المزيد من المعلومات
            </router-link>
            <router-link type="button" class="btn btn-primary btn-outline" :to="{ name: 'Order' }">
              طلب خدمة الآن
            </router-link>
          </div>
        </div>
        <div
          class="item-img overlay-img"
          :style="{ 'background-image': `url(${$store.getters.uploadPath(item.image)}` }"
        ></div>
      </div>
    </transition-group>
    <div class="carousel-control">
      <a href="#prev-slider" class="prev" @click.prevent="toPrev"></a>
      <a href="#next-slider" class="next" @click.prevent="toNext"></a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],

  data() {
    return {
      transitionName: "fade",
      currentIndex: 0,
      show: false,
    };
  },

  mounted() {
    this.show = true;
  },

  methods: {
    toNext() {
      this.transitionName = "slide-next";
      let len = this.items.length;
      this.currentIndex = (this.currentIndex + (1 % len) + len) % len;
      // if (this.currentIndex == this.items.length - 1) this.currentIndex = 0;
      // else this.currentIndex++;
    },

    toPrev() {
      this.transitionName = "slide-prev";
      let len = this.items.length;
      this.currentIndex = (this.currentIndex + (-1 % len) + len) % len;
      // if (this.currentIndex <= 0) this.currentIndex = this.items.length - 1;
      // else this.currentIndex--;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/scss/tools/" as *;
.slide-next-enter-active,
.slide-next-leave-active {
  transition: transform 0.5s ease-in;
}
.slide-next-enter {
  transform: translateX(#{$plus-dir + 100%});
}
.slide-next-leave-to {
  transform: translateX(#{$minus-dir + 100%});
}

.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.5s ease-out;
}
.slide-prev-enter {
  transform: translateX(#{$minus-dir + 100%});
}
.slide-prev-leave-to {
  transform: translateX(#{$plus-dir + 100%});
}
</style>
