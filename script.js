document.addEventListener('DOMContentLoaded', function() {
    
     // --- THEME TOGGLE LOGIC (NEW) ---
     const themeToggle = document.getElementById('theme-toggle');
     const body = document.body;
 
     // Helper function to set the theme
     function setTheme(isDark) {
         if (isDark) {
             body.classList.add('dark-mode');
             localStorage.setItem('theme', 'dark');
             // Change button icon to moon
             themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
         } else {
             body.classList.remove('dark-mode');
             localStorage.setItem('theme', 'light');
             // Change button icon to sun
             themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
         }
     }
 
     // 1. Load saved theme preference
     const savedTheme = localStorage.getItem('theme');
     if (savedTheme === 'dark') {
         setTheme(true);
     } else {
         // Default to light mode (or explicitly set if localStorage is empty/light)
         setTheme(false);
     }
 
     // 2. Add listener for the theme button
     themeToggle.addEventListener('click', () => {
         // Toggle the current state
         const isDark = body.classList.contains('dark-mode');
         setTheme(!isDark);
     });
 
     // --- NAVIGATION AND SCROLL LOGIC ---
     
     // Select all navigation links from BOTH menus
     const navLinks = document.querySelectorAll('.right-menu a, .mobile-menu-bar a');
 
     // 1. Smooth Scrolling and Active Class Setting on Click
     navLinks.forEach(link => {
         link.addEventListener('click', function(e) {
             e.preventDefault();
 
             const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);
 
             if (targetElement) {
                 targetElement.scrollIntoView({
                     behavior: 'smooth'
                 });
 
                 // Set 'active' class on ALL corresponding links
                 const targetHref = this.getAttribute('href');
                 navLinks.forEach(nav => {
                     nav.classList.remove('active');
                     if (nav.getAttribute('href') === targetHref) {
                         nav.classList.add('active');
                     }
                 });
             }
         });
     });
 
     // 2. Active Link Highlighting on Scroll
     const sections = document.querySelectorAll('section');
     
     // Set the initial state for the first section
     if (navLinks.length > 0) {
         const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === '#about');
         if (homeLink) homeLink.classList.add('active');
     }
 
     window.addEventListener('scroll', () => {
         let current = '';
 
         sections.forEach(section => {
             const sectionTop = section.offsetTop;
             const sectionHeight = section.clientHeight;
             
             // Trigger point: When the user scrolls past 1/3 of the section height
             if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                 current = section.getAttribute('id');
             }
         });
 
         navLinks.forEach(link => {
             link.classList.remove('active');
             // Check if the link's href contains the current section ID
             if (link.getAttribute('href').includes(current)) {
                 link.classList.add('active');
             }
         });
     });
 
     // 3. Simple Alert for Download CV Button
     const downloadButton = document.querySelector('.download-cv-button');
     if (downloadButton) {
         downloadButton.addEventListener('click', function() {
             alert('CV download initiated!');
         });
     }
 });