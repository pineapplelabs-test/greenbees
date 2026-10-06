/**
 * Greenbees Studio — Restrained Botanical Particle Drift
 * Extremely subtle floating leaf drift (<15% opacity) that parallaxes with mouse movement
 */

export function initCursorDrift() {
  // Respect reduced motion & touch screens
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const container = document.createElement('div');
  container.className = 'cursor-drift-container';
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 10;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  const particleCount = 5;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    el.className = 'drift-particle';
    el.style.cssText = `
      position: absolute;
      width: 18px;
      height: 12px;
      opacity: ${0.05 + Math.random() * 0.08}; /* Strictly < 15% opacity */
      transform: translate3d(0, 0, 0);
      will-change: transform;
      transition: transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1);
    `;

    el.innerHTML = `
      <svg viewBox="0 0 24 16" width="100%" height="100%">
        <path d="M0,8 C12,0 20,4 24,0 C20,12 12,16 0,8 Z" fill="#1A472E" />
      </svg>
    `;

    container.appendChild(el);

    particles.push({
      el,
      baseX: (window.innerWidth / (particleCount + 1)) * (i + 1) + (Math.random() * 100 - 50),
      baseY: Math.random() * window.innerHeight,
      speed: 0.015 + (i * 0.008),
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.5
    });
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animate() {
    particles.forEach((p) => {
      const deltaX = (mouseX - window.innerWidth / 2) * p.speed;
      const deltaY = (mouseY - window.innerHeight / 2) * p.speed;

      p.rotation += p.rotSpeed;
      const posX = p.baseX + deltaX;
      const posY = p.baseY + deltaY;

      p.el.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${p.rotation}deg)`;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
