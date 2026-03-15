// Dark/Light Mode Toggle with Persistence
const darkModeBtn = document.getElementById('dark-mode-toggle');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on page load
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  darkModeBtn.textContent = '🌙';
} else {
  document.body.classList.remove('dark');
  darkModeBtn.textContent = '☀️';
}

// Toggle theme on button click
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  // Update button icon
  const isDark = document.body.classList.contains('dark');
  darkModeBtn.textContent = isDark ? '🌙' : '☀️';
  
  // Save theme preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scrolling - only for internal links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// EmailJS Configuration
// Initialize EmailJS with your Public Key
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
})();

// Contact form with EmailJS
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  
  // Get form button and success message
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMessage = document.getElementById('success-message');
  const originalBtnText = btnText.textContent;
  
  // Hide success message if visible
  successMessage.classList.remove('show');
  
  // Show loading state
  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Send email using EmailJS
  emailjs.sendForm(
    'YOUR_SERVICE_ID',      // Replace with your EmailJS Service ID
    'YOUR_TEMPLATE_ID',     // Replace with your EmailJS Template ID
    e.target
  )
  .then(() => {
    // Success
    btnText.textContent = originalBtnText;
    submitBtn.disabled = false;
    
    // Show success message
    successMessage.classList.add('show');
    
    // Clear the form
    e.target.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 5000);
  })
  .catch((error) => {
    // Error
    console.error('EmailJS Error:', error);
    alert('Failed to send message. Please try again or contact me directly at sshandilya2304@gmail.com');
    btnText.textContent = originalBtnText;
    submitBtn.disabled = false;
  });
});

// Scroll animations and section highlight
const scrollElements = document.querySelectorAll('.scroll-animation');
const scrollChildElements = document.querySelectorAll('.skills-list li, .project-card');
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

const elementInView = (el, dividend = 1) =>
  el.getBoundingClientRect().top <= window.innerHeight / dividend;

const displayScrollElement = el => el.classList.add('active');
const hideScrollElement = el => el.classList.remove('active');

const handleScrollAnimations = () => {
  // Animate sections
  scrollElements.forEach(el => {
    elementInView(el, 1.25) ? displayScrollElement(el) : hideScrollElement(el);
  });

  // Animate child elements (skills & projects)
  scrollChildElements.forEach(el => {
    if (elementInView(el, 1.25)) displayScrollElement(el);
  });

  // Highlight current section in navbar
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLi.forEach(li => {
    li.classList.remove('active-link');
    if (li.getAttribute('href') === `#${current}`) {
      li.classList.add('active-link');
    }
  });
};

window.addEventListener('scroll', handleScrollAnimations);
