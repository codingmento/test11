/*
  Portfolio content model
  ------------------------
  To add a project, duplicate one object in projectData below. Keep the same
  property names and add the matching details. The project grid and case-study
  modal are rendered from this array so the HTML structure stays reusable.
*/
const projectData = [
  {
    id: "ibm-hr-attrition",
    index: "01",
    title: "IBM HR Attrition Analysis",
    category: "Human Resources Analytics",
    tools: ["Power BI", "DAX", "Data Analysis"],
    description:
      "An exploratory analysis of 1,470 employee records across 35 variables to investigate factors associated with employee attrition.",
    featured: true,
    status: "Independent Case Study",
    overview:
      "This independent case study uses Power BI and custom DAX measures to compare employee groups, identify patterns, and develop evidence-based HR recommendations.",
    problem:
      "Understand which employee and work-pattern factors may be associated with attrition, then translate the analysis into practical questions for HR decision-makers.",
    dataset:
      "IBM HR Analytics Employee Attrition & Performance dataset — 1,470 employee records across 35 variables.",
    methodology: [
      "Dataset understanding",
      "Data exploration and validation",
      "Power BI dashboard development",
      "DAX calculations",
      "Interpretation of findings",
      "Business recommendations",
    ],
    findings: [
      "31% attrition rate among employees working overtime.",
      "10% attrition rate among employees not working overtime.",
      "26.5% reported average income gap between employees who left and those who stayed, pending final verification against the Power BI dashboard.",
    ],
    recommendations: [
      "Review overtime distribution and workload patterns.",
      "Investigate compensation disparities.",
      "Develop targeted employee retention strategies.",
    ],
    gallery: [
      "Main Power BI dashboard screenshot",
      "Additional dashboard screenshot",
      "Executive report screenshot",
      "Additional analysis visual",
    ],
    files: [
      {
        label: "Power BI file",
        path: "assets/projects/IBM-HR-Attrition-Analysis.pbix",
        ext: ".PBIX",
      },
      {
        label: "Executive report",
        path: "assets/projects/IBM-HR-Attrition-Executive-Report.pdf",
        ext: ".PDF",
      },
    ],
  },
  {
    id: "customer-satisfaction",
    index: "02",
    title: "Customer Satisfaction Survey Analysis",
    category: "Future Case Study",
    tools: ["Excel"],
    description:
      "A structured project template ready for survey questions, response analysis, and actionable customer experience recommendations.",
    template: true,
  },
  {
    id: "health-expenditure",
    index: "03",
    title: "Health Expenditure: Europe vs Worldwide",
    category: "Future Case Study",
    tools: ["Excel"],
    description:
      "A structured project template ready for comparative analysis, context, and evidence-based observations.",
    template: true,
  },
  {
    id: "surface-area",
    index: "04",
    title: "Surface Area vs Population & Sex Ratio",
    category: "Future Case Study",
    tools: ["Regression Analysis"],
    description:
      "A structured project template ready for exploratory relationships, regression analysis, and interpretation.",
    template: true,
  },
  {
    id: "julians-car-audio",
    index: "05",
    title: "Julian's Car Audio",
    category: "Future Case Study",
    tools: ["Financial Analysis"],
    description:
      "A structured project template ready for business context, financial analysis, and recommendations.",
    template: true,
  },
];

const qs = (selector, scope = document) => scope.querySelector(selector);
const qsa = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

function escapeHtml(value) {
  return String(value).replace(
    /[&<>'"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        char
      ],
  );
}

function renderProjects() {
  const grid = qs("[data-project-grid]");
  if (!grid) return;
  grid.innerHTML = projectData
    .map((project) => {
      const tags = project.tools
        .map((tool) => `<span class="tag">${escapeHtml(tool)}</span>`)
        .join("");
      const visualClass = project.featured ? "" : " future";
      const action = project.template
        ? "Open project template"
        : "View case study";
      return `
      <article class="project-card ${project.featured ? "featured" : ""} reveal">
        <div class="project-visual${visualClass}" role="img" aria-label="Abstract placeholder visual for ${escapeHtml(project.title)}">
          <span class="placeholder-stamp">${escapeHtml(project.status || "Project Template")}</span>
        </div>
        <div class="project-content">
          <div class="project-topline"><p class="project-category">${escapeHtml(project.category)}</p><span class="project-index">${escapeHtml(project.index)} / 05</span></div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
          <div class="tag-list">${tags}</div>
          <button class="project-link" type="button" data-project-id="${escapeHtml(project.id)}">${action} <span aria-hidden="true">↗</span></button>
        </div>
      </article>`;
    })
    .join("");
}

const modal = qs("[data-project-modal]");
const modalTitle = qs("[data-modal-title]");
const modalCategory = qs("[data-modal-category]");
const modalSummary = qs("[data-modal-summary]");
const modalTools = qs("[data-modal-tools]");
const modalBody = qs("[data-modal-body]");
const lightbox = qs("[data-lightbox]");
const lightboxTitle = qs("[data-lightbox-title]");
let lastFocusedElement = null;

function tagsMarkup(tools = []) {
  return tools
    .map((tool) => `<span class="tag">${escapeHtml(tool)}</span>`)
    .join("");
}
function listMarkup(items = [], ordered = false) {
  return `<${ordered ? "ol" : "ul"}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`;
}

