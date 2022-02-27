<template>
  <div v-if="posts.length" :class="{ 'card-list': layout == 'list', 'card-grid': layout == 'grid' }">
    <Posts v-for="post in posts" :key="post.id" :data="post" :layout="layout" @modal_open_event="modal_open_event" />
  </div>
</template>

<script>
import Posts from "@/components/Posts.vue";

export default {
  name: "Blog",

  components: {
    Posts,
  },

  props: ["layout", "posts"],

  methods: {
    modal_open_event(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },
};
</script>
