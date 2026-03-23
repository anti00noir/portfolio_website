/* Theme Toggle */
const root = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
  root.setAttribute('data-theme', root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

/* Hamburger Menu */
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('nav-drawer');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});
function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
}
window.closeDrawer = closeDrawer;

/* Active Nav Link on Scroll */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('#nav-links a');
function updateNav() {
  let id = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 90) id = s.id; });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* Reveal Animation on Scroll */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = [...e.target.parentElement.children].indexOf(e.target);
      setTimeout(() => e.target.classList.add('in-view'), i * 60);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Terminal Animation */
const lines = [
  '<span class="t-prompt">$</span> <span class="t-cmd">whoami</span>',
  '<span class="t-value">kabelo_rabalao</span>',
  '',
  '<span class="t-prompt">$</span> <span class="t-cmd">cat</span> <span class="t-string">profile.json</span>',
  '{',
  '&nbsp;&nbsp;<span class="t-key">"role"</span>: <span class="t-string">"Software Eng. Student"</span>,',
  '&nbsp;&nbsp;<span class="t-key">"focus"</span>: <span class="t-string">"Game &amp; Systems Dev"</span>,',
  '&nbsp;&nbsp;<span class="t-key">"stack"</span>: [<span class="t-string">"Python"</span>, <span class="t-string">"Java"</span>, <span class="t-string">"C"</span>],',
  '&nbsp;&nbsp;<span class="t-key">"status"</span>: <span class="t-string">"Open to work 🚀"</span>',
  '}',
  '',
  '<span class="t-prompt">$</span> <span class="t-cmd">git log</span> <span class="t-comment">--oneline</span>',
  '<span class="t-value">a3f2b1c</span> feat: multithreaded TCP robot server',
  '<span class="t-value">d91e0fa</span> fix: prevent double-booking race condition',
  '<span class="t-value">7bc44d2</span> feat: JSON protocol + zero-knowledge client',
  '',
  '<span class="t-prompt">$</span> <span class="t-cmd">echo</span> <span class="t-string">"Let\'s build something great."</span>',
  "<span class=\"t-value\">Let's build something great.</span>",
  '<span class="t-prompt">$</span> <span class="cursor"></span>'
];
const tb = document.getElementById('terminal-body');
(async () => {
  await new Promise(r => setTimeout(r, 600));
  for (const line of lines) {
    const el = document.createElement('span');
    el.className = 'terminal-line';
    el.innerHTML = line || '&nbsp;';
    tb.appendChild(el);
    await new Promise(r => setTimeout(r, line ? 80 : 35));
    el.classList.add('visible');
    tb.scrollTop = tb.scrollHeight;
  }
})();

/* Footer Year */
document.getElementById('year').textContent = new Date().getFullYear();