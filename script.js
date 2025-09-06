// ===== GLOBAL VARIABLES =====
let isLoading = true;
let currentTheme = 'dark';
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== CONFIGURATION =====
const config = {
  typingSpeed: 100,
  deletingSpeed: 50,
  delayBetweenWords: 2000,
  particleCount: 50,
  scrollThreshold: 100
};

// ===== TYPING ANIMATION =====
const typingTexts = [
  'Desenvolvedor Iniciante',
  'Contador',
  'Músico instrumentista',
  'Criador de Soluções'
];

// ===== DOM ELEMENTS =====
const elements = {
  loadingScreen: document.getElementById('loading-screen'),
  navbar: document.getElementById('navbar'),
  navToggle: document.getElementById('nav-toggle'),
  navMenu: document.getElementById('nav-menu'),
  themeToggle: document.getElementById('theme-toggle'),
  typingText: document.getElementById('typing-text'),
  scrollProgressBar: document.querySelector('.scroll-progress-bar'),
  backToTop: document.getElementById('back-to-top'),
  contactForm: document.getElementById('contact-form'),
  particles: document.getElementById('particles'),
  cursor: document.querySelector('.cursor'),
  cursorFollower: document.querySelector('.cursor-follower')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize all components
  handleLoading();
  initializeNavigation();
  initializeTheme();
  initializeTypingAnimation();
  initializeScrollEffects();
  initializeParticles();
  initializeAnimations();
  initializeCustomCursor();
  initializeContactForm();
  initializeCounters();
  initializeSkillBars();
  
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
  });
}

// ===== LOADING SCREEN =====
function handleLoading() {
  const loaderProgress = document.querySelector('.loader-progress');
  
  // Simulate loading progress
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      setTimeout(() => {
        elements.loadingScreen.style.opacity = '0';
        setTimeout(() => {
          elements.loadingScreen.style.display = 'none';
          isLoading = false;
          document.body.style.overflow = 'visible';
        }, 500);
      }, 500);
    }
    
    loaderProgress.style.width = `${progress}%`;
  }, 100);
}

// ===== NAVIGATION =====
function initializeNavigation() {
  // Mobile menu toggle
  elements.navToggle.addEventListener('click', () => {
    elements.navMenu.classList.toggle('active');
    elements.navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      elements.navMenu.classList.remove('active');
      elements.navToggle.classList.remove('active');
    });
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation highlighting
  window.addEventListener('scroll', updateActiveNavigation);
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== THEME TOGGLE =====
function initializeTheme() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
  }

  elements.themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = elements.themeToggle.querySelector('i');
  icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== TYPING ANIMATION =====
function initializeTypingAnimation() {
  if (!elements.typingText) return;
  
  typeText();
}

function typeText() {
  const currentText = typingTexts[typingIndex];
  
  if (isDeleting) {
    elements.typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    elements.typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? config.deletingSpeed : config.typingSpeed;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = config.delayBetweenWords;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typingTexts.length;
  }

  setTimeout(typeText, typeSpeed);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  window.addEventListener('scroll', handleScroll);
  elements.backToTop.addEventListener('click', scrollToTop);
}

function handleScroll() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  // Update scroll progress bar
  elements.scrollProgressBar.style.width = `${scrollPercent}%`;

  // Update navbar background
  if (scrollTop > config.scrollThreshold) {
    elements.navbar.classList.add('scrolled');
    elements.backToTop.classList.add('visible');
  } else {
    elements.navbar.classList.remove('scrolled');
    elements.backToTop.classList.remove('visible');
  }

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    const parallaxSpeed = scrollTop * 0.5;
    hero.style.transform = `translateY(${parallaxSpeed}px)`;
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===== PARTICLES ANIMATION =====
function initializeParticles() {
  if (!elements.particles) return;

  for (let i = 0; i < config.particleCount; i++) {
    createParticle();
  }
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;

  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}%;
    top: ${y}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;

  elements.particles.appendChild(particle);
}

// ===== CUSTOM CURSOR =====
function initializeCustomCursor() {
  if (!elements.cursor || !elements.cursorFollower) return;

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    elements.cursor.style.left = `${mouseX}px`;
    elements.cursor.style.top = `${mouseY}px`;
    elements.cursorFollower.style.left = `${cursorX}px`;
    elements.cursorFollower.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      elements.cursor.style.transform = 'scale(1.5)';
      elements.cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
      elements.cursor.style.transform = 'scale(1)';
      elements.cursorFollower.style.transform = 'scale(1)';
    });
  });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.skill-progress, .stat-number').forEach(el => {
    observer.observe(el);
  });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  if (!elements.contactForm) return;

  elements.contactForm.addEventListener('submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(elements.contactForm);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  try {
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    showNotification('Mensagem enviada com sucesso!', 'success');
    elements.contactForm.reset();
  } catch (error) {
    // Show error message
    showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 100);

  // Remove notification
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== COUNTERS ANIMATION =====
function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Optimize scroll events
window.addEventListener('scroll', throttle(handleScroll, 16));

// Preload critical images
function preloadImages() {
  const images = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=600&fit=crop'
  ];

  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== ACCESSIBILITY =====
// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition-fast', '0s');
  document.documentElement.style.setProperty('--transition-normal', '0s');
  document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===== ADDITIONAL STYLES FOR NOTIFICATIONS =====
const notificationStyles = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    border: 1px solid var(--bg-tertiary);
    box-shadow: var(--shadow-xl);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: var(--z-modal);
    max-width: 300px;
  }

  .notification.show {
    transform: translateX(0);
  }

  .notification-success {
    border-left: 4px solid var(--success-color);
  }

  .notification-error {
    border-left: 4px solid var(--error-color);
  }

  .notification i {
    font-size: 1.25rem;
  }

  .notification-success i {
    color: var(--success-color);
  }

  .notification-error i {
    color: var(--error-color);
  }

  .keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color) !important;
    outline-offset: 2px !important;
  }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// ===== INITIALIZE PRELOADING =====
preloadImages();

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    toggleTheme,
    showNotification,
    animateCounter
  };
}

