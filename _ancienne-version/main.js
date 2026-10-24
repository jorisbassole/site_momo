(function () {
  // Menu mobile
  var btn = document.querySelector('.w-nav-button');
  var menu = document.querySelector('.w-nav-menu');
  if (btn && menu) {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    btn.setAttribute('aria-expanded', 'false');
    var toggle = function (open) {
      open = typeof open === 'boolean' ? open : !menu.classList.contains('is-open');
      menu.classList.toggle('is-open', open);
      btn.classList.toggle('w--open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', function () { toggle(); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !btn.contains(e.target)) toggle(false);
    });
  }

  // Liens "#" vides : on évite le saut en haut de page
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  // Apparition au scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Formulaire de contact (Formspree ou tout endpoint acceptant du JSON)
  var form = document.querySelector('form#wf-form-contact-form');
  if (form) {
    var wrap = form.closest('.w-form');
    var done = wrap && wrap.querySelector('.w-form-done');
    var fail = wrap && wrap.querySelector('.w-form-fail');
    var submit = form.querySelector('[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (fail) fail.classList.remove('is-shown');
      var label = submit.value;
      submit.value = submit.getAttribute('data-wait') || 'Envoi…';
      submit.disabled = true;
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.style.display = 'none';
          if (done) done.classList.add('is-shown');
        })
        .catch(function () { if (fail) fail.classList.add('is-shown'); })
        .finally(function () { submit.value = label; submit.disabled = false; });
    });
  }
})();
