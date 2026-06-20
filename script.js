// Agencia GO — interactions

// FAQ: solo una pregunta abierta a la vez
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Smooth-scroll para todos los anchors internos (refuerza scroll-behavior CSS)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Nav adaptativo: cambia color según el bg de la sección visible detrás
const sectionsBg = [...document.querySelectorAll('[data-bg]')];
const navHeight = 80;

function updateNavTheme() {
  const checkY = window.scrollY + navHeight + 20;
  let activeBg = 'dark'; // default si nada matchea
  for (const s of sectionsBg) {
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    if (checkY >= top && checkY < bottom) {
      activeBg = s.dataset.bg;
      break;
    }
  }
  document.body.dataset.nav = activeBg;
}

window.addEventListener('scroll', updateNavTheme, { passive: true });
window.addEventListener('resize', updateNavTheme);
updateNavTheme();

// Entrance animation — rápida, sin stagger, dispara cuando entra al viewport
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -40px 0px', threshold: 0 });

document.querySelectorAll('.service-card, .case-card, .reel-card, .team-card, .process-card, .faq-item, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(14px)';
  el.style.transition = 'opacity .28s ease, transform .28s ease';
  io.observe(el);
});

const style = document.createElement('style');
style.textContent = '.in-view { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
