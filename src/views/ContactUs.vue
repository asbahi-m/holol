<template>
  <main class="page">
    <Heading :title="$t('nav.contact_us')" :image="require('@/assets/images/contact-us.jpg')" />

    <section class="content">
      <div class="container">
        <div class="contact-us">
          <div class="info">
            <h1 class="title underline">{{ $t("nav.contact_us") }}</h1>
            <p>{{ $t("contact_msg") }}</p>
            <div>
              <a href="https://goo.gl/maps/j2V8MHcf7wpLcn5B8" target="_blank">
                <i class="fas fa-map-marker-alt"></i><span>{{ $t("address") }}</span>
              </a>
            </div>
            <div>
              <a href="tel:00966138310311">
                <i class="fas fa-phone-volume"></i><span class="ltr">+966 13 831 0311</span>
              </a>
            </div>
            <div>
              <a href="mailto:info@holol.com"><i class="fas fa-envelope-open-text"></i><span>info@holol.com</span></a>
            </div>
          </div>
          <ContactUsTmp :contact="contact" />
        </div>
      </div>
    </section>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d893.2719823790158!2d50.09713047082533!3d26.420638898958885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xbd4a5c06677958a9!2zMjbCsDI1JzE0LjMiTiA1MMKwMDUnNDcuNyJF!5e0!3m2!1sar!2s!4v1640561690795!5m2!1sar!2s"
      width="100%"
      height="450"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
  </main>
</template>

<script>
import Heading from "@/components/Heading.vue";
import ContactUsTmp from "@/components/templates/ContactUsTmp.vue";

export default {
  name: "ContactUs",

  components: {
    Heading,
    ContactUsTmp,
  },

  data() {
    return {
      contact: {
        name: "",
        phone: "",
        email: "",
        message: "",
      },
    };
  },

  metaInfo() {
    return {
      titleTemplate: (chunk) => `${chunk} - ${this.$t("nav.contact_us")}`,
      meta: [
        {
          vmid: "thumbnail",
          name: "thumbnail",
          content: require("@/assets/images/contact-us.jpg"),
        },
        {
          vmid: "og:title",
          property: "og:title",
          content: this.$t("nav.contact_us"),
        },
        { vmid: "og:image", property: "og:image", content: require("@/assets/images/contact-us.jpg") },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/scss/tools" as *;

$gutter: 20px;
.contact-us {
  @include media-up("md") {
    display: flex;
    margin: 0 -$gutter;
    > * {
      flex-basis: 50%;
      max-width: 50%;
      padding: 0 $gutter;
    }
  }
  .info a {
    display: inline-block;
    margin-bottom: 10px;
    color: $primary-color;
    transition: opacity 0.3s;
    i {
      height: $gutter * 2;
      width: $gutter * 2;
      line-height: $gutter * 2;
      font-size: $gutter;
      text-align: center;
      border: 1px solid $primary-color;
      border-radius: 50%;
      margin-right: 5px;
    }
    &:hover {
      opacity: 0.8;
    }
  }
}
[dir="rtl"] .contact-us .info a i {
  margin-right: unset;
  margin-left: 5px;
}
</style>
