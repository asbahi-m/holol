<template>
  <main class="page">
    <Heading :data="post" :category="postCategory" />
    <section class="content">
      <div class="container">
        <PostContent :data="post" :category="postCategory" @modal_open_event="modal_open_hanler" />
      </div>
    </section>
  </main>
</template>
<script>
import Data from "/db.json";
import Heading from "@/components/Heading.vue";
import PostContent from "@/components/PostContent.vue";
import { tranlateMixin } from "@/mixins";

export default {
  name: "Post",

  components: {
    Heading,
    PostContent,
  },

  mixins: [tranlateMixin],

  computed: {
    post() {
      const postData = Data.posts.filter((item) => item.id == this.$route.params.id);
      let postMeta = Data.post_meta.filter((item) => item.post_id == postData[0].id);
      if (postMeta.length) {
        let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id);
        postData[0]["map"] = postMap[0];
      }
      this.t_data(postData, Data.t_posts, "post_id");
      return postData[0];
    },

    postCategory() {
      const category = Data.categories.filter((item) => item.id == this.post.category_id);
      this.t_data(category, Data.t_categories, "category_id");
      return category[0];
    },
  },

  methods: {
    modal_open_hanler(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },

  beforeRouteEnter(to, from, next) {
    const exist = Data.posts.find((item) => item.id == to.params.id);
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

  beforeRouteUpdate(to, from, next) {
    // const postData = Data.posts.filter((item) => item.id == to.params.id)[0];
    // let postMeta = Data.post_meta.filter((item) => item.post_id == postData["id"]);
    // if (postMeta.length) {
    //   let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id)[0];
    //   postData["map"] = postMap;
    // }
    // this.post = postData;
    next();
  },

  beforeMount() {
    // const postData = Data.posts.filter((item) => item.id == this.$route.params.id)[0];
    // let postMeta = Data.post_meta.filter((item) => item.post_id == postData.id);
    // if (postMeta.length) {
    //   let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id)[0];
    //   postData.map = postMap;
    // }
    // this.post = postData;
  },

  metaInfo() {
    const locale = this.$i18n.locale;
    return {
      titleTemplate: (chunk) =>
        `${chunk} - ${locale !== "en" && this.post[locale] ? this.post[locale].title : this.post.title}`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: locale !== "en" && this.post[locale] ? this.post[locale].brief : this.post.brief,
        },
        {
          vmid: "thumbnail",
          name: "thumbnail",
          content: this.$store.getters.uploadPath(this.post.image),
        },
        {
          vmid: "og:title",
          property: "og:title",
          content: locale !== "en" && this.post[locale] ? this.post[locale].title : this.post.title,
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: locale !== "en" && this.post[locale] ? this.post[locale].brief : this.post.brief,
        },
        { vmid: "og:image", property: "og:image", content: this.$store.getters.uploadPath(this.post.image) },
      ],
    };
  },
};
</script>
