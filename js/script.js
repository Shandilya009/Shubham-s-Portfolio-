// Dark/Light Mode Toggle
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
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

// Contact form
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you, your message has been sent!');
  e.target.reset();
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
