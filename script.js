/**
 * MATHESH - PERSONAL PROFILE PORTFOLIO
 * JAVASCRIPT MICRO-INTERACTIONS & iOS SYSTEM LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cinematic Liquid Curtain Loader
  const loader = document.getElementById('loader');
  const fillElem = document.getElementById('loaderFill');

  if (loader && fillElem) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        fillElem.style.width = '100%';

        // Smooth cinematic curtain lift
        setTimeout(() => {
          loader.classList.add('loaded');
          setTimeout(() => {
            loader.style.display = 'none';
          }, 900);
        }, 180);
      } else {
        fillElem.style.width = `${progress}%`;
      }
    }, 45);
  } else if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 900);
    }, 800);
  }

  // 2. iOS Floating Toast Notification System
  const toast = document.getElementById('iosToast');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 3. Smooth Navigation Scroll Handler for Bottom Dock
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Highlight active immediately
          dockItems.forEach((item) => item.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });

  // 4. One-Click Copy to Clipboard Handler
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied "${textToCopy}" to clipboard!`);
        
        btn.style.transform = 'scale(0.88)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 180);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }
    });
  });

  // 5. ScrollSpy for Bottom Dock Active States
  const sections = document.querySelectorAll('section.glass-card');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      dockItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('data-nav') === currentId);
      });
    }
  });

  // 6. Interactive 3D Liquid Tilt on Cards (Desktop Only)
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // 7. Interactive Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';

      if (!nameVal || !emailVal) {
        showToast('Please fill out all required fields.');
        return;
      }

      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span>Transmitting...</span>
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      `;
      submitBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.style.pointerEvents = 'auto';
        contactForm.reset();
        showToast(`Thank you ${nameVal}! Message received.`);
      }, 1200);
    });
  }
});
