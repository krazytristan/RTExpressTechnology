// === SCROLL REVEAL ===
ScrollReveal().reveal('[data-sr-id]', {
  origin: 'bottom',
  distance: '40px',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200
});

// === DARK MODE ===
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.getElementById('themeIcon').src = isDark
    ? 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png'
    : 'https://cdn-icons-png.flaticon.com/512/6714/6714978.png';

  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply dark mode on page load
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  document.getElementById('themeIcon').src = 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png';
}

// === CONTACT FORM ===
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
const error = document.getElementById('formError');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  success.classList.add('hidden');
  error.classList.add('hidden');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formObject)
    });

    if (response.ok) {
      success.classList.remove('hidden');
      form.reset();
      setTimeout(() => success.classList.add('hidden'), 3000);
    } else {
      throw new Error();
    }
  } catch {
    error.classList.remove('hidden');
    setTimeout(() => error.classList.add('hidden'), 3000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// === NEWSLETTER FORM ===
const newsletterForm = document.getElementById('newsletterForm');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const newsletterError = document.getElementById('newsletterError');
const newsletterBtn = document.getElementById('newsletterBtn');

newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  newsletterSuccess.classList.add('hidden');
  newsletterError.classList.add('hidden');
  newsletterBtn.disabled = true;
  newsletterBtn.textContent = 'Subscribing...';

  const formData = new FormData(newsletterForm);
  const dataObject = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(newsletterForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(dataObject)
    });

    if (response.ok) {
      newsletterSuccess.classList.remove('hidden');
      newsletterForm.reset();
      setTimeout(() => newsletterSuccess.classList.add('hidden'), 3000);
    } else {
      throw new Error();
    }
  } catch {
    newsletterError.classList.remove('hidden');
    setTimeout(() => newsletterError.classList.add('hidden'), 3000);
  } finally {
    newsletterBtn.disabled = false;
    newsletterBtn.textContent = 'Subscribe';
  }
});

// === HAMBURGER MENU TOGGLE ===
// Toggle mobile menu visibility
function toggleMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  mobileMenu.classList.toggle('translate-x-full'); // Hide/show the menu
  mobileMenuOverlay.classList.toggle('hidden'); // Show overlay
  
  // If menu is open, disable body scroll
  document.body.style.overflow = mobileMenu.classList.contains('translate-x-full') ? '' : 'hidden';
}

// === SCROLL REVEAL === (Left and Right)
ScrollReveal({ reset: true });
ScrollReveal().reveal('.reveal-left', {
  origin: 'left',
  distance: '60px',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200,
  mobile: true
});

ScrollReveal().reveal('.reveal-right', {
  origin: 'right',
  distance: '60px',
  duration: 1000,
  easing: 'ease-in-out',
  interval: 200,
  mobile: true
});
