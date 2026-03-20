window.addEventListener("load", function () {
    window.setTimeout(function () {
        document.body.classList.remove("is-preload");
    }, 100);
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".reveal-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, {
        threshold: 0.14
    });

    sections.forEach(section => observer.observe(section));

    const bg = document.querySelector("#wrapper > .bg");

    window.addEventListener("scroll", function () {
        const y = window.scrollY * 0.18;
        if (bg) {
            bg.style.transform = `translate3d(0, ${y}px, 0)`;
        }
    }, { passive: true });
});