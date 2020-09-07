"use strict";

var UIController = function () {
  var DOM = {
    nav: document.querySelector('.nav'),
    navLinks: document.querySelectorAll('.nav__link'),
    offsetLinks: document.querySelectorAll('.offset-link'),
    sections: document.querySelectorAll("section"),
    scrollBtn: document.querySelector(".scroll"),
    hamburgerOpen: document.querySelector('.hamburger-open'),
    hamburgerClose: document.querySelector('.offset-close'),
    showBtn: document.querySelector(".about__button"),
    offset: document.querySelector(".offset")
  };
  return {
    getDomString: DOM,
    resetClass: function resetClass(ele, klass) {
      if (ele.length > 1) {
        for (var i = 0; i < ele.length; i++) {
          ele[i].classList.remove("".concat(klass));
        }
      } else {
        ele.classList.remove("".concat(klass));
      }
    }
  };
}();

var Controller = function (uiCtrl) {
  // Declare Bindings
  var Dom, index;
  Dom = uiCtrl.getDomString;
  index = 0;

  function setListeners() {
    // let links;
    // links
    Dom.navLinks.forEach(function (link, i) {
      return link.addEventListener("click", scrollToContent);
    });
    Dom.offsetLinks.forEach(function (link, i) {
      return link.addEventListener("click", scrollToContent);
    }); // Scroll to top button

    Dom.scrollBtn.addEventListener("click", scrollToTop); // Hamburger

    Dom.hamburgerOpen.addEventListener("click", openNav); // Hamburger

    Dom.hamburgerClose.addEventListener("click", closeNav); // Show Content

    Dom.showBtn.addEventListener("click", showContent, {
      once: true
    }); // Window scroll event

    window.addEventListener("scroll", scrollNav);
    window.addEventListener("scroll", scrollSections); // Remove offset when window's width is

    window.addEventListener("resize", function (e) {
      var screenWidth = 551;
      if (e.target.innerWidth >= screenWidth) Dom.offset.classList.remove("open");
    });
  }

  function showContent() {
    var _this = this;

    var text = this.previousElementSibling.querySelector(".show-text");
    setTimeout(function () {
      text.style.height = "".concat(text.scrollHeight, "px");
      text.style.opacity = "1";
      text.style.visibility = "visible";
    }, 50); // Hide Button

    setTimeout(function () {
      return _this.style.setProperty("display", "none");
    }, 800);
  } // Hamburger open offset


  function openNav(e) {
    if (this.id === "hamburger") Dom.offset.classList.add("open");
  }

  function closeNav(e) {
    Dom.offset.classList.remove("open");
  } // Link scroll to sections


  function scrollToContent(e) {
    e.preventDefault();
    uiCtrl.resetClass(Dom.navLinks, "active");
    e.target.classList.add("active");
    var linkHref = e.target.getAttribute("href").split("#")[1];
    Dom.sections.forEach(function (section) {
      if (linkHref === section.id) section.scrollIntoView({
        behavior: "smooth"
      });
    });
  } // Set nav to fixed when scrolled to a specific height


  function scrollNav(e) {
    var win, nav, btn;
    btn = Dom.scrollBtn;
    nav = Dom.nav;
    win = document.documentElement || document.body; // Check if windows have been scrolled to 200 vertically and add class of active to nav

    win.scrollTop >= 450 ? nav.classList.add("active") : setTimeout(function () {
      return nav.classList.remove("active");
    }, 10);

    if (win.scrollTop >= 1000) {
      btn.classList.add("display");
      setTimeout(function () {
        return btn.className.includes("display") && btn.classList.add("display-show");
      }, 200);
    } else {
      btn.classList.remove("display", "display-show");
    }
  }

  function scrollSections() {
    // Nav Links Active onScroll
    scrollElements(Array.from(Dom.navLinks)); // Offset Links Active onScroll

    scrollElements(Array.from(Dom.offsetLinks));
  }

  function scrollElements(ele) {
    Array.from(Dom.sections).forEach(function (section, i) {
      var coords, height;
      coords = section.getBoundingClientRect().top;
      height = window.innerHeight / 1.2;
      ele.forEach(function (link, index) {
        if (i === index) {
          if (coords < height) {
            // reset links class
            uiCtrl.resetClass(ele, "active");
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        }
      });
    });
  }

  function scrollToTop() {
    var win = document.documentElement || document.body; // Take window back to top

    win.scrollTop = 0;
  }

  return {
    init: function init() {
      setListeners();
    }
  };
}(UIController); // Instantiate Controller


Controller.init();