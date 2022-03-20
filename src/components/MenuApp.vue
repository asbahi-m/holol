<template>
  <div class="menu">
    <router-link to="/" class="nav-link" exact>{{ $t("nav.home") }}</router-link>
    <router-link :to="{ name: 'Page', params: { id: 1 } }" class="nav-link">{{ $t("nav.about_us") }}</router-link>
    <router-link :to="{ name: 'Page', params: { id: 2 } }" class="nav-link">{{ $t("nav.our_services") }}</router-link>
    <router-link :to="{ name: 'Page', params: { id: 3 } }" class="nav-link">{{ $t("nav.our_clients") }}</router-link>
    <router-link :to="{ name: 'Page', params: { id: 4 } }" class="nav-link">{{ $t("nav.our_branches") }}</router-link>
    <router-link :to="{ name: 'Page', params: { id: 5 } }" class="nav-link">
      {{ $t("nav.company_profile") }}
    </router-link>
    <router-link :to="{ name: 'Page', params: { id: 8 } }" class="nav-link">{{ $t("nav.our_works") }}</router-link>
    <!-- <router-link :to="{ name: 'Category', params: { id: 2 } }" class="nav-link">{{ $t("nav.our_works") }}</router-link> -->
    <router-link :to="{ name: 'Order' }" class="nav-link">{{ $t("nav.service_order") }}</router-link>
    <router-link :to="{ name: 'ContactUs' }" class="nav-link">{{ $t("nav.contact_us") }}</router-link>
    <!-- <router-link :to="{ name: 'Page', params: { id: 7 } }" class="nav-link">{{ $t("nav.contact_us") }}</router-link> -->
  </div>
</template>
