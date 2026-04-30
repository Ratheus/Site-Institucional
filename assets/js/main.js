/* =============================================
   TNTFIT — Main JS
   Nav scroll | Mobile menu | Scroll reveals |
   Marquee scroll-driven | Card deck | Carrossel modalidades
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

      const heroAnims = [
        { sel: '.hero__tag',               delay: 80  },
        { sel: '.hero__line:nth-child(1)', delay: 220 },
        { sel: '.hero__line:nth-child(2)', delay: 380 },
        { sel: '.hero__sub',               delay: 540 },
        { sel: '.hero__ctas',              delay: 660 },
        { sel: '.hero__stats',             delay: 800 },
      ];
      heroAnims.forEach(({ sel, delay }) => {
        const el = document.querySelector(sel);
        if (el) setTimeout(() => el.classList.add('hero-visible'), delay);
      });
    };

    const logo = preloader.querySelector('.preloader__logo');
    if (logo) logo.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 4000);
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

  /* ─── MARQUEE: scroll-driven (esquerda → direita) ─── */
  const marqueeStrip = document.getElementById('marqueeStrip');
  const marqueeText  = document.getElementById('marqueeText');

  if (marqueeStrip && marqueeText) {
    const updateMarquee = () => {
      const rect = marqueeStrip.getBoundingClientRect();
      const vh   = window.innerHeight;
      // progress: 0 quando base da faixa entra pela base da tela,
      //           1 quando topo da faixa sai pelo topo da tela
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped  = Math.max(0, Math.min(1, progress));
      // De -40vw até +40vw
      const tx = (clamped * 80 - 40).toFixed(2);
      marqueeText.style.transform = `translateX(${tx}vw)`;
    };

    window.addEventListener('scroll', updateMarquee, { passive: true });
    updateMarquee();
  }

  /* ─── CARD DECK (Diferenciais) ─── */
  const deck = document.getElementById('cardDeck');
  if (deck) {
    const cards    = [...deck.querySelectorAll('.deck-card')];
    const counter  = document.getElementById('deckCounter');
    const btnNext  = document.getElementById('deckNext');
    const btnPrev  = document.getElementById('deckPrev');
    const total    = cards.length;
    let   topIndex = 0;
    let   autoTimer;

    /* Atribui data-pos a cada card baseado na posição relativa ao topo */
    function setPositions() {
      cards.forEach((card, i) => {
        const pos = ((i - topIndex) % total + total) % total;
        card.dataset.pos = String(Math.min(pos, 3));
      });
      if (counter) counter.textContent = `${topIndex + 1} / ${total}`;
    }

    function advance() {
      const topCard = cards[topIndex];
      topCard.classList.add('deck-card--exiting');

      setTimeout(() => {
        topCard.classList.remove('deck-card--exiting');
        topIndex = (topIndex + 1) % total;
        setPositions();
      }, 430);
    }

    function retreat() {
      topIndex = (topIndex - 1 + total) % total;
      setPositions();
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(advance, 4000);
    }

    setPositions();
    startAuto();

    btnNext?.addEventListener('click', () => { advance(); startAuto(); });
    btnPrev?.addEventListener('click', () => { retreat(); startAuto(); });

    deck.addEventListener('mouseenter', () => clearInterval(autoTimer));
    deck.addEventListener('mouseleave', startAuto);

    /* Suporte a swipe */
    let swipeStart = 0;
    deck.addEventListener('touchstart', e => { swipeStart = e.touches[0].clientX; }, { passive: true });
    deck.addEventListener('touchend', e => {
      const diff = swipeStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? advance() : retreat();
        startAuto();
      }
    });
  }

  /* ─── CARROSSEL MODALIDADES ─── */
  const carousel = document.getElementById('modCarousel');
  if (carousel) {
    const cards   = [...carousel.querySelectorAll('.mod-card')];
    const total   = cards.length;
    let   active  = 0;

    function setPositions() {
      cards.forEach((card, i) => {
        let pos = i - active;
        /* Wrap-around mais curto */
        if (pos >  total / 2) pos -= total;
        if (pos < -total / 2) pos += total;
        /* Clamp para ±3 */
        pos = Math.max(-3, Math.min(3, pos));
        card.dataset.pos = String(pos);
      });
    }

    function navigate(dir) {
      active = ((active + dir) % total + total) % total;
      setPositions();
    }

    setPositions();

    document.getElementById('modPrev')?.addEventListener('click', () => navigate(-1));
    document.getElementById('modNext')?.addEventListener('click', () => navigate(1));

    /* Clique no card lateral navega até ele */
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (card.dataset.pos !== '0') {
          const pos = parseInt(card.dataset.pos);
          navigate(pos > 0 ? 1 : -1);
        }
      });
    });

    /* Suporte a swipe */
    let swipeStart = 0;
    carousel.addEventListener('touchstart', e => { swipeStart = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const diff = swipeStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) navigate(diff > 0 ? 1 : -1);
    });
  }

  /* ─── FAQ: ACCORDION ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
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

  /* ─── ACTIVE NAV LINK ─── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath) link.classList.add('active');
  });

})();
