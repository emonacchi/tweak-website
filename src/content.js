const handlebars = require('handlebars');

const links = {
  documentation:
    process.env.NODE_ENV === "development"
      ? "/documentation.html"
      : "https://tweak-extension.com/documentation",
  changelog:
    process.env.NODE_ENV === "development"
      ? "/changelog.html"
      : "https://tweak-extension.com/changelog"
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
              <li>
                Under specific conditions combined with the asynchronous nature of the way tweak communicates with your website, things might not work at first. For that we advise a page reload after pressing the play/run button to active the extension.
              </li>
            </ul>
          `),
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
          `),
        },
        {
          q: new handlebars.SafeString("I setup everything, but no requests are being intercepted."),
          a: new handlebars.SafeString(`
            <span>
              Have you tried to turn it off and on? 🤞 Please refer to the question <i>\"Will this work in every web application?\"</i>	&nbsp; to understand tweak limitations.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("Will tweak ever be available for Mozilla Firefox?"),
          a: new handlebars.SafeString("<span>Perhaps. There are no plans to do so at the moment, we might add it if there's a high number of requests.</span>")
        },
        {
          q: new handlebars.SafeString(`
            Any thoughts on having a tailored support for <a href="https://graphql.org/" title="GraphQL - A query language for your API" target="_blank" rel="noopener">GraphQL</a>?
          `),
          a: new handlebars.SafeString(`
            <span>
              We're seriously considering having something in the extension very tailored to <a href="https://graphql.org/" title="GraphQL - A query language for your API" target="_blank" rel="noopener">GraphQL</a> to intercept request that interact with <i>GraphQL</i> servers. Send us an email to <b>help.tweak@gmail.com</b> expressing your interest.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("Is there any detailed step by step guide where I can learn how to use tweak?"),
          a: new handlebars.SafeString(`
            <span>
              Glad you asked. We drafted a very detailed <a href="${links.documentation}" title="tweak documentation page">documentation page</a> for you.
            </span>
          `),
        },
      ],
      links
    },
    template: "./src/pages/home.hbs"
  },
  {
    output: "./documentation.html",
    content: {
      title: "tweak - browser extension - documentation",
      metaDescription: "tweak browser extension documentation page",
      metaSubject: "tweak browser extension documentation page",
      links
    },
    template: "./src/pages/documentation.hbs"
  },
  {
    output: "./changelog.html",
    content: {
      title: "tweak - browser extension - changelog",
      metaDescription: "tweak browser extension changelog page",
      metaSubject: "tweak browser extension changelog page",
      links
    },
    template: "./src/pages/changelog.hbs"
  },
  {
    output: "./404.html",
    content: {
      title: "tweak - 404 page not found",
      metaDescription: "tweak browser extension 404 page",
      metaSubject: "tweak browser extension 404 page",
      links
    },
    template: "./src/pages/404.hbs"
  }
];
