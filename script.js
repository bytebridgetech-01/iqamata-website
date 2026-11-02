// ==========================================
// iQamata LiKhaya NPO - Main Interactive Script
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking any mobile nav link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Animated Stat Counters on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const speed = target / 50; // animation speed

      function updateCount() {
        count += speed;
        if (count < target) {
          stat.textContent = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          stat.textContent = target;
        }
      }
      updateCount();
    });
  }

  window.addEventListener('scroll', function () {
    const impactSection = document.getElementById('impact');
    if (impactSection) {
      const rect = impactSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && !animated) {
        runCounters();
        animated = true;
      }
    }
  });

  // 3. Homepage Contact Form Validation & AJAX Simulation
  const homeContactForm = document.getElementById('contact-form');
  if (homeContactForm) {
    homeContactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const statusBox = document.getElementById('form-status');
      if (statusBox) {
        statusBox.classList.remove('hidden');
        homeContactForm.reset();
        
        setTimeout(() => {
          statusBox.classList.add('hidden');
        }, 5000);
      }
    });
  }

  // 4. Dynamic Lightbox Modal for Images
  // Creates a lightbox popup dynamically when any image in program cards or team is clicked
  const images = document.querySelectorAll('section img');
  
  // Create lightbox container element
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox-modal';
  lightbox.className = 'fixed inset-0 z-50 bg-black/80 hidden items-center justify-center p-4';
  lightbox.innerHTML = `
    <div class="relative max-w-3xl w-full bg-[#F5F2EB] p-4 rounded-3xl overflow-hidden shadow-2xl text-center">
      <button id="lightbox-close" class="absolute top-4 right-4 text-xl font-bold bg-[#2C3531] text-white w-10 h-10 rounded-full hover:bg-[#4A5D4E] transition-colors">&times;</button>
      <img id="lightbox-img" src="" alt="Enlarged View" class="w-full max-h-[70vh] object-contain rounded-2xl mx-auto mb-4"/>
      <p id="lightbox-caption" class="text-xs font-semibold text-[#2C3531] uppercase tracking-wider"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  images.forEach(img => {
    // Skip small logo in nav
    if (img.classList.contains('w-10')) return;

    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = img.alt || 'iQamata LiKhaya NPO Asset';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    });
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    }
  });

});