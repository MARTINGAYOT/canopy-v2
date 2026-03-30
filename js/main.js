/* ============================================
   CANOPY CONSULTING V2 — MAIN JS
   ============================================ */

const BASE = '/canopy-v2';

const NAV_HTML = `
<nav class="nav" id="nav">
  <a href="${BASE}/index.html" class="nav-logo">
    <img src="${BASE}/assets/logo.png" alt="Canopy Consulting"/>
  </a>
  <ul class="nav-links">
    <li><a href="${BASE}/pages/about.html">About</a></li>
    <li><a href="${BASE}/pages/journey.html">The Journey</a></li>
    <li><a href="${BASE}/pages/services.html">Services</a></li>
    <li><a href="${BASE}/pages/contact.html" class="nav-cta">Book a Call</a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="${BASE}/assets/logo.png" alt="Canopy Consulting" class="footer-logo"/>
      <p>We help small and mid-sized businesses build the foundations, systems, and strategies they need to grow with confidence. Deep roots. Wide reach. Unstoppable growth.</p>
    </div>
    <div class="footer-col">
      <h5>Navigate</h5>
      <ul>
        <li><a href="${BASE}/index.html">Home</a></li>
        <li><a href="${BASE}/pages/about.html">About</a></li>
        <li><a href="${BASE}/pages/journey.html">The Journey</a></li>
        <li><a href="${BASE}/pages/services.html">Services</a></li>
        <li><a href="${BASE}/pages/contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Services</h5>
      <ul>
        <li><a href="${BASE}/pages/services.html">Business Audit</a></li>
        <li><a href="${BASE}/pages/services.html">Launch & Foundation</a></li>
        <li><a href="${BASE}/pages/services.html">Brand & Presence</a></li>
        <li><a href="${BASE}/pages/services.html">Systems Setup</a></li>
        <li><a href="${BASE}/pages/services.html">Growth & Scale</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 Canopy Consulting · Belize</p>
    <span class="footer-motto">Sub Umbra Floreo — Under the shade, we flourish.</span>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {

  // Inject nav + footer
  const navSlot = document.getElementById('nav-slot');
  const footerSlot = document.getElementById('footer-slot');
  if (navSlot) navSlot.outerHTML = NAV_HTML;
  if (footerSlot) footerSlot.outerHTML = FOOTER_HTML;

  // Nav scroll state
  setTimeout(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }, 50);

  // Active nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  setTimeout(() => {
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.getAttribute('href')?.endsWith(current)) link.classList.add('active');
    });
  }, 60);

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Staggered reveal for grid children
  document.querySelectorAll('.stagger-children > *').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Animated counter
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start = 0;
      const step = () => {
        start += Math.ceil(target / 40);
        if (start >= target) { el.textContent = target; return; }
        el.textContent = start;
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
    obs.observe(el);
  });

});
