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
