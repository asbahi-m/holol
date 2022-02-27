<template>
  <main class="page">
    <Heading :title="title" :image="image" />

    <section class="content">
      <div class="container">
        <ServiceOrder :title="title" :image="image" />
      </div>
    </section>
  </main>
</template>

<script>
import Heading from "@/components/Heading.vue";
import ServiceOrder from "@/components/templates/ServiceOrder.vue";

export default {
  name: "Order",
  components: {
    Heading,
    ServiceOrder,
  },
  data() {
    return {
      title: "طلب خدمة",
      image: require("@/assets/images/service-order.jpg"),
    };
  },
};
</script>
