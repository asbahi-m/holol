<template>
  <footer>
    <div class="container">
      <div class="items">
        <div class="item">
          <router-link class="brand d-inline-block" to="/" exact-active-class="" active-class="" exact>
            <img src="@/assets/images/logowhite.png" alt="حلول الخليج" />
          </router-link>
          <p>
            هناك حقيقة مثبتة منذ زمن طويل، وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي
            للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.ولذلك يتم استخدام طريقة لوريم أيبسوم لأنها تعطي توزيعاً
            طبيعياً -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي".
          </p>
        </div>
        <div class="item">
          <h2 class="underline">روابط هامة</h2>
          <RouterLinks class="links" />
        </div>
      </div>
    </div>
    <div class="sub-footer">
      <div class="container">
        <div class="copyright">
          <span class="text-primary">حلول الخليج</span>
          <span> جميع الحقوق محفوظة 2018 &copy;</span>
        </div>
        <div class="social">
          <a href="#" class="icon icon-primary"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="icon icon-primary"><i class="fab fa-twitter"></i></a>
          <a href="#" class="icon icon-primary"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import RouterLinks from "./MenuApp.vue";

export default {
  name: "FooterApp",
  components: {
    RouterLinks,
  },
};
</script>

<style lang="scss">
@use "../assets/scss/tools" as *;

footer {
  .items {
    .item {
      &:first-child {
        text-align: center;
      }
      @include media-up("sm") {
        &:first-child {
          flex-basis: 66.66%;
          max-width: 66.66%;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
          border-bottom: 0 !important;
          @include media-up("md") {
            display: flex;
            @include media-up("lg") {
              align-items: flex-end;
            }
          }
        }
        &:last-child {
          flex-basis: 33.33%;
          max-width: 33.33%;
        }
        p {
          padding: 0 20px;
        }
      }
      .underline::after {
        width: 60px;
        height: 5px;
        margin-top: 15px;
      }
    }
    .menu {
      display: flex;
      flex-wrap: wrap;
      .nav-link {
        flex-basis: 50%;
        max-width: 50%;
      }
      @include media-up-down("576px", "767.98px") {
        .nav-link {
          flex-basis: 100%;
          max-width: 100%;
        }
      }
    }
  }
  .sub-footer .container {
    @include media-up("sm") {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .copyright {
      @include media-down("xs") {
        margin-bottom: $gutter-base;
      }
      text-align: center;
    }
  }
  .social .icon {
    border-width: 1px;
    background: transparent !important;
    &::after {
      background: transparent !important;
    }
  }
}
</style>
