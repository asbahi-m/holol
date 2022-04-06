<template>
  <main>
    <section id="main-slider">
      <Carousel :items="pinPosts" />
      <router-link :to="{ hash: 'about-us' }" type="button" class="to-next">
        <span></span><i class="fas fa-chevron-down"></i>
      </router-link>
    </section>

    <section id="about-us" class="container" v-scrollAnimate="'fade-in'">
      <div class="card-list">
        <Posts
          :data="aboutUs"
          layout="list"
          :more="true"
          :moreValue="$t('post.more_info')"
          @modal_open_event="modal_open_hanler"
        />
      </div>
    </section>

    <section id="services" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">
        <router-link :to="{ name: 'Page', params: { id: 2 } }">{{ $t("nav.our_services") }}</router-link>
      </h1>
      <div class="services">
        <Services v-for="service in services" :data="service" :key="service.id" />
      </div>
    </section>

    <section id="solutions" v-scrollAnimate="'fade-in'" v-scroll="counter">
      <div class="container items">
        <div class="item" v-for="(item, index) in solutions.data" :key="item.name">
          <img
            :src="require(`@/assets/images/${item.icon}`)"
            :alt="$i18n.locale !== 'en' && item[$i18n.locale] ? item[$i18n.locale].title : item.title"
          />
          <div>
            <strong v-if="counterPlay">
              <number :ref="`number${index}`" :from="0" :to="item.count" :duration="3" />
            </strong>
            <span>{{ $i18n.locale !== "en" && item[$i18n.locale] ? item[$i18n.locale].title : item.title }}</span>
          </div>
        </div>
      </div>
      <div class="overlay-img" :style="{ 'background-image': `url(${solutions.image})` }"></div>
    </section>

    <section id="last-posts" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">{{ $t("last_posts") }}</h1>
      <div class="card-grid">
        <Posts
          v-for="post in lastPostsDesc"
          :key="post.id"
          :data="post"
          :postMeta="true"
          :more="true"
          @modal_open_event="modal_open_hanler"
        />
      </div>
    </section>

    <section id="our-works" v-scrollAnimate="'fade-in'">
      <h1 class="title underline container">
        <router-link :to="{ name: 'Page', params: { id: 8 } }">{{ $t("portfolio") }}</router-link>
      </h1>
      <div class="portfolio">
        <div class="card" v-for="work in ourWorks" :key="work.id">
          <div class="card-img">
            <div class="img">
              <img
                :src="$store.getters.uploadPath(work.image)"
                :alt="$i18n.locale !== 'en' && work[$i18n.locale] ? work[$i18n.locale].title : work.title"
              />
            </div>
            <div class="overlay-bg">
              <div class="buttons">
                <router-link :to="{ name: 'Post', params: { id: work.id } }" type="button" class="icon icon-light">
                  <i class="fas fa-link"></i>
                </router-link>
                <button
                  type="button"
                  class="icon icon-light"
                  :data-image="$store.getters.uploadPath(work.image)"
                  @click="
                    modal_open_hanler(
                      $i18n.locale !== 'en' && work[$i18n.locale] ? work[$i18n.locale].title : work.title,
                      $i18n.locale !== 'en' && work[$i18n.locale]
                        ? work[$i18n.locale].brief
                          ? work[$i18n.locale].brief
                          : work[$i18n.locale].content
                        : work.brief
                        ? work.brief
                        : work.content,
                      work.image
                    )
                  "
                >
                  <i class="fas fa-expand"></i>
                </button>
              </div>
              <div class="card-body">
                <h2 class="card-title">
                  {{ $i18n.locale !== "en" && work[$i18n.locale] ? work[$i18n.locale].title : work.title }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="customers" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">
        <router-link :to="{ name: 'Page', params: { id: 3 } }">{{ $t("nav.our_clients") }}</router-link>
      </h1>
      <div class="customers">
        <Customers v-for="customer in customers" :data="customer" :key="customer.id" />
      </div>
    </section>

    <section id="service-order" class="container" v-scrollAnimate="'fade-in'">
      <ServiceOrder
        :services="services"
        :title="$t('post.service_order')"
        :image="require('@/assets/images/service-order.jpg')"
      />
      <div class="img">
        <img :src="$store.getters.uploadPath('branch3.jpg')" :alt="$t('site_name')" />
      </div>
    </section>
  </main>
</template>

<script>
import Data from "/db.json";
import Carousel from "@/components/Carousel.vue";
import Posts from "@/components/Posts.vue";
import Services from "@/components/templates/Services.vue";
import Customers from "@/components/templates/Customers.vue";
import ServiceOrder from "@/components/templates/ServiceOrder.vue";
import { tranlateMixin } from "@/mixins";

export default {
  name: "Home",

  components: {
    Carousel,
    Posts,
    Services,
    Customers,
    ServiceOrder,
  },

  mixins: [tranlateMixin],

  data() {
    return {
      counterPlay: false,
      solutions: {
        image: require("@/assets/images/soluitions.jpg"),
        data: [
          { name: "customers", title: "customer", icon: "icon1.png", count: 1500, ar: { title: "عميل" } },
          { name: "fairs", title: "fair", icon: "icon2.png", count: 105, ar: { title: "معرض" } },
          { name: "ads", title: "ad", icon: "icon3.png", count: 1452, ar: { title: "إعلان" } },
          { name: "conferences", title: "conference", icon: "icon4.png", count: 75, ar: { title: "مؤتمر" } },
        ],
      },
    };
  },

  computed: {
    pinPosts() {
      const pinPosts = Data.posts.filter((item) => item.is_pin == true);
      this.t_data(pinPosts, Data.t_posts, "post_id");
      return pinPosts.reverse().slice(0, 3);
    },

    aboutUs() {
      const aboutUs = Data.posts.filter((item) => item.id == 1);
      this.t_data(aboutUs, Data.t_posts, "post_id");
      return aboutUs[0];
    },

    services() {
      const services = Data.services;
      this.t_data(services, Data.t_services, "service_id");
      return services;
    },

    customers() {
      const customers = Data.customers;
      this.t_data(customers, Data.t_customers, "customer_id");
      return customers;
    },

    lastPostsDesc() {
      // Category ID 7 => News Cat
      let newsPosts = Data.posts.filter((item) => item.category_id == 7);
      const lastPosts = newsPosts.map((item) => item);
      this.t_data(lastPosts, Data.t_posts, "post_id");
      return lastPosts.reverse().slice(0, 3);
    },

    ourWorks() {
      // Category ID 2, 4, 5, 6 => Our Works Cat
      let ourWorks = Data.posts.filter((item) => {
        let self = item;
        return [2, 4, 5, 6].some((item) => item == self.category_id);
      });
      const lastPosts = ourWorks.map((item) => item);
      this.t_data(lastPosts, Data.t_posts, "post_id");
      return lastPosts.reverse().slice(0, 5);
    },
  },

  methods: {
    counter(event, el) {
      if (
        window.scrollY + window.innerHeight > el.offsetTop + window.innerHeight / 2 &&
        window.scrollY < el.offsetTop
      ) {
        this.counterPlay = true;
        return true;
      }
    },

    modal_open_hanler(title, brief, image) {
      this.$emit("modal_open_event", title, brief, image);
    },
  },
};
</script>

<style lang="scss">
@use "../assets/scss/tools" as *;
section {
  perspective: 1000px;
  backface-visibility: hidden;
  transition: 0.5s all ease-in-out;
}

.to-next {
  @include media-down("xs") {
    display: none;
  }
  width: 25px;
  height: 50px;
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid $primary-color;
  border-radius: 20px;
  color: $primary-color !important;
  span {
    width: 3px;
    height: 10px;
    background: $primary-color;
  }
  &:hover span {
    animation: scroll-line 1.5s infinite;
  }
  &:hover i {
    animation: scroll-arrow 1.5s infinite;
  }
}
@keyframes scroll-arrow {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(15px);
  }
  11% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes scroll-line {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(40px);
  }
  31% {
    transform: translateY(-30px);
  }
  100% {
    transform: translateY(0);
  }
}

