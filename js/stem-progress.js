/**
 * Greenbees Studio — Left-Docked Stem Progress System
 * Draws continuous living stem SVG and unfurls leaves at section thresholds
 */

export function initStemProgress(lenisInstance) {
  const stemGrowPath = document.querySelector('.stem-grow-path');
  const nodeItems = document.querySelectorAll('.stem-node-item');
  
  if (!stemGrowPath || nodeItems.length === 0) return;

  // Initialize SVG path stroke-dasharray and dashoffset
  const pathLength = stemGrowPath.getTotalLength ? stemGrowPath.getTotalLength() : 800;
  stemGrowPath.style.strokeDasharray = `${pathLength}`;
  stemGrowPath.style.strokeDashoffset = `${pathLength}`;

  const sections = Array.from(nodeItems).map(item => {
    const targetSelector = item.getAttribute('data-target');
    const el = document.querySelector(targetSelector);
    return {
      node: item,
      targetEl: el,
      selector: targetSelector
    };
  }).filter(item => item.targetEl !== null);

  function updateStem() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;

    // Animate stem path draw
    const offset = pathLength * (1 - scrollProgress);
    stemGrowPath.style.strokeDashoffset = `${offset}`;

    // Determine active section based on middle of viewport
    const viewportMiddle = scrollTop + (window.innerHeight * 0.4);
    let activeIndex = 0;

    sections.forEach((item, index) => {
      const rect = item.targetEl.getBoundingClientRect();
      const topAbsolute = rect.top + scrollTop;
      const bottomAbsolute = topAbsolute + rect.height;

      const isPassed = viewportMiddle >= topAbsolute;
      const isCurrent = viewportMiddle >= topAbsolute && viewportMiddle < bottomAbsolute;

      if (isPassed) {
        item.node.classList.add('is-passed');
      } else {
        item.node.classList.remove('is-passed');
      }

      if (isCurrent) {
        activeIndex = index;
      }
    });

    // Mark current active node
    sections.forEach((item, index) => {
      if (index === activeIndex) {
        item.node.classList.add('is-active');
      } else {
        item.node.classList.remove('is-active');
      }
    });
  }

  // Hook into Lenis or window scroll
  if (lenisInstance) {
    lenisInstance.on('scroll', updateStem);
  } else {
    window.addEventListener('scroll', updateStem, { passive: true });
  }

  window.addEventListener('resize', updateStem, { passive: true });
  updateStem();

  // Interactive node clicks
  nodeItems.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSelector = node.getAttribute('data-target');
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, {
            offset: -20,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
