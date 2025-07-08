// === TYPING TEXT EFFECT FOR HERO SECTION ===
document.addEventListener("DOMContentLoaded", () => {
  const typingText = document.getElementById("typingText");
  if (typingText) {
    const techWords = ["Web", "App", "AI", "Cloud", "IoT", "Innovation"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = techWords[wordIndex];
      typingText.textContent = isDeleting
        ? currentWord.substring(0, --charIndex)
        : currentWord.substring(0, ++charIndex);

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % techWords.length;
        setTimeout(typeEffect, 300);
      } else {
        setTimeout(typeEffect, isDeleting ? 80 : 120);
      }
    }

    typeEffect();
  }

  // === IMPACT SECTION COUNTER ===
  const counters = document.querySelectorAll(".counter");
  let hasCounted = false;

  function animateCounter(counter) {
    const target = +counter.dataset.target;
    let count = 0;
    const increment = Math.max(1, Math.ceil(target / 50));

    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  }

  function checkImpactVisibility() {
    const section = document.getElementById("impact");
    if (!section || hasCounted) return;

    const top = section.getBoundingClientRect().top;
    const height = window.innerHeight;

    if (top < height * 0.9) {
      counters.forEach(animateCounter);
      hasCounted = true;
    }
  }

  window.addEventListener("scroll", checkImpactVisibility);
  checkImpactVisibility(); // run on load too

  // === SCROLL REVEAL FOR CLASS "reveal" ===
  const revealElements = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    revealElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // === SCROLL REVEAL ENHANCED ===
  if (typeof ScrollReveal !== "undefined") {
    ScrollReveal({ reset: true });

    ScrollReveal().reveal('[data-sr-id]', {
      origin: 'bottom',
      distance: '40px',
      duration: 1000,
      easing: 'ease-in-out',
      interval: 200,
      mobile: true,
      opacity: 0,
      scale: 0.9
    });

    ScrollReveal().reveal('.reveal-left', {
      origin: 'left',
      distance: '60px',
      duration: 1200,
      easing: 'ease-in-out',
      interval: 200,
      opacity: 0,
      scale: 0.9
    });

    ScrollReveal().reveal('.reveal-right', {
      origin: 'right',
      distance: '60px',
      duration: 1200,
      easing: 'ease-in-out',
      interval: 200,
      opacity: 0,
      scale: 0.9
    });
  }

  // === MOBILE MENU TOGGLE ===
  window.toggleMenu = () => {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');

    if (menu && overlay) {
      menu.classList.toggle('translate-x-full');
      overlay.classList.toggle('hidden');
      document.body.style.overflow = menu.classList.contains('translate-x-full') ? '' : 'hidden';
    }
  };

  // === CONTACT FORM ENHANCED ===
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('formSuccess');
  const contactError = document.getElementById('formError');
  const submitBtn = document.getElementById('submitBtn');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactSuccess?.classList.add('hidden');
    contactError?.classList.add('hidden');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        contactSuccess?.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => contactSuccess?.classList.add('hidden'), 3000);
      } else {
        throw new Error();
      }
    } catch {
      contactError?.classList.remove('hidden');
      setTimeout(() => contactError?.classList.add('hidden'), 3000);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    }
  });
  

  // === NEWSLETTER FORM ENHANCED ===
  const newsletterForm = document.getElementById('newsletterForm');
  const newsSuccess = document.getElementById('newsletterSuccess');
  const newsError = document.getElementById('newsletterError');
  const newsBtn = document.getElementById('newsletterBtn');

  newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    newsSuccess?.classList.add('hidden');
    newsError?.classList.add('hidden');
    if (newsBtn) {
      newsBtn.disabled = true;
      newsBtn.textContent = 'Subscribing...';
    }

    const data = new FormData(newsletterForm);
    const json = Object.fromEntries(data.entries());

    try {
      const res = await fetch(newsletterForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(json)
      });

      if (res.ok) {
        newsSuccess?.classList.remove('hidden');
        newsletterForm.reset();
        setTimeout(() => newsSuccess?.classList.add('hidden'), 3000);
      } else {
        throw new Error();
      }
    } catch {
      newsError?.classList.remove('hidden');
      setTimeout(() => newsError?.classList.add('hidden'), 3000);
    } finally {
      if (newsBtn) {
        newsBtn.disabled = false;
        newsBtn.textContent = 'Subscribe';
      }
    }
  });
});
const toggleMenu = () => {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileOverlay = document.getElementById("mobileMenuOverlay");

  mobileMenu.classList.toggle("translate-x-full");
  mobileOverlay.classList.toggle("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("#mobileMenu nav a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("mobileMenu").classList.add("translate-x-full");
      document.getElementById("mobileMenuOverlay").classList.add("hidden");
    });
  });
});
