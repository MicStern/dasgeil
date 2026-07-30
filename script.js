"use strict";

/**
 * dasgeil Mainpage — Verhalten.
 * Inhalte kommen aus content.js (projects, services, team, showcaseWorlds),
 * dieses Skript ist reine Darstellungs-/Interaktionslogik.
 *
 * Abschnitte:
 *   1. Grundzustand (reduced motion, Jahr)
 *   2. Header: Scroll-Zustand, aktive Sektion, Mobile-Menü
 *   3. Custom Cursor
 *   4. Scroll-Reveal
 *   5. Hero-Designstudie (Wireframe -> finales Design)
 *   6. Gemeinsame abstrakte Vorschau-Bausteine
 *   7. Projekte rendern (drei unterschiedliche Layouts)
 *   8. Leistungen rendern (interaktive Liste + Vorschau)
 *   9. Team rendern
 *  10. "Was wäre wenn" rendern + Lade-Overlay
 *  11. Kontaktformular
 */

// -----------------------------------------------------------------------
// 1. Grundzustand
// -----------------------------------------------------------------------

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const footerYear = document.getElementById("footerYear");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// -----------------------------------------------------------------------
// 2. Header: Scroll-Zustand, aktive Sektion, Mobile-Menü
// -----------------------------------------------------------------------

const siteHeader = document.getElementById("siteHeader");

if (siteHeader) {
  const updateHeaderState = () => {
    siteHeader.dataset.state = window.scrollY > 24 ? "scrolled" : "top";
  };
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

const navLinks = document.querySelectorAll("[data-nav]");
const navSections = Array.from(navLinks)
  .map((link) => ({ link, target: document.getElementById(link.dataset.nav) }))
  .filter((entry) => entry.target);

if (navSections.length) {
  const updateActiveNav = () => {
    const markerY = window.scrollY + window.innerHeight * 0.2;
    let current = null;

    for (const entry of navSections) {
      if (entry.target.offsetTop <= markerY) {
        current = entry;
      }
    }

    for (const entry of navSections) {
      entry.link.classList.toggle("active", entry === current);
    }
  };

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
}

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
  };

  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  for (const link of mobileMenu.querySelectorAll("a")) {
    link.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

// -----------------------------------------------------------------------
// 3. Custom Cursor
// -----------------------------------------------------------------------

const cursor = document.querySelector(".cursor");
const supportsFineCursor = window.matchMedia("(pointer: fine)").matches;

if (cursor && supportsFineCursor && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  for (const element of document.querySelectorAll("a, button")) {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "14px";
      cursor.style.height = "14px";
    });
  }
} else if (cursor) {
  cursor.remove();
}

// -----------------------------------------------------------------------
// 4. Scroll-Reveal
// -----------------------------------------------------------------------

const revealTargets = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  for (const element of revealTargets) {
    element.classList.add("visible");
  }
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      }
    },
    { threshold: 0.12 }
  );

  for (const element of revealTargets) {
    revealObserver.observe(element);
  }
}

// -----------------------------------------------------------------------
// 5. Hero-Designstudie (Wireframe -> finales Design)
// -----------------------------------------------------------------------

const heroStudy = document.getElementById("heroStudy");
const heroStudyStage = heroStudy
  ? heroStudy.querySelector(".hero-study-stage")
  : null;

if (heroStudy && heroStudyStage) {
  if (prefersReducedMotion) {
    heroStudyStage.classList.add("is-final");
  } else {
    const heroStudyObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => heroStudyStage.classList.add("is-final"), 500);
            heroStudyObserver.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    heroStudyObserver.observe(heroStudy);
  }
}

// -----------------------------------------------------------------------
// 6. Gemeinsame abstrakte Vorschau-Bausteine
// -----------------------------------------------------------------------
// Diese kleinen Artefakte (Wireframe-Stack, Flow-Diagramm, Typo-/Farbstudie,
// Balken) bilden die visuelle Sprache, die im Hero, bei den Projekten und in
// der Leistungssektion wiederverwendet wird - statt Stockfotos oder Lorem
// Ipsum zeigen sie abstrahierte, aber glaubwürdige Designartefakte.

