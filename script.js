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

  // =========================
  // LANGUAGE TOGGLE
  // =========================
  const langToggle = document.getElementById("langToggle");
  const langLabels = document.querySelectorAll(".lang-label");
  const rootStyle = document.documentElement;

  const translations = {
    en: {
      pageTitle: "Lash Lift & Brow Studio Beograd | Tea Tubić",
      metaDescription:
        "Lash extensions, Russian volume, shaping brows, tinting brows, henna brows, lash lift and brow lift in Belgrade. Book your appointment with Tea Tubić.",
      metaKeywords:
        "Nadogradnja trepavica, ruski volumen, svilene trepavice, mega volumen, 1:1 tehnika, cupanje obrva, uredjivanje obrva, farbanje obrva, henna boja, lash lift, brow lift, laminacija obrva, laminacija trepavica, Tea Tubić, Lash extensions, Russian volume, shaping brows, tinting brows, henna brows",
      ogDescription:
        "Lash extensions, Russian volume, lash lift, brow lift, shaping brows and tinting brows in Belgrade. Book your appointment.",
      twitterDescription: "Lash extensions, lash lift and brow treatments in Belgrade.",
      htmlLang: "en",
      strings: {
        skipLink: "Skip to content",
        navHome: "Home",
        navAbout: "About",
        navJourney: "Journey",
        navSkills: "Skills & Certs",
        navServices: "Services & Reviews",
        navReviews: "Recenzije",
        navContact: "Contact & Book",
        heroKicker: "My name is",
        heroBtnSecondary: "View Services",
        heroBtnPrimary: "Book Now",
        aboutIm: "I'm",
        aboutRole1: "a",
        aboutRole2: "lash and brow",
        aboutRole3: "artist",
        aboutDesc1: "passionate about beauty",
        aboutDesc2: "and always growing with passion",
        storyEyebrow: "My Journey",
        storyTitle: "Built through dedication, growth, and love for the craft.",
        storyP1:
          "From the moment I attended my first lash training, I knew this was the path I wanted to follow — with passion, dedication, and precision.",
        storyP2: "From then on, I focused on improving every single day.",
        storyP3:
          "After completing my initial training in Phi Academy, well known for its high-quality education, premium materials, and strict certification process, I began working in a beauty salon in my hometown, where I built my experience and developed strong relationships with my clients. Over time, this helped me gain confidence in my work and shape my own recognizable style. As I grew, I felt the need to expand beyond my local environment, refining my skills and staying aligned with the latest trends in the industry. Alongside my work with clients, I continue to learn through ongoing trainings and guidance from my mentor, who has supported me from the very beginning.",
        storyP4:
          "I believe the beauty industry is constantly evolving — and that true growth comes from continuous learning.",
        certsEyebrow: "Skills & Certs",
        certsTitle: "Education and skills",
        certPrev: "Previous certificate",
        certNext: "Next certificate",
        cert1Title: "Classic Lashes",
        cert1Country: "Serbia",
        cert2Title: "Russian Volume Beginner",
        cert2Country: "Serbia",
        cert3Title: "Russian Volume Advanced",
        cert3Country: "Serbia",
        cert4Title: "Lash Lift",
        cert4Country: "Norway",
        cert5Title: "High Definition Brows",
        cert5Country: "Norway",
        skillsEyebrow: "My Skills",
        skillsTitle: "My skills",
        skill1: "Classic Lash Extensions (1:1)",
        skill2: "Light Volume (2D–5D)",
        skill3: "Volume (5D–8D)",
        skill4: "Mega volume and drama looks",
        skill5: "Lash Lift",
        skill6: "Brow shaping and design",
        skill7: "Brow tinting",
        skill8: "Proper isolation and eye mapping",
        skill9: "Working with sensitive clients",
        skill10: "Safe application and hygiene standards",
        skill11: "Client consultation and aftercare guidance",
        skill12: "Educated guidance during contraindications",
        skill13: "Handcrafted lash fans with balance of density and lightness",
        skill14: "Choosing ideal lash styles for different eye shapes",
        servicesEyebrow: "Services",
        servicesTitle: "Looks designed to enhance every style and mood.",
        service1Title: "Classic Lashes",
        service1Desc:
          "A timeless, elegant look created by applying one extension to one natural lash. Perfect for clients who love softness, definition, and natural beauty.",
        service2Title: "Light Volume",
        service2Desc:
          "A delicate step above classic lashes, adding airy fullness while keeping the overall result soft and balanced.",
        service3Title: "Volume",
        service3Desc:
          "Designed for fuller, fluffier lash sets with more intensity and a beautifully textured finish.",
        service4Title: "Mega volume",
        service4Desc:
          "A bold, glamorous set for clients who want maximum density, depth, and drama in their lash look.",
        service5Title: "Drama Look",
        service5Desc:
          "A more expressive, statement-making style tailored for clients who want their eyes to stand out instantly.",
        service6Title: "Lash Lift",
        service6Desc:
          "A natural enhancement that lifts and defines your own lashes, creating an effortless and polished appearance.",
        service7Title: "High Definition Brows",
        service7Desc:
          "Brow shaping and lamination that frames the face beautifully and completes the overall look with softness and structure.",
        experienceEyebrow: "Experience",
        experienceTitle: "Many happy customers served with professionalism and care",
        reviewsTitle: "Client Reviews",
        reviewPrev: "Previous review",
        reviewNext: "Next review",
        contactEyebrow: "Contact",
        contactTitle: "Let’s connect",
        contactText:
          "Lash & brow treatments in Belgrade, created with care, precision, and a focus on natural beauty.",
        contactMessage1:
          "I offer lash and brow services in a calm, professional setting where client comfort, hygiene, and beautiful results always come first.",
        contactMessage2:
          "Book your appointment easily via WhatsApp or reach out on Instagram.",
        contactMessage3: "Based in Belgrade, Serbia.",
        contactBtn: "Book Now",
        bookWhatsAppAria: "Book an appointment on WhatsApp",
        instagramAria: "Open Instagram profile of Tea Tubić",
        thankYouTitle: "Thank<br />you!",
        thank1: "Grow",
        thank2: "and",
        thank3: "love",
        thank4: "every",
        thank5: "day",
        langToggleAria: "Switch website language"
      }
    },
    sr: {
      pageTitle: "Lash Lift & Brow Studio Beograd | Tea Tubić",
      metaDescription:
        "Nadogradnja trepavica, ruski volumen, mega volumen, 1:1 tehnika, lash lift, brow lift, laminacija obrva i trepavica, farbanje i uredjivanje obrva u Beogradu kod Tea Tubić.",
      metaKeywords:
        "Nadogradnja trepavica, ruski volumen, svilene trepavice, mega volumen, 1:1 tehnika, cupanje obrva, uredjivanje obrva, farbanje obrva, henna boja, lash lift, brow lift, laminacija obrva, laminacija trepavica, Tea Tubić, Lash extensions, Russian volume, shaping brows, tinting brows, henna brows",
      ogDescription:
        "Nadogradnja trepavica, ruski volumen, lash lift, brow lift, farbanje i oblikovanje obrva u Beogradu. Zakaži svoj termin.",
      twitterDescription: "Nadogradnja trepavica, lash lift i brow tretmani u Beogradu.",
      htmlLang: "sr",
      strings: {
        skipLink: "Preskoči na sadržaj",
        navHome: "Početna",
        navAbout: "O meni",
        navJourney: "Moja priča",
        navSkills: "Veštine i sertifikati",
        navServices: "Services & Reviews",
        navReviews: "Recenzije",
        navContact: "Kontakt i rezervacija",
        heroKicker: "Moje ime je",
        heroBtnSecondary: "Pogledaj usluge",
        heroBtnPrimary: "Rezerviši",
        aboutIm: "Ja sam",
        aboutRole1: "certifikovana",
        aboutRole2: "lash i brow",
        aboutRole3: "umetnica",
        aboutDesc1: "posvećena lepoti",
        aboutDesc2: "i stalnom usavršavanju",
        storyEyebrow: "Moja priča",
        storyTitle: "Izgrađeno kroz posvećenost, razvoj i ljubav prema ovom zanatu.",
        storyP1:
          "Od trenutka kada sam pohađala svoj prvi lash trening, znala sam da je to put kojim želim da idem — sa strašću, posvećenošću i preciznošću.",
        storyP2: "Od tada sam se fokusirala na svakodnevno usavršavanje.",
        storyP3:
          "Nakon završene početne obuke u Phi Academy, poznatoj po kvalitetnoj edukaciji, vrhunskim materijalima i strogom procesu sertifikacije, počela sam da radim u salonu lepote u svom rodnom gradu, gde sam gradila iskustvo i razvijala snažan odnos sa klijentima. Vremenom mi je to donelo sigurnost u radu i pomoglo da oblikujem svoj prepoznatljiv stil. Kako sam napredovala, osećala sam potrebu da izađem izvan lokalnog okruženja, dodatno usavršim veštine i ostanem u korak sa najnovijim trendovima u industriji. Pored rada sa klijentima, nastavila sam da učim kroz kontinuirane edukacije i podršku mentorke koja je uz mene od samog početka.",
        storyP4:
          "Verujem da se beauty industrija stalno razvija — a da pravi napredak dolazi kroz neprekidno učenje.",
        certsEyebrow: "Veštine i sertifikati",
        certsTitle: "Edukacija i veštine",
        certPrev: "Prethodni sertifikat",
        certNext: "Sledeći sertifikat",
        cert1Title: "Klasične trepavice",
        cert1Country: "Srbija",
        cert2Title: "Ruski volumen početni",
        cert2Country: "Srbija",
        cert3Title: "Ruski volumen napredni",
        cert3Country: "Srbija",
        cert4Title: "Lash Lift",
        cert4Country: "Norveška",
        cert5Title: "High Definition Brows",
        cert5Country: "Norveška",
        skillsEyebrow: "",
        skillsTitle: "Veštine",
        skill1: "Klasične ekstenzije trepavica (1:1)",
        skill2: "Light volume (2D–5D)",
        skill3: "Volume (5D–8D)",
        skill4: "Mega volume i drama stilovi",
        skill5: "Lash Lift",
        skill6: "Oblikovanje i dizajn obrva",
        skill7: "Farbanje obrva",
        skill8: "Pravilna izolacija i mapiranje oka",
        skill9: "Rad sa osetljivim klijentima",
        skill10: "Bezbedna aplikacija i higijenski standardi",
        skill11: "Konsultacije sa klijentima i smernice za negu nakon tretmana",
        skill12: "Stručne smernice kod kontraindikacija",
        skill13: "Ručno pravljeni fanovi sa balansom gustine i lakoće",
        skill14: "Odabir idealnog lash stila za različite oblike očiju",
        servicesEyebrow: "Usluge",
        servicesTitle: "Izgledi osmišljeni da istaknu svaki stil i raspoloženje.",
        service1Title: "Klasične trepavice",
        service1Desc:
          "Bezvremenski, elegantan izgled koji se postiže postavljanjem jedne ekstenzije na jednu prirodnu trepavicu. Savršeno za klijente koji vole nežnost, definiciju i prirodnu lepotu.",
        service2Title: "Light volume",
        service2Desc:
          "Nežan korak iznad klasičnih trepavica koji daje prozračnu punoću, a pritom zadržava mekan i uravnotežen rezultat.",
        service3Title: "Volume",
        service3Desc:
          "Kreiran za punije, lepršavije setove trepavica sa više intenziteta i prelepom teksturom.",
        service4Title: "Mega volume",
        service4Desc:
          "Odvažan, glamurozan set za klijente koji žele maksimalnu gustinu, dubinu i dramatičan efekat.",
        service5Title: "Drama look",
        service5Desc:
          "Izražajniji stil koji privlači pažnju i namenjen je klijentima koji žele da njihov pogled odmah dođe do izražaja.",
        service6Title: "Lash Lift",
        service6Desc:
          "Prirodno osveženje koje podiže i definiše vaše prirodne trepavice, stvarajući negovan i elegantan izgled.",
        service7Title: "High Definition Brows",
        service7Desc:
          "Oblikovanje obrva i laminacija koje prelepo uokviruju lice i upotpunjuju celokupan izgled mekoćom i strukturom.",
        experienceEyebrow: "Iskustvo",
        experienceTitle: "Mnogo zadovoljnih klijentkica uslužene saprofesionalnošću i pažnjom",
        reviewsTitle: "Recenzije",
        reviewPrev: "Prethodna recenzija",
        reviewNext: "Sledeća recenzija",
        contactEyebrow: "Kontakt",
        contactTitle: "Kontaktiraj nas i uveri se",
        contactText:
          "Tretmani za obrve i trepavice u Beogradu, kreirani sa pažnjom, preciznošću i fokusom na lepotu.",
        contactMessage1:
          "Nudim lash i brow usluge u mirnom, profesionalnom ambijentu u kome su udobnost klijenata, higijena i lep rezultat uvek na prvom mestu.",
        contactMessage2:
          "Svoj termin možeš lako rezervisati putem WhatsApp-a ili mi se javiti na Instagramu.",
        contactMessage3: "Radim u Beogradu, Srbija.",
        contactBtn: "Rezerviši",
        bookWhatsAppAria: "Rezerviši termin putem WhatsApp-a",
        instagramAria: "Otvori Instagram profil Tea Tubić",
        thankYouTitle: "Hvala<br />ti!",
        thank1: "Napreduj",
        thank2: "i",
        thank3: "voli",
        thank4: "svaki",
        thank5: "dan",
        langToggleAria: "Promeni jezik sajta"
      }
    }
  };

  const applyText = (selector, value, all = false) => {
    if (all) {
      document.querySelectorAll(selector).forEach((node, index) => {
        if (Array.isArray(value)) node.textContent = value[index] ?? "";
        else node.textContent = value;
      });
      return;
    }

    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  const applyHTML = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = value;
  };

  const applyAttr = (selector, attr, value) => {
    const node = document.querySelector(selector);
    if (node) node.setAttribute(attr, value);
  };

  const setHeaderOffset = () => {
    if (siteHeader) {
      rootStyle.style.setProperty("--header-offset", `${siteHeader.offsetHeight}px`);
    }
  };

  const applyLanguage = (lang) => {
    const content = translations[lang] ?? translations.en;
    const t = content.strings;

    document.documentElement.lang = content.htmlLang;
    document.title = content.pageTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (metaDescription) metaDescription.setAttribute("content", content.metaDescription);
    if (metaKeywords && content.metaKeywords) metaKeywords.setAttribute("content", content.metaKeywords);
    if (ogDescription) ogDescription.setAttribute("content", content.ogDescription);
    if (twitterDescription) twitterDescription.setAttribute("content", content.twitterDescription);

    applyText(".skip-link", t.skipLink);
    applyText('.site-nav a[href="#hero"]', t.navHome);
    applyText('.site-nav a[href="#about"]', t.navAbout);
    applyText('.site-nav a[href="#story"]', t.navJourney);
    applyText('.site-nav a[href="#skills-certs"]', t.navSkills);
    applyText('.site-nav a[href="#services"]', t.navServices);
    applyText(".site-nav .nav-reviews-link", t.navReviews);
    applyText('.site-nav a[href="#contact"]', t.navContact);
    applyText(".hero-kicker", t.heroKicker);
    applyText(".hero-actions .btn-secondary", t.heroBtnSecondary);
    applyText(".hero-actions .btn-primary", t.heroBtnPrimary);
    applyText(".about .im-word", t.aboutIm);
    applyText(".role-stack span:nth-child(1)", t.aboutRole1);
    applyText(".role-stack span:nth-child(2)", t.aboutRole2);
    applyText(".role-stack span:nth-child(3)", t.aboutRole3);
    applyText(".description .line-1", t.aboutDesc1);
    applyText(".description .line-2", t.aboutDesc2);
    applyText("#story .eyebrow", t.storyEyebrow);
    applyText("#story .section-title", t.storyTitle);
    applyText("#story .story-copy p:nth-of-type(1)", t.storyP1);
    applyText("#story .story-copy p:nth-of-type(2)", t.storyP2);
    applyText("#story .story-copy p:nth-of-type(3)", t.storyP3);
    applyText("#story .story-copy p:nth-of-type(4)", t.storyP4);
    applyText("#skills-certs > .container > .section-heading .eyebrow", t.certsEyebrow);
    applyText("#skills-certs > .container > .section-heading .section-title", t.certsTitle);
    applyAttr(".cert-prev", "aria-label", t.certPrev);
    applyAttr(".cert-next", "aria-label", t.certNext);
    applyText(".cert-card:nth-of-type(1) .cert-copy h3", t.cert1Title);
    applyText(".cert-card:nth-of-type(1) .cert-level", t.cert1Country);
    applyText(".cert-card:nth-of-type(2) .cert-copy h3", t.cert2Title);
    applyText(".cert-card:nth-of-type(2) .cert-level", t.cert2Country);
    applyText(".cert-card:nth-of-type(3) .cert-copy h3", t.cert3Title);
    applyText(".cert-card:nth-of-type(3) .cert-level", t.cert3Country);
    applyText(".cert-card:nth-of-type(4) .cert-copy h3", t.cert4Title);
    applyText(".cert-card:nth-of-type(4) .cert-level", t.cert4Country);
    applyText(".cert-card:nth-of-type(5) .cert-copy h3", t.cert5Title);
    applyText(".cert-card:nth-of-type(5) .cert-level", t.cert5Country);
    applyText(".skills-heading .eyebrow", t.skillsEyebrow);
    applyText(".skills-heading h3", t.skillsTitle);
    applyText(".skills-list li:nth-child(1)", t.skill1);
    applyText(".skills-list li:nth-child(2)", t.skill2);
    applyText(".skills-list li:nth-child(3)", t.skill3);
    applyText(".skills-list li:nth-child(4)", t.skill4);
    applyText(".skills-list li:nth-child(5)", t.skill5);
    applyText(".skills-list li:nth-child(6)", t.skill6);
    applyText(".skills-list li:nth-child(7)", t.skill7);
    applyText(".skills-list li:nth-child(8)", t.skill8);
    applyText(".skills-list li:nth-child(9)", t.skill9);
    applyText(".skills-list li:nth-child(10)", t.skill10);
    applyText(".skills-list li:nth-child(11)", t.skill11);
    applyText(".skills-list li:nth-child(12)", t.skill12);
    applyText(".skills-list li:nth-child(13)", t.skill13);
    applyText(".skills-list li:nth-child(14)", t.skill14);
    applyText("#services .section-heading .eyebrow", t.servicesEyebrow);
    applyText("#services .section-heading .section-title", t.servicesTitle);
    applyText(".service-card:nth-of-type(1) h3", t.service1Title);
    applyText(".service-card:nth-of-type(1) .service-content p", t.service1Desc);
    applyText(".service-card:nth-of-type(2) h3", t.service2Title);
    applyText(".service-card:nth-of-type(2) .service-content p", t.service2Desc);
    applyText(".service-card:nth-of-type(3) h3", t.service3Title);
    applyText(".service-card:nth-of-type(3) .service-content p", t.service3Desc);
    applyText(".service-card:nth-of-type(4) h3", t.service4Title);
    applyText(".service-card:nth-of-type(4) .service-content p", t.service4Desc);
    applyText(".service-card:nth-of-type(5) h3", t.service5Title);
    applyText(".service-card:nth-of-type(5) .service-content p", t.service5Desc);
    applyText(".service-card:nth-of-type(6) h3", t.service6Title);
    applyText(".service-card:nth-of-type(6) .service-content p", t.service6Desc);
    applyText(".service-card:nth-of-type(7) h3", t.service7Title);
    applyText(".service-card:nth-of-type(7) .service-content p", t.service7Desc);
    applyText(".final-splash .eyebrow", t.experienceEyebrow);
    applyText(".final-splash .section-title", t.experienceTitle);
    applyText("#reviews .section-title", t.reviewsTitle);
    applyAttr(".review-prev", "aria-label", t.reviewPrev);
    applyAttr(".review-next", "aria-label", t.reviewNext);
    applyText("#contact .section-heading .eyebrow", t.contactEyebrow);
    applyText("#contact .section-heading .section-title", t.contactTitle);
    applyText(".contact-text", t.contactText);
    applyText(".contact-message:nth-of-type(1)", t.contactMessage1);
    applyText(".contact-message:nth-of-type(2)", t.contactMessage2);
    applyText(".contact-message:nth-of-type(3)", t.contactMessage3);
    applyText(".contact-actions .btn-primary", t.contactBtn);
    applyAttr(".contact-actions .btn-primary", "aria-label", t.bookWhatsAppAria);
    applyAttr(".instagram-link", "aria-label", t.instagramAria);
    applyHTML(".thankyou-left h2", t.thankYouTitle);
    applyText(".thankyou-right p:nth-of-type(1)", t.thank1);
    applyText(".thankyou-right p:nth-of-type(2)", t.thank2);
    applyText(".thankyou-right p:nth-of-type(3)", t.thank3);
    applyText(".thankyou-right p:nth-of-type(4)", t.thank4);
    applyText(".thankyou-right p:nth-of-type(5)", t.thank5);
    applyAttr("#langToggle", "aria-label", t.langToggleAria);

    if (langToggle) {
      langToggle.classList.toggle("is-sr", lang === "sr");
      langToggle.setAttribute("aria-pressed", String(lang === "sr"));
    }

    langLabels.forEach((label) => {
      label.classList.toggle("is-active", label.dataset.langLabel === lang);
    });

    localStorage.setItem("tea-site-language", lang);
  };

  const savedLanguage = localStorage.getItem("tea-site-language") || "en";
  applyLanguage(savedLanguage);
  setHeaderOffset();

  langToggle?.addEventListener("click", () => {
    const nextLang = langToggle.classList.contains("is-sr") ? "en" : "sr";
    applyLanguage(nextLang);
  });

  window.addEventListener("resize", setHeaderOffset);


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
    setHeaderOffset();
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


  // =========================
  // REVIEWS CAROUSEL
  // =========================
  const reviewsCarousel = document.getElementById("reviewsCarousel");
  const reviewPrevBtn = document.querySelector(".review-prev");
  const reviewNextBtn = document.querySelector(".review-next");

  if (reviewsCarousel) {
    const reviewCards = Array.from(reviewsCarousel.querySelectorAll(".review-shot"));
    let activeReviewIndex = 0;
    let reviewAutoPlay = null;
    let reviewLightboxOpen = false;
    let reviewWheelLock = false;

    const normalizeReviewOffset = (index, active, total) => {
      let offset = index - active;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      return offset;
    };

    const clearReviewState = (card) => {
      card.className = "review-shot";
    };

    const updateReviewStack = () => {
      const total = reviewCards.length;

      reviewCards.forEach((card, index) => {
        clearReviewState(card);
        const offset = normalizeReviewOffset(index, activeReviewIndex, total);

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

    const goToReview = (index) => {
      activeReviewIndex = (index + reviewCards.length) % reviewCards.length;
      updateReviewStack();
    };

    const nextReview = () => goToReview(activeReviewIndex + 1);
    const prevReview = () => goToReview(activeReviewIndex - 1);

    const stopReviewAutoPlay = () => {
      if (reviewAutoPlay) {
        clearInterval(reviewAutoPlay);
        reviewAutoPlay = null;
      }
    };

    const startReviewAutoPlay = () => {
      if (prefersReducedMotion()) return;
      stopReviewAutoPlay();

      reviewAutoPlay = setInterval(() => {
        if (!document.hidden && !reviewLightboxOpen) {
          nextReview();
        }
      }, 4200);
    };

    reviewPrevBtn?.addEventListener("click", () => {
      stopReviewAutoPlay();
      prevReview();
      startReviewAutoPlay();
    });

    reviewNextBtn?.addEventListener("click", () => {
      stopReviewAutoPlay();
      nextReview();
      startReviewAutoPlay();
    });

    const reviewLightbox = document.createElement("div");
    reviewLightbox.className = "review-lightbox";
    reviewLightbox.innerHTML = `
      <div class="review-lightbox-backdrop"></div>
      <div class="review-lightbox-inner">
        <img class="review-lightbox-image" />
      </div>
    `;
    document.body.appendChild(reviewLightbox);

    const reviewLightboxImage = reviewLightbox.querySelector(".review-lightbox-image");

    const openReviewLightbox = (src) => {
      reviewLightboxImage.src = src;
      reviewLightbox.classList.add("is-open");
      document.body.classList.add("lightbox-open");
      reviewLightboxOpen = true;
    };

    const closeReviewLightbox = () => {
      reviewLightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-open");
      reviewLightboxOpen = false;
    };

    reviewLightbox.addEventListener("click", closeReviewLightbox);

    reviewCards.forEach((card, index) => {
      card.addEventListener("click", (e) => {
        const img = e.target.closest("img");

        if (img && index === activeReviewIndex) {
          openReviewLightbox(img.src);
          return;
        }

        if (index !== activeReviewIndex) {
          goToReview(index);
        }
      });
    });

    reviewsCarousel.addEventListener(
      "wheel",
      (event) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();

        if (reviewWheelLock) return;
        reviewWheelLock = true;

        stopReviewAutoPlay();
        if (event.deltaY > 0) nextReview();
        else prevReview();
        startReviewAutoPlay();

        setTimeout(() => {
          reviewWheelLock = false;
        }, 420);
      },
      { passive: false }
    );

    let reviewTouchStartX = 0;
    reviewsCarousel.addEventListener(
      "touchstart",
      (event) => {
        reviewTouchStartX = event.changedTouches[0].clientX;
        stopReviewAutoPlay();
      },
      { passive: true }
    );

    reviewsCarousel.addEventListener(
      "touchend",
      (event) => {
        const deltaX = event.changedTouches[0].clientX - reviewTouchStartX;
        if (Math.abs(deltaX) > 40) {
          if (deltaX < 0) nextReview();
          else prevReview();
        }
        startReviewAutoPlay();
      },
      { passive: true }
    );

    reviewsCarousel.addEventListener("mouseenter", stopReviewAutoPlay);
    reviewsCarousel.addEventListener("mouseleave", startReviewAutoPlay);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopReviewAutoPlay();
      else startReviewAutoPlay();
    });

    updateReviewStack();
    startReviewAutoPlay();
  }
  // =========================
  const navServicesLink = document.querySelector(".site-nav .nav-services-link");
  const navReviewsLink = document.querySelector(".site-nav .nav-reviews-link");
  const reviewsAnchor = document.getElementById("reviews");

  const syncServiceReviewTabs = () => {
    if (!navServicesLink || !navReviewsLink) return;

    const reviewsTop = reviewsAnchor ? reviewsAnchor.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
    const triggerLine = (siteHeader?.offsetHeight || 0) + 80;

    const inReviewsZone = reviewsTop <= triggerLine;

    navServicesLink.classList.toggle("is-tab-active", !inReviewsZone);
    navReviewsLink.classList.toggle("is-tab-active", inReviewsZone);
  };

  window.addEventListener("scroll", syncServiceReviewTabs, { passive: true });
  window.addEventListener("resize", syncServiceReviewTabs);
  window.addEventListener("load", syncServiceReviewTabs);
  syncServiceReviewTabs();

});