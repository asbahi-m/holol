<template>
  <section class="heading text-light img-fill">
    <div class="container">
      <h1 class="text-bold" :class="{ 'text-larger': $route.name != 'Post' }">
        {{ data.title ? ($i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].title : data.title) : title }}
      </h1>
      <!-- <div class="text-bold text-larger">{{ $t("site_name") }}</div> -->
      <!-- <div class="text-large">Gulf Solutions</div> -->
      <ul class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }" exact>{{ $t("nav.home") }}</router-link>
        </li>
        <li class="breadcrumb-item" v-if="category">
          <router-link :to="{ name: 'Category', params: { id: category.id } }" exact>
            {{ $i18n.locale !== "en" && category[$i18n.locale] ? category[$i18n.locale].name : category.name }}
          </router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: routeName, params: { id: data.id } }">
            {{
              data.title ? ($i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].title : data.title) : title
            }}
          </router-link>
        </li>
      </ul>
    </div>
    <div
      class="overlay-img"
      :style="{ backgroundImage: data.image ? `url(${$store.getters.uploadPath(data.image)}` : `url(${imageHeading})` }"
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
    imageHeading() {
      return this.image ? this.image : require("@/assets/images/breadcrumb.png");
    },

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