function wireframeStackHTML(withMobileCorner = false) {
  return `
    <div class="study-frame study-frame-desktop">
      <div class="study-frame-bar"><span></span><span></span><span></span></div>
      <div class="study-frame-body">
        <div class="study-block study-block-nav"></div>
        <div class="study-block study-block-hero"></div>
        <div class="study-block-row">
          <div class="study-block study-block-card"></div>
          <div class="study-block study-block-card"></div>
          <div class="study-block study-block-card"></div>
        </div>
      </div>
      ${
        withMobileCorner
          ? `
        <div class="study-frame study-frame-mobile study-frame-corner">
          <div class="study-frame-body">
            <div class="study-block study-block-nav"></div>
            <div class="study-block study-block-hero"></div>
          </div>
        </div>
      `
          : ""
      }
    </div>
  `;
}

function flowDiagramHTML() {
  return `
    <div class="flow-diagram">
      <span class="flow-node"></span>
      <span class="flow-line"></span>
      <span class="flow-node"></span>
      <span class="flow-line"></span>
      <span class="flow-node flow-node-end"></span>
      <span class="flow-branch">
        <span class="flow-line flow-line-branch"></span>
        <span class="flow-node flow-node-alt"></span>
      </span>
    </div>
  `;
}

function identityStudyHTML() {
  return `
    <div class="identity-collage">
      <div class="identity-type-sample" aria-hidden="true">Aa</div>
      <div class="identity-palette">
        <span class="swatch swatch-black"></span>
        <span class="swatch swatch-blue"></span>
        <span class="swatch swatch-paper"></span>
        <span class="swatch swatch-line"></span>
      </div>
      <div class="identity-chip identity-chip-a"></div>
      <div class="identity-chip identity-chip-b"></div>
    </div>
  `;
}

function growthBarsHTML() {
  return `
    <div class="growth-bars">
      <span style="--h:34%"></span>
      <span style="--h:52%"></span>
      <span style="--h:41%"></span>
      <span style="--h:73%"></span>
      <span style="--h:93%"></span>
    </div>
  `;
}

const previewVisuals = {
  website: wireframeStackHTML,
  research: flowDiagramHTML,
  identity: identityStudyHTML,
  growth: growthBarsHTML,
};

// -----------------------------------------------------------------------
// 7. Projekte rendern
// -----------------------------------------------------------------------

function renderProjectFullWidth(project) {
  return `
    <article class="project project-full-width" data-status="${project.status}">
      <div class="project-visual">
        ${wireframeStackHTML(true)}
      </div>
      ${projectInfoHTML(project)}
    </article>
  `;
}

function renderProjectSplit(project) {
  return `
    <article class="project project-split" data-status="${project.status}">
      ${projectInfoHTML(project)}
      <div class="project-visual">
        ${flowDiagramHTML()}
      </div>
    </article>
  `;
}

function renderProjectIdentity(project) {
  return `
    <article class="project project-identity" data-status="${project.status}">
      <div class="project-visual">
        ${identityStudyHTML()}
      </div>
      ${projectInfoHTML(project)}
    </article>
  `;
}

function projectInfoHTML(project) {
  return `
    <div class="project-info">
      <span class="project-status">${project.type}</span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-subtitle">${project.subtitle}</p>
      <p class="project-description">${project.description}</p>
      <ul class="project-services">
        ${project.services.map((service) => `<li>${service}</li>`).join("")}
      </ul>
      <div class="project-cta-row">
        <button type="button" class="btn btn-ghost project-cta" data-project="${project.id}">
          ${project.ctaLabel}
        </button>
        <p class="project-cta-note" id="note-${project.id}" hidden></p>
      </div>
    </div>
  `;
}

const projectRenderers = {
  "full-width": renderProjectFullWidth,
  split: renderProjectSplit,
  identity: renderProjectIdentity,
};

const projectsList = document.getElementById("projectsList");

if (projectsList && typeof projects !== "undefined") {
  projectsList.innerHTML = projects
    .map((project) => {
      const render = projectRenderers[project.layout] || renderProjectFullWidth;
      return render(project);
    })
    .join("");

  projectsList.addEventListener("click", (event) => {
    const button = event.target.closest(".project-cta");
    if (!button) return;

    const project = projects.find((item) => item.id === button.dataset.project);
    if (!project) return;

    if (project.caseStudyUrl) {
      window.location.href = project.caseStudyUrl;
      return;
    }

    const note = document.getElementById(`note-${project.id}`);
    if (note) {
      note.textContent = project.ctaNote;
      note.hidden = false;
    }
  });
}

// -----------------------------------------------------------------------
// 8. Leistungen rendern (interaktive Liste + Vorschau)
// -----------------------------------------------------------------------

const servicesList = document.getElementById("servicesList");
const servicesPreview = document.getElementById("servicesPreview");

