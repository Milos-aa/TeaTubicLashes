window.addEventListener("load", () => {
    setTimeout(() => {
      document.body.classList.remove("is-preload");
      document.body.classList.add("hero-animate");
    }, 100);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".reveal-section");
    const bg = document.querySelector(".page-bg");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  
    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.14,
        }
      );
  
      sections.forEach((section) => observer.observe(section));
    } else {
      sections.forEach((section) => section.classList.add("is-visible"));
    }
  
    if (!reduceMotion && bg) {
      let ticking = false;
  
      const updateParallax = () => {
        const y = window.scrollY * 0.14;
        bg.style.transform = `translate3d(0, ${y}px, 0)`;
        ticking = false;
      };
  
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
          }
        },
        { passive: true }
      );
    }
  });
