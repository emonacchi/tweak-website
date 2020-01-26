const handlebars = require('handlebars');

module.exports = [
  {
    output: "./index.html",
    content: {
      title: "tweak - browser extension",
      metaDescription: "tweak browser extension main page",
      faqs: [
        {
          q: new handlebars.SafeString("Will this work in every web application?"),
          a: new handlebars.SafeString(`
            No. tweak has its own <b>limitations</b>, currently:
            <ul>
              <li>Is not able to intercept requests that are triggered at the page load.</li>
              <li>
                It cannot intercept requests if your web application patches/overrides the browser APIs
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" title="developer mozilla documentation for XMLHttpRequest" target="_blank" rel="noopener">
                XMLHttpRequest
                </a>
                and
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" title="developer mozilla documentation for fetch API" target="_blank" rel="noopener">
                window.fetch.
                </a>
              </li>
              <li>
                It cannot intercept data received through
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" title="developer mozilla documentation for WebSockets API" target="_blank" rel="noopener">
                WebSockets.
                </a>
              </li>
            </ul>
          `)
        },
        {
          q: new handlebars.SafeString("Is tweak interfering with other web applications?"),
          a: new handlebars.SafeString(`
            tweak uses
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage" title="developer mozilla documentation for window postMessage" target="_blank" rel="noopener">
              Window.postMessage API
            </a>
            to communicate between web pages and the extension. Leaving tweak
            turned on (running mode) might interfere with the <i>runtime</i> of the website. <b>It is a good practice to keep tweak paused and only turn it on when you are using it.</b>
          `)
        },
        {
          q: new handlebars.SafeString("I setup everything, but no requests are being intercepted."),
          a: new handlebars.SafeString("Have you tried to turn it off and on? 🤞 Please refer to the question <i>\"Will this work in every web application?\"</i> to understand tweak limitations.")
        },
        {
          q: new handlebars.SafeString("Will tweak ever be available for Mozilla Firefox?"),
          a: new handlebars.SafeString("Perhaps. There are no plans to do so at the moment, we might add it if there's a high number of requests.")
        },
        {
          q: new handlebars.SafeString("Is there any detailed step by step guide where I can learn how to use tweak?"),
          a: new handlebars.SafeString(`
            Glad you asked. We drafted a very detailed <a href="/documentation.html" title="tweak documentation page">documentation page</a> for you.
          `)
        }
      ]
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
