document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  window.requestAnimationFrame(() => {
    body.classList.remove("is-preload");
  });

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // =========================
  // REVEAL SECTIONS
  // =========================
  const revealSections = document.querySelectorAll(".reveal-section");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealSections.forEach((section) => revealObserver.observe(section));

  // =========================
  // PARALLAX BG
  // =========================
  const pageBg = document.querySelector(".page-bg");
  let bgTicking = false;

  const updateParallax = () => {
    if (prefersReducedMotion()) {
      bgTicking = false;
      return;
    }

    if (pageBg) {
      pageBg.style.transform = `translateY(${window.scrollY * 0.06}px)`;
    }

    bgTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!bgTicking) {
        requestAnimationFrame(updateParallax);
        bgTicking = true;
      }
    },
    { passive: true }
  );

  // =========================
  // HEADER SHRINK + ACTIVE NAV
  // =========================
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");
  const siteHeader = document.querySelector(".site-header");

  let headerTicking = false;

  const setActiveNav = () => {
    let currentId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("is-active", isActive);

      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const syncHeaderState = () => {
    if (siteHeader) {
      // 👇 SMOOTH SHRINK TRIGGER (ranije nego pre)
      siteHeader.classList.toggle("is-condensed", window.scrollY > 24);
    }

    setActiveNav();
    headerTicking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!headerTicking) {
        requestAnimationFrame(syncHeaderState);
        headerTicking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener("load", syncHeaderState);
  syncHeaderState();

  // =========================
  // CERT CAROUSEL
  // =========================
  const carousel = document.getElementById("certsCarousel");
  const prevBtn = document.querySelector(".cert-prev");
  const nextBtn = document.querySelector(".cert-next");
  const certSection = document.querySelector(".skills-certs");

  if (carousel) {
    const cards = Array.from(carousel.querySelectorAll(".cert-card"));
    let activeIndex = 0;
    let autoPlay = null;
    let wheelLock = false;
    let lightboxOpen = false;

    const normalizeOffset = (index, active, total) => {
      let offset = index - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      return offset;
    };

    const clearCardState = (card) => {
      card.className = "cert-card";
    };

    const updateStack = () => {
      const total = cards.length;

      cards.forEach((card, index) => {
        clearCardState(card);
        const offset = normalizeOffset(index, activeIndex, total);

        if (offset === 0) {
          card.classList.add("is-active");
        } else if (offset === -1) {
          card.classList.add("pos-1-left");
        } else if (offset === -2) {
          card.classList.add("pos-2-left");
        } else if (offset <= -3) {
          card.classList.add("pos-3-left");
        } else if (offset === 1) {
          card.classList.add("pos-1-right");
        } else if (offset === 2) {
          card.classList.add("pos-2-right");
        } else if (offset >= 3) {
          card.classList.add("pos-3-right");
        }
      });
    };

    const goTo = (index) => {
      activeIndex = (index + cards.length) % cards.length;
      updateStack();
    };

    const nextCard = () => goTo(activeIndex + 1);
    const prevCard = () => goTo(activeIndex - 1);

    const stopAutoPlay = () => {
      if (autoPlay) {
        clearInterval(autoPlay);
        autoPlay = null;
      }
    };

    const startAutoPlay = () => {
      if (prefersReducedMotion()) return;
      stopAutoPlay();

      autoPlay = setInterval(() => {
        if (!document.hidden && !lightboxOpen) {
          nextCard();
        }
      }, 4200);
    };

    prevBtn?.addEventListener("click", () => {
      stopAutoPlay();
      prevCard();
      startAutoPlay();
    });

    nextBtn?.addEventListener("click", () => {
      stopAutoPlay();
      nextCard();
      startAutoPlay();
    });

    // LIGHTBOX
    const lightbox = document.createElement("div");
    lightbox.className = "cert-lightbox";
    lightbox.innerHTML = `
      <div class="cert-lightbox-backdrop"></div>
      <div class="cert-lightbox-inner">
        <img class="cert-lightbox-image" />
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".cert-lightbox-image");

    const openLightbox = (src) => {
      lightboxImage.src = src;
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      lightboxOpen = true;
    };

    const closeLightbox = () => {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      lightboxOpen = false;
    };

    lightbox.addEventListener("click", closeLightbox);

    cards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        const img = e.target.closest("img");

        if (img && index === activeIndex) {
          openLightbox(img.src);
          return;
        }

        if (index !== activeIndex) {
          goTo(index);
        }
      });
    });

    updateStack();
    startAutoPlay();
  }
});