document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initialize Tabby tabs
   *
   * Tabby is a lightweight Tabs.
   * @see https://github.com/cferdinandi/tabby
   */

  if (typeof Tabby !== "undefined") {
    const tabsElement = document.querySelector("[data-tabs]");
    if (tabsElement) {
      new Tabby("[data-tabs]");
    }
  }

  /**
   * Initialize Embla carousels
   *
   * Embla is a lightweight carousel library.
   * @see https://www.embla-carousel.com/
   */

  const addTogglePrevNextButtonsActive = (emblaApi, prevBtn, nextBtn) => {
    const togglePrevNextButtonsState = () => {
      if (emblaApi.canScrollPrev()) {
        prevBtn.classList.remove("embla-carousel__button--disabled");
      } else {
        prevBtn.classList.add("embla-carousel__button--disabled");
      }

      if (emblaApi.canScrollNext()) {
        nextBtn.classList.remove("embla-carousel__button--disabled");
      } else {
        nextBtn.classList.add("embla-carousel__button--disabled");
      }
    };

    togglePrevNextButtonsState();

    emblaApi
      .on("select", togglePrevNextButtonsState)
      .on("reinit", togglePrevNextButtonsState);
  };

  const addPrevNextButtonClickHandlers = (emblaApi, prevBtn, nextBtn) => {
    const scrollPrev = () => {
      emblaApi.scrollPrev();
    };
    const scrollNext = () => {
      emblaApi.scrollNext();
    };
    prevBtn.addEventListener("click", scrollPrev, false);
    nextBtn.addEventListener("click", scrollNext, false);

    addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn);
  };

  const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {
    let dotNodes = [];

    const addDotBtnsWithClickHandlers = () => {
      dotsNode.innerHTML = emblaApi
        .scrollSnapList()
        .map(() => '<button class="embla__dot" type="button"></button>')
        .join("");

      const scrollTo = (index) => {
        emblaApi.scrollTo(index);
      };

      dotNodes = Array.from(dotsNode.querySelectorAll(".embla__dot"));
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener("click", () => scrollTo(index), false);
      });
    };

    const toggleDotButtonsActive = () => {
      const previous = emblaApi.previousScrollSnap();
      const selected = emblaApi.selectedScrollSnap();
      dotNodes[previous].classList.remove("embla__dot--selected");
      dotNodes[selected].classList.add("embla__dot--selected");
    };

    addDotBtnsWithClickHandlers();
    toggleDotButtonsActive();

    emblaApi
      .on("reinit", addDotBtnsWithClickHandlers)
      .on("reinit", toggleDotButtonsActive)
      .on("select", toggleDotButtonsActive);
  };

  const updateSelectedSnapDisplay = (emblaApi, snapDisplay) => {
    const updateSnapDisplay = (emblaApi) => {
      const selectedSnap = emblaApi.selectedScrollSnap();
      const snapCount = emblaApi.scrollSnapList().length;
      snapDisplay.innerHTML = `${selectedSnap + 1} / ${snapCount}`;
    };

    emblaApi.on("select", updateSnapDisplay).on("reinit", updateSnapDisplay);

    updateSnapDisplay(emblaApi);
  };

  const OPTIONS = { align: "start" };

  const initializeCarousel = (emblaNode) => {
    if (typeof EmblaCarousel === "undefined") return;

    const viewportNode = emblaNode.querySelector(".embla-carousel__viewport");
    const prevBtn = emblaNode.querySelector(".embla-carousel__button-prev");
    const nextBtn = emblaNode.querySelector(".embla-carousel__button-next");
    const dotsNode = emblaNode.querySelector(".embla-carousel__dots");
    const snapDisplayNode = emblaNode.querySelector(
      ".embla-carousel__selected-snap-display",
    );

    if (!viewportNode) return;

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS);

    if (prevBtn && nextBtn) {
      addPrevNextButtonClickHandlers(emblaApi, prevBtn, nextBtn);
    }
    if (dotsNode) {
      addDotButtonAndClickHandlers(emblaApi, dotsNode);
    }
    if (snapDisplayNode) {
      updateSelectedSnapDisplay(emblaApi, snapDisplayNode);
    }
  };

  const emblaNodes = document.querySelectorAll(".embla-carousel");
  if (emblaNodes.length > 0) {
    emblaNodes.forEach((emblaNode) => initializeCarousel(emblaNode));
  }

  if (typeof EmblaCarousel !== "undefined") {
    const heroWrapperNode = document.querySelector(".hero__embla");
    if (heroWrapperNode) {
      const heroViewportNode = heroWrapperNode.querySelector(
        ".hero__embla-viewport",
      );
      const heroDotsNode = heroWrapperNode.querySelector(".hero__embla-dots");

      if (heroViewportNode && heroDotsNode) {
        const emblaApi = EmblaCarousel(heroViewportNode, { loop: false });
        addDotButtonAndClickHandlers(emblaApi, heroDotsNode);
      }
    }
  }

  /** mobile menu toggle **/
  const menuToggle = document.getElementById("menu-toggle");
  const headerNav = document.getElementById("header-nav");

  if (menuToggle && headerNav) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("header__toggle--active");
      headerNav.classList.toggle("header__nav--active");
      const isActive = menuToggle.classList.contains("header__toggle--active");
      menuToggle.setAttribute(
        "aria-label",
        isActive ? "Cerrar menú" : "Abrir menú",
      );
      menuToggle.setAttribute("aria-expanded", isActive);
    });
  }

  /** main menu toggle **/
  const navItems = document.querySelectorAll(".main-navigation__item");
  const backdrop = document.getElementById("js-navigation-backdrop");

  if (navItems.length > 0 && backdrop) {
    const closeAllMenus = () => {
      navItems.forEach((item) => {
        item.classList.remove("main-navigation__item--is-open");
      });
      backdrop.classList.remove("main-navigation__backdrop--is-visible");
    };

    navItems.forEach((item) => {
      const link = item.querySelector(".main-navigation__link");

      if (link) {
        link.addEventListener("click", (e) => {
          e.stopPropagation();
          const isOpen = item.classList.contains(
            "main-navigation__item--is-open",
          );

          closeAllMenus();

          if (!isOpen) {
            item.classList.add("main-navigation__item--is-open");
            backdrop.classList.add("main-navigation__backdrop--is-visible");
          }
        });
      }
    });

    backdrop.addEventListener("click", closeAllMenus);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllMenus();
    });
  }

  const submenus = document.querySelectorAll(".main-navigation__submenu");
  if (submenus.length > 0) {
    submenus.forEach((submenu) => {
      submenu.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  }

  /** timeline **/

  const timelineItems = document.querySelectorAll(".timeline__item");

  if (timelineItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timelineItems.forEach((item) => {
            item.classList.remove("timeline__item--highlight");
          });
          entry.target.classList.add("timeline__item--highlight");
        }
      });
    }, observerOptions);

    timelineItems.forEach((item) => observer.observe(item));
  }

  /** country locations map **/

  const listItems = document.querySelectorAll(".location-item");
  const mapFrame = document.getElementById("map-frame");

  if (listItems.length > 0 && mapFrame) {
    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        listItems.forEach((i) => i.classList.remove("location-item--active"));

        item.classList.add("location-item--active");

        const lat = item.getAttribute("data-lat");
        const lng = item.getAttribute("data-lng");
        const zoom = item.getAttribute("data-zoom") || "15";

        const newMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;

        mapFrame.setAttribute("src", newMapUrl);
      });
    });
  }

  /**--- animations --**/
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // Header entrance animation - Staggered
  const headerTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
  });

  headerTimeline
    .from(".header__logo", {
      opacity: 0,
      y: -30,
      duration: 0.6,
    })
    .from(
      ".header__item",
      {
        opacity: 0,
        y: -20,
        stagger: 0.1,
      },
      "-=0.3",
    )
    .from(
      ".header__lang",
      {
        opacity: 0,
        y: -20,
      },
      "-=0.4",
    )
    .from(
      ".header__toggle",
      {
        opacity: 0,
        scale: 0.8,
      },
      "0.3",
    );

  // Main navigation entrance animation - Staggered
  gsap.from(".main-navigation__item", {
    opacity: 0,
    x: -40,
    stagger: {
      amount: 0.5,
      from: "start",
    },
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".main-navigation",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Hero section entrance animation - Staggered
  const heroTimeline = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 1,
    },
  });

  // Secondary navigation animation only on desktop
  gsap.matchMedia().add("(min-width: 768px)", () => {
    heroTimeline.from(
      ".secondary-navigation__link",
      {
        opacity: 0,
        y: 30,
        stagger: 0.08,
      },
      "0.5",
    );
  });

  heroTimeline
    .from(
      ".hero__circle",
      {
        opacity: 0,
        scale: 0.6,
        duration: 1.2,
      },
      "0.5",
    )
    .from(
      ".hero__title",
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
      },
      "0.5",
    );

  // Key metrics section entrance animation - Staggered
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".key-metrics",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".key-metrics__logo", {
      opacity: 0,
      y: -30,
      duration: 0.6,
    })
    .from(
      ".key-metrics__item",
      {
        opacity: 0,
        y: 40,
        stagger: 0.15,
      },
      "-=0.3",
    )
    .from(
      ".key-metrics__arc",
      {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "center center",
        duration: 0.8,
      },
      "-=0.4",
    );

  // Key metrics count-up animation
  gsap.utils.toArray(".key-metrics__value").forEach((element) => {
    const text = element.textContent;
    const hasPlus = text.includes("+");
    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ""));

    if (!isNaN(numericValue)) {
      gsap.fromTo(
        element,
        { textContent: 0 },
        {
          textContent: numericValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: numericValue >= 10 ? 1 : 0.1 },
          scrollTrigger: {
            trigger: ".key-metrics",
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            const currentValue = gsap.getProperty(element, "textContent");
            const formattedValue =
              numericValue >= 10
                ? Math.floor(currentValue)
                : currentValue.toFixed(1);
            element.textContent = (hasPlus ? "+" : "") + formattedValue + " ";
          },
        },
      );
    }
  });

  // Video banner entrance animation - Staggered
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".video-banner",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".video-banner__decoration--left", {
      opacity: 0,
      x: -80,
      duration: 0.8,
    })
    .from(
      ".video-banner__container",
      {
        opacity: 0,
        scale: 0.9,
        duration: 1,
      },
      "-=0.5",
    )
    .from(
      ".video-banner__decoration--right",
      {
        opacity: 0,
        x: 80,
        duration: 0.8,
      },
      "-=0.6",
    );

  // Services section entrance animation - Staggered
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".services",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".services__title", {
      opacity: 0,
      y: 30,
      duration: 0.6,
    })
    .from(
      ".services__description",
      {
        opacity: 0,
        y: 30,
        duration: 0.7,
      },
      "-=0.3",
    )
    .from(
      ".services__image",
      {
        opacity: 0,
        scale: 0.95,
        y: 40,
        duration: 0.9,
      },
      "-=0.4",
    );

  // Industries section entrance animation - Staggered
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".industries",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".industries__title", {
      opacity: 0,
      y: 30,
      duration: 0.6,
    })
    .from(
      ".industry-card",
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.9,
      },
      "-=0.3",
    );

  // Ubication section animation
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".ubication",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".ubication__logo", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
    })
    .from(
      ".ubication__title",
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
      },
      "-=0.3",
    )
    .from(
      ".ubication__map",
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
      },
      "-=0.2",
    )
    .from(
      ".ubication__flag",
      {
        opacity: 0,
        scale: 0,
        stagger: 0.15,
        duration: 0.6,
      },
      "-=0.4",
    );

  // Carousel (Noticias) section animation
  gsap
    .timeline({
      defaults: {
        ease: "power3.out",
        duration: 0.8,
      },
      scrollTrigger: {
        trigger: ".carousel",
        start: "top 75%",
        toggleActions: "play none none none",
      },
    })
    .from(".carousel__title", {
      opacity: 0,
      y: 30,
      duration: 0.6,
    })
    .from(
      ".post-card",
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.2,
        duration: 0.9,
      },
      "-=0.2",
    )
    .from(
      ".carousel__link-all",
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
      },
      "-=0.3",
    );
});
