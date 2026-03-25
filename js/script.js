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
  // emailjs.init("YOUR_PUBLIC_KEY"); // Uncomment and add your key when ready
})();

// Contact form with EmailJS
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  
  // Get form button and success message
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const successMessage = document.getElementById('success-message');
  const originalBtnText = btnText.textContent;
  
  // Get form values
  const name = document.getElementById('from_name').value;
  const email = document.getElementById('from_email').value;
  const message = document.getElementById('message').value;
  
  // Hide success message if visible
  successMessage.classList.remove('show');
  
  // Show loading state
  btnText.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate sending (remove this when EmailJS is configured)
  setTimeout(() => {
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
    
    // Log to console (for testing)
    console.log('Form submitted:', { name, email, message });
  }, 1000);
  
  /* Uncomment this section when you have EmailJS configured:
  
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
  
  */
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


// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'React Developer', 'Problem Solver', 'Full-Stack Developer', 'NCC Cadet'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    // Remove characters
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    // Add characters
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 150;
  }
  
  // Check if word is complete
  if (!isDeleting && charIndex === currentWord.length) {
    // Pause at end of word
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500;
  }
  
  setTimeout(type, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});
