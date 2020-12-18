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
      metaDescription: "A browser extension that allows you to change your HTTP requests. Add custom rules. Mock HTTP requests. Simulate API responses. Developer tool. Mimic requests.",
      metaSubject: "tweak browser extension official website",
      faqs: [
        {
          q: new handlebars.SafeString("How does this thing work?"),
          a: new handlebars.SafeString(`
            Fair question. Straight to the point. Don't worry, it won't
            take you more than 2 minutes to start being productive with tweak: <a href="https://www.youtube.com/watch?v=M7rMuNBw1xQ" title="How to intercept HTTP requests with tweak extension" target="_blank" rel="noopener">watch this short video</a>.
          `),
        },
        {
          q: new handlebars.SafeString("Do I need to add/install something in my code?"),
          a: new handlebars.SafeString(`
            <b>Absolutely not! No external application/library installation is required!</b> tweak works as a standalone browser extension and you can work with it in any environment, from development to production! No code required!
          `),
        },
        {
          q: new handlebars.SafeString("Will this work in every web application?"),
          a: new handlebars.SafeString(`
            tweak has proven to be reliable, but still we acknowledge our own <b>limitations</b>, currently:
            <ul>
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
          q: new handlebars.SafeString("I setup everything, but no requests are being intercepted."),
          a: new handlebars.SafeString(`
            <span>
              Have you tried to turn it off and on? 🤞 Please refer to the question <i>\"Will this work in every web application?\"</i>	&nbsp; to understand tweak limitations.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("I clicked on the file import button but nothing happened?"),
          a: new handlebars.SafeString(`
            <span>
              In case this happens, close the popup, go back to your website, refresh the page, and give it another try.
              <b>To import, you must be on a webpage</b> (e.g. <code>http(s)://...</code>). If you're for instance on the chrome/firefox settings page, (e.g. <code>chrome://settings</code>) you won't be able to perform the import.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("Do I need to keep the <i>DevTools</i> open?"),
          a: new handlebars.SafeString(`
            <span>
              <b>No you don't</b> 😎. <b>tweak will still work even if you have the browser <i>DevTools</i> closed!</b> <b>However, if you're using it for development purposes
              we recommend you to keep the <i>DevTools</i> opened so that you don't get tricked by the browser cache</b>. For cases where you're doing a demo or doing a
              screen recording it's understandable that you would want to keep the <i>DevTools</i> closed.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("Is there any detailed step by step guide where I can learn how to use tweak?"),
          a: new handlebars.SafeString(`
            <span>
              Glad you asked. We drafted a very detailed <a href="${links.documentation}" title="tweak documentation page">documentation page</a> for you with some awesome video content.
            </span>
          `),
        },
        {
          q: new handlebars.SafeString("Does tweak work on iframes?"),
          a: new handlebars.SafeString(`
            <span>
              We've introduced partial support in <b>tweak v1.1.0</b>, it's currently something has a great coverage, therefore we acknowledge that it might not work for most the use cases.
              We advise to open the iframe in a separate browser tab to operate on it, if possible.
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
      links,
      videos: [
        {
          title: 'How to autocomplete a request in tweak',
          frameSrc: 'https://www.youtube.com/embed/5LrhuNsIBOE',
        },
        {
          title: 'How to intercept HTTP requests with tweak extension',
          frameSrc: 'https://www.youtube.com/embed/M7rMuNBw1xQ',
        },
        {
          title: 'How to intercept a POST request specifying the body with tweak',
          frameSrc: 'https://www.youtube.com/embed/iXGH95oK_BU',
        },
        {
          title: 'How to change the response status and content-type header in tweak',
          frameSrc: 'https://www.youtube.com/embed/wX_qp-Gorws',
        },
      ],
      blogposts: [
        {
          title: 'A Pragmatic Mocking Tool',
          subtitle: 'A browser extension to the rescue',
          href: 'https://goodguydaniel.com/blog/best-http-request-mock-tool',
          seoTitle: 'A Pragmatic Mocking Tool by goodguydaniel.com'
        },
        {
          title: 'Simulate Delays in HTTP Requests',
          subtitle: 'Without writing any code!',
          href: 'https://goodguydaniel.com/blog/how-to-simulate-delay-http-request',
          seoTitle: 'Simulate Delays in HTTP Requests by goodguydaniel.com',
        }
      ],
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
  },
  {
    output: "./uninstalltschussy07vv9cd6c4.html",
    content: {
      title: "tweak - Your opinion matters!",
      googleFormURL: "https://docs.google.com/forms/d/e/1FAIpQLSf-0mLiMMWCgugKQ-Cq2npNgdT4NNoVwqBTO_Nzj5qGRh-P7Q/viewform",
    },
    template: "./src/pages/uninstalltschussy07vv9cd6c4.hbs",
  }
];
