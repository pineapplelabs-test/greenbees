/**
 * GREENBEES — Botanical Flora Semi-Circle Arc Carousel
 * Smooth radial bottom-to-top orbital animation with split dual-side HUD.
 * Strictly zero-glow, zero-neon styling.
 */

const PLANTS_DATA = [
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    botanical: 'Sansevieria Trifasciata',
    category: 'Indestructible Oxygen Producer',
    image: './assets/images/plants/snake-plant.png',
    superpower: 'Absorbs formaldehyde, benzene, and trichloroethylene emitted by printers, carpets, and laminates. Releases pure oxygen through the night via CAM metabolism.',
    acoustic: 'Dense vertical spear foliage diffuses high-frequency keyboard & speech chatter.',
    idealZone: 'Executive Boardrooms, Windowless Cabins & Server Alcoves',
    luxLevel: '100 – 800 Lux (Flourishes under standard office LED/fluorescent fixtures)',
    watering: 'Every 14–21 Days (100% managed under Greenbees weekly Care Pass)',
    acResilience: '10/10 — Waxy fibrous cuticles withstand direct 18°C AC airflow',
    guarantee: '100% Free Immediate Swap Warranty',
    whatsappMsg: 'Hi Greenbees Team, I want to add Snake Plants to our Bangalore office layout.'
  },
  {
    id: 'money-plant',
    name: 'Money Plant',
    botanical: 'Epipremnum Aureum (Golden Pothos)',
    category: 'Workstation Stress & VOC Filter',
    image: './assets/images/plants/money-plant.png',
    superpower: 'Top-ranked NASA clean air study species. Actively neutralizes benzene, carbon monoxide, and volatile electronic synthetic fumes around monitor clusters.',
    acoustic: 'Cascading heart-shaped vines create soft, living green dividers between open desks.',
    idealZone: 'Workstation Dividers, Shelf Partitions & Collaborative Booths',
    luxLevel: '200 – 1,200 Lux (Thrives in ambient indoor office illumination)',
    watering: 'Weekly soil check & pruning by Greenbees certified specialists',
    acResilience: '9.2/10 — Retains vibrant variegated gold-green foliage in dry AC air',
    guarantee: 'Zero-cost replacement on foliage distress',
    whatsappMsg: 'Hi Greenbees Team, I want Golden Pothos Money Plants for our desk partitions.'
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    botanical: 'Zamioculcas Zamiifolia',
    category: 'Zero-Downtime Executive Flora',
    image: './assets/images/plants/zz-plant.png',
    superpower: 'High-gloss dark emerald leaflets act as a natural electrostatic dust magnet while removing airborne volatile solvents like xylene and toluene from indoor air.',
    acoustic: 'Sculptural upright zigzag stems create visual calm and reduce corridor noise.',
    idealZone: 'Client Reception, Windowless Corridors & Executive Suites',
    luxLevel: '75 – 600 Lux (Unmatched low-light tolerance in deep office cores)',
    watering: 'Every 18–25 Days (Potato-like underground rhizomes store moisture)',
    acResilience: '10/10 — Extreme drought and AC chill tolerance with zero leaf drop',
    guarantee: 'Guaranteed healthy replacement pass',
    whatsappMsg: 'Hi Greenbees Team, I am interested in ZZ Plants for our executive cabins.'
  },
  {
    id: 'monstera',
    name: 'Monstera Deliciosa',
    botanical: 'Monstera Deliciosa (Swiss Cheese)',
    category: 'Prestige Atrium & Acoustic Anchor',
    image: './assets/images/plants/monstera.png',
    superpower: 'Iconic broad split leaves physically absorb ambient acoustic flutter and echo in open-plan atriums and high-ceiling glass boardrooms.',
    acoustic: 'Large leaf surface area significantly dampens sound reflections across stone floors.',
    idealZone: 'Main Reception Atriums, Town Halls & CEO Welcome Lounges',
    luxLevel: '400 – 1,500 Lux (Filtered indirect natural daylight near glass facades)',
    watering: 'Weekly calibrated hydration + organic leaf polish by Greenbees',
    acResilience: '8.8/10 — Weekly misting maintains healthy tropical moisture balance',
    guarantee: '100% Free Replacement under Care Pass',
    whatsappMsg: 'Hi Greenbees Team, I want Monstera Deliciosa for our reception atrium.'
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    botanical: 'Dypsis Lutescens',
    category: 'Natural Workplace Humidifier',
    image: './assets/images/plants/areca-palm.png',
    superpower: 'Transpires up to 1 liter of natural clean humidity per 24 hours into dry chilled air-conditioned rooms, alleviating dry-eye strain and afternoon fatigue.',
    acoustic: 'Feathery arched fronds scatter acoustic vibrations in busy collaborative areas.',
    idealZone: 'Cafeterias, Wellness Rooms & Perimeter Glass Lounges',
    luxLevel: '500 – 2,000 Lux (Medium to bright diffused natural daylight)',
    watering: 'Twice-weekly deep hydration handled by Greenbees horticulturists',
    acResilience: '8.5/10 — Actively restores healthy humidity to dehumidified AC offices',
    guarantee: 'Zero-cost guaranteed swap for any frond yellowing',
    whatsappMsg: 'Hi Greenbees Team, I want Areca Palms to balance air humidity in our workspace.'
  }
];

