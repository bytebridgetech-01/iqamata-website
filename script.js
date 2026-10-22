document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Animated Stat Counters for Impact Section
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let current = 0;
      const increment = Math.ceil(target / 40);

      const updateCount = () => {
        current += increment;
        if (current < target) {
          stat.innerText = current;
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Trigger Stat Counter Animation when Scrolled Into View
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateStats();
        animated = true;
      }
    });
  }, { threshold: 0.5 });

  const impactSection = document.getElementById('impact');
  if (impactSection) {
    observer.observe(impactSection);
  }

  // Interactive Contact Form Feedback
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      formStatus.classList.remove('hidden');
      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    });
  }
});