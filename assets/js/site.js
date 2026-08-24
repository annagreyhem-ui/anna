/* =====================================================
   ANNA GREYHEM — shared interactions
   menu · header reveal/scroll · home hero · poem reveal
   ===================================================== */
(() => {
  const header = document.querySelector('.site-header');
  const menu   = document.querySelector('.menu');
  const burger = document.querySelector('.burger');
  const closeBtn = document.querySelector('.menu-close');
  const isHome = document.body.dataset.screenLabel === 'Home';

  /* ---------- MENU ---------- */
  if (menu && burger) {
    const open = () => {
      menu.dataset.open = 'true';
      menu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-locked');
    };
    const close = () => {
      menu.dataset.open = 'false';
      menu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-locked');
    };
    burger.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    menu.addEventListener('click', (e) => { if (e.target === menu) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.dataset.open === 'true') close();
    });
    menu.querySelectorAll('.menu-nav a, .menu-foot a').forEach((a) => {
      a.addEventListener('click', () => setTimeout(close, 120));
    });
  }

  /* ---------- HEADER reveal + scroll ---------- */
  if (header) {
    // Inner pages: header + centre wordmark live immediately.
    // Home: header fades in after the hero settles (or on first scroll).
    if (!isHome) {
      header.dataset.revealed = 'true';
      header.dataset.pasthero = 'true';
    } else {
      setTimeout(() => { header.dataset.revealed = 'true'; }, 1700);
      const name = document.querySelector('.hero-name');
      if (name) {
        const io = new IntersectionObserver(([e]) => {
          header.dataset.pasthero = e.isIntersecting ? 'false' : 'true';
        }, { rootMargin: '-64px 0px 0px 0px', threshold: 0 });
        io.observe(name);
      } else {
        header.dataset.pasthero = 'true';
      }
    }

    const onScroll = () => {
      const y = window.scrollY;
      if (y > 8) header.dataset.revealed = 'true';
      header.dataset.scrolled = y > 40 ? 'true' : 'false';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- POEM reveal (home) ---------- */
  const poemSection = document.querySelector('.poem-section');
  const poem = document.querySelector('.poem');
  if (poemSection && poem) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) poem.classList.add('in-view'); });
    }, { threshold: 0.3 });
    io.observe(poemSection);
  }
})();
