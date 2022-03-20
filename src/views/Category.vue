<template>
  <main class="page">
    <Heading
      :data="category"
      :title="$i18n.locale !== 'en' && category[$i18n.locale] ? category[$i18n.locale].name : category.name"
      :category="parentCategory"
    />

    <section class="content">
      <div class="container">
        <ul class="categories">
          <li class="item" v-for="category in childrenCategory" :key="category.id">
            <router-link :to="{ name: 'Category', params: { id: category.id } }">
              {{ $i18n.locale !== "en" && category[$i18n.locale] ? category[$i18n.locale].name : category.name }}
            </router-link>
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
import { tranlateMixin } from "@/mixins";

export default {
  name: "Category",

  components: {
    Heading,
    Blog,
  },

  mixins: [tranlateMixin],

  computed: {
    category() {
      const categoryData = Data.categories.filter((item) => item.id == this.$route.params.id);
      this.t_data(categoryData, Data.t_categories, "category_id");
      return categoryData[0];
    },

    parentCategory() {
      const category = Data.categories.filter((item) => item.id == this.category.parent_id);
      this.t_data(category, Data.t_categories, "category_id");
      return category[0];
    },

    childrenCategory() {
      const categories = Data.categories.filter((item) => item.parent_id == this.category.id);
      this.t_data(categories, Data.t_categories, "category_id");
      return categories;
    },

    posts() {
      const allPosts = Data.posts.filter((item) => item.category_id == this.category.id);
      this.t_data(allPosts, Data.t_posts, "post_id");
      return allPosts;
    },
  },

  methods: {
    modal_open_hanler(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },

  beforeRouteEnter(to, from, next) {
    const exist = Data.categories.find((item) => item.id == to.params.id);
    if (!exist) {
      next({
        name: "Error404",
        params: { pathMatch: to.path.split("/").slice(1) },
        query: to.query,
        hash: to.hash,
      });
    }
    next();
  },

  metaInfo() {
    const locale = this.$i18n.locale;
    return {
      titleTemplate: (chunk) =>
        `${chunk} - ${locale !== "en" && this.category[locale] ? this.category[locale].name : this.category.name}`,
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content: locale !== "en" && this.category[locale] ? this.category[locale].name : this.category.name,
        },
      ],
    };
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
