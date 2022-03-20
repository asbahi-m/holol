import Vue from "vue";

Vue.filter("trim", (val) => val.trim());

Vue.filter("truncate", (val, chars = 200) => (val.length > chars ? `${val.substr(0, chars)}...` : val));

Vue.filter("htmlString", (val) => {
  const parser = new DOMParser();
  const htmlString = parser.parseFromString(val, "text/html");
  return htmlString.body.textContent;
});

Vue.filter("toDate", (val, locale) => {
  // let date = new Intl.DateTimeFormat("ar-US", { dateStyle: "short" });
  // return date.format(new Date(val));
  let date = new Date(val);
  if (date instanceof Date) return date.toLocaleDateString(locale);
});
