<template>
  <div class="service">
    <div class="avatar text-center">
      <img
        :src="$store.getters.uploadPath(data.avatar)"
        :alt="$i18n.locale !== 'en' && data[$i18n.locale] ? data[$i18n.locale].name : data.name"
      />
    </div>
    <h2 class="name text-center">
      {{ $i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].name : data.name }}
    </h2>
    <p class="disc">
      {{ $i18n.locale !== "en" && data[$i18n.locale] ? data[$i18n.locale].description : data.description }}
    </p>
    <div class="order text-center">
      <router-link class="btn btn-primary" :to="{ name: 'Order', params: { service_id: data.id } }">
        {{ $t("post.service_order") }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Services",
  props: {
    data: Object,
  },
};
</script>

<style lang="scss">
@use "../../assets/scss/tools" as *;

.services {
  @include media-up("md") {
    display: flex;
    flex-wrap: wrap;
    .service {
      flex-basis: 33.33%;
      max-width: 33.33%;
    }
  }
  .service {
    padding: 0 $gutter-md;
    margin-bottom: $gutter-md;
    .avatar img {
      max-width: 75%;
      height: 120px;
    }
    &:nth-child(3n + 2) .name {
      color: $primary-color;
    }
    .disc {
      text-align-last: center;
    }
  }
}
</style>
