/* ==========================================================================
   Cyberpunk & Neon Portfolio Interactive Engine
   Author: Elmir.dev
   Logic Systems: Scroll reveals, typing nodes, dynamic modals, data filtering
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Typing Animation Engine ---
  const typingTextElement = document.getElementById('typing-text');
  const words = [
    "Creative Software Developer",
    "UI/UX Visual Architect",
    "Frontend Tech Engineer",
    "Cyberpunk Visual Enthusiast"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50; // Speed up deletion
    } else {
      typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingDelay = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingDelay);
  }

  if (typingTextElement) {
    typeEffect();
  }


  // --- 2. Mobile Responsive Navigation Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navItems = navLinks.querySelectorAll('a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close mobile menu when links are clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }


  // --- 3. Scroll Reveal System (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // --- 4. Tab Switcher (About & Skills) ---
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Deactivate all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate clicked button and target content
      button.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });


  // --- 5. Portfolio Filtering Engine ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Toggle active filter button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          // Fade-in effect
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Fade-out effect
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // --- 6. Detailed Project Database & Modal Engine ---
  const projectData = {
    'project-1': {
      title: "AetherEngine Synthesizer",
      category: "Web Apps",
      tags: ["HTML5/CSS3", "Web Audio API", "JS"],
      architecture: "Native Audio Context Nodes",
      role: "Audio Algorithm & UI Motion Developer",
      desc: "AetherEngine is a web-based procedural synthesizer and oscilloscope. It uses native Web Audio API oscillators, gain, and delay nodes to synthesize real-time synth ambient textures. The companion UI renders glowing responsive custom canvas lines matched precisely to the frequency domain of the generated audio wave, wrapping it in a stunning dark neon wrapper.",
      svgMockup: `
        <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
          <rect width="800" height="450" fill="hsl(245, 25%, 5%)" />
          <g opacity="0.3">
            <line x1="0" y1="50" x2="800" y2="50" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="250" x2="800" y2="250" stroke="rgba(255,255,255,0.05)" />
            <line x1="0" y1="350" x2="800" y2="350" stroke="rgba(255,255,255,0.05)" />
          </g>
          <!-- Neon Soundwaves -->
          <path d="M 50 225 Q 150 50 250 350 T 450 150 T 650 300 T 750 225" fill="none" stroke="hsl(188, 100%, 50%)" stroke-width="4" filter="drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))" />
          <path d="M 50 225 Q 150 120 250 280 T 450 180 T 650 260 T 750 225" fill="none" stroke="hsl(275, 100%, 65%)" stroke-width="2" filter="drop-shadow(0 0 10px rgba(188, 0, 255, 0.3))" />
          <path d="M 50 225 Q 150 190 250 240 T 450 210 T 650 230 T 750 225" fill="none" stroke="hsl(325, 100%, 60%)" stroke-width="1" />
          <!-- Interface Grid dots -->
          <circle cx="250" cy="350" r="6" fill="hsl(188, 100%, 50%)" />
          <circle cx="450" cy="150" r="6" fill="hsl(325, 100%, 60%)" />
        </svg>
      `,
      liveLink: "#"
    },
    'project-2': {
      title: "NeuroNet AI Dashboard",
      category: "Web Apps",
      tags: ["Next.js", "CSS Grid", "Glassmorphic UI"],
      architecture: "React Hook States & API Streaming",
      role: "Lead Interface Architect",
      desc: "NeuroNet is a state-of-the-art interactive control center designed for orchestrating decentralized artificial intelligence computational models. The user interface features lightweight responsive grid maps, real-time data metrics, glassmorphic layout wrappers that blur background grid layers, and sleek interactive HSL gradients that adapt actively to the CPU load levels of the network nodes.",
      svgMockup: `
        <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
          <rect width="800" height="450" fill="hsl(245, 25%, 5%)" />
          <!-- Neon grid connections -->
          <g opacity="0.4">
            <circle cx="200" cy="150" r="8" fill="none" stroke="hsl(325, 100%, 60%)" stroke-width="2" />
            <circle cx="200" cy="150" r="3" fill="hsl(325, 100%, 60%)" />
            <circle cx="600" cy="150" r="8" fill="none" stroke="hsl(188, 100%, 50%)" stroke-width="2" />
            <circle cx="600" cy="150" r="3" fill="hsl(188, 100%, 50%)" />
            <circle cx="400" cy="300" r="12" fill="none" stroke="hsl(275, 100%, 65%)" stroke-width="2" />
            <circle cx="400" cy="300" r="6" fill="hsl(275, 100%, 65%)" />
            
            <line x1="208" y1="150" x2="388" y2="295" stroke="hsl(325, 100%, 60%)" stroke-width="1.5" stroke-dasharray="5 5" />
            <line x1="592" y1="150" x2="412" y2="295" stroke="hsl(188, 100%, 50%)" stroke-width="1.5" stroke-dasharray="5 5" />
          </g>
          <!-- UI Frame -->
          <rect x="50" y="50" width="700" height="350" rx="12" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
          <line x1="50" y1="90" x2="750" y2="90" stroke="rgba(255,255,255,0.06)" />
          <circle cx="75" cy="70" r="5" fill="#ff5f56" />
          <circle cx="95" cy="70" r="5" fill="#ffbd2e" />
          <circle cx="115" cy="70" r="5" fill="#27c93f" />
        </svg>
      `,
      liveLink: "#"
    },
    'project-3': {
      title: "Vortex Encrypted Mobile UI",
      category: "UI/UX Design",
      tags: ["Figma", "UI/UX", "Cyber-crypt"],
      architecture: "Adaptive Visual Token System",
      role: "Lead Mobile Product Designer",
      desc: "Vortex is an ultra-secure communication suite interface. The concept utilizes cyber neon pink structural outlines, deep radial lighting circles, and rich transparent overlays to build a powerful user feeling of security and data privacy. It comprises full contact chat rooms, encrypted folder interfaces, instant private payload transmissions, and dynamic micro-animations for lock confirmations.",
      svgMockup: `
        <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
          <rect width="800" height="450" fill="hsl(245, 25%, 5%)" />
          <g transform="translate(300, 25)">
            <!-- Mobile Frame -->
            <rect x="0" y="0" width="200" height="400" rx="28" fill="rgba(13, 11, 26, 0.9)" stroke="hsl(188, 100%, 50%)" stroke-width="3" filter="drop-shadow(0 0 20px rgba(0, 240, 255, 0.2))" />
            <!-- Camera Notch -->
            <rect x="65" y="10" width="70" height="15" rx="7.5" fill="#080710" />
            <!-- UI nodes -->
            <circle cx="100" cy="180" r="40" fill="none" stroke="hsl(325, 100%, 60%)" stroke-width="2" />
            <circle cx="100" cy="180" r="30" fill="rgba(255,0,128,0.1)" />
            <path d="M 90 185 L 97 175 L 110 180" fill="none" stroke="hsl(325, 100%, 60%)" stroke-width="3" stroke-linecap="round" />
          </g>
        </svg>
      `,
      liveLink: "#"
    }
  };

  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalCloseAction = document.getElementById('modalCloseAction');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalArch = document.getElementById('modalArch');
  const modalRole = document.getElementById('modalRole');
  const modalLiveLink = document.getElementById('modalLiveLink');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    // Inject data
    modalImage.innerHTML = data.svgMockup;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalArch.textContent = data.architecture;
    modalRole.textContent = data.role;
    modalLiveLink.href = data.liveLink;

    // Inject tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'project-tag';
      tagSpan.textContent = tag;
      modalTags.appendChild(tagSpan);
    });

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
  }

  // Hook up event listeners for card view triggers
  const viewButtons = document.querySelectorAll('.btn-project-view');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

  // Close modal when clicking on the overlay background
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });


  // --- 7. Cyber Contact Form Transmission ---
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const userName = document.getElementById('userName').value;
      
      // Create Cyberpunk success notification overlay dynamically
      const successOverlay = document.createElement('div');
      successOverlay.style.position = 'fixed';
      successOverlay.style.top = '0';
      successOverlay.style.left = '0';
      successOverlay.style.width = '100%';
      successOverlay.style.height = '100%';
      successOverlay.style.background = 'rgba(5, 4, 10, 0.95)';
      successOverlay.style.zIndex = '300';
      successOverlay.style.display = 'flex';
      successOverlay.style.alignItems = 'center';
      successOverlay.style.justifyContent = 'center';
      successOverlay.style.flexDirection = 'column';
      successOverlay.style.color = 'var(--text-primary)';
      successOverlay.style.fontFamily = 'var(--font-heading)';
      successOverlay.style.backdropFilter = 'blur(10px)';
      
      successOverlay.innerHTML = `
        <div style="
          background: var(--bg-card); 
          border: 1px solid var(--neon-purple); 
          box-shadow: 0 0 30px var(--neon-purple-glow); 
          padding: 3rem; 
          border-radius: 16px; 
          max-width: 500px; 
          text-align: center;
        ">
          <div style="
            width: 70px; 
            height: 70px; 
            background: rgba(0, 240, 255, 0.1); 
            border: 2px solid var(--neon-blue); 
            border-radius: 50%; 
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            margin-bottom: 1.5rem;
            color: var(--neon-blue);
            font-size: 2rem;
            box-shadow: 0 0 15px var(--neon-blue-glow);
          ">✓</div>
          <h3 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-primary);">
            TRANSMISSION SECURED
          </h3>
          <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 2rem; line-height: 1.6;">
            Identity verified: <strong style="color: var(--neon-purple);">${userName}</strong>.<br>
            Message payload successfully packetized and sent. Elmir will decode your request shortly.
          </p>
          <button id="closeSuccessBtn" class="btn-primary" style="padding: 0.8rem 2rem; font-size: 0.95rem; width: 100%; justify-content: center;">
            Close Channel
          </button>
        </div>
      `;
      
      document.body.appendChild(successOverlay);
      
      // Close success notification action
      const closeSuccessBtn = document.getElementById('closeSuccessBtn');
      closeSuccessBtn.addEventListener('click', () => {
        successOverlay.remove();
        contactForm.reset();
      });
    });
  }


  // --- 8. Dynamic Header Navigation Blur & Shrink ---
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinksList = document.querySelectorAll('.nav-links a:not(.btn-contact-nav)');

  window.addEventListener('scroll', () => {
    // Header styling on scroll
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.background = 'rgba(8, 7, 16, 0.85)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      header.style.padding = '0';
      header.style.background = 'rgba(8, 7, 16, 0.7)';
      header.style.boxShadow = 'none';
    }

    // Active link highlighting on scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 180)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

});
