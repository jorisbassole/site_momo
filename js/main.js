(function () {
  // Menu mobile
  var burger = document.querySelector('.burger');
  var links = document.getElementById('menu');
  function setMenu(open) {
    links.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  }
  if (burger && links) {
    burger.addEventListener('click', function () { setMenu(!links.classList.contains('is-open')); });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  // Apparition au scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('is-visible'); }); }

  // Formulaire (FormSubmit)
  var form = document.getElementById('contact-form');
  if (form) {
    var ok = document.getElementById('form-ok'), err = document.getElementById('form-err');
    var btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      ok.classList.remove('is-shown'); err.classList.remove('is-shown');
      btn.disabled = true; var label = btn.textContent; btn.textContent = 'Envoi en cours…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); ok.classList.add('is-shown'); })
        .catch(function () { err.classList.add('is-shown'); })
        .finally(function () { btn.disabled = false; btn.textContent = label; });
    });
  }

  document.getElementById('annee').textContent = new Date().getFullYear();
})();
