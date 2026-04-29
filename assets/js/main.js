/* =============================================
   TNTFIT — Main JS
   Nav scroll | Mobile menu | Scroll reveals |
   Marquee clone | Bento spotlight
   ============================================= */

(function () {
  'use strict';

  /* ─── PRELOADER ─── */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    document.body.classList.add('js-preloader');
    document.body.style.overflow = 'hidden';

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      preloader.remove();
      document.body.classList.remove('js-preloader');
      document.body.style.overflow = '';

      // Anima o Hero em cascata após o preloader
      const heroAnims = [
        { sel: '.hero__tag',               delay: 80  },
        { sel: '.hero__line:nth-child(1)', delay: 220 },
        { sel: '.hero__line:nth-child(2)', delay: 380 },
        { sel: '.hero__line:nth-child(3)', delay: 520 },
        { sel: '.hero__sub',               delay: 660 },
        { sel: '.hero__ctas',              delay: 760 },
        { sel: '.hero__stats',             delay: 900 },
      ];
      heroAnims.forEach(({ sel, delay }) => {
        const el = document.querySelector(sel);
        if (el) setTimeout(() => el.classList.add('hero-visible'), delay);
      });
    };

    const logo = preloader.querySelector('.preloader__logo');
    if (logo) logo.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 4000); // fallback
  }

  /* ─── NAV: scroll glass effect ─── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () =>
      nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── NAV: mobile burger ─── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ─── MARQUEE: duplicate content for seamless loop ─── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentElement.appendChild(clone);
  }

  /* ─── BENTO: spotlight follow ─── */
  document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* ─── EQUIPAMENTOS: VIDEO HOVER ─── */
  document.querySelectorAll('.equipamento-card').forEach(card => {
    const video = card.querySelector('.equipamento-video');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.playbackRate = 1;
      if (video.readyState >= 2) {
        video.play().catch(() => {});
        card.classList.add('video-ready');
      } else {
        video.addEventListener('canplay', function handler() {
          video.playbackRate = 1;
          video.play().catch(() => {});
          card.classList.add('video-ready');
          video.removeEventListener('canplay', handler);
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      card.classList.remove('video-ready');
    });
  });

  /* ─── FAQ: ACCORDION ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ─── ACTIVE NAV LINK ─── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath) link.classList.add('active');
  });

})();
