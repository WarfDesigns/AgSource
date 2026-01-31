(() => {
  const closeOnResizeBreakpoint = 960;

  const closeNav = (toggle, body) => {
    body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("is-open");
  };

  const openNav = (toggle, body) => {
    body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("is-open");
  };

  window.initNavToggle = () => {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("main-nav")
    const closeButton = nav?.querySelector(".nav-close");
    const body = document.body;

    if (!toggle || !nav || toggle.dataset.navBound === "true") {
      return;
    }

    toggle.dataset.navBound = "true";

    toggle.addEventListener("click", () => {
      const isOpen = body.classList.contains("nav-open");
      if (isOpen) {
        closeNav(toggle, body);
      } else {
        openNav(toggle, body);
      }
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest(".nav-close")) {event.preventDefault();
        closeNav(toggle, body);
        return;
      }
      if (event.target.closest("a")) {
        closeNav(toggle, body);
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav(toggle, body);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > closeOnResizeBreakpoint) {
        closeNav(toggle, body);
      }
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.initNavToggle === "function") {
      window.initNavToggle();
    }
  });
})();