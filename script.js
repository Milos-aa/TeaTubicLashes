document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  window.requestAnimationFrame(() => {
    body.classList.remove("is-preload");
  });

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // reveal
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

  // background parallax
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

  // active nav
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a");

  const setActiveNav = () => {
    let currentId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 180 && rect.bottom >= 180) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
    });
  };

  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("load", setActiveNav);
  setActiveNav();

  // stacked cert carousel
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
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    const normalizeOffset = (index, active, total) => {
      let offset = index - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      return offset;
    };

    const clearCardState = (card) => {
      card.classList.remove(
        "is-active",
        "pos-1-left",
        "pos-2-left",
        "pos-3-left",
        "pos-4-left",
        "pos-1-right",
        "pos-2-right",
        "pos-3-right",
        "pos-4-right"
      );
    };

    const updateStack = () => {
      const total = cards.length;

      cards.forEach((card, index) => {
        clearCardState(card);
        const offset = normalizeOffset(index, activeIndex, total);
        card.style.zIndex = "1";

        if (offset === 0) {
          card.classList.add("is-active");
          card.style.zIndex = "10";
        } else if (offset === -1) {
          card.classList.add("pos-1-left");
          card.style.zIndex = "8";
        } else if (offset === -2) {
          card.classList.add("pos-2-left");
          card.style.zIndex = "6";
        } else if (offset <= -3) {
          card.classList.add("pos-3-left");
          card.style.zIndex = "4";
        } else if (offset === 1) {
          card.classList.add("pos-1-right");
          card.style.zIndex = "8";
        } else if (offset === 2) {
          card.classList.add("pos-2-right");
          card.style.zIndex = "6";
        } else if (offset >= 3) {
          card.classList.add("pos-3-right");
          card.style.zIndex = "4";
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

    carousel.addEventListener(
      "wheel",
      (e) => {
        if (lightboxOpen) return;

        e.preventDefault();

        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (Math.abs(delta) < 6) return;
        if (wheelLock) return;

        wheelLock = true;
        stopAutoPlay();

        if (delta > 0) nextCard();
        else prevCard();

        setTimeout(() => {
          wheelLock = false;
          startAutoPlay();
        }, 380);
      },
      { passive: false }
    );

    // lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "cert-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <div class="cert-lightbox-backdrop"></div>
      <div class="cert-lightbox-inner" role="dialog" aria-modal="true" aria-label="Certificate image preview">
        <img class="cert-lightbox-image" alt="" />
      </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".cert-lightbox-image");

    const closeLightbox = () => {
      if (!lightboxOpen) return;
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      lightboxOpen = false;
    };

    const openLightbox = (src, alt) => {
      lightboxImage.src = src;
      lightboxImage.alt = alt || "Certificate preview";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      lightboxOpen = true;
    };

    cards.forEach((card, index) => {
      card.setAttribute("tabindex", "0");

      card.addEventListener("click", (e) => {
        const clickedImage = e.target.closest(".cert-image img");

        if (clickedImage) {
          if (index !== activeIndex) {
            stopAutoPlay();
            goTo(index);
            startAutoPlay();
            return;
          }

          openLightbox(clickedImage.currentSrc || clickedImage.src, clickedImage.alt);
          return;
        }

        if (index !== activeIndex) {
          stopAutoPlay();
          goTo(index);
          startAutoPlay();
        }
      });

      card.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();

        if (index !== activeIndex) {
          stopAutoPlay();
          goTo(index);
          startAutoPlay();
          return;
        }

        const activeImage = card.querySelector(".cert-image img");
        if (activeImage) {
          openLightbox(activeImage.currentSrc || activeImage.src, activeImage.alt);
        }
      });
    });

    window.addEventListener("keydown", (e) => {
      if (lightboxOpen) return;

      const rect = carousel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        stopAutoPlay();
        prevCard();
        startAutoPlay();
      }

      if (e.key === "ArrowRight") {
        stopAutoPlay();
        nextCard();
        startAutoPlay();
      }
    });

    carousel.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoved = false;
        stopAutoPlay();
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchmove",
      (e) => {
        if (!e.touches.length) return;
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        const diffX = moveX - touchStartX;
        const diffY = moveY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
          touchMoved = true;
        }
      },
      { passive: true }
    );

    carousel.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches.length) {
          startAutoPlay();
          return;
        }

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - touchStartX;
        const diffY = endY - touchStartY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
          if (diffX < 0) nextCard();
          else prevCard();
        }

        startAutoPlay();
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    });

    lightbox.addEventListener("click", closeLightbox);

    ["keydown", "wheel", "touchstart", "mousedown", "scroll"].forEach((eventName) => {
      window.addEventListener(
        eventName,
        () => {
          if (lightboxOpen) closeLightbox();
        },
        { passive: true }
      );
    });

    // cursor + spotlight
    if (!prefersReducedMotion() && window.matchMedia("(hover: hover)").matches && certSection) {
      const cursor = document.createElement("div");
      cursor.className = "lux-cursor";
      document.body.appendChild(cursor);

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let currentX = mouseX;
      let currentY = mouseY;
      let cursorVisible = false;
      let rafId = null;

      const animateCursor = () => {
        currentX += (mouseX - currentX) * 0.18;
        currentY += (mouseY - currentY) * 0.18;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        rafId = requestAnimationFrame(animateCursor);
      };

      const showCursor = () => {
        if (!cursorVisible) {
          cursorVisible = true;
          cursor.classList.add("is-visible");
        }
        if (!rafId) animateCursor();
      };

      const hideCursor = () => {
        cursorVisible = false;
        cursor.classList.remove("is-visible", "is-hovering", "is-image");
      };

      certSection.addEventListener("mouseenter", showCursor);
      certSection.addEventListener("mouseleave", hideCursor);

      certSection.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        const rect = certSection.getBoundingClientRect();
        const relX = ((e.clientX - rect.left) / rect.width) * 100;
        const relY = ((e.clientY - rect.top) / rect.height) * 100;

        certSection.style.setProperty("--spot-x", `${relX}%`);
        certSection.style.setProperty("--spot-y", `${relY}%`);

        const overActiveImage = e.target.closest(".cert-card.is-active .cert-image");
        const overCard = e.target.closest(".cert-card, .cert-nav");

        cursor.classList.toggle("is-hovering", !!overCard);
        cursor.classList.toggle("is-image", !!overActiveImage);
      });
    }

    updateStack();
    startAutoPlay();
  }
});