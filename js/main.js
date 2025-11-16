const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".navbar-items");
const hamburger = document.querySelector(".hamburger");

if (header && navbar && menu && hamburger) {
  function updateBlurHeight(open = false) {
    const baseHeight = navbar.offsetHeight;
    const expandedHeight = baseHeight + menu.scrollHeight + 16;
    header.style.setProperty("--nav-blur-height", open ? expandedHeight + "px" : baseHeight + "px");
  }

  // set initial height on load
  window.addEventListener("load", () => updateBlurHeight(false));
  window.addEventListener("resize", () => {
    if (!header.classList.contains("open")) updateBlurHeight(false);
  });

  hamburger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("open");
    if (isOpen) {
        menu.classList.add("open");
      } else {
        menu.classList.remove("open");
      }
    updateBlurHeight(isOpen);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".aside-nav-button");

  const sections = Array.from(navLinks).map(link =>
    document.querySelector(link.getAttribute("href"))
  );

  const offset = 7.5 * parseFloat(getComputedStyle(document.documentElement).fontSize); // 7.5rem → px

  function updateActiveLink() {
    sections.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (
        sectionTop <= offset &&
        (index === sections.length - 1 || sections[index + 1].getBoundingClientRect().top > offset)
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("resize", updateActiveLink);

  // Click event: only one active
  navLinks.forEach((link, index) => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Initial check
  updateActiveLink();
});

