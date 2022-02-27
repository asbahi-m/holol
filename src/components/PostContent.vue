<template>
  <div class="post">
    <div class="post-img"><img :src="$store.getters.uploadPath(data.image)" :alt="data.title" /></div>
    <h2 class="post-title">{{ data.title }}</h2>
    <PostMeta :user="data.user_id" :date="data.created_at" />
    <div class="post-content" v-html="data.content"></div>
    <div class="post-map" v-if="data.map">
      <iframe
        :src="data.map.embed"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script>
import PostMeta from "./PostMeta.vue";

export default {
  name: "PostContent",

  components: {
    PostMeta,
  },

  props: {
    data: [Object],
    category: [Object],
  },
};
</script>

<style lang="scss" scoped>
.post-img {
  text-align: center;
  width: 100%;
  img {
    max-width: 100%;
  }
}
</style>
