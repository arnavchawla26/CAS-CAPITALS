/* =====================================================
   CAS Capitals — Shared Scripts
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initRevealAnimations();
  initContactForm();
  initApplyForm();
  initLiveDashboard();
  initNavbarHoverEffect();
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

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.innerHTML = getMenuIcon();
  };

  const openMenu = () => {
    navLinks.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    toggle.innerHTML = getCloseIcon();
  };

  toggle.setAttribute('aria-expanded', 'false');
  if (!toggle.hasAttribute('aria-label')) {
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }
  toggle.innerHTML = getMenuIcon();

  toggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
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

  if (!form || !submitBtn) return;

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
      const files = e.dataTransfer && e.dataTransfer.files;
      if (files && files.length && fileInput) {
        const dt = new DataTransfer();
        for (let i = 0; i < files.length; i++) {
          dt.items.add(files[i]);
        }
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  }

  // Form submit
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!submitBtn) return;

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

/* ------------------------------------------------------
   Live stock market dashboard simulation
   ------------------------------------------------------ */
function initLiveDashboard() {
  const mainPriceEl = document.getElementById('main-index-price');
  if (!mainPriceEl) return; // Exit if not on home page

  const mainChangeEl = document.getElementById('main-index-change');
  const sensexEl = document.querySelector('#ticker-sensex .ticker-val');
  const bankNiftyEl = document.querySelector('#ticker-banknifty .ticker-val');
  const casPropEl = document.querySelector('#ticker-casprop .ticker-val');
  const logsContainer = document.getElementById('terminal-logs');
  
  const riskValEl = document.getElementById('risk-gauge-val');
  const riskRingEl = document.getElementById('risk-ring-fill');

  let niftyVal = 23516.20;
  let sensexVal = 77301.10;
  let bankNiftyVal = 51780.40;
  let casPropVal = 12482.90;
  let riskPct = 72;

  // Tabs interaction
  const tabs = document.querySelectorAll('.dashboard-tabs .tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Align starting times to actual current clock time
  const initializeLogsTime = () => {
    if (!logsContainer) return;
    const rows = logsContainer.querySelectorAll('.log-row');
    const now = new Date();
    const offsets = [6, 3, 0];
    rows.forEach((row, i) => {
      const timeEl = row.querySelector('.log-time');
      if (timeEl) {
        const tempDate = new Date(now.getTime() - offsets[i] * 1000);
        timeEl.textContent = tempDate.toLocaleTimeString('en-IN', { hour12: false });
      }
    });
  };
  initializeLogsTime();

  // Price Tick Simulation
  setInterval(() => {
    const changePct = (Math.random() * 0.08 - 0.03); // -0.03% to +0.05%
    
    niftyVal += niftyVal * (changePct / 100);
    sensexVal += sensexVal * (changePct / 100);
    bankNiftyVal += bankNiftyVal * ((changePct + 0.01) / 100);
    casPropVal += casPropVal * ((changePct + 0.02) / 100);
    
    // Update main index price
    mainPriceEl.textContent = niftyVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Update main change badge
    const niftyDiff = niftyVal - 23136.20; // baseline for percentage calculation
    const niftyChangePct = (niftyDiff / 23136.20) * 100;
    const isPositive = niftyChangePct >= 0;
    
    if (mainChangeEl) {
      mainChangeEl.className = `dashboard-change ${isPositive ? 'positive' : 'negative'}`;
      mainChangeEl.innerHTML = `
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style="margin-right: 2px;">
          ${isPositive 
            ? '<path d="M6 2L2 6h3v4h2V6h3L6 2z" fill="currentColor"/>' 
            : '<path d="M6 10l4-4H7V2H5v4H2l4 4z" fill="currentColor"/>'}
        </svg>
        <span class="change-text">${isPositive ? '+' : ''}${niftyChangePct.toFixed(2)}%</span>
      `;
    }

    // Update Sparkline tickers
    if (sensexEl) {
      sensexEl.textContent = sensexVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (bankNiftyEl) {
      bankNiftyEl.textContent = bankNiftyVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (casPropEl) {
      casPropEl.textContent = casPropVal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Update Risk gauge randomly between 65% and 78%
    const riskDiff = (Math.random() * 6 - 3); // -3% to +3%
    riskPct = Math.min(80, Math.max(60, riskPct + riskDiff));
    if (riskValEl) {
      riskValEl.textContent = `${Math.round(riskPct)}%`;
    }
    if (riskRingEl) {
      riskRingEl.setAttribute('stroke-dasharray', `${Math.round(riskPct)}, 100`);
    }

  }, 3500);

  // Algo Terminal Simulation logs
  const logPool = [
    { tag: 'Trade', type: 'success', msg: 'Buy Order Executed NIFTY26JUN Call @ 142.10' },
    { tag: 'Trade', type: 'success', msg: 'Sell Order Executed BANKNIFTY26JUN Put @ 285.40' },
    { tag: 'Algo', type: 'info', msg: 'Delta-neutral hedge rebalanced portfolio risk' },
    { tag: 'Algo', type: 'info', msg: 'ML Model predicts upward trend (Confidence: 84.6%)' },
    { tag: 'Algo', type: 'info', msg: 'Spread arbitrage detected in NIFTY Futures' },
    { tag: 'Risk', type: 'warning', msg: 'Exposure optimized. Model predictions locked.' },
    { tag: 'Risk', type: 'warning', msg: 'Hedge ratio adjusted to volatility parameters' },
    { tag: 'Risk', type: 'warning', msg: 'Margin buffer validated: 32.4% [Safe]' }
  ];

  setInterval(() => {
    if (!logsContainer) return;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
    const logItem = logPool[Math.floor(Math.random() * logPool.length)];
    
    const row = document.createElement('div');
    row.className = 'log-row active-row';
    row.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-tag tag-${logItem.type}">${logItem.tag}</span>
      <span class="log-msg">${logItem.msg}</span>
    `;

    const existingRows = logsContainer.querySelectorAll('.log-row');
    existingRows.forEach(r => r.classList.remove('active-row'));
    
    logsContainer.appendChild(row);
    
    const currentRows = logsContainer.querySelectorAll('.log-row');
    if (currentRows.length > 3) {
      currentRows[0].remove();
    }
  }, 5000);

  // 3D Parallax Tilt Effect
  const card = document.querySelector('.market-dashboard');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 8; 
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

/* ------------------------------------------------------
   Sliding Hover Backdrop Capsule Navbar Effect
   ------------------------------------------------------ */
function initNavbarHoverEffect() {
  const navLinksContainer = document.querySelector('.nav-links');
  if (!navLinksContainer) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'nav-hover-backdrop';
  navLinksContainer.appendChild(backdrop);

  const links = navLinksContainer.querySelectorAll('a:not(.nav-cta)');
  const activeLink = navLinksContainer.querySelector('a.active') || navLinksContainer.querySelector('a[aria-current="page"]');

  const updateBackdropPosition = (targetElement) => {
    if (!targetElement || window.innerWidth <= 900) {
      backdrop.style.opacity = '0';
      return;
    }
    backdrop.style.left = `${targetElement.offsetLeft}px`;
    backdrop.style.top = `${targetElement.offsetTop}px`;
    backdrop.style.width = `${targetElement.offsetWidth}px`;
    backdrop.style.height = `${targetElement.offsetHeight}px`;
    backdrop.style.opacity = '1';
  };

  if (activeLink) {
    setTimeout(() => updateBackdropPosition(activeLink), 150);
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      updateBackdropPosition(link);
    });
  });

  navLinksContainer.addEventListener('mouseleave', () => {
    if (activeLink) {
      updateBackdropPosition(activeLink);
    } else {
      backdrop.style.opacity = '0';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 900) {
      backdrop.style.opacity = '0';
    } else if (activeLink) {
      updateBackdropPosition(activeLink);
    }
  });
}
