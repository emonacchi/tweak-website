// TODO: enhance content for SEO
module.exports = [
  {
    output: "./index.html",
    content: {
      title: "tweak - browser extension",
      metaDescription: "tweak browser extension main page"
    },
    template: "./src/pages/home.hbs"
  },
  {
    output: "./documentation.html",
    content: {
      title: "tweak - browser extension - documentation",
      metaDescription: "tweak browser documentation page"
    },
    template: "./src/pages/documentation.hbs"
  },
  {
    output: "./404.html",
    content: {
      title: "tweak - 404 page not found"
    },
    template: "./src/pages/404.hbs"
  }
];
