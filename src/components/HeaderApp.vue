<template>
  <header>
    <div class="navbar navbar-secondary" :class="{ fixed: scrolling }">
      <div class="container">
        <router-link class="navbar-brand" to="/" exact-active-class="" active-class="" exact>
          <img
            :src="require(`@/assets/images/logo${$i18n.locale === 'ar' ? '-rtl' : ''}.png`)"
            :alt="$t('site_name')"
          />
        </router-link>
        <button
          type="button"
          class="navbar-toggle"
          :class="{ active: navbarToggle }"
          @click="navbarToggle = !navbarToggle"
        >
          <i class="fas fa-bars"></i>
        </button>
        <div class="locales">
          <button class="locale" type="button" @click="localeToggle = !localeToggle" @blur="localeToggle = false">
            <i class="fas fa-language"></i> {{ $t(`locale.${$i18n.locale}`) }} <i class="fas fa-chevron-down"></i>
          </button>
          <transition name="fade">
            <ul v-show="localeToggle">
              <li>
                <a type="button" class="nav-link" @click="setLocale('en')" v-if="$i18n.locale != 'en'">
                  {{ $t("locale.en") + " (en)" }}
                </a>
                <a type="button" class="nav-link" @click="setLocale('ar')" v-if="$i18n.locale != 'ar'">
                  {{ $t("locale.ar") + " (ar)" }}
                </a>
              </li>
            </ul>
          </transition>
        </div>
        <div
          tabindex="-1"
          class="navbar-nav collapse"
          :class="{ show: navbarToggle }"
          @click="navbar_click"
          @blur="navbar_blur"
          @keyup.esc="navbarToggle = false"
          v-focus="navbarToggle"
        >
          <RouterLinks />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import RouterLinks from "./MenuApp.vue";

export default {
  name: "HeaderApp",

  components: {
    RouterLinks,
  },

  props: ["scrolling"],

  data() {
    return {
      navbarToggle: false,
      localeToggle: false,
    };
  },

  methods: {
    navbar_blur($event) {
      // let focued = document.activeElement;
      if (
        $event.relatedTarget?.className.includes("navbar-toggle") ||
        $event.relatedTarget?.className.includes("nav-link")
      )
        return false;
      else this.navbarToggle = false;
    },

    navbar_click($event) {
      if (this.navbarToggle && $event.target.className.includes("nav-link")) this.navbarToggle = false;
    },

    setLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem("locale_site", locale);
      this.localeToggle = false;
      // Add RTL style file:
      if (locale === "ar") {
        require("@/assets/scss/style.rtl.scss");
      }
    },
  },
};
</script>

<style lang="scss">
@use "sass:color";
@use "../assets/scss/tools" as *;

.navbar .container {
  position: relative;
}
.navbar-nav {
  @include media-up("md") {
    margin-top: $gutter-md;
  }
  &.collapse.show {
    .locale {
      color: $secondary-color;
      border-bottom: 1px solid color.scale($primary-color, $lightness: 40%);
      &:hover {
        color: color-hvr($secondary-color);
      }
    }
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    @include media-down("xs") {
      flex-direction: column;
    }
    > .nav-link {
      @include media-down("md") {
        flex-grow: 1;
      }
    }
  }
}
.locales {
  position: absolute;
  @include media-max-height() {
    .fixed & {
      position: relative;
      order: 3;
    }
  }
  @include media-down("xs") {
    top: -15px;
  }
  top: 0;
  right: 0;
  .locale {
    display: block;
    padding: $gutter-sm $gutter-md;
    color: $primary-color;
    @include transition;
    &:hover {
      color: color-hvr($primary-color);
    }
  }
  ul {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: $white;
    border: $border-width solid $border-color;
    z-index: 2;
    .nav-link:hover {
      transform: none;
    }
  }
}
[dir="rtl"] .locales {
  right: unset;
  left: 0;
}
</style>
