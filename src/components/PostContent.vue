<template>
  <div class="post">
    <figure class="post-img">
      <div class="figure-img">
        <img
          :src="$store.getters.uploadPath(data.image)"
          :alt="$i18n.locale !== 'en' && data[$i18n.locale] ? data[$i18n.locale].title : data.title"
        />
        <div class="overlay-bg">
          <button type="button" @click="modal_open_event"><i class="fas fa-expand"></i></button>
        </div>
      </div>
      <!-- <figcaption></figcaption> -->
    </figure>
    <h2 class="post-title">
      {{ $i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].title : data.title }}
    </h2>
    <PostMeta :user="data.user_id" :category="category" :date="data.created_at" />
    <div
      class="post-content"
      v-html="$i18n.locale !== 'en' && data[$i18n.locale] ? data[$i18n.locale].content : data.content"
    ></div>
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

  methods: {
    modal_open_event() {
      this.$emit(
        "modal_open_event",
        this.$i18n.locale !== "en" && this.data[this.$i18n.locale]
          ? this.data[this.$i18n.locale].title
          : this.data.title,
        this.$i18n.locale !== "en" && this.data[this.$i18n.locale]
          ? this.data[this.$i18n.locale].brief
            ? this.data[this.$i18n.locale].brief
            : this.data[this.$i18n.locale].content
          : this.data.brief
          ? this.data.brief
          : this.data.content,
        this.data.image
      );
    },
  },
};
</script>