function renderServicesPreview(service) {
  const visual = previewVisuals[service.visual]
    ? previewVisuals[service.visual]()
    : "";

  servicesPreview.innerHTML = `
    <div class="services-preview-visual">${visual}</div>
    <div class="services-preview-body">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <ul>
        ${service.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
}

function setActiveService(id) {
  const buttons = servicesList.querySelectorAll("[role=tab]");
  for (const button of buttons) {
    const isActive = button.dataset.service === id;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  }

  const service = services.find((item) => item.id === id);
  if (service) renderServicesPreview(service);
}

if (servicesList && servicesPreview && typeof services !== "undefined") {
  servicesList.innerHTML = services
    .map(
      (service, index) => `
        <button
          type="button"
          role="tab"
          class="services-tab${index === 0 ? " active" : ""}"
          data-service="${service.id}"
          aria-selected="${index === 0}"
          tabindex="${index === 0 ? "0" : "-1"}"
        >
          <span class="services-tab-index">0${index + 1}</span>
          <span class="services-tab-title">${service.title}</span>
        </button>
      `
    )
    .join("");

  setActiveService(services[0].id);

  servicesList.addEventListener("click", (event) => {
    const button = event.target.closest("[role=tab]");
    if (button) setActiveService(button.dataset.service);
  });

  servicesList.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }
    event.preventDefault();

    const buttons = Array.from(servicesList.querySelectorAll("[role=tab]"));
    const currentIndex = buttons.findIndex((button) =>
      button.classList.contains("active")
    );
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;

    buttons[nextIndex].focus();
    setActiveService(buttons[nextIndex].dataset.service);
  });
}

// -----------------------------------------------------------------------
// 9. Team rendern
// -----------------------------------------------------------------------

const teamList = document.getElementById("teamList");

if (teamList && typeof team !== "undefined") {
  teamList.innerHTML = team
    .map(
      (member) => `
        <article class="team-member">
          <div class="team-photo${member.photo ? "" : " team-photo-placeholder"}">
            ${
              member.photo
                ? `<img src="${member.photo}" alt="${member.name || member.role}" loading="lazy">`
                : `<span class="placeholder-tag">Foto ergänzen</span>`
            }
          </div>
          <h3 class="team-name${member.name ? "" : " team-name-placeholder"}">
            ${member.name || "Name ergänzen"}
          </h3>
          <p class="team-role">${member.role}</p>
          <p class="team-bio">${member.bio}</p>
          ${
            member.linkedin
              ? `<a class="team-linkedin" href="${member.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`
              : `<span class="team-linkedin team-linkedin-placeholder">LinkedIn <span class="placeholder-tag">Link ergänzen</span></span>`
          }
        </article>
      `
    )
    .join("");
}

// -----------------------------------------------------------------------
// 10. "Was wäre wenn" rendern + Lade-Overlay
// -----------------------------------------------------------------------

const showcaseNav = document.getElementById("showcaseNav");
const showcasePreview = document.getElementById("showcasePreview");
const showcaseMobileList = document.getElementById("showcaseMobileList");
const showcaseOverlay = document.getElementById("showcaseOverlay");
const showcaseOverlayWorld = document.getElementById("showcaseOverlayWorld");
const showcaseOverlayText = document.getElementById("showcaseOverlayText");
const showcaseOverlayBarFill = document.getElementById("showcaseOverlayBarFill");
const showcaseOverlayFallback = document.getElementById("showcaseOverlayFallback");
const showcaseOverlayBack = document.getElementById("showcaseOverlayBack");

function renderShowcasePreview(world) {
  showcasePreview.dataset.world = world.id;
  showcasePreview.innerHTML = `
    <p class="showcase-preview-label">${world.label}</p>
    <p class="showcase-preview-question">${world.question}</p>
    <p class="showcase-preview-direction">${world.direction}</p>
    <button type="button" class="btn btn-ghost-invert showcase-cta" data-world="${world.id}">
      ${world.ctaLabel}
    </button>
  `;
}

function setActiveWorld(id) {
  const buttons = showcaseNav.querySelectorAll("[role=tab]");
  for (const button of buttons) {
    const isActive = button.dataset.world === id;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  }

  const world = showcaseWorlds.find((item) => item.id === id);
  if (world) renderShowcasePreview(world);
}

let showcaseTrigger = null;

function openShowcaseOverlay(world, trigger) {
  showcaseTrigger = trigger;
  showcaseOverlayWorld.textContent = world.label;
  showcaseOverlayText.textContent = world.transitionText;
  showcaseOverlayFallback.hidden = true;
  showcaseOverlayBarFill.style.transition = "none";
  showcaseOverlayBarFill.style.width = "0%";
  showcaseOverlay.classList.add("visible");
  showcaseOverlay.setAttribute("aria-hidden", "false");
  void showcaseOverlayBarFill.offsetWidth;

  const duration = prefersReducedMotion ? 60 : 800 + Math.random() * 600;
  showcaseOverlayBarFill.style.transition = `width ${duration}ms ease`;
  showcaseOverlayBarFill.style.width = "100%";

  setTimeout(() => {
    if (world.enabled && world.targetUrl) {
      window.location.href = world.targetUrl;
      return;
    }
    showcaseOverlayFallback.hidden = false;
    showcaseOverlayBack.focus();
  }, duration + 120);
}

function closeShowcaseOverlay() {
  showcaseOverlay.classList.remove("visible");
  showcaseOverlay.setAttribute("aria-hidden", "true");
  if (showcaseTrigger) showcaseTrigger.focus();
}

if (showcaseNav && showcasePreview && typeof showcaseWorlds !== "undefined") {
  showcaseNav.innerHTML = showcaseWorlds
    .map(
      (world, index) => `
        <button
          type="button"
          role="tab"
          class="showcase-tab${index === 0 ? " active" : ""}"
          data-world="${world.id}"
          aria-selected="${index === 0}"
          tabindex="${index === 0 ? "0" : "-1"}"
        >
          ${world.label}
        </button>
      `
    )
    .join("");

  setActiveWorld(showcaseWorlds[0].id);

  showcaseNav.addEventListener("click", (event) => {
    const button = event.target.closest("[role=tab]");
    if (button) setActiveWorld(button.dataset.world);
  });

  showcaseNav.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp"].includes(event.key)) return;
    event.preventDefault();

    const buttons = Array.from(showcaseNav.querySelectorAll("[role=tab]"));
    const currentIndex = buttons.findIndex((button) =>
      button.classList.contains("active")
    );
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;

    buttons[nextIndex].focus();
    setActiveWorld(buttons[nextIndex].dataset.world);
  });

  showcasePreview.addEventListener("click", (event) => {
    const button = event.target.closest(".showcase-cta");
    if (!button) return;
    const world = showcaseWorlds.find((item) => item.id === button.dataset.world);
    if (world) openShowcaseOverlay(world, button);
  });
}

if (showcaseMobileList && typeof showcaseWorlds !== "undefined") {
  showcaseMobileList.innerHTML = showcaseWorlds
    .map(
      (world) => `
        <article class="showcase-mobile-chapter" data-world="${world.id}">
          <p class="showcase-preview-label">${world.label}</p>
          <p class="showcase-preview-question">${world.question}</p>
          <p class="showcase-preview-direction">${world.direction}</p>
          <button type="button" class="btn btn-ghost-invert showcase-cta" data-world="${world.id}">
            ${world.ctaLabel}
          </button>
        </article>
      `
    )
    .join("");

  showcaseMobileList.addEventListener("click", (event) => {
    const button = event.target.closest(".showcase-cta");
    if (!button) return;
    const world = showcaseWorlds.find((item) => item.id === button.dataset.world);
    if (world) openShowcaseOverlay(world, button);
  });
}

if (showcaseOverlayBack) {
  showcaseOverlayBack.addEventListener("click", closeShowcaseOverlay);
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    showcaseOverlay &&
    showcaseOverlay.classList.contains("visible")
  ) {
    closeShowcaseOverlay();
  }
});

// -----------------------------------------------------------------------
// 11. Kontaktformular
// -----------------------------------------------------------------------

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector("button[type=submit]");
  const accessKeyField = contactForm.querySelector("[name=access_key]");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    formStatus.classList.remove("error");

    const isConfigured =
      accessKeyField &&
      accessKeyField.value &&
      accessKeyField.value !== "REPLACE_WITH_WEB3FORMS_ACCESS_KEY";

    if (!isConfigured) {
      formStatus.classList.add("error");
      formStatus.textContent =
        "Entwicklungsmodus: Das Formular ist noch nicht mit einem Maildienst verbunden. Schreib uns direkt an hello@dasgeil.studio.";
      return;
    }

    formStatus.textContent = "Wird gesendet …";
    submitButton.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        formStatus.textContent = "Angekommen. Wir melden uns innerhalb von zwei Werktagen.";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Senden fehlgeschlagen.");
      }
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        "Hat nicht geklappt. Schreib uns direkt an hello@dasgeil.studio.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
