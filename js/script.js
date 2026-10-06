'use strict';

/* =========================================================
   CONFIG: ikkada matrame nee details marchali
   ========================================================= */
const CONTACT_EMAIL = 'your-email@example.com'; // <-- nee real email ikkada pettu

const TYPED_ROLES = [
  'clean, responsive websites',
  'Java programs',
  'small projects that solve real problems'
];


/* =========================================================
   Footer year
   ========================================================= */
function setupYear() {
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();
}


/* =========================================================
   Theme toggle (dark / light) + remember choice
   ========================================================= */
function setupTheme() {

  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = btn.querySelector('i');

  // First visit: system preference chudu
  let saved = null;

  try {
    saved = localStorage.getItem('theme');
  } catch (e) {}

  if (!saved) {
    saved = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches ? 'light' : 'dark';
  }


  function applyTheme(theme) {

    root.setAttribute('data-theme', theme);

    const isDark = theme === 'dark';

    icon.className = isDark
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';

    btn.setAttribute(
      'aria-label',
      isDark
        ? 'Switch to light theme'
        : 'Switch to dark theme'
    );

    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

  }


  applyTheme(saved);


  btn.addEventListener('click', function () {

    const next =
      root.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';

    applyTheme(next);

  });

}


/* =========================================================
   Mobile menu (hamburger)
   ========================================================= */
function setupMenu() {

  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const icon = menuBtn.querySelector('i');


  function setOpen(open) {

    nav.classList.toggle('open', open);

    menuBtn.setAttribute(
      'aria-expanded',
      String(open)
    );

    menuBtn.setAttribute(
      'aria-label',
      open
        ? 'Close menu'
        : 'Open menu'
    );

    icon.className = open
      ? 'fa-solid fa-xmark'
      : 'fa-solid fa-bars';

  }


  menuBtn.addEventListener('click', function () {

    setOpen(
      !nav.classList.contains('open')
    );

  });


  nav.querySelectorAll('a').forEach(function (link) {

    link.addEventListener('click', function () {

      setOpen(false);

    });

  });


  document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {
      setOpen(false);
    }

  });

}


/* =========================================================
   Header shadow + scroll progress bar
   ========================================================= */
function setupScrollEffects() {

  const header =
    document.getElementById('header');

  const progress =
    document.getElementById('progress');


  function onScroll() {

    const scrollTop = window.scrollY;

    const maxScroll =
      document.documentElement.scrollHeight -
      window.innerHeight;


    header.classList.toggle(
      'scrolled',
      scrollTop > 10
    );


    progress.style.width =
      (
        maxScroll > 0
          ? (scrollTop / maxScroll) * 100
          : 0
      ) + '%';

  }


  window.addEventListener(
    'scroll',
    onScroll,
    { passive: true }
  );


  onScroll();

}


/* =========================================================
   Reveal on scroll
   ========================================================= */
function setupReveal() {

  const items =
    document.querySelectorAll('.reveal');


  if (!('IntersectionObserver' in window)) {

    items.forEach(function (el) {

      el.classList.add('visible');

    });

    return;
  }


  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'visible'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  items.forEach(function (el, i) {

    // chinna stagger delay, anni okesari raakunda
    el.style.transitionDelay =
      (i % 4) * 70 + 'ms';

    observer.observe(el);

  });

}


/* =========================================================
   Active nav link (scroll spy)
   ========================================================= */
function setupScrollSpy() {

  const links =
    document.querySelectorAll('.nav-link');

  const sections =
    document.querySelectorAll(
      'main section[id]'
    );


  if (!('IntersectionObserver' in window)) {
    return;
  }


  const observer =
    new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) {
            return;
          }


          links.forEach(function (link) {

            const isActive =
              link.getAttribute('href') ===
              '#' + entry.target.id;


            link.classList.toggle(
              'active',
              isActive
            );


            if (isActive) {

              link.setAttribute(
                'aria-current',
                'page'
              );

            } else {

              link.removeAttribute(
                'aria-current'
              );

            }

          });

        });

      },
      {
        rootMargin:
          '-45% 0px -50% 0px'
      }
    );


  sections.forEach(function (section) {

    observer.observe(section);

  });

}


/* =========================================================
   Typing effect in hero
   ========================================================= */
