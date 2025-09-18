// Mobile menu toggle functionality
function toggleMenu() {
  const menuList = document.getElementById("menuList");
  const navHeader = document.querySelector(".nav-header");
  const menuToggle = document.querySelector(".menu-toggle");

  // Toggle menu visibility
  navHeader.classList.toggle("active");
  menuList.classList.toggle("active");
  menuToggle.classList.toggle("active");

  // Prevent body scroll when menu is open
  if (navHeader.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}
// Close menu when clicking on menu links
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".nav-header a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const menuList = document.getElementById("menuList");
      const navHeader = document.querySelector(".nav-header");
      const menuToggle = document.querySelector(".menu-toggle");

      navHeader.classList.remove("active");
      menuList.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (event) {
  const menuList = document.getElementById("menuList");
  const navHeader = document.querySelector(".nav-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector("header");

  if (
    !header.contains(event.target) &&
    navHeader.classList.contains("active")
  ) {
    navHeader.classList.remove("active");
    menuList.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
});

window.addEventListener("resize", function () {
  const menuList = document.getElementById("menuList");
  const navHeader = document.querySelector(".nav-header");
  const menuToggle = document.querySelector(".menu-toggle");

  if (window.innerWidth > 768) {
    navHeader.classList.remove("active");
    menuList.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
});
