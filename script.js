const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

document.getElementById('year')?.append(new Date().getFullYear());

const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
  themeToggle.textContent = current === 'dark' ? '☀' : '☾';
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

// TÜV checklist project
const checks = document.querySelectorAll('[data-check]');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
function updateChecklist() {
  if (!checks.length || !progressBar || !progressText) return;
  const done = [...checks].filter(item => item.checked).length;
  const percent = Math.round((done / checks.length) * 100);
  progressBar.style.width = percent + '%';
  progressText.textContent = `${done}/${checks.length} checks completed (${percent}%)`;
}
checks.forEach(check => check.addEventListener('change', updateChecklist));
updateChecklist();

// Fuel calculator project
const fuelForm = document.getElementById('fuelForm');
fuelForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const distance = Number(document.getElementById('distance').value);
  const consumption = Number(document.getElementById('consumption').value);
  const price = Number(document.getElementById('price').value);
  const result = document.getElementById('fuelResult');
  if (!distance || !consumption || !price) {
    result.textContent = 'Please fill in all fields with valid numbers.';
    return;
  }
  const liters = (distance / 100) * consumption;
  const cost = liters * price;
  result.textContent = `Estimated fuel needed: ${liters.toFixed(2)} L • Estimated cost: €${cost.toFixed(2)}`;
});

// Football tracker project
const matchForm = document.getElementById('matchForm');
const matchList = document.getElementById('matchList');
matchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const home = document.getElementById('homeTeam').value.trim();
  const away = document.getElementById('awayTeam').value.trim();
  const score = document.getElementById('score').value.trim();
  if (!home || !away || !score) return;
  const div = document.createElement('div');
  div.className = 'match';
  div.innerHTML = `<strong>${home}</strong><span class="score">${score}</span><strong>${away}</strong>`;
  matchList.prepend(div);
  matchForm.reset();
});
