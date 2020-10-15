AOS.init({
  duration: 800,
  easing: "slide",
  once: true
});

jQuery(document).ready(function($) {
  "use strict";

  /**
   * Common error handler for development purposes only, keeps
   * the `console` clean in production.
   * @param {Error} error
   */
  function handleError(error) {
    if (process.env.NODE_ENV === "development") {
      console.error("(visible in development mode only): ", error);
    }
  }

  var _TWEAK_COOKIE_BANNER_LS_KEY = "_tweak_cookie_banner_";
  var _TWEAK_COOKIE_IS_GA_ON_KEY = "_tweak_user_ga_is_on_"
  var _TWEAK_COOKIE_YES = "yes";
  var _TWEAK_COOKIE_NO = "no";
  var tweakCookiesBanner = document.getElementById("tweak-cookies-banner");
  var hideBannerItem = null;
  var shouldHideCookiesBanner = false;
  var isPrivacyPreferencesModalVisible = false;

  // handle showing/hiding the privacy center
  try {
    $("#cookies-settings-modal").on("shown.bs.modal", function () {
      isPrivacyPreferencesModalVisible = true;
    });
    $("#cookies-settings-modal").on("hidden.bs.modal", function () {
      isPrivacyPreferencesModalVisible = false;
    });
  } catch (error) {
    handleError(error);
  }

  // do not show the cookies banner to users that dismissed it already
  try {
    hideBannerItem = localStorage.getItem(_TWEAK_COOKIE_BANNER_LS_KEY);
    shouldHideCookiesBanner = hideBannerItem === _TWEAK_COOKIE_YES;

    if(shouldHideCookiesBanner) {
      tweakCookiesBanner.remove();
    } else {
      tweakCookiesBanner.style.setProperty("visibility", "");
    }
  } catch (error) {
    handleError(error);
  }

  if (!shouldHideCookiesBanner) {
    // hide permanently the cookies banner when user clicks on Ok
    try {
      var dismissBtn = document.getElementById("tweak-cookies-banner-ok-btn");
      dismissBtn.addEventListener("click", function _onClickOkBtn() {
        try {
          localStorage.setItem(_TWEAK_COOKIE_BANNER_LS_KEY, _TWEAK_COOKIE_YES);
          tweakCookiesBanner.style.setProperty("visibility", "hidden");
        } catch (error) {
          handleError(error);
        }
      });
    } catch (error) {
      handleError(error);
    }

    // dismiss cookie banner when clicking outside
    try {
      var cookieBanner = document.getElementById("tweak-cookies-banner");
      document.addEventListener("click", function (event) {
        if (isPrivacyPreferencesModalVisible) {
          return;
        }
        if (event && event.target && cookieBanner.contains(event.target)) {
          return;
        }
        localStorage.setItem(_TWEAK_COOKIE_BANNER_LS_KEY, _TWEAK_COOKIE_YES);
        tweakCookiesBanner.style.setProperty("visibility", "hidden");
      })
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
   * @param {boolean} isOn true if analytics preference is active for the user, false
   * otherwise.
   */
  function toggleAnalyticsPreference(isOn) {
    try {
      if (isOn === false) {
        var GA_KEY = process.env.GA_KEY;
        // disable ga
        window["ga-disable-" + GA_KEY] = true;
      }
      localStorage.setItem(_TWEAK_COOKIE_IS_GA_ON_KEY, isOn ? _TWEAK_COOKIE_YES : _TWEAK_COOKIE_NO);
    } catch (error) {
      handleError(error);
    }
  }

  try {
    var toggleAnalyticsCheckbox = document.getElementById("toggle-analytics-checkbox");

    // restore the new or returning user analytics preference
    var analyticsOn = localStorage.getItem(_TWEAK_COOKIE_IS_GA_ON_KEY);
    var isAnalyticsOn = true;
    switch (analyticsOn) {
      case _TWEAK_COOKIE_YES:
        isAnalyticsOn = true;
        break;
      case _TWEAK_COOKIE_NO:
        isAnalyticsOn = false;
        break;
      default:
        isAnalyticsOn = true;
        break;
    }
    toggleAnalyticsPreference(isAnalyticsOn);
    toggleAnalyticsCheckbox.checked = isAnalyticsOn;

    // hand toggling of analytics in the privacy preferences center modal
    var toggleAnalyticsCheckbox = document.getElementById("toggle-analytics-checkbox");
    toggleAnalyticsCheckbox.addEventListener("change", function (event) {
      toggleAnalyticsPreference(event.target.checked);
    });
  } catch (error) {
    handleError(error);
  }

  // when user goes over to the changelog page change the top bar links color to black
  try {
    if (window.location.href.includes("/changelog")) {
      var navLis = Array.from(document.querySelectorAll(".js-clone-nav li .nav-link"));
      navLis.forEach(function (e) {
        e.style.color = "black";
      });
    }
  } catch (error) {
    handleError(error);
  }

  var siteMenuClone = function() {
    $(".js-clone-nav").each(function() {
      var $this = $(this);
      $this
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function() {
      var counter = 0;
      $(".site-mobile-menu .has-children").each(function() {
        var $this = $(this);

        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter
        });

        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter
        });

        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function(e) {
      var $this = $(this);
      if (
        $this
          .closest("li")
          .find(".collapse")
          .hasClass("show")
      ) {
        $this.removeClass("active");
      } else {
        $this.addClass("active");
      }
      e.preventDefault();
    });

    $(window).resize(function() {
      var $this = $(this),
        w = $this.width();

      if (w > 768) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });

    $("body").on("click", ".js-menu-toggle", function(e) {
      var $this = $(this);
      e.preventDefault();

      if ($("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
        $this.removeClass("active");
      } else {
        $("body").addClass("offcanvas-menu");
        $this.addClass("active");
      }
    });

    // click outisde offcanvas
    $(document).mouseup(function(e) {
      var container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("offcanvas-menu")) {
          $("body").removeClass("offcanvas-menu");
        }
      }
    });
  };
  siteMenuClone();

  var siteCarousel = function() {
    if ($(".nonloop-block-13").length > 0) {
      $(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 0,
        margin: 0,
        autoplay: true,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">'
        ],
        responsive: {
          600: {
            margin: 0,
            nav: true,
            items: 2
          },
          1000: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 3
          },
          1200: {
            margin: 0,
            stagePadding: 0,
            nav: true,
            items: 4
          }
        }
      });
    }

    if ($(".nonloop-block-14").length > 0) {
      $(".nonloop-block-14").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 30,
        margin: 0,
        autoplay: true,
        smartSpeed: 1000,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">'
        ],
        responsive: {
          600: {
            margin: 20,
            nav: true,
            items: 2
          },
          1000: {
            margin: 30,

            nav: true,
            items: 2
          },
          1200: {
            margin: 30,

            nav: true,
            items: 3
          }
        }
      });
    }

    $(".slide-one-item").owlCarousel({
      center: false,
      items: 1,
      loop: true,
      stagePadding: 0,
      margin: 0,
      autoplay: true,
      pauseOnHover: false,
      nav: true,
      navText: [
        '<span class="icon-keyboard_arrow_left">',
        '<span class="icon-keyboard_arrow_right">'
      ]
    });
  };
  siteCarousel();

  var siteSticky = function() {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  // navigation
  var OnePageNavigation = function() {
    var navToggler = $(".site-menu-toggle");
    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a",
      function(e) {
        e.preventDefault();

        var hash = this.hash;
        var url = this.href;
        var isHashInCurrentLocation = false;

        try {
          var current = window.location.href.split("#")[0];
          var target = url.split(hash)[0];

          isHashInCurrentLocation = target && target === current;
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error('(visible in development mode only): ', error);
          }
          isHashInCurrentLocation = false;
        }

        if (hash && isHashInCurrentLocation) {
          $("html, body").animate(
            {
              scrollTop: $(hash).offset().top
            },
            600,
            "easeInOutCirc",
            function() {
              window.location.hash = hash;
            }
          );
        } else if (url) {
          window.location = url;
        } else if (process.env.NODE_ENV === "development") {
          console.warn("Bad element in OnePageNavigation: ", {
            hash: hash,
            url: url
          });
        }
      }
    );
  };
  OnePageNavigation();

  var siteScroll = function() {
    $(window).scroll(function() {
      var st = $(this).scrollTop();

      if (st > 100) {
        $(".js-sticky-header").addClass("shrink");
      } else {
        $(".js-sticky-header").removeClass("shrink");
      }
    });
  };
  siteScroll();
});
