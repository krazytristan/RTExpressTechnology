// === SCROLL REVEAL ENHANCED ===
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

// === DARK MODE WITH ICON TRANSITION ===
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  const icon = document.getElementById('themeIcon');

  icon.classList.add('animate-spin');
  setTimeout(() => icon.classList.remove('animate-spin'), 600);

  icon.src = isDark
    ? 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png'
    : 'https://cdn-icons-png.flaticon.com/512/6714/6714978.png';

  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply theme on load
window.addEventListener('DOMContentLoaded', () => {
  const icon = document.getElementById('themeIcon');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    icon.src = 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png';
  }
});

// === CONTACT FORM ENHANCED ===
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('formSuccess');
const contactError = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  contactSuccess.classList.add('hidden');
  contactError.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const res = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      contactSuccess.classList.remove('hidden');
      contactForm.reset();
      setTimeout(() => contactSuccess.classList.add('hidden'), 3000);
    } else {
      throw new Error();
    }
  } catch {
    contactError.classList.remove('hidden');
    setTimeout(() => contactError.classList.add('hidden'), 3000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// === NEWSLETTER FORM ENHANCED ===
const newsletterForm = document.getElementById('newsletterForm');
const newsSuccess = document.getElementById('newsletterSuccess');
const newsError = document.getElementById('newsletterError');
const newsBtn = document.getElementById('newsletterBtn');

newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  newsSuccess.classList.add('hidden');
  newsError.classList.add('hidden');
  newsBtn.disabled = true;
  newsBtn.textContent = 'Subscribing...';

  const data = new FormData(newsletterForm);
  const json = Object.fromEntries(data.entries());

  try {
    const res = await fetch(newsletterForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(json)
    });

    if (res.ok) {
      newsSuccess.classList.remove('hidden');
      newsletterForm.reset();
      setTimeout(() => newsSuccess.classList.add('hidden'), 3000);
    } else {
      throw new Error();
    }
  } catch {
    newsError.classList.remove('hidden');
    setTimeout(() => newsError.classList.add('hidden'), 3000);
  } finally {
    newsBtn.disabled = false;
    newsBtn.textContent = 'Subscribe';
  }
});

// === MOBILE MENU TOGGLE ===
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  menu.classList.toggle('translate-x-full');
  overlay.classList.toggle('hidden');
  document.body.style.overflow = menu.classList.contains('translate-x-full') ? '' : 'hidden';
}
// Counter animation for impact section
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  const options = { threshold: 0.5 };

  const animateCounter = (counter) => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 100;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));
});
