import Vue from "vue";

Vue.directive("focus", (el, binding) => {
  if (binding.value) el.focus();
});

Vue.directive("scroll", {
  inserted(el, binding) {
    let f = (event) => {
      if (binding.value(event, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  },
});

Vue.directive("scrollAnimate", {
  inserted(el, binding) {
    if (binding.value == "fade-in") {
      el.setAttribute("style", "opacity: 0; transform: translate3d(0, 10px, 0)");
    }

    let f = () => {
      if (
        window.scrollY + window.innerHeight > el.offsetTop + window.innerHeight / 2 &&
        window.scrollY < el.offsetTop
      ) {
        // if (binding.value == "fade-in") {
        el.setAttribute("style", "opacity: 1; transform: translate3d(0, 0, 0)");
        // }
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  },
});
