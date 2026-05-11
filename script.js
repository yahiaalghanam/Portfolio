/* =========================
   NAV SCROLL STATE
========================= */
const desktopNav = document.getElementById("desktop-nav");
const hamburgerNav = document.getElementById("hamburger-nav");

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (desktopNav) desktopNav.classList.toggle("scrolled", y > 20);
  if (hamburgerNav) hamburgerNav.classList.toggle("scrolled", y > 20);
});

/* =========================
   TOGGLE MOBILE MENU
========================= */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* =========================
   CLOSE MENU ON OUTSIDE CLICK
========================= */
document.addEventListener("click", (e) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  if (!menu.contains(e.target) && !icon.contains(e.target)) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

/* =========================
   ACTIVE NAV LINK
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").includes(entry.target.id)) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => observer.observe(s));

/* =========================
   IMAGE SLIDER + DOTS
========================= */
function buildDots(slider) {
  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = slider.querySelector(".slide-dots");
  if (!dotsContainer || slides.length <= 1) return;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(slider, i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(slider, targetIndex) {
  const slides = slider.querySelectorAll(".slide");
  const dots = slider.querySelectorAll(".slide-dots span");

  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[targetIndex].classList.add("active");
  if (dots[targetIndex]) dots[targetIndex].classList.add("active");
}

function changeSlide(button, step) {
  const slider = button.closest(".image-slider");
  const slides = slider.querySelectorAll(".slide");

  let index = [...slides].findIndex((s) => s.classList.contains("active"));
  index = (index + step + slides.length) % slides.length;

  goToSlide(slider, index);
}

/* Auto-advance sliders */
function autoSlide(slider) {
  const slides = slider.querySelectorAll(".slide");
  if (slides.length <= 1) return;

  setInterval(() => {
    let index = [...slides].findIndex((s) => s.classList.contains("active"));
    index = (index + 1) % slides.length;
    goToSlide(slider, index);
  }, 4500);
}

document.querySelectorAll(".image-slider").forEach((slider) => {
  buildDots(slider);
  autoSlide(slider);
});

/* Touch swipe support for sliders */
document.querySelectorAll(".image-slider").forEach((slider) => {
  let startX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      changeSlide(
        slider.querySelector(diff > 0 ? ".next" : ".prev"),
        diff > 0 ? 1 : -1
      );
    }
  }, { passive: true });
});

/* =========================
   READ MORE / LESS
========================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-description").forEach((desc) => {
    if (desc.textContent.trim().length > 150) {
      desc.classList.add("collapsed");

      const btn = document.createElement("button");
      btn.classList.add("read-more-btn");
      btn.textContent = "Read more";

      desc.after(btn);

      btn.addEventListener("click", () => {
        const collapsed = desc.classList.toggle("collapsed");
        btn.textContent = collapsed ? "Read more" : "Read less";
      });
    }
  });
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */
const revealStyle = document.createElement("style");
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

const revealTargets = document.querySelectorAll(
  ".project-card, .skill-card, .details-container, .contact-card"
);

revealTargets.forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => revealObserver.observe(el));