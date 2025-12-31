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

// ==============================
// GLOBAL OFFSET + SMOOTH SCROLL
// ==============================

const OFFSET_REM = 7.5;
const OFFSET_PX =
  OFFSET_REM * parseFloat(getComputedStyle(document.documentElement).fontSize);

function smoothScrollTo(y, duration = 500, callback = null) {
  const startY = window.scrollY;
  const diff = y - startY;
  const startTime = performance.now();

  function frame(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + diff * ease);

    if (elapsed < duration) requestAnimationFrame(frame);
    else if (callback) callback();
  }

  requestAnimationFrame(frame);
}


document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".aside-nav-button");

  const options = {
    root: null,
    rootMargin: `-${OFFSET_PX}px 0px 0px 0px`,
    threshold: 0
  };

  const sectionMap = new Map();
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sectionMap.set(section, link);
  });

  let isAutoScrolling = false;

  const observer = new IntersectionObserver((entries) => {
    if (isAutoScrolling) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeLink = sectionMap.get(entry.target);
        navLinks.forEach(l => l.classList.remove("active"));
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, options);

  sectionMap.forEach((_, section) => observer.observe(section));

  // Aside nav smooth scroll
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;

      const targetY = section.offsetTop - OFFSET_PX;

      isAutoScrolling = true;
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      smoothScrollTo(targetY, 500, () => {
        isAutoScrolling = false;
      });
    });
  });

// WORK BUTTON (SAME-PAGE CLICK)
const workButton = document.querySelector(".work-button");
const workSection = document.getElementById("work");

if (workButton && workSection) {
  workButton.addEventListener("click", (e) => {
    // Only prevent default if the element exists on this page
    e.preventDefault();

    const targetY = workSection.offsetTop - OFFSET_PX;

    smoothScrollTo(targetY, 500, () => {
      // Update URL hash without jumping
      history.replaceState(null, "", "#work");
    });
  });
}


// ===================================
// WORK BUTTON (CROSS-PAGE LOAD)
// ===================================

window.addEventListener("load", () => {
  if (window.location.hash !== "#work") return;

  const workSection = document.getElementById("work");
  if (!workSection) return;

  // Cancel browser’s default jump
  window.scrollTo(0, 0);

  // Apply offset after layout is complete
  requestAnimationFrame(() => {
    const y = workSection.offsetTop - OFFSET_PX;
    window.scrollTo(0, y); // no smooth scroll
  });
});

// ==============================
// BACK TO TOP BUTTON
// ==============================

  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})