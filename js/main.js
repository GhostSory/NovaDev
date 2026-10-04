"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initScrollSpy();
  initScrollAnimations();
  initContactForm();
  initTypingEffect();
});

/* Header : ombre au scroll */
function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("header--scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* Menu mobile */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-item, .header-contact-btn");

  if (!toggle || !navbar) return;

  const closeMenu = () => {
    toggle.classList.remove("is-open");
    navbar.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });
}

/* Navigation fluide vers les ancres */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const headerHeight = document.getElementById("header")?.offsetHeight ?? 0;

      window.scrollTo({
        top: target.offsetTop - headerHeight,
        behavior: "smooth",
      });
    });
  });
}

/* Mise à jour du lien actif selon la section visible */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");

  if (!sections.length || !navItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navItems.forEach((item) => {
          item.classList.toggle(
            "active",
            item.getAttribute("href") === `#${id}`,
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* Animations au défilement */
function initScrollAnimations() {
  const animatedElements = [
    { selector: ".home-content", animation: "fade-left" },
    { selector: ".home-image", animation: "fade-right" },
    { selector: ".section-header", animation: "fade-up" },
    { selector: ".competences-item", animation: "fade-up", stagger: true },
    { selector: ".about-card", animation: "fade-up", stagger: true },
    { selector: ".about-text", animation: "fade-right" },
    { selector: ".project-card", animation: "fade-up", stagger: true },
    { selector: ".contact-wrapper", animation: "fade-up" },
    { selector: ".footer-inner", animation: "fade-up" },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  animatedElements.forEach(({ selector, animation, stagger }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("animate", `animate--${animation}`);

      if (stagger) {
        element.style.setProperty("--delay", `${index * 0.1}s`);
      }

      observer.observe(element);
    });
  });
}

/* Gestion du formulaire de contact */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = form?.querySelector(".contact-submit");
  const submitText = submitBtn?.querySelector(".contact-submit-text");

  if (!form || !submitBtn || !submitText) return;

  const fields = form.querySelectorAll(
    ".form-field input, .form-field textarea",
  );

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".form-field")?.classList.remove("is-invalid");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      const wrapper = field.closest(".form-field");
      if (!field.checkValidity()) {
        wrapper?.classList.add("is-invalid");
        isValid = false;
      }
    });

    if (!isValid) {
      form.querySelector(":invalid")?.focus();
      return;
    }

    submitBtn.classList.add("is-sending");
    submitText.textContent = "Envoi en cours...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Erreur");
      }

      form.reset();
      submitBtn.classList.remove("is-sending");
      submitBtn.classList.add("is-sent");
      submitText.textContent = "Message envoyé !";
    } catch (error) {
      submitBtn.classList.remove("is-sending");
      submitText.textContent = "Échec de l'envoi, réessayez";
    }

    setTimeout(() => {
      submitBtn.classList.remove("is-sent");
      submitText.textContent = "Envoyer le message";
      submitBtn.disabled = false;
    }, 3000);
  });
}

/* Effet de frappe sur le nom */
function initTypingEffect() {
  const nameElement = document.querySelector(".home-name");
  if (!nameElement) return;

  const fullText = nameElement.textContent.trim();
  nameElement.textContent = "";
  nameElement.classList.add("typing-cursor");

  let index = 0;

  const type = () => {
    if (index < fullText.length) {
      nameElement.textContent += fullText.charAt(index);
      index += 1;
      setTimeout(type, 80);
    } else {
      nameElement.classList.remove("typing-cursor");
    }
  };

  setTimeout(type, 600);
}
