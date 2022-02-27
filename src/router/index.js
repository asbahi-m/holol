import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/page/:id",
    name: "Page",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "page" */ "../views/Page.vue"),
    // props: true,
  },
  {
    path: "/cate/:id",
    name: "Category",
    component: () => import(/* webpackChunkName: "category" */ "../views/Category.vue"),
  },
  {
    path: "/post/:id",
    name: "Post",
    component: () => import(/* webpackChunkName: "post" */ "../views/Post.vue"),
    // props: true,
  },
  {
    path: "/order",
    name: "Order",
    component: () => import(/* webpackChunkName: "page" */ "../views/Order.vue"),
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: () => import(/* webpackChunkName: "page" */ "../views/ContactUs.vue"),
  },
];

const router = new VueRouter({
  linkActiveClass: "active",
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    const position = {};
    if (to.hash) {
      if (to.hash === "#top") position.y = 0;
      else position.selector = to.hash;
      position.offset = { y: 150 };
      position.behavior = "smooth";
      return position;
    } else return savedPosition || { x: 0, y: 0 };
  },
});

export default router;
