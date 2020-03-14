const handlebars = require('handlebars');

const links = {
  documentation: process.env.NODE_ENV === 'development'
    ? '/documentation.html'
    : 'https://tweak-extension.com/documentation'
};

module.exports = [
  {
    output: "./index.html",
    content: {
      title: "tweak - browser extension",
      metaDescription: "tweak browser extension main page",
      metaSubject: "tweak is an extension that allows you to tweak your HTTP requests so that you can test, develop and demo your web application.",
      faqs: [
        {
          q: new handlebars.SafeString("Will this work in every web application?"),
          a: new handlebars.SafeString(`
            No. tweak has its own <b>limitations</b>, currently:
            <ul>
              <li>Is not able to intercept requests that are triggered at the page load. The problem is that the requests might be fired before the extension loads in the web page. This is a race condition we are putting a lot of effort to solve.</li>
              <li>
                It cannot intercept data received through
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" title="developer mozilla documentation for WebSockets API" target="_blank" rel="noopener">
                WebSockets.
                </a>
              </li>
              <li>
                It will only apply the configurations to the browser tab where you configure the requests to intercept and
                activate the extension (by clicking the run button).
              </li>
              <li>In case you refresh the page of the website while the extension is active the extension will need a manual reset, you'll need to click on the <i>STOP</i> button and then again click on the <i>RUN</i> button in order to the extension to be able to intercept requests again.</li>
            </ul>
          `)
        },
        {
          q: new handlebars.SafeString("Is tweak interfering with other web applications?"),
          a: new handlebars.SafeString(`
            <span>
              tweak uses
              <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage" title="developer mozilla documentation for window postMessage" target="_blank" rel="noopener">
                Window.postMessage API
              </a>
              to communicate between web pages and the extension. Leaving tweak
              turned on (running mode) might interfere with the <i>runtime</i> of the website. <b>It is a good practice to keep tweak paused and only turn it on when you are using it.</b>
            </span>
          `)
        },
        {
          q: new handlebars.SafeString("I setup everything, but no requests are being intercepted."),
          a: new handlebars.SafeString(`
            <span>
              Have you tried to turn it off and on? 🤞 Please refer to the question <i>\"Will this work in every web application?\"</i> to understand tweak limitations.
              Another important aspect on the request URL matching expression that might be easy to miss, is that sometimes
              we perform requests to the same domain, thus we do not have the domain present in the request URL, we simply
              write the path. In those cases, if you specify the full URL in the tweak configuration <b>the request will be a mismatch and will
              not be intercepted.</b>
            </span>
          `)
        },
        {
          q: new handlebars.SafeString("Will tweak ever be available for Mozilla Firefox?"),
          a: new handlebars.SafeString("<span>Perhaps. There are no plans to do so at the moment, we might add it if there's a high number of requests.</span>")
        },
        {
          q: new handlebars.SafeString("Is there any detailed step by step guide where I can learn how to use tweak?"),
          a: new handlebars.SafeString(`
            <span>
              Glad you asked. We drafted a very detailed <a href="${links.documentation}" title="tweak documentation page">documentation page</a> for you.
            </span>
          `)
        }
      ],
      links
    },
    template: "./src/pages/home.hbs"
  },
  {
    output: "./documentation.html",
    content: {
      title: "tweak - browser extension - documentation",
      metaDescription: "tweak browser documentation page",
      metaSubject: "tweak browser documentation page",
      links
    },
    template: "./src/pages/documentation.hbs"
  },
  {
    output: "./404.html",
    content: {
      title: "tweak - 404 page not found",
      metaDescription: "tweak browser 404 page",
      metaSubject: "tweak browser 404 page",
      links
    },
    template: "./src/pages/404.hbs"
  }
];
