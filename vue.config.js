module.exports = {
  publicPath: "/frontend/holol/",

  // outputDir: "dist/frontend/holol",
  // assetsDir: "frontend/holol",

  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",

      // the source template
      // template: "public/index.html",

      // output as dist/index.html
      // filename: "index.html",

      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "Gulf Solutions",

      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      // chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
      enableBridge: false,
    },
  },
};
