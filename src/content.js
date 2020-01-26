module.exports = [
  {
    output: "./index.html",
    content: {
      title: "tweak - browser extension"
    },
    template: "./src/pages/home.hbs"
  },
  {
    output: "./documentation.html",
    content: {
      title: "tweak - browser extension - documentation"
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