#main-slider {
  padding-top: 0;
  .carousel-item {
    font-weight: bold;
    .buttons {
      display: flex;
      justify-content: space-evenly;
      margin-top: 40px;
      .btn {
        padding-top: 15px;
        padding-bottom: 15px;
        border-radius: 30px;
      }
    }
  }
  @include media-down("xs") {
    .carousel .carousel-control .prev {
      top: 70%;
      left: 15px;
      right: unset;
    }
    .carousel .carousel-control .next {
      top: 70%;
      left: unset;
      right: 15px;
    }
    [dir="rtl"] & {
      .carousel .carousel-control .prev {
        left: unset;
        right: 15px;
      }
      .carousel .carousel-control .next {
        left: 15px;
        right: unset;
      }
    }
  }
}

#solutions {
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
  color: #fff;
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      @include media-down("xs") {
        flex: 1 0 50%;
        max-width: 50%;
        text-align: center;
        &:first-child {
          margin-bottom: $gutter-md;
        }
      }
      @include media-up("lg") {
        display: flex;
        align-items: center;
      }
      img {
        height: 100px;
      }
      div {
        display: flex;
        flex-direction: column;
        padding: 0 15px;
        strong {
          font-size: 40px;
        }
        > span {
          font-size: 24px;
          @include media-up("md") {
            font-size: 28px;
          }
        }
      }
    }
  }
}

