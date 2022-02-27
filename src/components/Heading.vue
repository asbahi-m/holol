<template>
  <section class="heading text-light img-fill">
    <div class="container">
      <h1 class="text-bold" :class="{ 'text-larger': $route.name != 'Post' }">{{ data.title ? data.title : title }}</h1>
      <!-- <div class="text-bold text-larger">حلول الخليج</div> -->
      <!-- <div class="text-large">Gulf Solutions</div> -->
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }" exact>الرئيسية</router-link></li>
        <li class="breadcrumb-item" v-if="category">
          <router-link :to="{ name: 'Category', params: { id: category.id } }" exact>{{ category.name }}</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: routeName, params: { id: data.id } }">
            {{ data.title ? data.title : title }}
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="overlay-img"
      :style="{ backgroundImage: data.image ? `url(${$store.getters.uploadPath(data.image)}` : `url(${image})` }"
    ></div>
  </section>
</template>

<script>
export default {
  name: "Heading",

  props: {
    data: {
      type: [String, Object],
      default: "",
    },
    category: [Object],
    title: [String],
    image: [String],
  },

  computed: {
    routeName() {
      return this.$options.parent.$options.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.heading.img-fill {
  padding-top: 100px;
  .overlay-img {
    background-position-y: 20%;
  }
}
</style>
