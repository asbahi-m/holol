<template>
  <main class="page">
    <Heading :data="page" />

    <section class="content">
      <div class="container">
        <PostContent v-if="!page.template" :data="page" />

        <div class="services" v-if="page.template == 'services'">
          <Services v-for="service in services" :data="service" :key="service.id" />
        </div>

        <div class="customers" v-if="page.template == 'customers'">
          <Customers v-for="customer in customers" :data="customer" :key="customer.id" />
        </div>

        <Blog
          v-if="page.template == 'blog'"
          :layout="page.layout"
          :posts="posts"
          @modal_open_event="modal_open_hanler"
        />
      </div>
    </section>
  </main>
</template>

<script>
import Data from "/db.json";
import Heading from "@/components/Heading.vue";
import PostContent from "@/components/PostContent.vue";
import Blog from "@/components/templates/Blog.vue";
import Services from "@/components/templates/Services.vue";
import Customers from "@/components/templates/Customers.vue";

export default {
  name: "Page",

  components: {
    Heading,
    PostContent,
    Blog,
    Services,
    Customers,
  },

  computed: {
    page() {
      const pageData = Data.pages.filter((item) => item.id == this.$route.params.id);
      return pageData[0];
    },
    services() {
      return this.page.template == "services" ? Data.services : null;
    },
    customers() {
      if (this.page.template == "customers") {
        const allCustomers = Data.customers;
        for (const key in allCustomers) {
          const element = allCustomers[key];
          if (Object.hasOwnProperty.call(allCustomers, key)) {
            let tmpService = Data.services.filter((item) => item.id == element.service_id);
            if (tmpService.length) element.service = tmpService[0].name;
          }
        }
        return allCustomers;
      } else {
        return null;
      }
    },
    posts() {
      if (this.page.template == "blog" && this.page.category_id) {
        // Get children page category
        let catChildren = Data.categories.filter((item) => item.parent_id == this.page.category_id);

        let allPosts;

        if (catChildren.length) {
          // IF Page category containe children categories
          allPosts = Data.posts.filter((item) => {
            let self = item;
            return catChildren.some((item) => item.id == self.category_id);
          });
        } else {
          allPosts = Data.posts.filter((item) => item.category_id == this.page.category_id);
        }
        return allPosts;
      } else {
        return null;
      }
    },
  },

  methods: {
    modal_open_hanler(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },

  beforeRouteUpdate(to, from, next) {
    /* const pageData = Data.pages.filter((item) => item.id == to.params.id);
    this.page = pageData[0];

    if (this.page.template == "blog" && this.page.category_id) {
      // Get children page category
      let catChildren = Data.categories.filter((item) => item.parent_id == this.page.category_id);

      let allPosts;

      if (catChildren.length) {
        // IF Page category containe children categories
        allPosts = Data.posts.filter((item) => {
          let self = item;
          return catChildren.some((item) => item.id == self.category_id);
        });
      } else {
        allPosts = Data.posts.filter((item) => item.category_id == this.page.category_id);
      }

      for (const key in allPosts) {
        const element = allPosts[key];
        if (Object.hasOwnProperty.call(allPosts, key)) {
          // Get Post Map from Post_meta
          let postMeta = Data.post_meta.filter((item) => item.post_id == element.id);
          if (postMeta.length) {
            let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id);
            element.map = postMap[0];
          }
        }
      }
      this.posts = allPosts;
    } else {
      this.posts = null;
    }

    if (this.page.template == "services") {
      this.services = Data.services;
    } else {
      this.services = null;
    }

    if (this.page.template == "customers") {
      const allCustomers = Data.customers;
      for (const key in allCustomers) {
        const element = allCustomers[key];
        if (Object.hasOwnProperty.call(allCustomers, key)) {
          let tmpService = Data.services.filter((item) => item.id == element.service_id);
          if (tmpService.length) element.service = tmpService[0].name;
        }
      }
      this.customers = allCustomers;
    } else {
      this.customers = null;
    } */

    next();
  },

  beforeMount() {
    /* const pageData = Data.pages.filter((item) => item.id == this.$route.params.id);
    this.page = pageData[0];

    if (this.page.template == "blog" && this.page.category_id) {
      // Get children page category
      let catChildren = Data.categories.filter((item) => item.parent_id == this.page.category_id);

      let allPosts;

      if (catChildren.length) {
        // IF Page category containe children categories
        allPosts = Data.posts.filter((item) => {
          let self = item;
          return catChildren.some((item) => item.id == self.category_id);
        });
      } else {
        allPosts = Data.posts.filter((item) => item.category_id == this.page.category_id);
      }

      for (const key in allPosts) {
        const element = allPosts[key];
        if (Object.hasOwnProperty.call(allPosts, key)) {
          // Get Post Map from Post_meta
          let postMeta = Data.post_meta.filter((item) => item.post_id == element.id);
          if (postMeta.length) {
            let postMap = Data.maps.filter((item) => item.id == postMeta[0].map_id);
            element.map = postMap[0];
          }
        }
      }
      this.posts = allPosts;
    } else {
      this.posts = null;
    }

    if (this.page.template == "services") {
      this.services = Data.services;
    } else {
      this.services = null;
    }

    if (this.page.template == "customers") {
      const allCustomers = Data.customers;
      for (const key in allCustomers) {
        const element = allCustomers[key];
        if (Object.hasOwnProperty.call(allCustomers, key)) {
          let tmpService = Data.services.filter((item) => item.id == element.service_id);
          if (tmpService.length) element.service = tmpService[0].name;
        }
      }
      this.customers = allCustomers;
    } else {
      this.customers = null;
    } */
  },
};
</script>

<style lang="scss"></style>
