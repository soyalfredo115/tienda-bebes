// Query helpers
const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => [...el.querySelectorAll(sel)];

// Numbers & currency (HNL - Honduras)
const fmt = new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL', maximumFractionDigits: 2 });
const formatMoney = (n) => fmt.format(n);

// Email validation
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

// Query params
const getParam = (name) => new URLSearchParams(location.search).get(name);

// ID helpers
const uid = (p='ps') => `${p}_${Math.random().toString(36).slice(2,9)}${Date.now().toString(36).slice(-4)}`;

// Simple toast
let toastTimer;
function toast(msg){
  clearTimeout(toastTimer);
  let t = qs('#app-toast');
  if(!t){
    t = document.createElement('div');
    t.id = 'app-toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.display = 'block';
  toastTimer = setTimeout(()=> t.style.display='none', 2200);
}

// Number clamp
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function launchConfetti(color = '#FFD700') {
  for (let i = 0; i < 12; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.style.backgroundColor = color;
    conf.style.left = 50 + (Math.random() * 20 - 10) + '%';
    conf.style.animation = `confettiFall 0.9s ease-out forwards`;
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 900);
  }
}