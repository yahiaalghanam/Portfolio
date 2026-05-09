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

document.addEventListener("click", (event) => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  const isClickInside =
    menu.contains(event.target) ||
    icon.contains(event.target);

  if (!isClickInside) {
    menu.classList.remove("open");
    icon.classList.remove("open");
  }
});

/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 150;

    if (scrollY >= top) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});

/* =========================
   IMAGE SLIDER (MULTI-CARD SAFE)
========================= */

function changeSlide(button, step) {
  const slider = button.closest(".image-slider");
  const slides = slider.querySelectorAll(".slide");

  let index = [...slides].findIndex(slide =>
    slide.classList.contains("active")
  );

  slides[index].classList.remove("active");

  index += step;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides[index].classList.add("active");
}
/* =========================
   READ MORE FUNCTIONALITY
========================= */

document.addEventListener("DOMContentLoaded", () => {
  const descriptions = document.querySelectorAll(".project-description");

  descriptions.forEach((desc) => {
    const fullText = desc.textContent.trim();

    // Only apply if text is longer than 200 chars
    if (fullText.length > 200) {
      desc.classList.add("collapsed");

      const button = document.createElement("button");
      button.classList.add("read-more-btn");
      button.textContent = "Read More";

      desc.after(button);

      button.addEventListener("click", () => {
        desc.classList.toggle("collapsed");

        if (desc.classList.contains("collapsed")) {
          button.textContent = "Read More";
        } else {
          button.textContent = "Read Less";
        }
      });
    }
  });
});