<template>
  <div class="post-meta">
    <span v-if="author"><i class="far fa-user"></i>{{ author }}</span>
    <span v-if="category">
      <i class="fas fa-sitemap"></i
      >{{ $i18n.locale !== "en" && category[$i18n.locale] ? category[$i18n.locale].name : category.name }}
    </span>
    <!-- <small v-if="date"><i class="far fa-calendar-alt"></i> {{ date | toDate($i18n.locale) }}</small> -->
    <span v-if="date"><i class="far fa-calendar-alt"></i>{{ $d(new Date(date), "short") }}</span>
  </div>
</template>

<script>
import Data from "/db.json";

export default {
  name: "PostMeta",

  props: ["user", "category", "date"],

  computed: {
    author() {
      let author = Data.users.filter((item) => item.id == this.user);
      if (author.length) return author[0].nickname ? author[0].nickname : author[0].username;
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/scss/tools/variables" as *;

.post-meta {
  :not(:last-child)::after {
    content: "";
  }
  i {
    color: $primary-color;
  }
}
</style>
