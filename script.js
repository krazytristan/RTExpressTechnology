  ScrollReveal().reveal('[data-sr-id]', {
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    easing: 'ease-in-out',
    interval: 200
  });

  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('themeIcon');
    icon.src = document.body.classList.contains('dark-mode')
      ? 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png'
      : 'https://cdn-icons-png.flaticon.com/512/6714/6714978.png';
  }

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
        'Accept': 'application/json'
      },
      body: JSON.stringify(formObject)
    });

    if (response.ok) {
      success.classList.remove('hidden');
      setTimeout(() => success.classList.add('hidden'), 3000);
      form.reset();
    } else {
      error.classList.remove('hidden');
      setTimeout(() => error.classList.add('hidden'), 3000);
    }
  } catch (err) {
    error.classList.remove('hidden');
    setTimeout(() => error.classList.add('hidden'), 3000);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Newsletter form handler
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
    newsletterError.classList.remove('hidden');
    setTimeout(() => newsletterError.classList.add('hidden'), 3000);
  }
} catch (error) {
  newsletterError.classList.remove('hidden');
  setTimeout(() => newsletterError.classList.add('hidden'), 3000);
} finally {
  newsletterBtn.disabled = false;
  newsletterBtn.textContent = 'Subscribe';
}
});

ScrollReveal().reveal('[data-sr-id]', {
origin: 'bottom',
distance: '40px',
duration: 1000,
easing: 'ease-in-out',
interval: 200
});

// Load dark mode on page load if previously set
if (localStorage.getItem('theme') === 'dark') {
document.body.classList.add('dark-mode');
document.getElementById('themeIcon').src = 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png';
}

function toggleDarkMode() {
document.body.classList.toggle('dark-mode');
const isDark = document.body.classList.contains('dark-mode');
document.getElementById('themeIcon').src = isDark
  ? 'https://cdn-icons-png.flaticon.com/512/6714/6714973.png'
  : 'https://cdn-icons-png.flaticon.com/512/6714/6714978.png';

// Save preference
localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
