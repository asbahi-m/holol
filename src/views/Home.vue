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
          moreValue="المزيد من المعلومات"
          @modal_open_event="modal_open_hanler"
        />
      </div>
    </section>

    <section id="services" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">
        <router-link :to="{ name: 'Page', params: { id: 2 } }">خدماتنا</router-link>
      </h1>
      <div class="services">
        <Services v-for="service in services" :data="service" :key="service.id" />
      </div>
    </section>

    <section id="solutions" v-scrollAnimate="'fade-in'" v-scroll="counter">
      <div class="container items">
        <div class="item" v-for="(item, index) in solutions.data" :key="item.name">
          <img :src="require(`@/assets/images/${item.icon}`)" :alt="item.title" />
          <div>
            <strong v-if="counterPlay">
              <number :ref="`number${index}`" :from="0" :to="item.count" :duration="3" />
            </strong>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div class="overlay-img" :style="{ 'background-image': `url(${solutions.image})` }"></div>
    </section>

    <section id="last-posts" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">آخر المشاركات</h1>
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
        <router-link :to="{ name: 'Page', params: { id: 8 } }">بعض أعمالنا</router-link>
      </h1>
      <div class="portfolio">
        <div class="card" v-for="work in ourWorks" :key="work.id">
          <div class="card-img">
            <img :src="$store.getters.uploadPath(work.image)" :alt="work.title" />
            <div class="overlay-bg">
              <div class="buttons">
                <router-link :to="{ name: 'Post', params: { id: work.id } }" type="button" class="icon icon-light">
                  <i class="fas fa-link"></i>
                </router-link>
                <button
                  type="button"
                  class="icon icon-light"
                  :data-image="$store.getters.uploadPath(work.image)"
                  @click="modal_open_hanler(work.title, work.brief ? work.brief : work.content, work.image)"
                >
                  <i class="fas fa-expand"></i>
                </button>
              </div>
              <div class="card-body">
                <h2 class="card-title">{{ work.title }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="customers" class="container" v-scrollAnimate="'fade-in'">
      <h1 class="title underline">
        <router-link :to="{ name: 'Page', params: { id: 3 } }">عملائنا</router-link>
      </h1>
      <div class="customers">
        <Customers v-for="customer in customers" :data="customer" :key="customer.id" />
      </div>
    </section>

    <section id="service-order" class="container" v-scrollAnimate="'fade-in'">
      <ServiceOrder title="طلب خدمة" :image="require('@/assets/images/service-order.jpg')" />
      <img :src="$store.getters.uploadPath('branch3.jpg')" alt="موقع حلول الخليج" />
      <!-- <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d893.2719823790158!2d50.09713047082533!3d26.420638898958885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbd4a5c06677958a9!2zMjbCsDI1JzE0LjMiTiA1MMKwMDUnNDcuNyJF!5e0!3m2!1sar!2s!4v1640561690795!5m2!1sar!2s"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe> -->
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

export default {
  name: "Home",

  components: {
    Carousel,
    Posts,
    Services,
    Customers,
    ServiceOrder,
  },

  data() {
    return {
      counterPlay: false,
      aboutUs: Data.posts[0],
      services: Data.services,
      customers: Data.customers,
      solutions: {
        image: require("@/assets/images/soluitions.jpg"),
        data: [
          { name: "customers", title: "عميل", icon: "icon1.png", count: 1500 },
          { name: "exhibitions", title: "معرض", icon: "icon2.png", count: 105 },
          { name: "ads", title: "إعلان", icon: "icon3.png", count: 1452 },
          { name: "conferences", title: "مؤتمر", icon: "icon4.png", count: 75 },
        ],
      },
    };
  },

  computed: {
    pinPosts() {
      // let newsPosts = Data.posts.filter((item) => item.category_id == 7);
      const pinPosts = Data.posts.map((item) => item);
      return pinPosts.reverse().slice(0, 3);
    },

    lastPostsDesc() {
      // Category ID 7 => News Cat
      let newsPosts = Data.posts.filter((item) => item.category_id == 7);
      const lastPosts = newsPosts.map((item) => item);
      return lastPosts.reverse().slice(0, 3);
    },

    ourWorks() {
      // Category ID 2, 4, 5, 6 => Our Works Cat
      let ourWorks = Data.posts.filter((item) => {
        let self = item;
        return [2, 4, 5, 6].some((item) => item == self.category_id);
      });
      const lastPosts = ourWorks.map((item) => item);
      return lastPosts.reverse().slice(0, 5);
    },
  },

  mounted() {
    /* this.solutions.data[0].count = Data.customers.length;

    // Category Exhibitions Id = 5
    this.solutions.data[1].count = Data.posts.filter((item) => item.category_id == 5).length;

    // Category Ads Id = 4
    this.solutions.data[2].count = Data.posts.filter((item) => item.category_id == 4).length;

    // Category Conferences Id = 6
    this.solutions.data[3].count = Data.posts.filter((item) => item.category_id == 6).length; */
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
  color: $primary-color;
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
          font-size: 30px;
        }
      }
    }
  }
}

#last-posts {
  .card-body {
    border: 1px solid #ccc;
    padding-left: 10px;
    padding-right: 10px;
  }
  .display-swap {
    display: flex;
    flex-direction: column;
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
          max-height: 100vh;
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
  }
}
</style>
