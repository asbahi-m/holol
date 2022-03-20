<template>
  <main class="page">
    <Heading :title="$t('error404')" />
    <div class="error-msg text-large text-center">{{ $t("error404msg") }}</div>
  </main>
</template>

<script>
import Heading from "@/components/Heading.vue";

export default {
  name: "Error404",

  components: { Heading },
};
</script>

<style lang="scss" scoped>
.error-msg {
  padding-top: 40px;
  padding-bottom: 40px;
}
</style>
