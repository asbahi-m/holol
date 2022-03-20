<template>
  <div class="card" :class="{ 'display-swap': displaySwap }">
    <div class="card-img">
      <div class="img">
        <img
          :src="$store.getters.uploadPath(data.image)"
          :alt="$i18n.locale !== 'en' && data[$i18n.locale] ? data[$i18n.locale].title : data.title"
        />
      </div>
      <div class="overlay-bg">
        <div class="buttons">
          <router-link :to="{ name: 'Post', params: { id: data.id } }" type="button" class="icon icon-primary">
            <i class="fas fa-link"></i>
          </router-link>
          <button type="button" class="icon icon-primary" @click="modal_open_event">
            <i class="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h2 class="card-title" :class="{ underline: layout == 'list' }">
        <router-link :to="{ name: 'Post', params: { id: data.id } }">
          {{ $i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].title : data.title }}
        </router-link>
      </h2>
      <PostMeta v-if="postMeta" :user="data.user_id" :date="data.created_at" />
      <p class="card-text">
        {{
          $i18n.locale !== "en" && data[$i18n.locale]
            ? data[$i18n.locale].brief
              ? data[$i18n.locale].brief
              : data[$i18n.locale].content
            : data.brief
            ? data.brief
            : data.content | htmlString | truncate
        }}
      </p>
      <div class="post-map" v-if="postMap">
        <a :href="postMap.location" target="_blank"><i class="fas fa-map-marker-alt"></i> {{ postMap.name }}</a>
      </div>
      <router-link class="btn btn-primary more" v-show="more" :to="{ name: 'Post', params: { id: data.id } }">
        {{ more ? (moreValue ? moreValue : $t("post.details")) : "" }}
      </router-link>
    </div>
  </div>
</template>

<script>
import Data from "/db.json";
import PostMeta from "./PostMeta.vue";

export default {
  name: "Posts",

  components: {
    PostMeta,
  },

  props: {
    data: [Object],
    category: [Object],
    layout: [String],
    displaySwap: { type: Boolean, default: true },
    postMeta: [Boolean],
    more: [Boolean],
    moreValue: [String],
  },

  computed: {
    postMap() {
      const postMeta = Data.post_meta.filter((item) => item.post_id == this.data.id);
      if (postMeta.length) {
        const postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id);
        return postMap[0];
      } else return null;
    },
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

<style lang="scss" scoped>
@use "../assets/scss/tools" as *;

$card-gutter: $gutter-md;
.card-list {
  .card {
    &:not(:last-child) {
      margin-bottom: $gutter-lg * 2;
    }
    .card-img {
      @include media-up("md") {
        flex-basis: 50%;
        max-width: 50%;
        padding-right: $card-gutter;
      }
      height: 280px;
      padding-bottom: $card-gutter;
      &::after {
        content: "";
        height: 100%;
        width: 100%;
        position: absolute;
        top: $card-gutter;
        right: 0;
        z-index: -1;
        background: #eee;
      }
      .overlay-bg {
        top: -$card-gutter;
      }
      @include media-up("md") {
        &::after {
          right: -$card-gutter;
        }
        .overlay-bg {
          left: -$card-gutter;
        }
      }
    }
    .card-body {
      padding-left: $card-gutter;
      padding-right: 0;
      .card-title {
        font-size: 30px;
        &::after {
          width: 150px;
          height: 3px;
          margin-top: $card-gutter;
        }
      }
    }
    [dir="rtl"] & {
      .card-img {
        @include media-up("md") {
          padding-left: $card-gutter;
          padding-right: 0;
          &::after {
            left: -$card-gutter;
            right: unset;
          }
          .overlay-bg {
            left: unset;
            right: -$card-gutter;
          }
        }
      }
      .card-body {
        padding-right: $card-gutter;
        padding-left: 0;
      }
    }
    &.display-swap {
      @include media-up("sm") {
        &:nth-child(even) {
          .card-body {
            padding-right: $card-gutter;
            padding-left: 0;
          }
        }
        [dir="rtl"] &:nth-child(even) {
          .card-body {
            padding-left: $card-gutter;
            padding-right: 0;
          }
        }
      }
    }
  }
}
.card {
  .card-img {
    border: 0;
    border-radius: 0 !important;
    .overlay-bg {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .card-body {
    border: 0;
    border-radius: 0 !important;
    padding-right: 0;
    padding-left: 0;
  }
  &.display-swap {
    @include media-up("sm") {
      &:nth-child(even) {
        .card-img {
          order: 2;
        }
      }
    }
  }
}
.post-map a {
  color: $primary-color;
  transition: opacity 0.3s;
  i {
    height: $card-gutter * 2;
    width: $card-gutter * 2;
    line-height: $card-gutter * 2;
    font-size: $card-gutter;
    text-align: center;
    border: 1px solid $primary-color;
    border-radius: 50%;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>
