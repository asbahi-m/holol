<template>
  <main class="post">
    <Heading :data="post" :category="postCategory" />
    <section class="content">
      <div class="container">
        <PostContent :data="post" :category="postCategory" />
      </div>
    </section>
  </main>
</template>
<script>
import Data from "/db.json";
import Heading from "@/components/Heading.vue";
import PostContent from "@/components/PostContent.vue";

export default {
  name: "Post",
  components: {
    Heading,
    PostContent,
  },

  data() {
    return {
      post: {},
    };
  },

  computed: {
    postCategory() {
      const post = Data.categories.filter((item) => item.id == this.post.category_id);
      return post[0];
    },
  },

  beforeRouteUpdate(to, from, next) {
    const postData = Data.posts.filter((item) => item.id == to.params.id)[0];
    let postMeta = Data.post_meta.filter((item) => item.post_id == postData["id"]);
    if (postMeta.length) {
      let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id)[0];
      postData["map"] = postMap;
    }
    this.post = postData;
    next();
  },

  beforeMount() {
    const postData = Data.posts.filter((item) => item.id == this.$route.params.id)[0];
    let postMeta = Data.post_meta.filter((item) => item.post_id == postData.id);
    if (postMeta.length) {
      let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id)[0];
      postData.map = postMap;
    }
    this.post = postData;
  },
};
</script>
