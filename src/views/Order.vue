<template>
  <main class="page">
    <Heading :title="$t('post.service_order')" :image="require('@/assets/images/service-order.jpg')" />

    <section class="content">
      <div class="container">
        <ServiceOrder
          :services="services"
          :title="$t('post.service_order')"
          :image="require('@/assets/images/service-order.jpg')"
        />
      </div>
    </section>
  </main>
</template>

<script>
import Data from "/db.json";
import Heading from "@/components/Heading.vue";
import ServiceOrder from "@/components/templates/ServiceOrder.vue";
import { tranlateMixin } from "@/mixins";

export default {
  name: "Order",

  components: {
    Heading,
    ServiceOrder,
  },

  mixins: [tranlateMixin],

  computed: {
    services() {
      const servicesData = Data.services;
      this.t_data(servicesData, Data.t_services, "service_id");
      return servicesData;
    },
  },

  metaInfo() {
    return {
      titleTemplate: (chunk) => `${chunk} - ${this.$t("post.service_order")}`,
      meta: [
        {
          vmid: "thumbnail",
          name: "thumbnail",
          content: require("@/assets/images/service-order.jpg"),
        },
        {
          vmid: "og:title",
          property: "og:title",
          content: this.$t("post.service_order"),
        },
        { vmid: "og:image", property: "og:image", content: require("@/assets/images/service-order.jpg") },
      ],
    };
  },
};
</script>
