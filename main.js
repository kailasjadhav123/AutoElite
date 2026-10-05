/* AutoElite — main.js */

// Navbar scroll effect 
const nav = document.querySelector('.ae-nav');
const hamburger = document.querySelector('.ae-hamburger');
const navLinks = document.querySelector('.ae-nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
});

// Mobile menu
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});


const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('.ae-nav-links a').forEach(link => {
  const href = link.getAttribute('href').replace(/\/$/, '') || '/';
  if (href === currentPath || (currentPath === '' && href === '/index.html')) {
    link.classList.add('active');
  }
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Toast utility 
function showToast(title, msg, isError = false) {
  let toast = document.querySelector('.ae-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'ae-toast';
    toast.innerHTML = `<div class="ae-toast-title"></div><div class="ae-toast-msg"></div>`;
    document.body.appendChild(toast);
  }

  toast.querySelector('.ae-toast-title').textContent = title;
  toast.querySelector('.ae-toast-msg').textContent = msg;
  toast.classList.toggle('error', isError);
  toast.classList.add('show');

  setTimeout(() => toast.classList.remove('show'), 4500);
}


function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}


const counterEls = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, parseInt(el.dataset.count));
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObs.observe(el));
