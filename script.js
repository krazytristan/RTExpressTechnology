document.addEventListener("DOMContentLoaded", () => {
  // ==== Date Setup ====
  const dateEl = document.getElementById("date");
  const today = new Date();
  dateEl.textContent = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ==== Scroll to Top Button ====
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ==== Mobile Nav Toggle ====
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");
  const menuOverlay = document.querySelector(".menu-overlay");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    menuOverlay.classList.toggle("show");
  });

  menuOverlay.addEventListener("click", () => {
    navMenu.classList.remove("show");
    menuOverlay.classList.remove("show");
  });

  // ==== Theme Toggle ====
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    themeIcon.src = theme === "dark" 
      ? "https://cdn-icons-png.flaticon.com/512/1164/1164960.png" // dark icon
      : "https://cdn-icons-png.flaticon.com/512/1164/1164954.png"; // light icon
  };

  const storedTheme = localStorage.getItem("theme");
  applyTheme(storedTheme || (prefersDarkScheme.matches ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  });

  // ==== Form Submission (Contact & Careers) ====
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;

      setTimeout(() => {
        alert("Message sent successfully!");
        form.reset();
        submitButton.disabled = false;
      }, 1000);
    });
  });

  // ==== ScrollReveal Animations ====
  ScrollReveal({ reset: false });

  ScrollReveal().reveal(".reveal", {
    origin: "bottom",
    distance: "40px",
    duration: 1000,
    easing: "ease-in-out",
    opacity: 0,
    scale: 0.9,
    interval: 200,
  });

  ScrollReveal().reveal(".reveal-left", {
    origin: "left",
    distance: "50px",
    duration: 1200,
    easing: "ease-out",
    opacity: 0,
  });

  ScrollReveal().reveal(".reveal-right", {
    origin: "right",
    distance: "50px",
    duration: 1200,
    easing: "ease-out",
    opacity: 0,
  });

  // ==== Hero Section Fade Animation ====
  const fadeInElements = document.querySelectorAll(".hero-fade");
  fadeInElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.animation = `fadeInUp 1s ease forwards ${index * 0.3}s`;
  });
});

// === Mobile Menu Toggle ===
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("mobileMenuOverlay");
  
  menu.classList.toggle("translate-x-full");
  menu.classList.toggle("translate-x-0");
  overlay.classList.toggle("hidden");
}

// === Dark Mode Toggle ===
function toggleDarkMode() {
  const html = document.documentElement;
  const icon = document.getElementById("themeIcon");
  
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    icon.src = "https://cdn-icons-png.flaticon.com/512/1164/1164954.png"; // light icon
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    icon.src = "https://cdn-icons-png.flaticon.com/512/1164/1164960.png"; // dark icon
    localStorage.setItem("theme", "dark");
  }
}

// === Apply Saved Theme on Load ===
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const html = document.documentElement;
  const icon = document.getElementById("themeIcon");

  if (savedTheme === "dark") {
    html.classList.add("dark");
    icon.src = "https://cdn-icons-png.flaticon.com/512/1164/1164960.png";
  } else {
    html.classList.remove("dark");
    icon.src = "https://cdn-icons-png.flaticon.com/512/1164/1164954.png";
  }
});