function setupTyped() {

  const el =
    document.getElementById('typed');


  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  if (reduceMotion) {
    return;
  }


  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;


  function tick() {

    const word =
      TYPED_ROLES[roleIndex];


    charIndex +=
      deleting
        ? -1
        : 1;


    el.textContent =
      word.slice(
        0,
        charIndex
      );


    let delay =
      deleting
        ? 35
        : 70;


    if (
      !deleting &&
      charIndex === word.length
    ) {

      deleting = true;

      delay = 1600;

    }


    else if (
      deleting &&
      charIndex === 0
    ) {

      deleting = false;

      roleIndex =
        (roleIndex + 1) %
        TYPED_ROLES.length;

      delay = 350;

    }


    setTimeout(
      tick,
      delay
    );

  }


  el.textContent = '';

  tick();

}


/* =========================================================
   Skills ribbon: infinite loop kosam duplicate
   ========================================================= */
function setupRibbon() {

  const track =
    document.getElementById(
      'ribbonTrack'
    );


  const originals =
    Array.from(
      track.children
    );


  originals.forEach(function (item) {

    track.appendChild(
      item.cloneNode(true)
    );

  });

}


/* =========================================================
   Cursor glow (desktop only)
   ========================================================= */
function setupCursorGlow() {

  const glow =
    document.getElementById(
      'cursorGlow'
    );


  if (
    window.matchMedia(
      '(hover: none)'
    ).matches
  ) {
    return;
  }


  window.addEventListener(
    'mousemove',
    function (e) {

      glow.style.transform =
        'translate(' +
        e.clientX +
        'px,' +
        e.clientY +
        'px)';


      glow.classList.add('on');

    },
    {
      passive: true
    }
  );

}


/* =========================================================
   Photo load avvakapothe initials fallback chupinchu
   ========================================================= */
function setupPhotoFallback() {

  const img =
    document.querySelector(
      '.photo-frame img'
    );


  img.addEventListener(
    'error',
    function () {

      img.style.display = 'none';

    }
  );

}


/* =========================================================
   Contact form: validate chesi mail app lo open chestundi
   ========================================================= */
function setupContactForm() {

  const form =
    document.getElementById(
      'contactForm'
    );


  const status =
    document.getElementById(
      'formStatus'
    );


  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  function showError(
    field,
    message
  ) {

    document.getElementById(
      field.id + '-error'
    ).textContent = message;


    field.setAttribute(
      'aria-invalid',
      message
        ? 'true'
        : 'false'
    );

  }


  function validateField(field) {

    const value =
      field.value.trim();


    let message = '';


    if (!value) {

      message =
        'This field is required.';

    }


    else if (
      field.type === 'email' &&
      !emailPattern.test(value)
    ) {

      message =
        'Please enter a valid email address.';

    }


    else if (
      field.id === 'message' &&
      value.length < 10
    ) {

      message =
        'Message should be at least 10 characters.';

    }


    showError(
      field,
      message
    );


    return message === '';

  }


  const fields =
    Array.from(
      form.querySelectorAll(
        'input, textarea'
      )
    );


  // type chesetappudu error clear avvali
  fields.forEach(function (field) {

    field.addEventListener(
      'blur',
      function () {

        validateField(field);

      }
    );


    field.addEventListener(
      'input',
      function () {

        if (
          field.getAttribute(
            'aria-invalid'
          ) === 'true'
        ) {

          validateField(field);

        }

      }
    );

  });


  form.addEventListener(
    'submit',
    function (e) {

      e.preventDefault();


      status.className =
        'form-status';


      // anni fields validate cheyyali
      const results =
        fields.map(
          validateField
        );


      if (
        results.includes(false)
      ) {

        status.textContent =
          'Please fix the highlighted fields.';

        status.classList.add(
          'bad'
        );

        return;

      }


      const name =
        form.name.value.trim();


      const email =
        form.email.value.trim();


      const subject =
        form.subject.value.trim();


      const message =
        form.message.value.trim();


      const body =
        'Name: ' +
        name +
        '\nEmail: ' +
        email +
        '\n\n' +
        message;


      const mailto =
        'mailto:' +
        CONTACT_EMAIL +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body);


      window.location.href =
        mailto;


      status.textContent =
        'Thank you, ' +
        name +
        '! Your email app should open now.';


      status.classList.add(
        'ok'
      );


      form.reset();

    }
  );

}


/* =========================================================
   main(): anni setup functions ikkade call avutayi
   ========================================================= */
function main() {

  setupYear();

  setupTheme();

  setupMenu();

  setupScrollEffects();

  setupReveal();

  setupScrollSpy();

  setupTyped();

  setupRibbon();

  setupCursorGlow();

  setupPhotoFallback();

  setupContactForm();

}


document.addEventListener(
  'DOMContentLoaded',
  main
);