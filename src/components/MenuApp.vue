<template>
  <div class="menu">
    <router-link to="/" class="nav-link" exact>الرئيسية</router-link>
    <router-link :to="{ name: 'Page', params: { id: 1 } }" class="nav-link">من نحن</router-link>
    <router-link :to="{ name: 'Page', params: { id: 2 } }" class="nav-link">خدماتنا</router-link>
    <router-link :to="{ name: 'Page', params: { id: 3 } }" class="nav-link">عملائنا</router-link>
    <router-link :to="{ name: 'Page', params: { id: 4 } }" class="nav-link">فروعنا</router-link>
    <router-link :to="{ name: 'Page', params: { id: 5 } }" class="nav-link">بروفايل الشركة</router-link>
    <router-link :to="{ name: 'Page', params: { id: 8 } }" class="nav-link">أعمالنا</router-link>
    <!-- <router-link :to="{ name: 'Category', params: { id: 2 } }" class="nav-link">أعمالنا</router-link> -->
    <router-link :to="{ name: 'Order' }" class="nav-link">طلب خدمة</router-link>
    <router-link :to="{ name: 'ContactUs' }" class="nav-link">اتصل بنا</router-link>
    <!-- <router-link :to="{ name: 'Page', params: { id: 7 } }" class="nav-link">اتصل بنا</router-link> -->
  </div>
</template>
