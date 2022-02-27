<template>
  <div class="post-meta">
    <small v-if="author"><i class="far fa-user"></i> {{ author }}</small>
    <small v-if="date"><i class="far fa-calendar-alt"></i> {{ date | toDate }}</small>
  </div>
</template>

<script>
import Data from "/db.json";

export default {
  name: "PostMeta",

  props: ["user", "date"],

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
  display: flex;
  flex-wrap: wrap;
  :not(:first-child)::before {
    content: "";
    padding: 0 $gutter-sm;
  }
  i {
    color: $primary-color;
    padding: 0 5px;
  }
}
</style>