#last-posts {
  .card {
    @include media-down("sm") {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
  .card-body {
    border: 1px solid #ccc;
    padding-left: 10px;
    padding-right: 10px;
  }
  .display-swap {
    @include media-up("md") {
      display: flex;
      flex-direction: column;
    }
  }
  .more {
    display: block;
    text-align: center;
    width: 50%;
    margin: 0 auto;
  }
}

#our-works {
  .portfolio {
    @include media-down("xs") {
      padding: 0 $gutter-base;
    }
    @include media-up("sm") {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 220px;
      grid-gap: $gutter-sm;
      :nth-child(3) {
        grid-column-end: span 2;
      }
      .card {
        margin: 0;
      }
    }
    @include media-up("md") {
      grid-template-columns: repeat(2, 1fr);
      :nth-child(1) {
        grid-row-end: span 2;
      }
      :nth-child(3) {
        grid-column-end: span 1;
      }
    }
    @include media-up("lg") {
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 160px;
      :nth-child(1),
      :nth-child(3) {
        grid-column-end: span 2;
      }
      :nth-child(1),
      :nth-child(2) {
        grid-row-end: span 2;
      }
    }
    .card {
      position: relative;
      .card-img {
        height: 100%;
        border-radius: 0;
        align-items: center;
        img {
          min-height: 100%;
          max-height: calc(100vh - 150px);
        }
      }
      .card-body {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: $gutter-md;
        z-index: 1;
        pointer-events: none;
        padding: $gutter-md 0;
        border-radius: 0;
        opacity: 0;
        text-align: center;
        background-color: rgba($light-color, 0.9);
        transition: opacity 0.5s;
        .card-title {
          margin-bottom: 0;
        }
      }
      &:hover {
        img {
          transform: none;
        }
        .card-body {
          opacity: 1;
        }
      }
    }
  }
}

#service-order {
  @include media-down("md") {
    img {
      max-width: 100%;
    }
  }
  @include media-up("lg") {
    display: flex;
    > * {
      flex-basis: 50%;
      max-width: 50%;
    }
    iframe {
      height: auto;
    }
    .img {
      overflow: hidden;
      img {
        height: 100%;
      }
    }
  }
}
</style>
