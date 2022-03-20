export const tranlateMixin = {
  methods: {
    t_data(data, t_data, element_id) {
      const site_locale = this.$i18n.locale;
      if (site_locale !== "en") {
        data.map((element) => {
          let t_data_filter = t_data.filter((item) => item[element_id] == element.id && item.locale == site_locale);
          if (t_data_filter.length) element[site_locale] = t_data_filter[0];
        });
        // console.log(data);
      }
      // return data;
    },
  },
};
