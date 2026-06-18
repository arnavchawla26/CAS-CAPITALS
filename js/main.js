/* =====================================================
   CAS Capitals — Shared Scripts
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initRevealAnimations();
  initContactForm();
  initApplyForm();
});

/* ------------------------------------------------------
   Navbar scroll effect
   ------------------------------------------------------ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ------------------------------------------------------
   Mobile navigation toggle
   ------------------------------------------------------ */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen ? getCloseIcon() : getMenuIcon();
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = getMenuIcon();
    });
  });
}

function getMenuIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
}

function getCloseIcon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
}

/* ------------------------------------------------------
   Reveal on scroll animations
   ------------------------------------------------------ */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------
   Contact form handler
   ------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });

      if (res.ok) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      alert('Something went wrong. Please try again or email us at cascapitals26@gmail.com');
    }
  });
}

/* ------------------------------------------------------
   Apply form handler + role prefill + file upload
   ------------------------------------------------------ */
function initApplyForm() {
  const form = document.getElementById('applyForm');
  if (!form) return;

  // Role prefill from query string
  const params = new URLSearchParams(window.location.search);
  const role = params.get('role') || '';

  if (role) {
    const roleDisplay = document.getElementById('roleDisplay');
    const roleInput = document.getElementById('roleInput');

    if (roleDisplay) roleDisplay.textContent = role;
    if (roleInput) roleInput.value = role;
    document.title = `Apply — ${role} | CAS Capitals`;
  }

  // File upload feedback
  const fileInput = document.getElementById('resumeFile');
  const uploadArea = document.getElementById('uploadArea');
  const filenameEl = document.getElementById('uploadFilename');

  if (fileInput) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0 && filenameEl) {
        filenameEl.textContent = '✓ ' + fileInput.files[0].name;
        filenameEl.style.display = 'block';
      }
      if (uploadArea) {
        uploadArea.style.borderColor = 'var(--color-accent)';
      }
    });
  }

  if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length && fileInput) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  // Form submit
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      alert('Something went wrong. Please email your application to cascapitals26@gmail.com');
    }
  });
}
