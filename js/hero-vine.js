/**
 * Greenbees Studio — Hero Vine Growth Engine
 * Drives organic SVG tendrils across viewport towards nav driven strictly by scroll
 */

export function initHeroVine() {
  const heroSection = document.querySelector('#seed');
  const mainVinePath = document.querySelector('#heroMainVine');
  const tendrilPaths = document.querySelectorAll('.vine-tendril-path');
  const vineLeaves = document.querySelectorAll('.vine-leaf-group');

  if (!heroSection || !mainVinePath) return;

  // Measure path lengths
  const mainLength = mainVinePath.getTotalLength();
  mainVinePath.style.strokeDasharray = `${mainLength}`;
  mainVinePath.style.strokeDashoffset = `${mainLength}`;

  const tendrilLengths = Array.from(tendrilPaths).map(t => {
    const len = t.getTotalLength();
    t.style.strokeDasharray = `${len}`;
    t.style.strokeDashoffset = `${len}`;
    return len;
  });

  function renderVineGrowth() {
    const rect = heroSection.getBoundingClientRect();
    const heroHeight = rect.height || window.innerHeight;
    
    // Growth ratio: 0 at top of hero, 1 when hero has scrolled roughly 70%
    const progress = Math.min(1, Math.max(0, -rect.top / (heroHeight * 0.75)));

    // Main vine draws from bottom-left toward top-right/nav
    const mainOffset = mainLength * (1 - progress);
    mainVinePath.style.strokeDashoffset = `${mainOffset}`;

    // Secondary tendrils branch out as progress exceeds 25%
    tendrilPaths.forEach((tendril, idx) => {
      const startThreshold = 0.2 + (idx * 0.15);
      const tendrilProgress = Math.min(1, Math.max(0, (progress - startThreshold) / (1 - startThreshold)));
      const offset = tendrilLengths[idx] * (1 - tendrilProgress);
      tendril.style.strokeDashoffset = `${offset}`;
    });

    // Leaves sprout along the vine sequentially
    vineLeaves.forEach((leaf, idx) => {
      const sproutThreshold = 0.15 + (idx * 0.12);
      if (progress >= sproutThreshold) {
        leaf.classList.add('is-grown');
      } else {
        leaf.classList.remove('is-grown');
      }
    });
  }

  window.addEventListener('scroll', renderVineGrowth, { passive: true });
  renderVineGrowth();
}