class PlantArcCarousel {
  constructor() {
    this.currentIndex = 0;
    this.total = PLANTS_DATA.length;
    this.isAnimating = false;
    this.autoPlayInterval = null;

    this.arcElementsContainer = document.getElementById('plantArcElements');
    this.dotIndicators = document.getElementById('plantDotIndicators');
    this.prevBtn = document.getElementById('plantPrevBtn');
    this.nextBtn = document.getElementById('plantNextBtn');

    if (!this.arcElementsContainer) return;

    this.initDOM();
    this.bindEvents();
    this.render();
  }

  initDOM() {
    // 1. Create plant orbit elements
    this.arcElementsContainer.innerHTML = '';
    this.plantElements = [];

    PLANTS_DATA.forEach((plant, index) => {
      const el = document.createElement('div');
      el.className = 'plant-orbit-item';
      el.dataset.index = index;
      el.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" draggable="false" loading="lazy">
      `;
      el.addEventListener('click', () => {
        if (this.currentIndex !== index) {
          this.goTo(index);
        }
      });
      this.arcElementsContainer.appendChild(el);
      this.plantElements.push(el);
    });

    // 2. Create dot indicators
    if (this.dotIndicators) {
      this.dotIndicators.innerHTML = '';
      PLANTS_DATA.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `plant-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `View ${PLANTS_DATA[index].name}`);
        dot.addEventListener('click', () => this.goTo(index));
        this.dotIndicators.appendChild(dot);
      });
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard navigation when hovered or active
    window.addEventListener('keydown', (e) => {
      const section = document.getElementById('plants-collection');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        this.prev();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    this.arcElementsContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.arcElementsContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        this.next();
      } else if (touchEndX - touchStartX > 50) {
        this.prev();
      }
    }, { passive: true });
  }

  prev() {
    const nextIndex = (this.currentIndex - 1 + this.total) % this.total;
    this.goTo(nextIndex);
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.total;
    this.goTo(nextIndex);
  }

  goTo(index) {
    if (this.isAnimating && this.currentIndex === index) return;
    this.currentIndex = index;
    this.render();
  }

  render() {
    // Mathematical Big Semi-Circle Arc Transform (Bottom to Top Curve)
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1150;

    const scaleApex = isMobile ? 1.0 : 1.15;
    const scaleFlank1 = isMobile ? 0.62 : 0.72;
    const scaleFlank2 = isMobile ? 0.42 : 0.52;

    const xFlank1 = isMobile ? 140 : (isTablet ? 190 : 280);
    const xFlank2 = isMobile ? 240 : (isTablet ? 330 : 490);

    const yFlank1 = isMobile ? 55 : 85;
    const yFlank2 = isMobile ? 130 : 210;

    this.plantElements.forEach((el, index) => {
      // Calculate shortest offset in modular ring
      let offset = index - this.currentIndex;
      if (offset > this.total / 2) offset -= this.total;
      if (offset < -this.total / 2) offset += this.total;

      let tx = 0;
      let ty = 0;
      let scale = 1;
      let opacity = 1;
      let zIndex = 5;
      let filter = 'none';

      if (offset === 0) {
        // Center Apex: Top Center (Comes to Front Big)
        tx = 0;
        ty = 0;
        scale = scaleApex;
        opacity = 1;
        zIndex = 10;
        filter = 'drop-shadow(0 20px 32px rgba(0, 0, 0, 0.16))';
      } else if (offset === -1) {
        // Left Flank 1 (climbing up towards apex)
        tx = -xFlank1;
        ty = yFlank1;
        scale = scaleFlank1;
        opacity = 0.50;
        zIndex = 6;
        filter = 'grayscale(15%) drop-shadow(0 10px 18px rgba(0, 0, 0, 0.10))';
      } else if (offset === 1) {
        // Right Flank 1 (descending down from apex)
        tx = xFlank1;
        ty = yFlank1;
        scale = scaleFlank1;
        opacity = 0.50;
        zIndex = 6;
        filter = 'grayscale(15%) drop-shadow(0 10px 18px rgba(0, 0, 0, 0.10))';
      } else if (offset === -2) {
        // Left Flank 2 (bottom left base of big arc)
        tx = -xFlank2;
        ty = yFlank2;
        scale = scaleFlank2;
        opacity = 0.22;
        zIndex = 3;
        filter = 'grayscale(35%) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08))';
      } else if (offset === 2) {
        // Right Flank 2 (bottom right base of big arc)
        tx = xFlank2;
        ty = yFlank2;
        scale = scaleFlank2;
        opacity = 0.22;
        zIndex = 3;
        filter = 'grayscale(35%) drop-shadow(0 6px 12px rgba(0, 0, 0, 0.08))';
      } else {
        // Hidden items
        tx = offset < 0 ? -550 : 550;
        ty = 260;
        scale = 0.3;
        opacity = 0;
        zIndex = 1;
      }

      el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
      el.style.opacity = opacity;
      el.style.zIndex = zIndex;
      const img = el.querySelector('img');
      if (img) {
        img.style.filter = filter;
      }
    });

    // 4. Update Indicators
    if (this.dotIndicators) {
      const dots = this.dotIndicators.querySelectorAll('.plant-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
  }
}

// Navbar scroll listener for smooth dark-to-light header switch
function initNavbarScroll() {
  const nav = document.querySelector('.glass-nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PlantArcCarousel();
    initNavbarScroll();
  });
} else {
  new PlantArcCarousel();
  initNavbarScroll();
}
