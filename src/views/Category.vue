<template>
  <main class="page">
    <Heading
      :data="category"
      :title="category.name"
      :category="parentCategory"
      :image="require('@/assets/images/breadcrumb.png')"
    />

    <section class="content">
      <div class="container">
        <ul class="categories">
          <li class="item" v-for="category in childrenCategory" :key="category.id">
            <router-link :to="{ name: 'Category', params: { id: category.id } }">{{ category.name }}</router-link>
            <i class="fab fa-elementor"></i>
          </li>
        </ul>
        <Blog :posts="posts" layout="list" @modal_open_event="modal_open_hanler" />
      </div>
    </section>
  </main>
</template>

<script>
import Data from "/db.json";
import Heading from "@/components/Heading.vue";
import Blog from "@/components/templates/Blog.vue";

export default {
  name: "Category",

  components: {
    Heading,
    Blog,
  },

  computed: {
    category() {
      const categoryData = Data.categories.filter((item) => item.id == this.$route.params.id);
      return categoryData[0];
    },

    parentCategory() {
      const category = Data.categories.filter((item) => item.id == this.category.parent_id);
      return category[0];
    },

    childrenCategory() {
      const categories = Data.categories.filter((item) => item.parent_id == this.category.id);
      return categories;
    },

    posts() {
      const allPosts = Data.posts.filter((item) => item.category_id == this.category.id);
      return allPosts;
    },
  },

  methods: {
    modal_open_hanler(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "sass:math";
@use "../assets/scss/tools" as *;

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: -$gutter-base;
  margin-right: -$gutter-base;
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    text-align: center;
    padding: $gutter-base;
    a {
      order: 2;
      width: 100%;
      padding: $gutter-xl;
      background-color: $light-color;
      color: $secondary-color;
      border-bottom: 1px solid $primary-color;
      @include transition();
      &:hover {
        color: $white;
        background-color: $primary-color;
        + i {
          color: $light-color;
          background-color: $secondary-color;
        }
      }
    }
    i {
      height: $gutter-xl;
      width: $gutter-xl;
      border-radius: 50%;
      line-height: $gutter-xl;
      text-align: center;
      font-size: $font-size-md;
      color: $white;
      background-color: $primary-color;
      position: relative;
      top: math.div($gutter-xl, 2);
      @include transition();
    }
  }
}
</style>
