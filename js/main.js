document.documentElement.classList.add('js');

document.getElementById('year').textContent = new Date().getFullYear();

// Scrollspy — topbar nav ↔ bento tiles carry a data-section attribute
const navLinks = Array.from(document.querySelectorAll('#site-nav a'));
const spyTargets = Array.from(document.querySelectorAll('[data-section]'));

const setActive = (id) => {
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
};

if ('IntersectionObserver' in window && spyTargets.length){
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.dataset.section);
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  spyTargets.forEach(t => spy.observe(t));
}

// Reveal-on-scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length){
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => reveal.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
