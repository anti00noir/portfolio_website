document.documentElement.classList.add('js');

document.getElementById('year').textContent = new Date().getFullYear();

// Scrollspy for both sidebar nav and mobile nav
const sideLinks = Array.from(document.querySelectorAll('#side-nav a'));
const mobileLinks = Array.from(document.querySelectorAll('#mobile-nav a'));
const sections = ['about','education','skills','projects','contact']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setActive = (id) => {
  [...sideLinks, ...mobileLinks].forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
};

if ('IntersectionObserver' in window && sections.length){
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => spy.observe(sec));
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
  }, { threshold: 0.15 });
  revealEls.forEach(el => reveal.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}