function caseStudyMarkup(project) {
  if (project.template) {
    return `<div class="template-note"><strong>This is a content template.</strong> Add the real business question, dataset, tools, methodology, findings, recommendations, gallery files, and downloads when the project is ready. No findings are implied here.</div><div class="case-grid template-case-grid"><section class="case-block"><p class="modal-section-label">Suggested sections</p><h3>Business problem</h3><p>Document the question the project is exploring.</p></section><section class="case-block"><p class="modal-section-label">Suggested sections</p><h3>Dataset &amp; tools</h3><p>Record the source, scope, and tools used.</p></section><section class="case-block"><p class="modal-section-label">Suggested sections</p><h3>Methodology</h3><p>Explain the analysis steps in order.</p></section><section class="case-block"><p class="modal-section-label">Suggested sections</p><h3>Findings &amp; recommendations</h3><p>Add only verified results and clearly label any pending validation.</p></section></div>`;
  }
  const gallery = project.gallery
    .map(
      (label, index) =>
        `<button class="gallery-placeholder" type="button" data-gallery-title="${escapeHtml(label)}" aria-label="Open ${escapeHtml(label)} placeholder in lightbox"><span>${String(index + 1).padStart(2, "0")} / ${escapeHtml(label)}</span></button>`,
    )
    .join("");
  const files = project.files
    .map(
      (file) =>
        `<a class="file-link" href="${escapeHtml(file.path)}" download><span>${escapeHtml(file.ext)}</span>${escapeHtml(file.label)} <span aria-hidden="true">↓</span></a>`,
    )
    .join("");
  return `<div class="case-grid"><section class="case-block"><p class="modal-section-label">01 / Overview</p><h3>Project Overview</h3><p>${escapeHtml(project.overview)}</p></section><section class="case-block"><p class="modal-section-label">02 / Question</p><h3>Business Problem</h3><p>${escapeHtml(project.problem)}</p></section><section class="case-block"><p class="modal-section-label">03 / Scope</p><h3>Dataset</h3><p>${escapeHtml(project.dataset)}</p></section><section class="case-block"><p class="modal-section-label">04 / Stack</p><h3>Tools &amp; Technologies</h3><div class="tag-list">${tagsMarkup(project.tools)}</div></section><section class="case-block"><p class="modal-section-label">05 / Process</p><h3>Methodology</h3>${listMarkup(project.methodology, true)}</section><section class="case-block"><p class="modal-section-label">06 / Evidence</p><h3>Key Findings</h3>${listMarkup(project.findings)}</section><section class="case-block"><p class="modal-section-label">07 / Action</p><h3>Business Recommendations</h3>${listMarkup(project.recommendations)}</section><section class="case-block full"><p class="modal-section-label">08 / Gallery</p><h3>Project Gallery</h3><div class="gallery-grid">${gallery}</div></section><section class="case-block full"><p class="modal-section-label">09 / Files</p><h3>Project Files</h3><p class="template-note">Placeholder download paths — add the real files to <strong>assets/projects/</strong> using the filenames shown in the link targets.</p><div class="file-links">${files}</div></section></div>`;
}

function openModal(projectId) {
  const project = projectData.find((item) => item.id === projectId);
  if (!project || !modal) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = project.title;
  modalCategory.textContent = `${project.index} / ${project.category}`;
  modalSummary.textContent = project.description;
  modalTools.innerHTML = tagsMarkup(project.tools);
  modalBody.innerHTML = caseStudyMarkup(project);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  qs(".modal-close", modal).focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function")
    lastFocusedElement.focus();
}

function openLightbox(title, trigger) {
  if (!lightbox) return;
  lastFocusedElement = trigger || document.activeElement;
  lightboxTitle.textContent = title;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  qs(".modal-close", lightbox).focus();
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function")
    lastFocusedElement.focus();
}

renderProjects();

document.addEventListener("click", (event) => {
  const projectButton = event.target.closest("[data-project-id]");
  if (projectButton) openModal(projectButton.dataset.projectId);
  if (event.target.closest("[data-modal-close]")) closeModal();
  const galleryButton = event.target.closest("[data-gallery-title]");
  if (galleryButton)
    openLightbox(galleryButton.dataset.galleryTitle, galleryButton);
  if (event.target.closest("[data-lightbox-close]")) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (lightbox?.classList.contains("is-open")) closeLightbox();
    else if (modal?.classList.contains("is-open")) closeModal();
  }
  const activeLayer = lightbox?.classList.contains("is-open")
    ? lightbox
    : modal?.classList.contains("is-open")
      ? modal
      : null;
  if (event.key === "Tab" && activeLayer) {
    const focusable = qsa(
      'button, a[href], [tabindex]:not([tabindex="-1"])',
      activeLayer,
    ).filter((element) => !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const menuToggle = qs("[data-menu-toggle]");
const nav = qs("[data-nav]");
function closeMenu() {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open navigation menu");
}
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu",
  );
});
qsa("[data-nav-link], .nav-resume").forEach((link) =>
  link.addEventListener("click", closeMenu),
);

const header = qs("[data-header]");
const backToTop = qs("[data-back-to-top]");
function handleScroll() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
  backToTop?.classList.toggle("visible", window.scrollY > 600);
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();
backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

const sections = qsa("[data-section]");
const navLinks = qsa("[data-nav-link]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      }
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
);
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
qsa(".reveal").forEach((element) => revealObserver.observe(element));
