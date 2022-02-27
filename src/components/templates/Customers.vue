<template>
  <div class="customer">
    <div class="avatar"><img :src="$store.getters.uploadPath(data.avatar)" :alt="data.name" /></div>
    <strong class="name">{{ data.name }}</strong>
    <div class="service-name">{{ data.service }}</div>
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

.customers {
  @include media-down("md") {
    text-align: center;
  }
  @include media-up("sm") {
    display: flex;
    flex-wrap: wrap;
  }
  .customer {
    @include media-up("sm") {
      flex-basis: 50%;
      flex-grow: 1;
    }
    @include media-up("lg") {
      flex-basis: auto;
    }
    padding: 0 $gutter-md;
    margin-bottom: $gutter-md * 2;
    .avatar img {
      max-width: 75%;
      height: 100px;
    }
    .service-name {
      color: $primary-color;
    }
  }
}
</style>
